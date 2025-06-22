# Import the built-in User model from Django's authentication system
from django.contrib.auth.models import User

# Import serializers from Django REST framework to help convert complex data types like model instances to JSON
from rest_framework import serializers

# Define a serializer for user registration
class RegisterSerializer(serializers.ModelSerializer):
    # Define the password field as write-only so it won't be included in the serialized output
    password = serializers.CharField(write_only=True)
    
    # Define the email field and mark it as required
    email = serializers.EmailField(required=True)

    # Meta class specifies metadata for the serializer
    class Meta:
        # Set the model to use for this serializer
        model = User
        # Define the fields that will be handled by the serializer
        fields = ['username', 'email', 'password']

    # Override the create method to handle user creation with password hashing
    def create(self, validated_data):
        # Use the create_user method to ensure the password is properly hashed
        return User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
