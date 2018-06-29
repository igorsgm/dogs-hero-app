import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {Ionic2RatingModule} from "ionic2-rating";
import {ComponentsModule} from '../components/components.module';
// Plugins added
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {IonicStorageModule} from "@ionic/storage";
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
// Pages
import {MyApp} from './app.component';
import {LoginPage} from "../pages/login/login";
import {DashboardPage} from "../pages/dashboard/dashboard";
// Providers
import {RestProvider} from '../providers/rest/rest';
import {HttpClientModule} from '@angular/common/http';
import {AuthProvider} from '../providers/auth/auth';
import {MapPage} from "../pages/map/map";
import {Geolocation} from "@ionic-native/geolocation";
import {UtilsProvider} from '../providers/utils/utils';
import {ShelterReviewPage} from "../pages/shelter/shelter-review/shelter-review";
import {MissionProvider} from '../providers/mission/mission';
import {AvatarProvider} from '../providers/avatar/avatar';

@NgModule({
	declarations: [
		MyApp,
		LoginPage,
		MapPage,
		DashboardPage,
		ShelterReviewPage,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		ComponentsModule,
		IonicModule.forRoot(MyApp, {
			iconMode: 'ios',
			mode: 'ios'
		}),
		Ionic2RatingModule,
		IonicStorageModule.forRoot({
			driverOrder: ['localstorage']
		}),
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		LoginPage,
		MapPage,
		DashboardPage,
		ShelterReviewPage,
	],
	providers: [
		StatusBar,
		SplashScreen,
		InAppBrowser,
		{provide: ErrorHandler, useClass: IonicErrorHandler},
		RestProvider,
		MissionProvider,
		AuthProvider,
		Geolocation,
		UtilsProvider,
		AvatarProvider,
	]
})
export class AppModule {
}
