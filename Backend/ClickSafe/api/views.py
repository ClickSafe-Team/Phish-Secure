
import pandas as pd 
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
    
    # Basic Length Features
    features['url_length'] = len(url)
    features['domain_length'] = len(domain)
    features['subdomain_length'] = len(subdomain)
    features['path_length'] = len(path)
    
    # Count Features
    features['._count'] = url.count('.')
    features['-_count'] = url.count('-')
    features['__count'] = url.count('_')
    features['/_count'] = url.count('/')
    features['?_count'] = url.count('?')
    features['=_count'] = url.count('=')
    features['@_count'] = url.count('@')
    
    # Digit / Letter Features
    features['digit_count'] = count_digits(url)
    features['letter_count'] = count_letters(url)
    features['special_char_count'] = count_special_chars(url)
    
    # Ratio Features
    features['digit_ratio'] = features['digit_count'] / len(url)
    features['letter_ratio'] = features['letter_count'] / len(url)
    
    # Domain-based
    features['has_ip'] = has_ip(url)
    features['entropy'] = shannon_entropy(url)
    
    # Word-based
    features['word_count'] = count_words(url)
    features['keyword_count'] = keyword_count(url)
    
    # TLD suspicious
    suspicious_tlds = ['tk', 'ml', 'ga', 'cf', 'gq']
    features['suspicious_tld'] = 1 if ext.suffix in suspicious_tlds else 0
    
    return features

def build_feature_dataframe(df, url_column):
    feature_list = df[url_column].apply(lambda x: extract_features(x))
    feature_df = pd.DataFrame(feature_list.tolist())
    return feature_df












from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

from huggingface_hub import hf_hub_download
import joblib

model_path = hf_hub_download(
    repo_id="MokshJn/phishing-url-detector",
    filename="model.pkl"
)

model = joblib.load(model_path)

@api_view(['POST'])
def check_url(request):
    test_url = request.data.get('url')

    if not test_url:
        return Response({'error': 'No URL provided'}, status=400)

    
    try:
        # ✅ Create dataframe
        df = pd.DataFrame({'url': [test_url]})

        # ✅ Correct column name
        X_new = build_feature_dataframe(df, 'url')

        # ✅ Prediction
        result = model.predict(X_new)

        return Response({
            'url': test_url,
            'result': result    # convert to normal int
        })

    except Exception as e:
        return Response({
            'error': str(e)
        }, status=500)
