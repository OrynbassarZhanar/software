from django.urls import path
from api import views

urlpatterns = [
    path('login/', views.login),
    path('logout/', views.logout),
    path('competitions/', views.CompetitionsAPIView.as_view()),
    path('competitions/<int:pk>/', views.CompetitionAPIView.as_view()),
    path('competitions/<int:pk>/members/', views.CompetitionMembersAPIView.as_view()),
    path('competitions/<int:pk1>/members/<int:pk2>/', views.CompetitionMemberAPIView.as_view())
]