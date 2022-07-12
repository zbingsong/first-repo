from wsgiref.util import request_uri
from django import forms
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
import markdown2
from . import util
import random

class NewEntry(forms.Form):
    new_entry_title = forms.CharField(label='New Entry Title')
    new_entry = forms.CharField(label='Content', widget=forms.Textarea)

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
                return HttpResponseRedirect(reverse('entry', args=[new_entry_title]))
    return render(request, 'encyclopedia/create.html', {
        'form': NewEntry()
    })

def edit(request, entry_title):
    if request.method == 'POST':
        form = NewEntry(entry_title, request.POST)
        if form.is_valid():
            new_entry = form.cleaned_data['new_entry']
            util.save_entry(entry_title, new_entry)
            return HttpResponseRedirect(reverse('entry', args=[entry_title]))
    return render(request, 'encyclopedia/edit.html', {
        'form': NewEntry(entry_title, util.get_entry(entry_title))
    })

def entry(request, entry_title):
    if entry_title in util.list_entries():
        return render(request, 'encyclopedia/entry.html', {
            'entry_title': entry_title,
            'entry_content': markdown2.markdown(util.get_entry(entry_title))
        })
    else:
        return HttpResponse('Requested entry not found.')

def random_page(request):
    entry = random.choice(util.list_entries())
    return HttpResponseRedirect(reverse('entry', args=[entry]))

def search_entry(request):
    query = request.GET.get('q')
    entries = util.list_entries()
    if query in entries:
        return HttpResponseRedirect(reverse('entry', args=[query]))
    else:
        matching_entries = []
        for entry in entries:
            if query in entry:
                matching_entries.append(entry)
        return render(request, 'encyclopedia/search.html', {
            'matching_entries': matching_entries
        })
