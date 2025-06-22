# Import Django's admin module to customize the admin interface
from django.contrib import admin

# Import the Room model from the current app
from .models import Room

# Register the Room model with the admin site using a decorator
@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    # Define which fields will be displayed in the list view of the admin panel
    list_display = ('name', 'capacity', 'location', 'description')
