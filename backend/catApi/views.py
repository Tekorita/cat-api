import requests
import json
import time
from django.http import JsonResponse
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import GameResult

@csrf_exempt  # Solo usar en desarrollo
@require_http_methods(["POST"])  # Solo acepta POST
def post_cats(request):
    try:
        # Obtener datos del request (asegurando que sea JSON)
        data = json.loads(request.body.decode("utf-8"))
        nombre = data.get("nombre", "Usuario desconocido")
        dificultad = data.get("dificultad", "facil")  # Default a "facil" si no se envía

        # Mapeo de dificultad a límite de imágenes
        dificultad_map = {"facil": 80, "intermedio": 80, "dificil": 80}
        limit = int(dificultad_map.get(dificultad, 6))  # Asegurar que sea un entero

        # Parámetros de la API
        params = {
            "limit": 80
            # "_": int(time.time())  # Parámetro único para evitar caché
        }

        # Headers con la API Key
        headers = {
            "x-api-key": settings.CAT_API_KEY
        }

        # Hacer la petición a The Cat API
        response = requests.get("https://api.thecatapi.com/v1/images/search", params=params, headers=headers)

        # Verificar respuesta de la API
        if response.status_code != 200:
            return JsonResponse({"error": "No se pudieron obtener los gatos", "status_code": response.status_code}, status=500)

        # Filtrar imágenes con width == 500 y height menor a 400
        all_cats = response.json()
        filtered_cats = [
            cat for cat in all_cats if cat.get("width") == 500 and cat.get("height", 0) < 400
        ]

        # Si después de filtrar no quedan imágenes, devolver un mensaje
        if not filtered_cats:
            return JsonResponse({"nombre": nombre, "gatos": [], "mensaje": "No se encontraron gatos con width de 500 y height menor a 400."}, status=200)

        return JsonResponse({"nombre": nombre, "gatos": filtered_cats}, status=200)

    except json.JSONDecodeError:
        return JsonResponse({"error": "Formato JSON inválido"}, status=400)
    except Exception as e:
        return JsonResponse({"error": f"Error inesperado: {str(e)}"}, status=500)


@csrf_exempt
@require_http_methods(["GET"])
def get_game_results(request):
    try:
        # Obtener todos los resultados ordenados por menos errores primero
        results = GameResult.objects.all().order_by("mistakes", "time_taken")

        # Convertir los datos a JSON
        results_list = [
            {
                "player_name": result.player_name,
                "mistakes": result.mistakes,
                "time_taken": result.time_taken,
            }
            for result in results
        ]

        return JsonResponse({"results": results_list}, status=200)
    
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
def save_game_result(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode("utf-8"))
            player_name = data.get("player_name")
            mistakes = data.get("mistakes")
            time_taken = data.get("time_taken")

            if not player_name or mistakes is None or time_taken is None:
                return JsonResponse({"error": "Datos incompletos"}, status=400)

            # ✅ Verificar si el usuario ya existe en la BD
            game_result, created = GameResult.objects.update_or_create(
                player_name=player_name,
                defaults={
                    "mistakes": mistakes,
                    "time_taken": time_taken,
                }
            )

            if created:
                return JsonResponse({"message": "Nuevo resultado guardado correctamente", "id": game_result.id}, status=201)
            else:
                return JsonResponse({"message": "Resultado actualizado correctamente", "id": game_result.id}, status=200)
        
        except json.JSONDecodeError:
            return JsonResponse({"error": "Formato JSON inválido"}, status=400)
    
    return JsonResponse({"error": "Método no permitido"}, status=405)
