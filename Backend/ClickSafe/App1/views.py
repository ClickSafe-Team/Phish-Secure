from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json
import pandas as pd
import numpy as np
from huggingface_hub import hf_hub_download
import joblib
import re
import tldextract
import math
from urllib.parse import urlparse
from .models import URLCHECK

def shannon_entropy(string):
    prob = [float(string.count(c)) / len(string) for c in dict.fromkeys(list(string))]
    entropy = -sum([p * math.log2(p) for p in prob])
    return entropy

def has_ip(domain):
    pattern = r'(\d{1,3}\.){3}\d{1,3}'
    return 1 if re.search(pattern, domain) else 0

def count_digits(s):
    return sum(c.isdigit() for c in s)

def count_letters(s):
    return sum(c.isalpha() for c in s)

def count_special_chars(s):
    return len(re.findall(r'[^a-zA-Z0-9]', s))

def count_words(s):
    words = re.split(r'[\W_]+', s)
    words = [w for w in words if w]
    return len(words)

suspicious_keywords = [
    'login', 'secure', 'update', 'bank', 'account',
    'verify', 'paypal', 'signin', 'confirm', 'free',
    'webscr', 'ebay', 'amazon'
]

def keyword_count(url):
    return sum(word in url.lower() for word in suspicious_keywords)

def extract_features(url):

    parsed = urlparse(url)
    ext = tldextract.extract(url)
    
    domain = ext.domain
    subdomain = ext.subdomain
    path = parsed.path
    
    features = {}
    
    features['url_length'] = len(url)
    features['domain_length'] = len(domain)
    features['subdomain_length'] = len(subdomain)
    features['path_length'] = len(path)
    
    features['._count'] = url.count('.')
    features['-_count'] = url.count('-')
    features['__count'] = url.count('_')
    features['/_count'] = url.count('/')
    features['?_count'] = url.count('?')
    features['=_count'] = url.count('=')
    features['@_count'] = url.count('@')
    
    features['digit_count'] = count_digits(url)
    features['letter_count'] = count_letters(url)
    features['special_char_count'] = count_special_chars(url)
    
    features['digit_ratio'] = features['digit_count'] / len(url)
    features['letter_ratio'] = features['letter_count'] / len(url)
    
    features['has_ip'] = has_ip(url)
    features['entropy'] = shannon_entropy(url)
    
    features['word_count'] = count_words(url)
    features['keyword_count'] = keyword_count(url)
    
    suspicious_tlds = ['tk', 'ml', 'ga', 'cf', 'gq']
    features['suspicious_tld'] = 1 if ext.suffix in suspicious_tlds else 0
    
    features['https'] = 1 if parsed.scheme == 'https' else 0
    
    return features

model_path = hf_hub_download(
    repo_id="MokshJn/phishing-url-detector",
    filename="model.pkl"
)

model = joblib.load(model_path)

def predict_page(request):
  return render(request, 'app1/predict.html')

@csrf_exempt
def prediction(request):
    if request.method == 'POST':
        try:
            url_dict = json.loads(request.body)
            url = url_dict.get('url')
            if not url:
                return JsonResponse({"error": "Missing url"}, status=400)

            extracted_features = extract_features(url)
            if "https" in extracted_features:
                del extracted_features["https"]
            data = pd.DataFrame([extracted_features])
            try:
                model_predicition = model.predict(data)
                prob = model.predict_proba(data)
                if model_predicition[0] == 1:
                    result = 'Phishing'
                else:
                    result = 'Legitimate'
                try:
                    URLCHECK.objects.create(
                        URL=url,
                        Prediction=result,
                        Probability=float(max(max(prob)))
                    )
                except Exception as db_err:
                    print(f"Database error: {db_err}")
                    pass
                return JsonResponse({
                    "url": url,
                    "prediction": result,
                    "Confidence": max(max(prob))
                })
            except Exception as model_err:
                print(f"Model error: {model_err}")
                return JsonResponse({"error": f"Model failed: {str(model_err)}"}, status=500)
        except json.JSONDecodeError as json_err:
            print(f"JSON error: {json_err}")
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        except Exception as e:
            print(f"Unexpected error: {e}")
            return JsonResponse({"error": f"Server error: {str(e)}"}, status=500)
    return JsonResponse({"error": "Only POST request allowed"}, status=405)
    

# url = 'https://iptv-org.github.io/iptv/index.m3u'
# extracted_features = extract_features(url)
# print(extracted_features)
# del extracted_features["https"]
# data = pd.DataFrame([extracted_features])
# model_predicition = model.predict(data)
# prob = model.predict_proba(data)
# print(max(max(prob)))
# print(model_predicition[0])
# if model_predicition[0] == 1:
#   result = 'Phishing'
# else:
#   result = 'Legitimate'

def dashboard_stats(request):
    if request.method == 'GET':
        try:
            total_scans = URLCHECK.objects.count()
            phishing_count = URLCHECK.objects.filter(Prediction__iexact='Phishing').count()
            safe_count = URLCHECK.objects.filter(Prediction__iexact='Legitimate').count()

            recent_scans = URLCHECK.objects.all().order_by('-Created_at')[:4]
            recent_activity = []
            for scan in recent_scans:
                recent_activity.append({
                    "id": scan.id,
                    "url": scan.URL,
                    "status": "Safe" if scan.Prediction == 'Legitimate' else "Phishing",
                    "date": scan.Created_at.strftime("%b %d, %I:%M %p")
                })

            return JsonResponse({
                "stats": {
                    "total": total_scans,
                    "phishing": phishing_count,
                    "safe": safe_count
                },
                "recent_activity": recent_activity
            })
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Only GET request allowed"}, status=405)
