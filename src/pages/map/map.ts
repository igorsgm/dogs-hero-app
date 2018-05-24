import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {Geolocation} from "@ionic-native/geolocation";
import {HttpClient} from "@angular/common/http";
import {RestProvider} from "../../providers/rest/rest";
import {UtilsProvider} from "../../providers/utils/utils";

declare var google: any;

@IonicPage()
@Component({
	selector: 'page-map',
	templateUrl: 'map.html',
})
export class MapPage {

	@ViewChild('mapElement') mapElement: ElementRef;

	map: any;

	constructor(public navCtrl: NavController, public navParams: NavParams,
				public utils: UtilsProvider,
				public http: HttpClient, public restProvider: RestProvider,
				public localStorage: Storage, public geolocation: Geolocation) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad MapPage');
		this.startMap();
	}

	startMap() {
		this.geolocation.getCurrentPosition().then((position) => {

			let currentLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

			let mapEle = this.mapElement.nativeElement;

			this.map = new google.maps.Map(mapEle, {
				zoom: 16,
				center: currentLatLng
			});

			this.localStorage.get('user').then(user => {
				new google.maps.Marker({
					position: currentLatLng,
					map: this.map,
					title: user.first_name,
					user: user
				});
			});

			this.loadSurroundingShelters(this.map);

		}, (err) => {
			console.log(err);
		});
	}

	/**
	 * Grab all shelters around user within a 20 mile radius
	 *
	 * @param map	Map Instance
	 * @returns {Promise<void>}
	 */
	loadSurroundingShelters(map) {
		return this.localStorage.get('user').then(user => {

			let body = {
				id: user.id,
				lat: parseFloat(user.lat) + this.utils.getRandomNumber(-5, 5) / 1000,
				lng: parseFloat(user.lng) + this.utils.getRandomNumber(-5, 5) / 1000,
			};

			return this.http.post(this.restProvider.getUrlApi() + '/User/GetSurroundingUsers', body, this.restProvider.getHeadersUrlEncoded()).toPromise()
				.then((users) => {

					Object.keys(users).forEach(function (key, index) {
						let userLoad = users[key].user;
						MapPage.appendMarkers(userLoad, "guardian", map);
					});

				}).catch((error) => {
					console.log(error);
				});
		});
	}


	/**
	 * Add markers to Google Maps
	 *
	 * @param userLoad       User data
	 * @param makerType      Type of the user. Eg: bot, guardian, hero
	 * @param map            Map instance
	 */
	public static appendMarkers(userLoad, makerType, map) {

		let userLatLng = new google.maps.LatLng(parseFloat(userLoad.lat), parseFloat(userLoad.lng));

		let icon = {
			url: "../../assets/imgs/map/pin_sb.png",
			scaledSize: new google.maps.Size(37, 52),
		};

		let marker = new google.maps.Marker({
			id: makerType + userLoad.id,
			position: userLatLng,
			map: map,
			title: userLoad.first_name,
			label: userLoad.first_name,
			icon: icon,
			user: userLatLng
		});

		marker.addListener('click', function () {
			console.log('HIT CLICK');
		});

		console.log(userLoad.first_name + " added to map.");

		// markerArray[pinType + userLoad.id] = marker;
	}

}
