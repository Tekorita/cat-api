from django.db import models


class GameResult(models.Model):
    player_name = models.CharField(max_length=100)
    mistakes = models.IntegerField()
    time_taken = models.IntegerField()  # Tiempo en segundos
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.player_name} - {self.mistakes} errores - {self.time_taken}s"
