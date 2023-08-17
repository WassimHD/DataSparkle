import pymongo

def delete_user(user_id):
    DATABASE_URL = "mongodb://serveurBehi:tebvev-vedjej-ruPbe7@uat.branper.com:28091/test?authSource=admin&readPreference=primaryPreferred&directConnection=true&ssl=false"
    # connect to this db
    client = pymongo.MongoClient(DATABASE_URL)
    # connect to db called social_media_listening
    db = client.social_media_test
    # connect to datasets collection in db
    users_collection = db.auth_user
    # print the collection data
    documents = users_collection.find()
    result = users_collection.delete_one({'id': user_id})

    return "sucessfully deleted"
