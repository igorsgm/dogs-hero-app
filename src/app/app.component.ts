import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {LoginPage} from "../pages/login/login";
import {Storage} from "@ionic/storage";
import {MapPage} from "../pages/map/map";
import {DashboardPage} from "../pages/dashboard/dashboard";
import {AvatarPage} from "../pages/avatar/avatar";

@Component({
	templateUrl: 'app.html',
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage: any = '';

	pages: Array<{ title: string, component: any }>;

	constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public localStorage: Storage) {
		this.initializeApp();

		// used for an example of ngFor and navigation
		this.pages = [
			{title: 'Map', component: MapPage},
			{title: 'Dashboard', component: DashboardPage},
			{title: 'Avatar', component: AvatarPage},
		];

	}

	initializeApp() {
		this.treatRootPage();

		this.platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}

	openPage(page) {
		// Reset the content nav to have just this page
		// we wouldn't want the back button to show in this scenario
		this.nav.setRoot(page.component);
	}

	/**
	 * Determines which is the application's rootPage
	 * If the user is already logged in, RootPage will be MapPage, if not LoginPage.
	 */
	treatRootPage() {
		this.localStorage.get('user').then(user => {
			if (!user) {
				this.rootPage = LoginPage;
				return false;
			}
			console.info(user);

			this.rootPage = MapPage;
		});
	}

	/**
	 * Method to logout of the application. Mainly called in the Menu
	 * If logout successfully, it will clear the user from localStorage and rootPage will become LoginPage
	 */
	logout() {
		this.localStorage.get('user').then(user => {
			this.localStorage.remove('user');
			this.localStorage.remove('associado');

			this.nav.setRoot(LoginPage);
		});
	}
}
