import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
// Plugins added
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {IonicStorageModule} from "@ionic/storage";
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
// Pages
import {MyApp} from './app.component';
import {LoginPage} from "../pages/login/login";
// Providers
import {RestProvider} from '../providers/rest/rest';
import {HttpClientModule} from '@angular/common/http';
import {AuthProvider} from '../providers/auth/auth';
import {MapPage} from "../pages/map/map";
import {Geolocation} from "@ionic-native/geolocation";
import {UtilsProvider} from '../providers/utils/utils';
import {DashboardPage} from "../pages/dashboard/dashboard";

@NgModule({
	declarations: [
		MyApp,
		LoginPage,
		MapPage,
		DashboardPage,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		IonicModule.forRoot(MyApp),
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
	],
	providers: [
		StatusBar,
		SplashScreen,
		InAppBrowser,
		{provide: ErrorHandler, useClass: IonicErrorHandler},
		RestProvider,
		AuthProvider,
		Geolocation,
		UtilsProvider,
	]
})
export class AppModule {
}
