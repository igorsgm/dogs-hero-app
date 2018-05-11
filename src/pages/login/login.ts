import {Component} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {HomePage} from "../home/home";
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	username: string;
	password: string;

	constructor(public navParams: NavParams, public auth: AuthProvider, public navCtrl: NavController,
				public menuCtrl: MenuController, public localStorage: Storage) {

		// Disable the menu in the Login view
		this.menuCtrl.enable(false);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	}

	/**
	 * Submit of login's form
	 */
	public login() {
		let listener = this.auth.authenticate(this.username, this.password);

		listener.subscribe(response => {
			if (response.success === true) {
				return this.afterLogin(response.data);
			}

            this.auth.authFailed(response);

		}, err => {
			this.auth.authFailed(err);
		});
	}

	/**
	 * After logging in successfully, it will store the user data in the localStorage
	 * and then change the root page to HomePage and enable the Menu.
	 *
	 * @param data  Login function response
	 */
	public afterLogin(data) {
		this.localStorage.set('user', data.user);

		this.menuCtrl.enable(true);
		this.navCtrl.setRoot(HomePage);
	}

}

