import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RestProvider} from "../rest/rest";
import {AlertController} from "ionic-angular";
import {Storage} from "@ionic/storage";

@Injectable()
export class AuthProvider {

	constructor(public http: HttpClient, public restProvider: RestProvider, public alertCtrl: AlertController, public localStorage: Storage) {
		console.log('Hello AuthProvider Provider');
	}

	/**
	 * Method to authenticate the user in the application. It is called in LoginPage
	 *
	 * @param {string} username
	 * @param {string} password
	 * @returns {Promise<any>}
	 */
	public authenticate(username, password): Promise<any> {
		let body = {
			username: username,
			password: password
		};

		return this.http.post(this.restProvider.getUrlApi() + '/site/login', body, this.restProvider.getHeadersJson()).toPromise();
	}


	/**
	 * Method for displaying an alert of failure when authentication fails.
	 * Called at LoginPage
	 * @param err
	 */
	public authFailed(err) {
		console.warn('Login failed, displaying modal');
		console.log(err);

		let alert = this.alertCtrl.create({
			title: 'Error',
			subTitle: 'Invalid username or password',
			buttons: ['OK']
		});

		alert.present();
	}
}
