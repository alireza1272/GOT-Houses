import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class HousesService {
  constructor(private httpClient: HttpClient) {
  }

  getHousesList() {
    return this.httpClient.get(environment.apiBaseUrl + '/houses');
  }

  getHouseDetail (slug: string){
    return this.httpClient.get(environment.apiBaseUrl + '/house/' + slug);
  }
}
