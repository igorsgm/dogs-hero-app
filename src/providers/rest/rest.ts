import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class RestProvider {

	private url: string = 'http://localhost:8888/savebarkley-backend/backend/index.php/site/';
	private headers = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
		})
	};

	constructor(public http: HttpClient) {
		console.log('Hello RestProvider Provider');
	}

	public getUrl() {
		return this.url;
	}

	public getHeaders() {
		return this.headers;
	}

}
