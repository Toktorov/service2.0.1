# Generated by Django 4.0.4 on 2022-10-31 15:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('orders', '0013_alter_order_category_alter_order_location_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='acceptorder',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='accept_order_user', to=settings.AUTH_USER_MODEL),
        ),
    ]
