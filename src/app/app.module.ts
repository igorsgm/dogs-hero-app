import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";

import { RestProvider } from '../providers/rest/rest';
import { HTTP } from '@ionic-native/http';

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		LoginPage,
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp),
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
		{provide: ErrorHandler, useClass: IonicErrorHandler},
		HTTP,
    RestProvider
	]
})
export class AppModule {
}
