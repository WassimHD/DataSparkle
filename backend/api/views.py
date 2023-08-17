from django.shortcuts import render
import pandas as pd
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .clean import *
from .transform import *
from .process_csv import *
from .csv_content import *
from .update_db import *
from .kpis import *
import csv
import chardet
import os
import pymongo
import tempfile
from datetime import datetime
import time
from django.http import HttpResponse
from django.conf import settings
from upload.models import CSVUpload
from django.http import FileResponse
from django.contrib.auth.decorators import login_required
import json

@csrf_exempt
def delete_column_API(request):
    if request.method == "GET":
        try:
            uploads_dir = str(settings.BASE_DIR) + "/media/modified_data"
            upload_list_file = os.listdir(uploads_dir)
            upload_list_file.sort(reverse=True)
            file = upload_list_file[0]
            file_path = settings.MEDIA_ROOT + "/modified_data/" + str(file)
            file_path_kpi=settings.MEDIA_ROOT + "/KPI/" + str(file)
        except KeyError:
            response_data = {"error": "No file was found in the request"}
            return JsonResponse(response_data, status=400)
# get the column name from the frontend
    answer = request.GET.get("answer")
    dataframe = process_csv(file_path)
    # resize the file size to 0 bytes to delete all the content 
    with open(file_path, "w") as f:
        f.truncate(0)
# clean the data 
    try:
        cleaned_data = delete_column(dataframe, answer)
        #Put the dataframe in the csv file that exists in the file path indicated
        cleaned_data.to_csv(file_path, index=False)
        cleaned_data.to_csv(file_path_kpi, index=False)
        
        cleaned_content = csv_content(file_path)
    except Exception as e:
        response_data = {"error": f"Error cleaning data: {str(e)}"}
        
        return JsonResponse(response_data, status=500)
    try:
        update_db(file_path)
    except Exception as e:
        response_data = {"error": "Error updating database"}
        return JsonResponse(response_data, status=500)

    response_data = {
        "dataframe": "sucessfully cleaned",
        "cleaned_data": cleaned_content,
    }
    return JsonResponse(response_data, status=200)

@csrf_exempt
def get_type_api(request):
    if request.method == "GET":
        try:
            uploads_dir = str(settings.BASE_DIR) + "/media/modified_data"
            upload_list_file = os.listdir(uploads_dir)
            upload_list_file.sort(reverse=True)
            file = upload_list_file[0]
            file_path = settings.MEDIA_ROOT + "/modified_data/" + str(file)
            file_path_kpi=settings.MEDIA_ROOT + "/KPI/" + str(file)

        except KeyError:
            response_data = {"error": "No file was found in the request"}
            return JsonResponse(response_data, status=400)
        
    column_name = request.GET.get("column_name")
    dataframe = process_csv(file_path)
    col_type=str(get_type(dataframe,column_name))
    response_data = {
       
        "column_type": col_type,
    }
    return JsonResponse(response_data, status=200,safe=False)

@csrf_exempt
def change_type_api(request):
    if request.method == "GET":
        try:
            uploads_dir = str(settings.BASE_DIR) + "/media/modified_data"
            upload_list_file = os.listdir(uploads_dir)
            upload_list_file.sort(reverse=True)
            file = upload_list_file[0]
            file_path = settings.MEDIA_ROOT + "/modified_data/" + str(file)
            file_path_kpi=settings.MEDIA_ROOT + "/KPI/" + str(file)

        except KeyError:
            response_data = {"error": "No file was found in the request"}
            return JsonResponse(response_data, status=400)

    dataframe = process_csv(file_path)
    column_name = request.GET.get("column_name")
    new_type=request.GET.get('new_type')
    with open(file_path, "w") as f:
        f.truncate(0) 
    # print(column_name)
    # print(new_type)
    try:
        cleaned_data = change_type(dataframe,column_name,new_type)
        col_new_type=get_type(dataframe,column_name)
        print("the type is successfully changed to : " , col_new_type)          
        cleaned_data.to_csv(file_path, index=False)
        cleaned_data.to_csv(file_path_kpi, index=False)        
        cleaned_content = csv_content(file_path)
    except Exception as e:
        response_data = {"error": f"Error transforming data: {str(e)}"}
        return JsonResponse(response_data, status=500)

    # update_db(file_path)
    response_data = {
        "dataframe": "sucessfully changed",
        "cleaned_data": cleaned_content,
    }
    return JsonResponse(response_data, status=200,safe=False)

