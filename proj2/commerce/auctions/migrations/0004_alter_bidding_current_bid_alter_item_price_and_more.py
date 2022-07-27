# Generated by Django 4.0.6 on 2022-07-26 21:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auctions', '0003_item_price_alter_item_buyer_alter_item_image_url_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bidding',
            name='current_bid',
            field=models.DecimalField(decimal_places=2, default=1, max_digits=10),
        ),
        migrations.AlterField(
            model_name='item',
            name='price',
            field=models.DecimalField(decimal_places=2, default=1, max_digits=10),
        ),
        migrations.AlterField(
            model_name='item',
            name='starting_bid',
            field=models.DecimalField(decimal_places=2, default=1, max_digits=10),
        ),
    ]