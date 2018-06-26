import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AdoptionPage} from './adoption';
import {SwingModule} from "angular2-swing";

@NgModule({
	declarations: [
		AdoptionPage,
	],
	imports: [
		IonicPageModule.forChild(AdoptionPage),
		SwingModule
	],
})
export class AdoptionPageModule {
}
