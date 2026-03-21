# pip install huggingface_hub joblib
import sys
print(sys.executable)


from huggingface_hub import hf_hub_download
import joblib

model_path = hf_hub_download(
    repo_id="MokshJn/phishing-url-detector",
    filename="model.pkl"
)

model = joblib.load(model_path)

 # features extraction 
# X_new = feature_extractio(data_url ) 

 # prediction
# prediction = model.predict(X_new ) 