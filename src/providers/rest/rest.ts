import {Injectable} from '@angular/core';
import {HTTP} from "@ionic-native/http";

@Injectable()
export class RestProvider {

	private url: string = 'http://localhost:8888/savebarkley-backend/backend/index.php/site/';

	constructor(public http: HTTP) {
	}

	public getUrl() {
		return this.url;
	}

}
