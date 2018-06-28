import {NgModule} from '@angular/core';
import {MissionCardComponent} from './mission-card/mission-card';
import {IonicModule} from "ionic-angular";

@NgModule({
	declarations: [MissionCardComponent],
	imports: [
		IonicModule
	],
	exports: [MissionCardComponent]
})
export class ComponentsModule {
}
