import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RestProvider} from "../rest/rest";

@Injectable()
export class ChatProvider {

	/**
	 * Backend Controller name
	 * @type {string}
	 */
	private controllerName: string = 'chat';

	/**
	 * MissionProvider constructor
	 *
	 * @param {RestProvider} restProvider
	 * @param {HttpClient} http
	 */
	constructor(private restProvider: RestProvider, private http: HttpClient) {
		console.log('Hello ChatProvider Provider');
	}

	public getAllChats(idUser) {
		let url = this.restProvider.getUrlApi() + '/' + this.controllerName + '/GetAllChats?user_id=' + idUser;

		this.http.get(url, this.restProvider.getHeadersJson()).toPromise();
	}

	public deleteChat(idChat) {
		let url = this.restProvider.getUrlApi() + '/' + this.controllerName + '/GetAllChats?chat_id=' + idChat;

		this.http.get(url, this.restProvider.getHeadersJson()).toPromise();
	}

	public getAllMessages(idChat) {
		let url = this.restProvider.getUrlApi() + '/' + this.controllerName + '/GetAllMessages?chat_id=' + idChat;

		this.http.get(url, this.restProvider.getHeadersJson()).toPromise();
	}

	public saveMessage(idChat, idUser, message) {
		let url = this.restProvider.getUrlApi() + '/' + this.controllerName + '/SaveMessage?chat_messages_chat_id=' + idChat + '&chat_messages_user_id=' + idUser + '&message=' + message;

		this.http.get(url, this.restProvider.getHeadersJson()).toPromise();
	}

}
