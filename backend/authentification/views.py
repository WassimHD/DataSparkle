from django.shortcuts import render
from django.core import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseBadRequest
from django.contrib.sessions.backends.db import SessionStore
import jwt
import datetime
import pymongo
import json
from .getusers_db import users
from .delete_user import *
from .get_usernames import *
@csrf_exempt
def get_user_list_admin(request):
    user_data = users()
    return JsonResponse({'users': user_data})

@csrf_exempt
def delete_user_admin(request,user_id):
    delete_user(user_id)
    users_list=users()
 
    return JsonResponse({"message":"user Sucessfully deleted","users_list":users_list})

    # if user_id:
    #     updated_users = delete_user_API(user_id)
    #     if updated_users:
    #         return JsonResponse({"users": updated_users})
    #     else:
    #         return JsonResponse({"message": "User not found."})
    # else:
    #     return JsonResponse({"message": "User ID is required."})
    
@csrf_exempt
def register_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        email = request.POST.get("email")
        first_name = request.POST.get("first_name")
        last_name = request.POST.get("last_name")
        password = request.POST.get("password")
        
        # if User.objects.filter(username=username).exists():
        #     return JsonResponse({"error": "Username already exists"})
        
        user = User.objects.create_user(
            username=username,
            email=email,
            first_name=first_name,
            last_name=last_name,
            password=password,
            )
        return JsonResponse({"success": "User registered successfully"}, status=200)
    
    return JsonResponse({"error": "Invalid request method"}, status=400)

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)

            # Generate a JWT token with user data
            token_payload = {
                "user_id": user.id,
                "username": user.username,
                "email": user.email,
                "first_name":user.first_name,
                "last_name":user.last_name,     
                "password":user.password,
                "is_staff":user.is_staff,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1),
            }

            token = jwt.encode(token_payload, "your_secret_key_here", algorithm="HS256")

            return JsonResponse({"message": "Login successful", "token": token,'is_staff':user.is_staff})
        else:
            return JsonResponse({"error": "Invalid username or password"}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=400)


@csrf_exempt
def get_user_info(request):
    token = request.headers.get("Authorization")
    if token:
        token = token.split(" ")[1]  # Remove "Bearer " prefix from the token
        try:
            decoded_token = jwt.decode(token, "your_secret_key_here", algorithms=["HS256"])
            user_id = decoded_token.get("user_id")
            username = decoded_token.get("username")
            email = decoded_token.get("email")
            first_name=decoded_token.get("first_name")
            last_name=decoded_token.get("last_name")

            return JsonResponse({"message": "User retrieved successfully","user_id":user_id,"username":username,"email":email,"first_name":first_name,"last_name":last_name})
        except jwt.ExpiredSignatureError:
            return JsonResponse({"error": "Token has expired"}, status=401)
        except jwt.InvalidTokenError:
            return JsonResponse({"error": "Invalid token"}, status=401)

    return JsonResponse({"error": "Missing token"}, status=401)


@csrf_exempt
def logout_view(request):
    if "username" in request.session:
        del request.session["username"]
    logout(request)
    return JsonResponse({"success": "User logged out successfully"}, status=200)

@csrf_exempt
def header_view(request):
    token = request.headers.get("Authorization")
    if token:
        token = token.split(" ")[1]  # Remove "Bearer " prefix from the token
        try:
            decoded_token = jwt.decode(token, "your_secret_key_here", algorithms=["HS256"])
            first_name=decoded_token.get("first_name")
            last_name=decoded_token.get("last_name")
            return JsonResponse({"first_name":first_name , "last_name":last_name})
        except jwt.ExpiredSignatureError:
            return JsonResponse({"error": "Token has expired"}, status=401)
        except jwt.InvalidTokenError:
            return JsonResponse({"error": "Invalid token"}, status=401)

    return JsonResponse({"error": "Missing token"}, status=401)

@csrf_exempt
def update_profile_view(request):
    if request.method == "POST":
        # Retrieve the raw JSON data from the request body
        json_data = request.body.decode('utf-8')
        
        # Parse the JSON data
        data = json.loads(json_data)
        token = data.get('token')
                    
        payload = jwt.decode(token, 'your_secret_key_here', algorithms=['HS256'])
        user_id = payload.get('user_id')
        print(user_id)  
        # Retrieve the form data sent from the frontend
        username = data.get("username")
        email = data.get("email")
        first_name = data.get("first_name")
        last_name = data.get("last_name")
        password = data.get("password")
        if user_id:
            username = data.get("username")
            email = data.get("email")
            first_name = data.get("first_name")
            last_name = data.get("last_name")
            password = data.get("password")
            user = User.objects.get(id=user_id)
            user.email = email
            user.first_name = first_name
            user.last_name = last_name
            user.save()
            response_data = {
                    'message': 'User data updated successfully',
                    'username':username,
                    'email': email,
                    'first_name': first_name,
                    'last_name': last_name
                }
        # Return a JSON response indicating success
        return JsonResponse(response_data,status=200)
    else:
        # Return an error response if the request method is not POST
        return JsonResponse({"error": "Invalid request method"})

@csrf_exempt
def delete_account_view(request):
    if request.method == "POST":
        token = request.headers.get("Authorization")
        if token:
            token = token.split(" ")[1]  # Remove "Bearer " prefix from the token
            try:
                decoded_token = jwt.decode(token, "your_secret_key_here", algorithms=["HS256"])
                user_id=decoded_token.get("user_id")
               
            except jwt.ExpiredSignatureError:
                return JsonResponse({"error": "Token has expired"}, status=401)
        try:
            user = User.objects.get(id=user_id)
            print(f"User ID: {user_id}")  # Print the user ID
            user.delete()
            return JsonResponse({"message": "User deleted successfully"})
        except User.DoesNotExist:
            return JsonResponse({"error": "User not found"}, status=404)
    return JsonResponse({"error": "Invalid request method"}, status=400)

@csrf_exempt
def get_username_list(request):
    user_data = usernames()
    return JsonResponse({'users': user_data})