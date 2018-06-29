import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-missions-completed',
	templateUrl: 'missions-completed.html',
})
export class MissionsCompletedPage {

	completedMissions: any;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.completedMissions = this.navParams.data.completedMissions;

		console.log(this.completedMissions);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad MissionsCompletedPage');
	}

}
