import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {RestProvider} from "../../providers/rest/rest";
import {HttpClient} from "@angular/common/http";
import {ShelterReviewPage} from "./shelter-review/shelter-review";
import * as $ from 'jquery';

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
				public restProvider: RestProvider, public http: HttpClient, public modalCtrl: ModalController) {

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

	showAboutTab() {
		$('#adoption-option span').removeClass('active');
		$('#about-option span').addClass('active');
		$('#adoption-tab').hide();
		$('#about-tab').show();
	}

	showAdoptionTab() {
		$('#about-option span').removeClass('active');
		$('#adoption-option span').addClass('active');
		$('#about-tab').hide();
		$('#adoption-tab').show();

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

	showReviewModal() {
		let reviewPageParams = {
			shelter_id: this.shelter.shelter_id,
			user_id: this.user.id
		};

		let modal = this.modalCtrl.create(ShelterReviewPage, reviewPageParams);
		modal.present({animate: false});
	}

	openAdoptionPage() {
		this.navCtrl.push('AdoptionPage');
	}

}
