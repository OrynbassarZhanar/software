# Generated by Django 2.2.1 on 2019-05-07 00:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='created_at',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='task',
            name='due_on',
            field=models.DateField(),
        ),
    ]