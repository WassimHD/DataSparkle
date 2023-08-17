import csv
import os
import chardet
import tempfile
import pandas as pd
from django.http import HttpResponse
from django.http import JsonResponse


def process_csv(file_path):
    # Open the file in binary mode by creating a temporary file
    try:
        with open(file_path, "rb") as csv_file:
            with tempfile.NamedTemporaryFile(delete=False) as temp_file:
                for chunk in iter(lambda: csv_file.read(1024), b""):
                    temp_file.write(chunk)
    except Exception as e:
        response_data = {"error": f"temporary file cannot be created :   {str(e)}"}
        return JsonResponse(response_data, status=400)

    # detect the encoding format
    try:
        with open(temp_file.name, "rb") as f:
            result = chardet.detect(f.read())
    except Exception as e:
        response_data = {"error": f"encoding format is not available :   {str(e)}"}
        return JsonResponse(response_data, status=400)
    # detect the delimiter
    try:
        sniffer = csv.Sniffer()
        with open(temp_file.name, "r", newline="", encoding=result["encoding"]) as file:
            sample = file.read(1024)
            dialect = sniffer.sniff(sample)
            delimiter = dialect.delimiter
    except Exception as e:
        response_data = {"error": f"Error detecting delimiter: {str(e)}"}
        return JsonResponse(response_data, status=400)
    input_data = []
    with open(temp_file.name, encoding=result["encoding"]) as f:
        reader = csv.reader(f, dialect)
        for row in reader:
            input_data.append(row)
    os.unlink(temp_file.name)
    # Convert the input data to a DataFrame
    headers=input_data[0]
    rows=input_data[1:]
    dataframe = pd.DataFrame(input_data[1:], columns=input_data[0])
    return dataframe
    