import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RestProvider} from "../rest/rest";

@Injectable()
export class MissionProvider {

	/**
	 * Backend Controller name
	 * @type {string}
	 */
	private controllerName: string = 'mission';

	/**
	 * MissionProvider constructor
	 *
	 * @param {RestProvider} restProvider
	 * @param {HttpClient} http
	 */
	constructor(private restProvider: RestProvider, private http: HttpClient) {
		console.log('Hello MissionProvider Provider');
	}

	/**
	 * Retrieves the list of pending missions by user
	 *
	 * @param {int|string} idUser
	 * @returns {Promise<Object>}
	 */
	getPendingMissions(idUser) {
		let body = {hero_id: idUser},
			url = this.restProvider.getUrlApi() + '/' + this.controllerName + '/getPendingMissions';

		return this.http.post(url, body, this.restProvider.getHeadersJson()).toPromise();
	}

	/**
	 * Retrieves a list of completed missions by user
	 *
	 * @param {int|string} idUser
	 * @returns {Promise<Object>}
	 */
	getCompletedMissions(idUser) {
		let body = {hero_id: idUser},
			url = this.restProvider.getUrlApi() + '/' + this.controllerName + '/getCompletedMissions';

		return this.http.post(url, body, this.restProvider.getHeadersUrlEncoded()).toPromise();
	}

}
