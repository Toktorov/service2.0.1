# Generated by Django 3.2.7 on 2022-04-10 13:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_contact_media'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='user',
            options={'verbose_name': 'Пользователь', 'verbose_name_plural': 'Пользователи'},
        ),
    ]
