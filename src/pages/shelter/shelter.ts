import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
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
	reviews: Array<any> = [];

	constructor(public navCtrl: NavController, public navParams: NavParams, public localStorage: Storage, public viewCtrl: ViewController,
				public restProvider: RestProvider, public http: HttpClient, public alertCtrl: AlertController) {

		this.localStorage.get('user').then(user => {
			this.user = user;
			this.getShelterDetails(this.navParams.data.shelter_id);
			this.getShelterReviews(this.navParams.data.shelter_id);
		});

		this.shelter = this.navParams.data.shelter;

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

	getShelterReviews(idShelter) {
		if (idShelter !== null) {
			let body = {
				shelter_id: idShelter
			};

			this.http.post(this.restProvider.getUrlApi() + '/shelter/GetShelterReviews', body, this.restProvider.getHeadersUrlEncoded()).toPromise()
				.then((data: any) => {
					Object.keys(data).forEach((key, index) => {
						this.reviews.push(data[key]);
					});
				}).catch((error) => {
				console.log(error);
			});
		}
	}

	showReviewAlert() {
		let alert = this.alertCtrl.create({
			title: 'Rate this Shelter!',
			inputs: [
				{
					name: 'review',
					placeholder: 'Write a review'
				}
			],
			buttons: [
				{
					text: 'Rate it!',
					handler: (data) => {
						this.setRating(data.review);
					}
				}
			]
		});
		alert.present();
	}

	setRating(review) {
		if (review !== '' && review !== null) {
			let body = {
				shelter_id: this.shelter.shelter_id,
				user_id: this.user.id,
				rating: '5',
				review: review
			};

			this.http.post(this.restProvider.getUrlApi() + '/shelter/setRating', body, this.restProvider.getHeadersUrlEncoded()).toPromise()
				.then((data: any) => {
					console.log(data);

					this.navCtrl.push('ShelterPage', {
						shelter_id: this.shelter.shelter_id
					}, {animate: false}).then(() => {
						this.navCtrl.remove(this.viewCtrl.index);
					});

				}).catch((error) => {
				console.log(error);
			});
		}
	}

}
