import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RestProvider} from "../rest/rest";

@Injectable()
export class AvatarProvider {

	/**
	 * Backend Controller name
	 * @type {string}
	 */
	private controllerName: string = 'avatar';


	/**
	 * AvatarProvider constructor
	 *
	 * @param {RestProvider} restProvider
	 * @param {HttpClient} http
	 */
	constructor(private restProvider: RestProvider, private http: HttpClient) {
		console.log('Hello AvatarProvider Provider');
	}

	/**
	 * Retrieves avatar data by user
	 *
	 * @param {int|string} idUser
	 * @returns {Promise<Object>}
	 */
	public getAvatarByIdUser(idUser) {
		let url = this.restProvider.getUrlApi() + '/' + this.controllerName + '/getAvatar?id=' + idUser + '&get_type=av_user_id';

		return this.http.get(url, this.restProvider.getHeadersJson()).toPromise();
	}

}
