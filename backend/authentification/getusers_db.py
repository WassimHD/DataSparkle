import pymongo
from django.http import HttpResponse,JsonResponse
def users():
    DATABASE_URL = "mongodb://serveurBehi:tebvev-vedjej-ruPbe7@uat.branper.com:28091/test?authSource=admin&readPreference=primaryPreferred&directConnection=true&ssl=false"
    # connect to this db
    client = pymongo.MongoClient(DATABASE_URL)
    # connect to db called social_media_listening
    db = client.social_media_test
    # connect to datasets collection in db
    users_collection = db.auth_user
    users=users_collection.find()
    print(users)
    users_array=[]
    attribute_row = [
        'id',
        'Username',
        'Email',
        'First Name',
        'Last Name',
        'password',
        'Is Staff',
        'is_active',
        'is_superuser',
        'date_joined',
        'last_login',
    ]
    users_array.append(attribute_row)
    for user in users:
        user_array = [
            user.get('id'),
            user.get('username'),  
            user.get('email'),
            user.get('first_name'),
            user.get('last_name'),
            user.get('password'), 
            user.get('is_staff'),
            user.get('is_active'),
            user.get('is_superuser'),
            user.get('date_joined'),
            user.get('last_login'),
            
        ]
        users_array.append(user_array)
        
    return users_array

