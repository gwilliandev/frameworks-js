import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Carte } from '../models/carte';

@Injectable({
	providedIn: 'root',
})
export class ApiService {
	private baseUrl = 'http://localhost:3333';

	constructor(private http: HttpClient) {}

  public async getCarte() {
    const request = this.http.get(this.baseUrl + '/carte');
		return (await firstValueFrom(request)) as Promise<Carte[]>;
  }
}
