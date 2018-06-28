import {NgModule} from '@angular/core';
import {MissionCardComponent} from './mission-card/mission-card';
import {IonicModule} from "ionic-angular";
import {MissionModalComponent} from './mission-modal/mission-modal';

@NgModule({
	declarations: [
		MissionCardComponent,
		MissionModalComponent
	],
	imports: [
		IonicModule
	],
	exports: [
		MissionCardComponent,
		MissionModalComponent
	]
})
export class ComponentsModule {
}
