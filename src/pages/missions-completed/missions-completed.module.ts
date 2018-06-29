import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MissionsCompletedPage} from './missions-completed';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
	declarations: [
		MissionsCompletedPage,
	],
	imports: [
		IonicPageModule.forChild(MissionsCompletedPage),
		ComponentsModule
	],
})
export class MissionsCompletedPageModule {
}
