from api.models import Competition, Member
from api.serializers import CompetitionSerializer, MemberSerializer
from rest_framework.permissions import IsAuthenticated
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response

class CompetitionMemberAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    
    def get_member(self, request, pk1, pk2):
        try:
            member = Competition.objects.for_user(user=request.user).get(id=pk1).member_set.get(id=pk2)
        except:
            raise Http404
        return member
    
    def get(self, request, pk1, pk2):
        member = self.get_member(request, pk1, pk2)
        serializer = MemberSerializer(member)
        return Response(serializer.data)
    
    def put(self, request, pk1, pk2):
        member = self.get_member(request, pk1, pk2)
        try:
            request.data.pop('competition')
        except:
            pass    
        serializer = MemberSerializer(instance=member, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, pk1, pk2):
        member = self.get_member(request, pk1, pk2)
        member.delete()
        return Response({"delete_status": "successful"})