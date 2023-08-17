import pandas as pd
from django.http import JsonResponse

def remove_duplications(dataframe, column_name):
    """
    Removes duplicates from a specific column in the given DataFrame.

    Args:
        data_frame (pandas.DataFrame): The DataFrame object.
        column_name (str): The name of the column to remove duplicates from.

    Returns:
        pandas.DataFrame: The DataFrame with duplicates removed.
    """
  
    dataframe.drop_duplicates(subset=column_name, keep="first", inplace=True)
    print("Duplicates have been successfully removed.")

    return dataframe

def delete_column(dataframe, column_name):
    """
    Deletes a column from the given DataFrame.

    Args:
        data_frame (pandas.DataFrame): The DataFrame object.
        column_name (str): The name of the column to delete.

    Returns:
        pandas.DataFrame: The DataFrame with the column deleted.
    """
    try:
        if column_name in dataframe.columns:
            dataframe.drop(column_name, axis=1, inplace=True)
            print("Column successfully deleted.")
        else:
            print("The column you're looking for doesn't exist.")
    except Exception as e:
        print("An error occurred while deleting the column:", str(e))
    return dataframe

def replace_Nan_Values(dataframe, column_name, new_value):
    """
    Replaces NaN values in a specific column of the given DataFrame with a new value.

    Args:
        data_frame (pandas.DataFrame): The DataFrame object.
        column_name (str): The name of the column to replace NaN values in.
        new_value: The value to replace NaN with.

    Returns:
        pandas.DataFrame: The DataFrame with NaN values replaced.
    """
    try:
        dataframe[column_name].replace("", new_value, inplace=True)
        print("NaN values successfully replaced.")
    except Exception as e:
        print("An error occurred while replacing NaN values:", str(e))

    return dataframe


