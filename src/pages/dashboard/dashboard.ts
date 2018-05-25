import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
	selector: 'page-dashboard',
	templateUrl: 'dashboard.html',
})
export class DashboardPage {

	user: any;
	pendingMissions: Array<any>;

	constructor(public navCtrl: NavController, public navParams: NavParams, public localStorage: Storage) {
		this.localStorage.get('user').then(user => {
			this.user = user;
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad DashboardPage');
	}

}
