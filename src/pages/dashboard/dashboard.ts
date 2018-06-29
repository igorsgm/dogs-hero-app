import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {HttpClient} from "@angular/common/http";
import {RestProvider} from "../../providers/rest/rest";
import {MissionProvider} from "../../providers/mission/mission";
import {AvatarProvider} from "../../providers/avatar/avatar";
import * as $ from 'jquery'

@IonicPage()
@Component({
	selector: 'page-dashboard',
	templateUrl: 'dashboard.html',
})
export class DashboardPage {

	user: any;
	avatar: any;
	abilities: any;
	breed: any;
	level: any;
	ringPercent: any;
	completedMissions: any;
	pendingMissions: any = [];
	dynamicColor: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public localStorage: Storage, public restProvider: RestProvider, public http: HttpClient, public missionProvider: MissionProvider, public avatarProvider: AvatarProvider) {
		this.localStorage.get('user').then(user => {
			this.user = user;
			this.dynamicColor = 'red';
			this.loadAvatar();
			this.loadCompletedMissions();
			this.loadPendingMissions();
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad DashboardPage');
	}

	loadAvatar() {
		this.avatarProvider.getAvatarByIdUser(this.user.id).then((data: any) => {
			this.avatar = data.avatar;
			this.breed = data.breed;
			this.level = data.level;
			this.abilities = data.abilities;
			this.ringPercent = this.getLevelRingPercent();

			this.rotateRing(this.ringPercent);
		});
	}

	loadPendingMissions() {
		this.missionProvider.getPendingMissions(this.user.id).then((pendingMissions) => {
			this.pendingMissions = pendingMissions;
		});
	}

	loadCompletedMissions() {
		this.missionProvider.getCompletedMissions(this.user.id).then((completedMissions) => {
			this.completedMissions = completedMissions;
		});
	}

	getLevelRingPercent() {
		let percent = (this.level.points * 100) / this.level.level_req;

		if (percent > 100) {
			percent = 100;
		}

		return percent;
	}

	rotateRing(percent) {
		if (percent > 33 && percent <= 66) {
			percent = percent - 33;
			$("[data-ring-progress]").addClass("top-border");
		} else if (percent > 66) {
			$("[data-ring-progress]").addClass("top-border");
			$("[data-ring-progress]").addClass("right-border");
			percent = percent - 66;
		}

		let degrees = -90 + (90 / 33) * percent;

		$("[data-ring-progress]").attr("style", 'transform: rotate(' + degrees + 'deg)');
	}

	public openCreditPage() {
		this.navCtrl.push('CreditPage');
	}

	public openMissionsCompletedPage() {
		this.navCtrl.push('MissionsCompletedPage', {
			completedMissions: this.completedMissions
		});
	}

	public openAvatarPage() {
		this.navCtrl.push('AvatarPage');
	}

}
