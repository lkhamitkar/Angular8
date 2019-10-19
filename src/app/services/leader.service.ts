import { Injectable } from '@angular/core';
import { LEADERS } from '../shared/leaders';
import { Leader } from '../shared/leader';
import { from } from 'rxjs';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { map , catchError} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'Leader')
    .pipe(catchError(this.processHTTPMsgService.handleError));
    
  }

  getLeader(id: string): Observable<Leader> {
    return this.http.get<Leader>(baseURL + 'Leader/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader[]>(baseURL + 'leader?featured=True').pipe(map(Leader => Leader[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));

  }

  
}
