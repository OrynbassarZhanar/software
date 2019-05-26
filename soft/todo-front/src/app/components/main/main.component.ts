import { Component, OnInit } from '@angular/core';
import {Competition, Member} from '../../models/models';
import {ProviderService} from '../../services/provider.service';
import * as moment from 'moment';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public competitions: Competition[] = [];
  public members: Member[] = [];
  public targetCompetition: Competition;
  public name = '';
  public username = '';
  public password = '';
  public logged = false;
  public memberName = '';
  public memberStatus = '';
  public sorting = '';
  public sortMembers = '';
  public searchCompetition = '';
  public searchMember = '';
  public filterValue = '';
  public filterName = '';
  constructor(private provider: ProviderService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.logged = true;
    }
    if (this.logged) {
      this.provider.getCompetitions().then(res => {
        this.competitions = res;
      });
    }
  }

  formatDate(date: Date) {
    return moment(date).format('YYYY-MM-DD');
  }

  getMemberOfCompetition(competition: Competition) {
    this.targetCompetition = competition;
    this.provider.getMembers(competition.id).then(res => {this.members = res; });
  }

  createCompetition() {
      if (this.name !== '') {
        this.provider.createCompetition(this.name).then(res => {
          this.name = '';
          this.competitions.push(res);
        });
      }
  }

  updateCompetition(competition: Competition) {
    this.provider.updateCompetition(competition).then(res => {});
  }

  deleteCompetition(competition: Competition) {
    this.provider.deleteCompetition(competition).then(res => {
      this.provider.getCompetitions().then(r => {
        this.competitions = r;
      });
    });
  }

  updateMember(member: Member) {
    this.provider.updateMember(member).then(res => {});
  }

  deletemember(member: Member) {
    this.provider.deleteMember(member).then(res => {
      this.provider.getMembers(member.competition.id).then(r => {
        this.members = r;
      });
    });
  }

  login() {
    if (this.username !== '' && this.password !== '') {
      console.log(this.username);
      console.log(this.password);
      this.provider.auth(this.username, this.password).then(res => {
        console.log(res.token);
        localStorage.setItem('token', res.token);
        this.logged = true;

        this.provider.getCompetitions().then(r => {
          this.competitions = r;
        });

      });
    }
  }

  logout() {
    this.provider.logout().then(res => {
      localStorage.clear();
      this.logged = false;
    });
  }
  createMember() {
      const createdAt = Date.now();
      const dueOn = Date.now() + (1000 * 60 * 60 * 24);
      if (this.targetCompetition !== undefined) {
        this.provider.createMember(this.memberName, this.memberStatus, createdAt, dueOn, this.targetCompetition).then(res => {
          this.memberName = '';
          this.memberStatus = '';
          this.provider.getMembers(this.targetCompetition.id).then( r => {
            this.members = r;
          });
        });
      } else {
        alert('Click to the competition where you would like to add members!');
      }

  }

  sort() {
      this.provider.getCompetitions(this.sorting, this.searchCompetition).then( res => {
        this.competitions = res;
      });
  }

  sortingOfMembers() {
    if (this.targetCompetition === undefined) {
      alert('Click to the competition to see members');
    } else {
        this.provider.getMembers(this.targetCompetition.id, this.sortMembers, this.searchMember, this.filterName + '=' + this.filterValue)
          .then(res => {
              this.members = res;
          });
    }
  }

}
