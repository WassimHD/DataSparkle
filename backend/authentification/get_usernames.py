import pymongo
from django.http import HttpResponse,JsonResponse
def usernames():
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
    attribute_row = [ 'Username', ]
    users_array.append(attribute_row)
    for user in users:
        user_array = [ user.get('username'),   ]
        users_array.append(user_array)
        
    return users_array

