import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {Geolocation} from "@ionic-native/geolocation";
import {HttpClient} from "@angular/common/http";
import {RestProvider} from "../../providers/rest/rest";
import {UtilsProvider} from "../../providers/utils/utils";
import * as $ from 'jquery'

declare var google: any;

@IonicPage()
@Component({
	selector: 'page-map',
	templateUrl: 'map.html',
})
export class MapPage {

	@ViewChild('mapElement') mapElement: ElementRef;

	user: any;
	map: any;
	showMissions: boolean;
	missions: Array<any> = [];
	missionsCount: any = 0;
	shelter: any;


	constructor(public navCtrl: NavController, public navParams: NavParams,
				public utils: UtilsProvider, public http: HttpClient, public restProvider: RestProvider,
				public localStorage: Storage, public geolocation: Geolocation) {

		this.localStorage.get('user').then(user => {
			this.user = user;
		});

		$(document).on("click", "[data-mission-card]", function () {
			$('.mission-card:first-child').fadeOut(400, 'swing', function () {
				$('.mission-card:first-child').appendTo('.missions-container').hide();
			}).fadeIn(400, 'swing');
		});
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

			new google.maps.Marker({
				position: currentLatLng,
				map: this.map,
				title: this.user.first_name,
				user: this.user
			});

			this.loadSurroundingShelters(this.map);
			this.createBots(position.coords.latitude, position.coords.longitude, this.map);

		}, (err) => {
			console.log(err);
		});
	}

	/**
	 * Grab all shelters around user within a 20 mile radius
	 *
	 * @param map    Map Instance
	 * @returns {Promise<void>}
	 */
	loadSurroundingShelters(map) {

		let body = {
			id: this.user.id,
			lat: parseFloat(this.user.lat) + this.utils.getRandomNumber(-5, 5) / 1000,
			lng: parseFloat(this.user.lng) + this.utils.getRandomNumber(-5, 5) / 1000,
		};

		return this.http.post(this.restProvider.getUrlApi() + '/User/GetSurroundingUsers', body, this.restProvider.getHeadersUrlEncoded()).toPromise()
			.then((users) => {

				Object.keys(users).forEach((key, index) => {
					let userLoad = users[key].user;
					this.appendMarker(userLoad, "guardian", map);
				});

			}).catch((error) => {
				console.log(error);
			});
	}


	/**
	 * Add markers to Google Maps
	 *
	 * @param userLoad       User data
	 * @param makerType      Type of the user. Eg: bot, guardian, hero
	 * @param map            Map instance
	 */
	public appendMarker(userLoad, makerType, map) {

		let userLatLng = new google.maps.LatLng(parseFloat(userLoad.lat), parseFloat(userLoad.lng));

		let icon = {
			url: userLoad.icon.url == undefined ? "/assets/imgs/map/pin_sb.png" : userLoad.icon.url,
			scaledSize: new google.maps.Size(37, 52),
		};

		let markerData = {
			id: makerType + userLoad.id,
			position: userLatLng,
			map: map,
			title: userLoad.first_name,
			label: userLoad.first_name,
			icon: icon,
			user: userLoad,
			missions: [],
			missionsCount: 0,
			shelter: null
		};

		if (userLoad.user_type === "guardian") {
			this.getMarkerShelterClickEvent(markerData, userLoad);
		}

		// markerArray[pinType + userLoad.id] = marker;
	}

	/**
	 * Create 3 bots around some coordinate
	 *
	 * @param lat    Latitude
	 * @param lng    Longitude
	 * @param map    Map Instance
	 */
	public createBots(lat, lng, map) {
		let icon = {
			url: "/assets/imgs/map/pin_dog.png",
			scaledSize: new google.maps.Size(37, 52),
		};

		for (let i = 0; i < 3; i++) {
			let userLoad = {
				about: "Lorem cillum dolore eu fugiat nulla pariatur.",
				address: null,
				icon: icon,
				cover_url: "pin_dog.png",
				user_type: "hero",
				id: "0",
				lat: parseFloat(lat) + this.utils.getRandomNumber(-5, 5) / 1000,
				lng: parseFloat(lng) + this.utils.getRandomNumber(-5, 5) / 1000,
				name: "Rafael Oliveira",
				shelter_id: "0",
				pushpin_type: "bot"
			};

			this.appendMarker(userLoad, "bot", map);
		}
	}

	/**
	 * Grabs marker click event with marker information
	 *
	 * @param markerObj
	 * @param userLoad
	 */
	public getMarkerShelterClickEvent(markerObj, userLoad) {

		this.http.post(this.restProvider.getUrlApi() + '/mission/getMissions', {
			shelter_id: userLoad.shelter_id,
			hero_id: userLoad.id,
			mission_id: null
		}, this.restProvider.getHeadersUrlEncoded())
			.toPromise()
			.then((data: any) => {
				Object.keys(data.missions).forEach((key, index) => {
					console.log(data);
					markerObj.missions.push(data.missions[key]);
				});

				markerObj.missionsCount = data.count;
				markerObj.shelter = data.shelter;

				let marker = new google.maps.Marker(markerObj);

				marker.addListener('click', () => {
					this.missions = markerObj.missions;
					this.missionsCount = markerObj.missionsCount;
					this.shelter = markerObj.shelter;
					this.showMissions = true;
				});

				console.log(userLoad.first_name + " added to map.");

			}).catch((error) => {
			console.log(error);
		});
	}

	public closeMissions() {
		this.showMissions = false;

		this.missionsCount = 0;
		this.missions = [];
		this.shelter = null;
	}

	public openMission(mission, shelter) {
		this.navCtrl.push('MissionPage', {
			mission: mission,
			shelter: shelter
		});
	}

	public openShelter(shelter) {
		this.navCtrl.push('ShelterPage', {
			shelter: shelter
		});
	}

}
