from api.models import Competition
from api.serializers import CompetitionSerializer, MemberSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.http import Http404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.pagination import LimitOffsetPagination
# from rest_framework.pagination import PageNumberPagination
from api.filters import CompetitionFilter, MemberFilter


class CompetitionsAPIView(generics.ListCreateAPIView):
    serializer_class = CompetitionSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    # pagination_class = LimitOffsetPagination
    # filterset_fields = ('name',)
    filter_class = CompetitionFilter
    search_fields = ('name',)
    ordering_fields = ('name',)
    ordering = ('name',)

    def get_queryset(self):
        return Competition.objects.for_user(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class CompetitionAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CompetitionSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Competition.objects.for_user(user=self.request.user)


class CompetitionMembersAPIView(generics.ListCreateAPIView):
    serializer_class = MemberSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filter_class = MemberFilter
    # pagination_class = LimitOffsetPagination
    search_fields = ('name', 'status', 'created_at')
    ordering_fields = ('name', 'status', 'created_at')
    ordering = ('created_at',)

    def get_queryset(self):
        try:
            competition = Competition.objects.for_user(user=self.request.user).get(id=self.kwargs['pk'])
        except Competition.DoesNotExist:
            raise Http404
        return competition.member_set.all()

    def perform_create(self, serializer):
        try:
            competition = Competition.objects.get(id=self.kwargs['pk'])
        except Competition.DoesNotExist:
            raise Http404
        serializer.save(competition=competition)


# class TaskListTaskAPIView(generics.RetrieveUpdateDestroyAPIView):
#     serializer_class = TaskSerializer
#     permission_classes = (IsAuthenticated,)

#     def get_queryset(self):
#         print(self.kwargs)
#         return Task.objects.for_user(user=self.request.user, pk1=self.kwargs['pk'])
    
#     def get_serializer_class(self):
#         return TaskSerializer
# TODO add  permissions(filter), some filter, search, ordering, pagination
