from django.db import models
from django.contrib.auth.models import User


class CompetitionManager(models.Manager):
    def for_user(self, user):
        return self.filter(created_by=user)


class Competition(models.Model):
    name = models.CharField(max_length=200)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    discription = models.CharField(max_length=200)
    objects = CompetitionManager()

    class Meta:
        verbose_name = 'Competition'
        verbose_name_plural = 'Competitions'


class MemberManager(models.Manager):
    def for_user(self, pk1, pk2, user):
        return Competition.objects.for_user(user=user).get(id=pk1).member_set.get(id=pk2)
        

class Member(models.Model):
    name = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now=False, editable=True)
    due_on = models.DateTimeField(auto_now=False, editable=True)
    status = models.CharField(max_length=200)
    competition = models.ForeignKey(Competition, on_delete=models.CASCADE)
    objects = MemberManager()

    class Meta:
        verbose_name = 'Member'
        verbose_name_plural = 'Members'