@csrf_exempt
def remove_duplications_API(request):
    if request.method == "GET":
        try:
            uploads_dir = str(settings.BASE_DIR) + "/media/modified_data"
            upload_list_file = os.listdir(uploads_dir)
            upload_list_file.sort(reverse=True)
            file = upload_list_file[0]
            file_path = settings.MEDIA_ROOT + "/modified_data/" + str(file)
            file_path_kpi=settings.MEDIA_ROOT + "/KPI/" + str(file)

        except KeyError:
            response_data = {"error": "No file was found in the request"}
            return JsonResponse(response_data, status=400)
    total_file_name = os.path.basename(file_path).split("_", 1)[1]
    file_name = total_file_name.split(".")[0]
    answer = request.GET.get("answer")
    dataframe = process_csv(file_path)
    with open(file_path, "w") as f:
        f.truncate(0)
    try:
        cleaned_data = remove_duplications(dataframe, answer)
        #Put the dataframe in the csv file that exists in the file path indicated
        cleaned_data.to_csv(file_path, index=False)
        cleaned_data.to_csv(file_path_kpi, index=False)        
        cleaned_content = csv_content(file_path)

    except Exception as e:
        response_data = {"error": f"Error cleaning data: {str(e)}"}
        return JsonResponse(response_data, status=500)
    try:
        update_db(file_path)
    except Exception as e:
        response_data = {"error": "Error updating database"}
        return JsonResponse(response_data, status=500)

    response_data = {
        "dataframe": "sucessfully cleaned",
        "cleaned_data": cleaned_content,
    }
    return JsonResponse(response_data, status=200)

@csrf_exempt
def replace_NaN_values_API(request):
    if request.method == "GET":
        try:
            uploads_dir = str(settings.BASE_DIR) + "/media/modified_data"
            upload_list_file = os.listdir(uploads_dir)
            upload_list_file.sort(reverse=True)
            file = upload_list_file[0]
            file_path = settings.MEDIA_ROOT + "/modified_data/" + str(file)
            file_path_kpi=settings.MEDIA_ROOT + "/KPI/" + str(file)

        except KeyError:
            response_data = {"error": "No file was found in the request"}
            return JsonResponse(response_data, status=400)
    # total_file_name = os.path.basename(file_path).split("_", 1)[1]
    # file_name=total_file_name.split(".")[0]
    answer = request.GET.get("answer")

    new_value = request.GET.get("new_value")

    dataframe = process_csv(file_path)
    with open(file_path, "w") as f:
        f.truncate(0)
    try:
        cleaned_data = replace_Nan_Values(dataframe, answer, new_value)
        #Put the dataframe in the csv file that exists in the file path indicated
        cleaned_data.to_csv(file_path, index=False)
        cleaned_data.to_csv(file_path_kpi, index=False)
        cleaned_content = csv_content(file_path)
    except Exception as e:
        response_data = {"error": f"Error cleaning data: {str(e)}"}
        return JsonResponse(response_data, status=500)
    try:
        update_db(file_path)
    except Exception as e:
        response_data = {"error": "Error updating database"}
        return JsonResponse(response_data, status=500)

    response_data = {"message": "sucessfully cleaned", "cleaned_data": cleaned_content}
    return JsonResponse(response_data, status=200)


