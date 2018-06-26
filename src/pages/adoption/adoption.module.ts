import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AdoptionPage} from './adoption';

@NgModule({
	declarations: [
		AdoptionPage,
	],
	imports: [
		IonicPageModule.forChild(AdoptionPage),
	],
})
export class AdoptionPageModule {
}
