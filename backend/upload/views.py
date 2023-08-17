from django.shortcuts import render
import pandas as pd
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import csv
from .forms import CSVUploadForm
import os
from django.core.files.storage import default_storage
import datetime
import time
from django.contrib.auth.decorators import login_required
from .save_to_db import *

# @login_required
@csrf_exempt
def upload_csv(request):
    if request.method == "POST":
        # Get the uploaded file from the request
        try:
            input_file = request.FILES["file"]
        except KeyError:
            response_data = {"error": "No file was found in the request"}
            return JsonResponse(response_data, status=400)
        # Check if the file is csv
        if not input_file.name.endswith(".csv"):
            response_data = {"error": "File is not a CSV file"}
            return JsonResponse(response_data, status=400)
        # Save the file to the default storage (usually the filesystem)
        upload_time = str((int(time.time())))
        file_name=upload_time + "_" + input_file.name
        saving_path_raw="raw_data/"+file_name
        saved_raw_file=default_storage.save(saving_path_raw,input_file)
        saving_path_modified="modified_data/"+file_name
        saved_modified_file=default_storage.save(saving_path_modified,input_file)
        kpi_path="KPI/"+file_name
        saved_kpi_file=default_storage.save(kpi_path,input_file)
        file_url = default_storage.url(saved_raw_file)
        #save file to database
        save_to_database(input_file.name)
       
    response_data = {
        "message": "File uploaded and processed successfully",
        "File path": file_url,
    }
    return JsonResponse(response_data, status=200)
