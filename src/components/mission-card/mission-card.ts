import {Component, Input} from '@angular/core';
import {NavController} from "ionic-angular";

@Component({
	selector: 'mission-card',
	templateUrl: 'mission-card.html'
})
export class MissionCardComponent {
	@Input() mission: any;
	@Input() pendingMissionCards: boolean = true;

	constructor(public navCtrl: NavController) {
		console.log('Hello MissionCardComponent');
	}

	public openMissionPage(idMission) {
		this.navCtrl.push('MissionPage', {
			mission_id: idMission,
		});
	}
}
