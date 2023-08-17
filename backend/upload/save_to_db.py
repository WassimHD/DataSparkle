import pymongo
import os
from datetime import datetime
from .csv_content import *
from django.conf import settings


# Connect to MongoDB
def save_to_database(file_name):
    # database conenction
    DATABASE_URL = "mongodb://serveurBehi:tebvev-vedjej-ruPbe7@uat.branper.com:28091/sentinel?authSource=admin&readPreference=primaryPreferred&directConnection=true&ssl=false"
    client = pymongo.MongoClient(DATABASE_URL)
    database = client["social_media_test"]
    datasets_collection = database["datasets"]
    # Check if the filename exists in the metadata collection
    # if datasets_collection.find_one({"fileName": file_name}):
    #     print("Filename already exists in datasets collection.")
    # else:
        # Create collection name: file_name_timestamp
    timestamp = int(datetime.now().timestamp())
    collection_name_original = f"Original_{file_name}_{timestamp}"
    collection_name_modified=f"Modified_{file_name}_{timestamp}"
    # Create a new collection
    new_collection_original = database[collection_name_original]               
    new_collection_modified=database[collection_name_modified]
        # get the last file upladed url
    uploads_dir = str(settings.BASE_DIR) + "/media/raw_data"
    upload_list_file = os.listdir(uploads_dir)
    upload_list_file.sort(reverse=True)
    file = upload_list_file[0]
    file_path = settings.MEDIA_ROOT + "/raw_data/" + str(file)
    content = csv_content(file_path)
    headers = content[0]
    data_rows = content[1:]
        # Insert data into the new collection
    for row in data_rows:
        document = dict(zip(headers, row))
        new_collection_original.insert_one(document)
        new_collection_modified.insert_one(document)

        # Add the filename to the metadata collection
    metadata = {
            "fileName": file_name,
            "originalPost": collection_name_original,
            "uploadDate": datetime.now(),
            "editedPost":collection_name_modified,
            "updateDate":datetime.now()
        }
    datasets_collection.insert_one(metadata)

    print(f"Added filename '{file_name}' to the metadata collection.")


    # Close the MongoDB connection
    client.close()
    return "Sucess"
