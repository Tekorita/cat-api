import requests
from django.http import JsonResponse
from django.conf import settings

def get_cats(request):
    """Obtiene 5 imágenes de gatos desde The Cat API"""
    url = "https://api.thecatapi.com/v1/images/search?limit=5"
    headers = {
        "x-api-key": settings.CAT_API_KEY  # Usando la API Key desde settings.py
    }
    
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        return JsonResponse(response.json(), safe=False)
    else:
        return JsonResponse({"error": "No se pudo obtener la data de gatos"}, status=500)
