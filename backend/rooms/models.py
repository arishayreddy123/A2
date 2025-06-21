from django.db import models

class Room(models.Model):
    name = models.CharField(max_length=100)
    capacity = models.IntegerField()
    location = models.CharField(max_length=100, default='Unknown')  # default added
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name
