from rest_framework import generics
from .models import Room
from .serializers import RoomSerializer

class RoomListView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
