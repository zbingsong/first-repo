# Generated by Django 4.1 on 2022-08-19 06:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("network", "0001_initial"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="comment",
            options={"ordering": ["-timestamp"]},
        ),
        migrations.AlterModelOptions(
            name="post",
            options={"ordering": ["-timestamp"]},
        ),
    ]
