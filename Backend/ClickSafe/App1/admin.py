from django.contrib import admin
from .models import URLCHECK

@admin.register(URLCHECK)
class URLCHECKAdmin(admin.ModelAdmin):
    list_display = ('URL', 'Prediction', 'Probability', 'Created_at')
    list_filter = ('Prediction', 'Created_at')
    search_fields = ('URL', 'Prediction')
    ordering = ('-Created_at',)