@csrf_exempt
def Change_column_API(request):
    if request.method == "GET":
        try:
            uploads_dir = str(settings.BASE_DIR) + "/media/raw_data"
            upload_list_file = os.listdir(uploads_dir)
            upload_list_file.sort(reverse=True)
            file = upload_list_file[0]
            file_path = settings.MEDIA_ROOT + "/modified_data/" + str(file)
            file_path_kpi=settings.MEDIA_ROOT + "/KPI/" + str(file)

        except KeyError:
            response_data = {"error": "No file was found in the request"}
            return JsonResponse(response_data, status=400)
    total_file_name = os.path.basename(file_path).split("_", 1)[1]
    file_name = total_file_name.split(".")[0]

    old_column = request.GET.get("old_column")
    new_column = request.GET.get("new_column")

    dataframe = process_csv(file_path)
    with open(file_path, "w") as f:
        f.truncate(0)

    try:
        cleaned_data = change_column(dataframe, old_column, new_column)
        #Put the dataframe in the csv file that exists in the file path indicated
        cleaned_data.to_csv(file_path, index=False)
        cleaned_data.to_csv(file_path_kpi, index=False)
        cleaned_content = csv_content(file_path)

    except Exception as e:
        response_data = {"error": f"Error cleaning data: {str(e)}"}
        return JsonResponse(response_data, status=500)
    try:
        #function to update the data
        update_db(file_path)
    except Exception as e:
        response_data = {"error": "Error updating database"}
        return JsonResponse(response_data, status=500)

    response_data = {
        "dataframe": "sucessfully transformed",
        "cleaned_data": cleaned_content,
    }
    return JsonResponse(response_data, status=200)

@csrf_exempt
def Change_kilo_to_int_API(request):
    if request.method == "GET":
        try:
            uploads_dir = str(settings.BASE_DIR) + "/media/raw_data"
            upload_list_file = os.listdir(uploads_dir)
            upload_list_file.sort(reverse=True)
            file = upload_list_file[0]
            file_path = settings.MEDIA_ROOT + "/modified_data/" + str(file)
            file_path_kpi=settings.MEDIA_ROOT + "/KPI/" + str(file)

        except KeyError:
            response_data = {"error": "No file was found in the request"}
            return JsonResponse(response_data, status=400)
    total_file_name = os.path.basename(file_path).split("_", 1)[1]
    file_name = total_file_name.split(".")[0]

    column_name = request.GET.get("column_name")

    dataframe = process_csv(file_path)
    with open(file_path, "w") as f:
        f.truncate(0)
    try:
        cleaned_data = kilo_to_int(dataframe, column_name)
        #Put the dataframe in the csv file that exists in the file path indicated
        cleaned_data.to_csv(file_path, index=False)
        cleaned_data.to_csv(file_path_kpi, index=False)

        cleaned_content = csv_content(file_path)
    except Exception as e:
        response_data = {"error": f"Error cleaning data: {str(e)}"}
        return JsonResponse(response_data, status=500)

    response_data = {
        "dataframe": "sucessfully cleaned",
        "cleaned_data": cleaned_content,
    }
    return JsonResponse(response_data, status=200)

@csrf_exempt
def csv_content_API(request):
    try:
        uploads_dir = str(settings.BASE_DIR) + "/media/modified_data"
        upload_list_file = os.listdir(uploads_dir)
        upload_list_file.sort(reverse=True)
        file = upload_list_file[0]
        file_path = settings.MEDIA_ROOT + "/modified_data/" + str(file)
        content = csv_content(file_path)
        response_data = {"content": content}
        return JsonResponse(response_data, status=200)

    except KeyError:
        response_data = {"error": "No file was found in the request"}
        return JsonResponse(response_data, status=400)

@csrf_exempt
def reactions_kpi_API(request):
    if request.method == "GET":
        try:
            uploads_dir = str(settings.BASE_DIR) + "/media/modified_data"
            upload_list_file = os.listdir(uploads_dir)
            upload_list_file.sort(reverse=True)
            file = upload_list_file[0]
            file_path = settings.MEDIA_ROOT + "/modified_data/" + str(file)
        except KeyError:
            response_data = {"error": "No file was found in the request"}
            return JsonResponse(response_data, status=400)
    dataframe = process_csv(file_path)
    try:
        total_reaction = total_reaction_kpi(dataframe)
    except Exception as e:
        response_data = {"error": f"Error getting KPI: {str(e)}"}
        return JsonResponse(response_data, status=500)

    response_data = {"KPI": total_reaction}
    return JsonResponse(response_data, status=200)

