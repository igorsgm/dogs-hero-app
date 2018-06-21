import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {RestProvider} from "../../providers/rest/rest";
import {HttpClient} from "@angular/common/http";

@IonicPage()
@Component({
	selector: 'page-shelter',
	templateUrl: 'shelter.html',
})
export class ShelterPage {

	user: any;
	shelter: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public localStorage: Storage, public restProvider: RestProvider, public http: HttpClient) {

		this.localStorage.get('user').then(user => {
			this.user = user;
			this.getShelterDetails(this.navParams.data.shelter_id);
		});

		this.shelter = this.navParams.data.shelter;

		console.log(this.shelter);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ShelterPage');
	}

	getShelterDetails(idShelter) {

		if (idShelter !== null) {
			let body = {
				shelter_id: idShelter
			};

			this.http.post(this.restProvider.getUrlApi() + '/shelter/GetShelterDetails', body, this.restProvider.getHeadersUrlEncoded()).toPromise()
				.then((data: any) => {
					console.log(data);
					this.shelter = data;
				}).catch((error) => {
				console.log(error);
			});
		}
	}

}
