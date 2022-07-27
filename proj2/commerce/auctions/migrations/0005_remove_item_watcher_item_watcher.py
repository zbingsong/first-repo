# Generated by Django 4.0.6 on 2022-07-27 02:20

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auctions', '0004_alter_bidding_current_bid_alter_item_price_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='item',
            name='watcher',
        ),
        migrations.AddField(
            model_name='item',
            name='watcher',
            field=models.ManyToManyField(blank=True, null=True, related_name='watching', to=settings.AUTH_USER_MODEL),
        ),
    ]
