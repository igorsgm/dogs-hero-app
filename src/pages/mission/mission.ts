import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {RestProvider} from "../../providers/rest/rest";
import {HttpClient} from "@angular/common/http";

@IonicPage()
@Component({
	selector: 'page-mission',
	templateUrl: 'mission.html',
})
export class MissionPage {

	user: any;
	item: any;
	shelter: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public localStorage: Storage, public restProvider: RestProvider, public http: HttpClient, public alertCtrl: AlertController) {
		this.item = this.navParams.data.mission;
		this.shelter = this.navParams.data.shelter;

		this.localStorage.get('user').then(user => {
			this.user = user;
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad MissionPage');
	}

	/**
	 * Method to accept a mission
	 *
	 * @param {string}    completionType    'item' or 'credit'
	 */
	acceptMission(completionType) {
		let url = this.restProvider.getUrlApi() + '/completion/AcceptMission?mission_id=' + this.item.mission.id + '&hero_id=' + this.user.id + '&completion_type=' + completionType;

		this.http.get(url, this.restProvider.getHeadersJson()).toPromise()
			.then((data: any) => {
				let title = data.status === true ? 'Mission accepted' : 'Error';
				this.showMissionAlert(title, data.message);
			}).catch((error) => {
			this.showMissionAlert('Error', 'Failed to accept mission, please try again later');
		});
	}

	/**
	 * Method for displaying an alert after mission accepting or failure while accepting.
	 *
	 * @param {string}    title        Alert title
	 * @param {string}    message        Alert message
	 */
	public showMissionAlert(title, message) {

		let alert = this.alertCtrl.create({
			title: title,
			subTitle: message,
			buttons: ['OK']
		});

		alert.present();
	}
}
