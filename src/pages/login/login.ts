import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HTTP} from "@ionic-native/http";
import {RestProvider} from "../../providers/rest/rest";

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	username: string;
	password: string;

	constructor(public navCtrl: NavController, public navParams: NavParams, public http: HTTP, public restProvider: RestProvider) {
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
			.then((data) => { // First arrow function to success; Second to fail
				console.log(data);
			})
			.catch((error) => { // Error 500, 400
				console.log(error);
			});
	}

}

