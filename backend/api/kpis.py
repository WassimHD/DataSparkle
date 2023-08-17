import pandas as pd


def total_reaction_kpi(dataframe):
    total_reaction=0
    dataframe["total_reactions"]=dataframe["total_reactions"].astype(int)
    for i in range(len(dataframe)):
        total_reaction=total_reaction+dataframe["total_reactions"][i]
    return str(total_reaction)

def total_comments_kpi(dataframe):
    total_comments=0
    dataframe["total_comments"]=dataframe["total_comments"].astype(int)
    for i in range(len(dataframe)):
        total_comments=total_comments+dataframe["total_comments"][i]
    return str(total_comments)

def total_shares_kpi(dataframe):
    dataframe["total_shares"]=dataframe["total_shares"].astype(int)
    total_shares=0
    for i in range(len(dataframe)):
        total_shares=total_shares+dataframe["total_shares"][i]
    return str(total_shares)

def reaction_analysis(dataframe):
    """
    Add a column to a dataset.

    Args:
        dataset (pandas.DataFrame): The dataset to which the column should be added.
        column_name (str): The name of the new column.

    Returns:
        pandas.DataFrame: The updated dataset with the new column.
    """
# post_id,post_text,total_reactions,total_comments,total_shares,total_love_react,total_like_react,total_care_react,total_angry_react,total_sad_react,total_haha_react,total_wow_react

    column_values = []
    new_dataframe=dataframe[["post_id","total_reactions","total_love_react","total_like_react","total_haha_react","total_angry_react","total_care_react","total_sad_react","total_wow_react"]]
    for i in range(len(new_dataframe)):
        value=((int(new_dataframe["total_love_react"][i]))+(int(new_dataframe["total_care_react"][i]))+(int(new_dataframe["total_like_react"][i]))+(int(new_dataframe["total_haha_react"][i]))+(int(new_dataframe["total_wow_react"][i])))/(int(new_dataframe["total_reactions"][i]))*100
        column_values.append(value)

    new_dataframe["Reactions analysis"] = column_values

    return new_dataframe