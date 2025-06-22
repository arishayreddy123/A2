# Import the path function to define URL patterns
from django.urls import path

# Import views from SimpleJWT for obtaining and refreshing JWT tokens
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# Import the custom registration view from the current app
from .views import RegisterView

# Define the URL patterns for authentication-related endpoints
urlpatterns = [
    # Route for user registration using a custom view
    path('register/', RegisterView.as_view(), name='register'),
    
    # Route for obtaining JWT tokens (login)
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # Route for refreshing JWT tokens
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
