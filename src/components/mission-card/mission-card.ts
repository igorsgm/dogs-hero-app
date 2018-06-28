import {Component, Input} from '@angular/core';
import {NavController} from "ionic-angular";

@Component({
	selector: 'mission-card',
	templateUrl: 'mission-card.html'
})
export class MissionCardComponent {
	@Input() mission: any;

	text: string;

	constructor(public navCtrl: NavController) {
		console.log('Hello MissionCardComponent Component');
	}

	public openMissionPage(idMission) {
		this.navCtrl.push('MissionPage', {
			mission_id: idMission,
		});
	}
}
