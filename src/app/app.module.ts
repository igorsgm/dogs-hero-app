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
import {HomePage} from '../pages/home/home';
import {LoginPage} from "../pages/login/login";

// Providers
import {RestProvider} from '../providers/rest/rest';
import {HttpClientModule} from '@angular/common/http';
import {AuthProvider} from '../providers/auth/auth';

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		LoginPage,
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
		HomePage,
		LoginPage,
	],
	providers: [
		StatusBar,
		SplashScreen,
		InAppBrowser,
		{provide: ErrorHandler, useClass: IonicErrorHandler},
		RestProvider,
		AuthProvider,
	]
})
export class AppModule {
}
