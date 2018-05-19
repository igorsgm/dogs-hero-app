import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {Geolocation} from "@ionic-native/geolocation";

declare var google: any;

@IonicPage()
@Component({
	selector: 'page-map',
	templateUrl: 'map.html',
})
export class MapPage {

	@ViewChild('mapElement') mapElement: ElementRef;

	constructor(public navCtrl: NavController, public navParams: NavParams, public localStorage: Storage, public geolocation: Geolocation) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad MapPage');
		this.startMap();
	}

	startMap() {
		this.geolocation.getCurrentPosition().then((position) => {

			let currentLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

			let mapEle = this.mapElement.nativeElement;

			let map = new google.maps.Map(mapEle, {
				zoom: 16,
				center: currentLatLng
			});

			let icon = {
				url: "../../assets/imgs/map/pin_sb.png",
				scaledSize: new google.maps.Size(55, 65),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(0, 0)
			};

			this.localStorage.get('user').then(user => {
				new google.maps.Marker({
					position: currentLatLng,
					map: map,
					title: user.first_name,
					icon: icon,
					user: user
				});
			});

		}, (err) => {
			console.log(err);
		});

	}

}
