# Import Django's base model class
from django.db import models

# Define the Room model representing a reservable room
class Room(models.Model):
    # Name of the room, required, with a max length of 100 characters
    name = models.CharField(max_length=100)

    # Maximum capacity of the room (e.g., number of people it can accommodate)
    capacity = models.IntegerField()

    # Location of the room with a default value of 'Unknown'
    location = models.CharField(max_length=100, default='Unknown')  # default added

    # Optional description field; can be left blank or set to null
    description = models.TextField(blank=True, null=True)

    # String representation of the model, used in admin and elsewhere
    def __str__(self):
        return self.name
