from django.http import JsonResponse
import json
import pandas as pd
import numpy as np
from huggingface_hub import hf_hub_download
import joblib
import re
import tldextract
import math
from urllib.parse import urlparse


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

def prediction(request):
  if request.method == 'POST':
    url_dict = json.loads(request.body)
    try:
        url = url_dict['url']
        extracted_features = extract_features(url)
        if "https" in extracted_features:
          del extracted_features["https"]
        data = pd.DataFrame([extracted_features])
        try:
          model_predicition = model.predict(data)
          if model_predicition[0] == 1:
            result = 'Phishing'
          else:
            result = 'Legitimate'

          return JsonResponse({
            "url": url,
            "prediction": result
          })
        except Exception as e:
          print('Model Fails')
    except Exception as e:
        print('404!!, URL NOT FOUND')
  else:
      return JsonResponse({
          "error": "Only POST request allowed"
      }, status=405)
    

# url = 'https://github.com/features/actions'
# extracted_features = extract_features(url)
# print(extracted_features)
# del extracted_features["https"]
# data = pd.DataFrame([extracted_features])
# model_predicition = model.predict(data)
# print(data)
# print(model_predicition[0])
# if model_predicition[0] == 1:
#   result = 'Phishing'
# else:
#   result = 'Legitimate'