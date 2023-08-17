from django.urls import path
from .views import *


urlpatterns = [
    path("register/", register_view),
    path("login/", login_view),
    path("logout/", logout_view),
    path("header/",header_view),
    path("user_info/",get_user_info),
    path("edit_profile/",update_profile_view),
    path('users/', get_user_list_admin),
    path('delete_user/<int:user_id>/', delete_user_admin),
    path('delete_account/',delete_account_view),
    path('get_usernames/',get_username_list),
    

 
]
