import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ShelterReviewPage} from './shelter-review';
import {Ionic2RatingModule} from "ionic2-rating";

@NgModule({
	declarations: [
		ShelterReviewPage,
	],
	imports: [
		IonicPageModule.forChild(ShelterReviewPage),
		Ionic2RatingModule
	],
})
export class ShelterReviewPageModule {
}
