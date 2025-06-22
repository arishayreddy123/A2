# Import path to define URL routes
from django.urls import path

# Import the RoomListView from views
from .views import RoomListView

# Define the URL patterns for the room app
urlpatterns = [
    # Route for listing rooms, mapped to RoomListView
    path('', RoomListView.as_view(), name='room-list'),
]
