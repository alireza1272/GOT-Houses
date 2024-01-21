import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CharactersService {
  constructor(private httpClient: HttpClient) {
  }

  getCharactersList() {
    return this.httpClient.get(environment.apiBaseUrl + '/characters');
  }

  getCharacterDetail(slug: string) {
    return this.httpClient.get(environment.apiBaseUrl + '/character/' + slug);
  }

  generateRandomQuotes(slug: string, count: number) {
    return this.httpClient.get(environment.apiBaseUrl + '/author/' + slug + '/' + count);
  }
}
