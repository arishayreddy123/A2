# Import serializers from Django REST framework for handling serialization of model instances
from rest_framework import serializers

# Import the Room and Reservation models from the current app
from .models import Room, Reservation

# Serializer for the Room model
class RoomSerializer(serializers.ModelSerializer):
    # Meta class provides metadata to the serializer
    class Meta:
        # Associate the serializer with the Room model
        model = Room
        # Include all fields from the Room model in the serialization
        fields = '__all__'

# Serializer for the Reservation model
class ReservationSerializer(serializers.ModelSerializer):
    # Meta class for configuration
    class Meta:
        # Associate the serializer with the Reservation model
        model = Reservation
        # Specify the fields to include in the serialization
        fields = ['id', 'room', 'start_time', 'end_time', 'user']
        # Make the 'user' field read-only to prevent it from being modified via input
        read_only_fields = ['user']
