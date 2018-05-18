import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class RestProvider {

	private apiUrl: string = 'http://localhost:8888/savebarkley-backend/backend/index.php/site/';

	private headers = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
		})
	};

	constructor(public http: HttpClient) {
		console.log('Hello RestProvider Provider');
	}

	public getUrlApi() {
		return this.apiUrl;
	}

	public getHeaders() {
		return this.headers;
	}

}
