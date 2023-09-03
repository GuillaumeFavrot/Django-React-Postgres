from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

class Command(BaseCommand):

    def handle(self, *args, **options):
        if User.objects.count() == 0:
            admin = User.objects.create_superuser(email='', username='admin', password='admin')
            admin.is_active = True
            admin.is_admin = True
            admin.save()
            print('admin account created')
        else:
            print('admin accounts can only be initialized if no accounts exist')