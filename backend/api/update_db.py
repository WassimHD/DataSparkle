import pymongo
import os
from datetime import datetime
from .csv_content import *
from django.conf import settings


def update_db(file_path):
    DATABASE_URL = "mongodb://serveurBehi:tebvev-vedjej-ruPbe7@uat.branper.com:28091/test?authSource=admin&readPreference=primaryPreferred&directConnection=true&ssl=false"
    # connect to this db
    client = pymongo.MongoClient(DATABASE_URL)
    # connect to db called social_media_listening
    db = client.social_media_test
    # connect to datasets collection in db
    datasets_collection = db.datasets
    # sort the collection datasets content and get the last one added
    last_dataset = datasets_collection.find().sort([("_id", -1)]).limit(1)[0]
    last_dataset["updateDate"]=datetime.now()
    datasets_collection.update_one({"_id": last_dataset["_id"]}, {"$set": last_dataset})
    # get the value of "editedPost" field
    edited_post = last_dataset["editedPost"]
    modified_post_collection = db.get_collection(edited_post)
    
    modified_post_collection.delete_many({})
    content = csv_content(file_path)
    headers = content[0]
    data_rows = content[1:]
    # Insert data into the new collection
    for row in data_rows:
        document = dict(zip(headers, row))
        modified_post_collection.insert_one(document)
        # close the db
    print("database sucessfully updated")
    client.close()
    # response_data={"answer":edited_post}
    # return JsonResponse(response_data,status=200)
    return "Sucessfully updated"
