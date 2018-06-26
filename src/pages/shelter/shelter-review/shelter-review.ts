import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {RestProvider} from "../../../providers/rest/rest";
import {HttpClient} from "@angular/common/http";

@IonicPage()
@Component({
	selector: 'page-shelter-review',
	templateUrl: 'shelter-review.html',
})
export class ShelterReviewPage {

	rating: any;
	review: any;
	user: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public localStorage: Storage, public restProvider: RestProvider, public http: HttpClient) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ShelterReviewPage');
	}

	dismiss() {
		this.viewCtrl.dismiss({}, '', {animate: false});
	}

	setRating() {
		if (this.review !== '' && this.review !== null && this.rating !== '' && this.rating !== null) {
			let body = {
				shelter_id: this.navParams.data.shelter_id,
				user_id: this.navParams.data.user_id,
				rating: this.rating.toString(),
				review: this.review
			};

			this.http.post(this.restProvider.getUrlApi() + '/shelter/setRating', body, this.restProvider.getHeadersUrlEncoded()).toPromise()
				.then((data: any) => {
					this.returnToShelterPageRefreshing();
				}).catch((error) => {
				console.log(error);
			});
		}
	}

	returnToShelterPageRefreshing() {
		this.navCtrl.push('ShelterPage', {
			shelter_id: this.navParams.data.shelter_id
		}, {animate: false}).then(() => {
			this.navCtrl.remove(this.viewCtrl.index);
		});
	}

}
