import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-mission',
	templateUrl: 'mission.html',
})
export class MissionPage {

	item: any;
	shelter: any;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.item = this.navParams.data.mission;
		this.shelter = this.navParams.data.shelter;
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad MissionPage');
	}

}
