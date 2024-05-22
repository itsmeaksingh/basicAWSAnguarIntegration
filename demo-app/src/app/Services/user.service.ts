import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../_models/User';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private baseURL: string = environment.baseURL;
  public userListSubject$ = new BehaviorSubject<User[] | any>(null);

  // new way angular 17
  private _http = inject(HttpClient);
  constructor() {
  }

  public getUsers(): Observable<User | any> {
    return this._http.get<User[]>(this.baseURL + '/getUsers');
  }

  public updateUser(data: User): Observable<User | any> {
    return this._http.put<User>(this.baseURL + '/updateUser', data);
  }

  public deleteUser(id: string): Observable<User | any> {
    return this._http.delete<User[] | null>(this.baseURL + '/deleteUser', {
      params: new HttpParams().set('id', id),
    });
  }

  public createUser(data: User | any): Observable<User | any> {
    return this._http.post<User[] | null>(this.baseURL + '/createUser', data);
  }
}
