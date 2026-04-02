from django.db import models

class URLCHECK(models.Model):
    URL = models.URLField(max_length = 500)
    Prediction = models.CharField(max_length=20)
    Probability = models.FloatField(
        null=True,
        blank=True
    )
    Created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.URL
    
