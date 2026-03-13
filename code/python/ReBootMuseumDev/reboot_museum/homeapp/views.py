from django.shortcuts import render
from .models import *

def home(request):
    rooms = Room.objects.all().values()
    exhibits = Exhibit.objects.all().values()
    categories = Category.objects.all().values()

    context = {
        'rooms': rooms,
        'exhibits': exhibits,
        'categories': categories,
    }

    return render(request, 'pages/home/index.html', context=context)