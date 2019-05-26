import { EventEmitter, Injectable } from '@angular/core';
import {Competition, Member, Token} from '../models/models';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MainService} from './main.service';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {
  constructor(http: HttpClient) {
    super(http);
  }

  formatDate(date: Date) {
    return moment(date).format('YYYY-MM-DD');
  }

  getCompetitions(sorting = '', search = ''): Promise<Competition[]> {
    if ( sorting === '') {
      return this.get('http://127.0.0.1:8000/api/competitions/?' + 'search=' + search,  {});
    } else {
      return this.get('http://127.0.0.1:8000/api/competitions/?' + sorting + '&search=' + search,  {});
    }
  }
  getMembers(id: number, sortBy = '', search = '', filterexp = '') {
    if ( sortBy === '') {
      return this.get(`http://localhost:8000/api/competitions/${id}/members/?` + 'search=' + search + '&' + filterexp, {});
    } else {
      return this.get(`http://localhost:8000/api/competitions/${id}/members/?` + 'ordering=' + sortBy + '&search='  + search  + '&' + filterexp, {});
    }
  }
  createCompetition(namE: string): Promise<Competition> {
    return this.post('http://localhost:8000/api/competitions/', {name: namE});
  }
  updateCompetition(competition: Competition) {
    return this.put('http://localhost:8000/api/competitions/' + competition.id + '/', {name : competition.name});
  }

  deleteCompetition(competition: Competition) {
    return this.delet('http://localhost:8000/api/competitions/' + competition.id + '/', {});
  }

  updateMember(member: Member) {
    return this.put('http://localhost:8000/api/competitions/' + member.competition.id + '/tasks/' + member.id + '/', {
      name: member.name,
      task_list: member.competition,
      status: member.status,
      created_at: member.created_at,
      due_on: member.due_on
    });
  }

  createMember(namE: string, statuS: string, createdAt, dueOn, competition: Competition) {
      return this.post('http://localhost:8000/api/competitions/' + competition.id + '/members/', {
        name: namE,
        status: statuS,
        created_at: this.formatDate(createdAt) + 'T' + '00:00:00',
        due_on: this.formatDate(dueOn) + 'T' + '00:00:00'
      });
  }

  deleteMember(member: Member) {
    return this.delet('http://localhost:8000/api/competitions/' + member.competition.id + '/members/' + member.id, {});
  }

  auth(usernamE: string, passworD: string): Promise<Token> {
      return this.post('http://localhost:8000/api/login/', {
        username: usernamE,
        password: passworD
      });
  }

  logout(): Promise<any> {
    return this.post('http://localhost:8000/api/logout/', {
    });
  }

}
