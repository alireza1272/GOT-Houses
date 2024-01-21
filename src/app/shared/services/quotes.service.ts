import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class QuotesService {
  constructor(private httpClient: HttpClient) {
  }

  getRandomQuotes (count: number){
    return this.httpClient.get(environment.apiBaseUrl + '/random/' + count);
  }
}
