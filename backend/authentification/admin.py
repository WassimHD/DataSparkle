
from django.contrib import admin
from django.contrib.auth.models import User
from django.urls import reverse
from django.utils.html import format_html

class CustomUserAdmin(admin.ModelAdmin):
    # Override the change_view method
    def change_view(self, request, object_id, form_url='', extra_context=None):
        extra_context = extra_context or {}

        # Disable the Add, Edit, Save and continue editing, and History buttons
        extra_context['show_save'] = False
        extra_context['show_save_as_new'] = False
        extra_context['show_save_and_add_another'] = False
        extra_context['show_save_and_continue'] = False
        extra_context['show_history'] = False

        # Generate the Delete button URL
        delete_url = reverse('admin:auth_user_delete', args=(object_id,))

        # Add the Delete button to the extra_context
        extra_context['delete_url'] = format_html(
            '<a href="{}" class="deletelink" style="color: red;">Delete</a>', delete_url)

        return super().change_view(request, object_id, form_url, extra_context=extra_context)

    # Override the history_view method
    def history_view(self, request, object_id, extra_context=None):
        return self.change_view(request, object_id, extra_context=extra_context)


# Register the custom admin class with the User model
admin.site.unregister(User)  # Unregister the default User admin
admin.site.register(User, CustomUserAdmin)  # Register the custom User admin