@csrf_exempt
def comments_kpi_API(request):
    if request.method == "GET":
        try:
            uploads_dir = str(settings.BASE_DIR) + "/media/modified_data"
            upload_list_file = os.listdir(uploads_dir)
            upload_list_file.sort(reverse=True)
            file = upload_list_file[0]
            file_path = settings.MEDIA_ROOT + "/modified_data/" + str(file)
        except KeyError:
            response_data = {"error": "No file was found in the request"}
            return JsonResponse(response_data, status=400)
    dataframe = process_csv(file_path)
    try:
        total_comments = total_comments_kpi(dataframe)
    except Exception as e:
        response_data = {"error": f"Error getting KPI: {str(e)}"}
        return JsonResponse(response_data, status=500)

    response_data = {"KPI": total_comments}
    return JsonResponse(response_data, status=200)

@csrf_exempt
def shares_kpi_API(request):
    if request.method == "GET":
        try:
            uploads_dir = str(settings.BASE_DIR) + "/media/raw_data"
            upload_list_file = os.listdir(uploads_dir)
            upload_list_file.sort(reverse=True)
            file = upload_list_file[0]
            file_path = settings.MEDIA_ROOT + "/modified_data/" + str(file)
        except KeyError:
            response_data = {"error": "No file was found in the request"}
            return JsonResponse(response_data, status=400)
    dataframe = process_csv(file_path)
    try:
        total_shares = total_shares_kpi(dataframe)
    except Exception as e:
        response_data = {"error": f"Error getting KPI: {str(e)}"}
        return JsonResponse(response_data, status=500)

    response_data = {"KPI": total_shares}
    return JsonResponse(response_data, status=200)

@csrf_exempt
def posts_number_API(request):
    if request.method == "GET":
        try:
            uploads_dir = str(settings.BASE_DIR) + "/media/raw_data"
            upload_list_file = os.listdir(uploads_dir)
            upload_list_file.sort(reverse=True)
            file = upload_list_file[0]
            file_path = settings.MEDIA_ROOT + "/modified_data/" + str(file)
        except KeyError:
            response_data = {"error": "No file was found in the request"}
            return JsonResponse(response_data, status=400)
    dataframe = process_csv(file_path)
    try:
        posts_number = len(dataframe)
    except Exception as e:
        response_data = {"error": f"Error getting KPI: {str(e)}"}
        return JsonResponse(response_data, status=500)

    response_data = {"number": posts_number}
    return JsonResponse(response_data, status=200)

@csrf_exempt
def reaction_analysis_API(request):
    if request.method == "GET":
        try:
            uploads_dir = str(settings.BASE_DIR) + "/media/modified_data"
            upload_list_file = os.listdir(uploads_dir)
            upload_list_file.sort(reverse=True)
            file = upload_list_file[0]
            file_path = settings.MEDIA_ROOT + "/KPI/" + str(file)
        except KeyError:
            response_data = {"error": "No file was found in the request"}
            return JsonResponse(response_data, status=400)
    dataframe = process_csv(file_path)

    # with open(file_path, 'w') as f:
    #     f.truncate(0)
    try:
        print("yes")
        new_data = reaction_analysis(dataframe)
        new_data.to_csv(file_path, index=False)
        content = csv_content(file_path)
    except Exception as e:
        response_data = {"error": f"Error getting KPI: {str(e)}"}
        return JsonResponse(response_data, status=500)

    response_data = {"message": "KPI sucessfully calculated", "cleaned_data": content}
    return JsonResponse(response_data, status=200)

@csrf_exempt
def get_posts_number(request):
    if request.method == "GET":
        followers = request.GET.get('followers')
        
        try:
            uploads_dir = str(settings.BASE_DIR) + "/media/modified_data"
            upload_list_file = os.listdir(uploads_dir)
            upload_list_file.sort(reverse=True)
            file = upload_list_file[0]
            file_path = settings.MEDIA_ROOT + "/modified_data/" + str(file)
        except KeyError:
            response_data =  {"error": "No file was found in the request"}
            return JsonResponse(response_data, status=400)

    
    dataframe = process_csv(file_path)
    posts_number = len(dataframe)
    response_data = {"number": posts_number}
    return JsonResponse(response_data, status=200)    
