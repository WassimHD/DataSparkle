from django.urls import path
from .views import *
import pymongo
import os
from datetime import datetime
from .csv_content import *
from django.conf import settings

urlpatterns = [
    path("delete_columns/", delete_column_API),
    path("remove_duplications/", remove_duplications_API),
    path("replace_NaN_values/", replace_NaN_values_API),
    path("change_column_name/", Change_column_API),
    path("change_kilo_to_int/", Change_kilo_to_int_API),
    path("csv_content/", csv_content_API),
    path("reactions_kpi/", reactions_kpi_API),
    path("comments_kpi/",comments_kpi_API),
    path("shares_kpi/",shares_kpi_API),
    path("posts_number/",posts_number_API),
    path("reaction_analysis/",reaction_analysis_API),
    path("get_type/", get_type_api),
    path("change_type/", change_type_api),
    path("get_number/", get_posts_number),

   ]
