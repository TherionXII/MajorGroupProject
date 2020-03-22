import { Injectable } from '@angular/core';
import {IGroup} from '../Interfaces/IGroup';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IGroupCollaborationRequest} from '../../Utility/Interfaces/IGroupCollaborationRequest';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(private httpClient: HttpClient) { }

  public createGroup(group: IGroup, adminUsername: string): Observable<number> {
    return this.httpClient.post<number>(`http://localhost:8080/api/groups/${adminUsername}/createGroup`, group);
  }

  public getUserGroups(username: string): Observable<Array<IGroup>>{
    return this.httpClient.get<Array<IGroup>>(`http://localhost:8080/api/groups/${username}/getGroups`);
  }

  public getGroupById(id: string): Observable<IGroup> {
    return this.httpClient.get<IGroup>(`http://localhost:8080/api/groups/${id}/getGroup`);
  }

  public getGroupInvitationsForUser(username: string): Observable<Array<IGroupCollaborationRequest>> {
    return this.httpClient.get<Array<IGroupCollaborationRequest>>(`http://localhost:8080/api/groupRequests/${username}/getGroupInvitationsForUser`);
  }

  public respondToInvitation(invitation: IGroupCollaborationRequest): Observable<number> {
    return this.httpClient.post<number>('http://localhost:8080/api/groupRequests/respond', invitation);
  }

  public getGroupInvitationsForGroup(groupId: string): Observable<Array<IGroupCollaborationRequest>> {
    return this.httpClient.get<Array<IGroupCollaborationRequest>>(`http://localhost:8080/api/groupRequests/${groupId}/getGroupInvitationsForGroup`);
  }
}
