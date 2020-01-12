import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class RestProvider {

	private apiUrl: string = '';

	private headersJson = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
		})
	};

	private headersUrlEncoded = {
		headers: new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;',
		})
	};

	constructor(public http: HttpClient) {
		console.log('Hello RestProvider Provider');
	}

	public getUrlApi() {
		return this.apiUrl;
	}

	public getHeadersJson() {
		return this.headersJson;
	}

	public getHeadersUrlEncoded() {
		return this.headersUrlEncoded;
	}

}
