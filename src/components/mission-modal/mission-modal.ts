import {Component, Input} from '@angular/core';
import {NavController} from "ionic-angular";

@Component({
	selector: 'mission-modal',
	templateUrl: 'mission-modal.html'
})
export class MissionModalComponent {

	@Input() mission: any;
	@Input() missionItems: any;
	@Input() shelter: any;

	constructor(public navCtrl: NavController) {
		console.log('Hello MissionModalComponent Component');
	}

	public openMission(idMission) {
		this.navCtrl.push('MissionPage', {
			mission_id: idMission
		});
	}

	public openShelter(idShelter) {
		this.navCtrl.push('ShelterPage', {
			shelter_id: idShelter
		});
	}

}
