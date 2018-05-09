import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';

// import {HTTP} from '@ionic-native/http';
import 'rxjs/add/operator/toPromise';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	username: string;
	password: string;

	constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	}

	login() {

		let headers = new HttpHeaders();
		headers.append('Content-Type', 'application/json');

		this.http.post('http://localhost:8888/barkley/barkley_backend/index.php/site/login', JSON.stringify({
			username: this.username,
			password: this.password
		}),  {headers: headers})
			.subscribe((res) => {
				console.log(res);
			});


		// this.http.post('http://localhost:8888/barkley/barkley_backend/index.php/site/login', {
		// 	username: this.username,
		// 	password: this.password
		// }, {})
		// 	.toPromise()
		// 	.then((data) => { // First arrow function to success; Second to fail
		// 		console.log(data);
		// 	})
		// 	.catch((error) => { // Error 500, 400
		// 		console.log(error);
		// 	});
	}

}

