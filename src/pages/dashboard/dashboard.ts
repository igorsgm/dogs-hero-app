import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {HttpClient} from "@angular/common/http";
import {RestProvider} from "../../providers/rest/rest";

@IonicPage()
@Component({
	selector: 'page-dashboard',
	templateUrl: 'dashboard.html',
})
export class DashboardPage {

	user: any;
	level: any;
	completedMissions: any;
	pendingMissions: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public localStorage: Storage, public restProvider: RestProvider, public http: HttpClient) {
		this.localStorage.get('user').then(user => {
			this.user = user;

			this.loadLevelInfo();
			this.loadCompletedMissions();
			this.loadPendingMissions();
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad DashboardPage');
	}

	loadLevelInfo() {
		let body = {
			level: this.user.level
		};

		this.http.post(this.restProvider.getUrlApi() + '/level/getLevelInfo', body, this.restProvider.getHeadersJson()).toPromise()
			.then((level) => {
				this.level = level;
			}).catch((error) => {
			console.log(error);
		});
	}

	loadPendingMissions() {
		let body = {
			hero_id: this.user.id
		};

		this.http.post(this.restProvider.getUrlApi() + '/mission/getPendingMissions', body, this.restProvider.getHeadersJson()).toPromise()
			.then((missions) => {
				this.pendingMissions = missions;
			}).catch((error) => {
			console.log(error);
		});
	}

	loadCompletedMissions() {
		let body = {
			hero_id: this.user.id
		};

		this.http.post(this.restProvider.getUrlApi() + '/mission/getCompletedMissions', body, this.restProvider.getHeadersUrlEncoded()).toPromise()
			.then((missions) => {
				this.completedMissions = missions;
			}).catch((error) => {
			console.log(error);
		});
	}

	public openUserPage() {
		this.navCtrl.push('UserPage');
	}

}
