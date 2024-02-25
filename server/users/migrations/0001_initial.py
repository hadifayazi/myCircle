# Generated by Django 5.0.2 on 2024-02-25 16:56

import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('username', models.CharField(max_length=255, unique=True, verbose_name='username')),
                ('name', models.CharField(max_length=50, verbose_name='name')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='email')),
                ('bio', models.TextField(blank=True, max_length=500, verbose_name='bio')),
                ('avatar', models.ImageField(default='user.png', upload_to='', verbose_name='avatar')),
                ('cover_image', models.ImageField(default='cover.png', upload_to='', verbose_name='cover image')),
                ('is_staff', models.BooleanField(default=False, verbose_name='is_status')),
                ('is_superuser', models.BooleanField(default=False, verbose_name='is_superuser')),
                ('is_active', models.BooleanField(default=True, verbose_name='Active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='Date Joined')),
                ('following', models.ManyToManyField(blank=True, related_name='followed', to=settings.AUTH_USER_MODEL)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'User',
                'verbose_name_plural': 'Users',
                'ordering': ('date_joined',),
            },
        ),
    ]