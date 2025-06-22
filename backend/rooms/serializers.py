# Import serializers module from Django REST Framework
from rest_framework import serializers

# Import the Room model from the current app
from .models import Room

# Serializer for the Room model to convert model instances to JSON and validate input
class RoomSerializer(serializers.ModelSerializer):
    # Meta class to configure the serializer
    class Meta:
        # Associate this serializer with the Room model
        model = Room
        # Explicitly list the fields to include in serialization/deserialization
        fields = ['id', 'name', 'capacity', 'location', 'description']
