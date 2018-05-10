import {Component} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {HTTP} from "@ionic-native/http";
import {RestProvider} from "../../providers/rest/rest";
import {Storage} from "@ionic/storage";
import {HomePage} from "../home/home";

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	username: string;
	password: string;

	constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController,
				public http: HTTP, public restProvider: RestProvider,
				public storage: Storage) {

		this.menuCtrl.enable(false);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	}

	login() {

		let body = {
			username: this.username,
			password: this.password
		};

		this.http.post(this.restProvider.getUrl() + 'login/', body, {})
			.then((payload) => { // First arrow function to success; Second to fail

				if (payload.data == null || payload.data == 'null') {
					this.authFailed();
					return false;
				}

				let user = JSON.parse(payload.data);
				this.authSuccess(user);
			})
			.catch((error) => { // Error 500, 400
				this.authFailed();
			});
	}

	authFailed() {
		console.warn('Login failed, display modal');
	}

	authSuccess(user) {
		this.storage.set('user', user);
		this.navCtrl.push(HomePage);
	}

}

