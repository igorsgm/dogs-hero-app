import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-shelter',
	templateUrl: 'shelter.html',
})
export class ShelterPage {

	shelter: any;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.shelter = this.navParams.data.shelter;

		console.log(this.shelter);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ShelterPage');
	}

}
