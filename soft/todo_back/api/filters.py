from django_filters import rest_framework as filters
from api.models import Competition, Member


class CompetitionFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Competition
        fields = ('name',)


class MemberFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')
    status = filters.CharFilter(lookup_expr='exact')

    class Meta:
        model = Member
        fields = ('name', 'status',)

