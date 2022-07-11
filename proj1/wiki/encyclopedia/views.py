from wsgiref.util import request_uri
from django import forms
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from . import util

class NewEntry(forms.Form):
    new_entry_title = forms.CharField(label='New entry')
    new_entry = forms.CharField(label='Content')

def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })

def create(request):
    if request.method == 'POST':
        form = NewEntry(request.POST)
        if form.is_valid():
            new_entry_title = form.cleaned_data['new_entry_title']
            if new_entry_title in util.list_entries():
                return HttpResponse('Entry already exists!')
            else:
                new_entry = form.cleaned_data['new_entry']
                util.save_entry(new_entry_title, new_entry)
                return HttpResponseRedirect(reverse('index'))
    return render(request, 'encyclopedia/create.html', {
        'form': NewEntry()
    })