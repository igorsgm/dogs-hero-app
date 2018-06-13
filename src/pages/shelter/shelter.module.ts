import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ShelterPage} from './shelter';

@NgModule({
	declarations: [
		ShelterPage,
	],
	imports: [
		IonicPageModule.forChild(ShelterPage),
	],
})
export class ShelterPageModule {
}
