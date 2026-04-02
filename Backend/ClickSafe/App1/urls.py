from django.urls import path
from . import views

urlpatterns = [
    path("", views.predict_page, name = 'prediction'),
    path("api/", views.prediction, name = 'prediction')
]