import pandas as pd


def change_column(dataframe, old_column, new_column):
    """
    Renames a column in the given DataFrame.

    Args:
        data_frame (pandas.DataFrame): The DataFrame object.
        current_column_name (str): The name of the column to be renamed.
        new_column_name (str): The new name for the column.

    Returns:
        pandas.DataFrame: The DataFrame with the renamed column.
    """
    
    if old_column in dataframe.keys():
        dataframe.rename(columns={old_column: new_column}, inplace=True)
        print("The column name has been successfully changed.")
    return dataframe
    #     else:
    #         print("The column you're looking for doesn't exist.")
    # except Exception as e:
    #     print("An error occurred while changing the column name:", str(e))


def kilo_to_int(dataframe, column_name):
    """
    Converts kilo values in the 'class' column of the given DataFrame to integers.

    Args:
        data_frame (pandas.DataFrame): The DataFrame object.
        column_name(str): The name of the column to change the column value

    Returns:
        pandas.DataFrame: The DataFrame with kilo values converted to integers.
    """

    col = dataframe[column_name]

    for value in col:
        old_value = value
        last_character = value[-1].upper()

        if last_character == "K":
            new_value = int(float(value[:-1]) * 1000)
        else:
            new_value = old_value

        dataframe[column_name].replace({value: new_value}, inplace=True)

    return dataframe


def change_type(dataframe, column_name):
    """
    Converts kilo values in the 'class' column of the given DataFrame to integers.

    Args:
        data_frame (pandas.DataFrame): The DataFrame object.
        column_name(str): The name of the column to change the column value

    Returns:
        pandas.DataFrame: The DataFrame with kilo values converted to integers.
    """

    col = dataframe[column_name]

    for value in col:
        old_value = value
        last_character = value[-1].upper()

        if last_character == "K":
            new_value = int(float(value[:-1]) * 1000)
        else:
            new_value = old_value

        dataframe[column_name].replace({value: new_value}, inplace=True)

    return dataframe


def get_type(dataframe,column_name):
    column_type=dataframe[column_name].dtypes 
    print(column_type)
    return column_type 


def change_type(dataframe,column_name,new_type):
    if(new_type=='Integer'):
        dataframe[column_name] = (dataframe[column_name]).astype(int)
    elif(new_type=='Float'):
        dataframe[column_name] = dataframe[column_name].astype(float)
    else :
        print('Error')

    return dataframe