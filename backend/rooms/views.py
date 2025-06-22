# Import generic class-based views from Django REST Framework
from rest_framework import generics

# Import the Room model from the current app
from .models import Room

# Import the RoomSerializer for serializing Room instances
from .serializers import RoomSerializer

# View to handle GET requests for listing all Room instances
class RoomListView(generics.ListAPIView):
    # Define the queryset to retrieve all rooms from the database
    queryset = Room.objects.all()

    # Specify the serializer class to use for representing Room data
    serializer_class = RoomSerializer
