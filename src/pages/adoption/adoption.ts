import {Component, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import 'rxjs/Rx';
import * as _ from 'lodash';

import {Direction, StackConfig, SwingCardComponent, SwingStackComponent} from 'angular2-swing';
import {Storage} from "@ionic/storage";
import {RestProvider} from "../../providers/rest/rest";
import {HttpClient} from "@angular/common/http";


@IonicPage()
@Component({
	selector: 'page-adoption',
	templateUrl: 'adoption.html',
})
export class AdoptionPage {
	@ViewChild('cardStack') swingStack: SwingStackComponent;
	@ViewChildren('card') swingCards: QueryList<SwingCardComponent>;

	user: any;
	shelter_id: any;
	cards: any[];
	stackConfig: StackConfig;
	animals: any[];

	constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public localStorage: Storage, public restProvider: RestProvider, public http: HttpClient) {

		this.shelter_id = this.navParams.data.shelter_id;

		this.localStorage.get('user').then(user => {
			this.user = user;
		});

		this.stackConfig = {
			// Default setting only allows UP, LEFT and RIGHT so you can override this as below
			allowedDirections: [
				Direction.LEFT,
				Direction.RIGHT
			],
			throwOutConfidence: (offsetX, offsetY, element) => {
				return Math.min(Math.abs(offsetX) / (element.offsetWidth / 2), 1);
			},
			transform: (element, x, y, r) => {
				this.onItemMove(element, x, y, r);
			},
			throwOutDistance: (d) => {
				return 800;
			}
		};
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AdoptionPage');
	}

	ngAfterViewInit() {
		this.cards = [];

		// this.getAllShelterAnimals();

		this.animals = [
			{
				id: 1,
				name: 'Spike',
				age: 3,
				shelter_name: 'Doggie Harmony',
				dog_image_url: 'assets/imgs/dogs-adoption/spike.png'

			},
			{
				id: 2,
				name: 'Kobe',
				age: 2,
				shelter_name: 'LifeLine Animal Project',
				dog_image_url: 'assets/imgs/dogs-adoption/kobe.png'
			},
			{
				id: 3,
				name: 'Dobby',
				age: 1,
				shelter_name: 'Happy Tails Rescue',
				dog_image_url: 'assets/imgs/dogs-adoption/dobby.png'
			},
			{
				id: 4,
				name: 'Yoda',
				age: 4,
				shelter_name: 'Dekalb County Animal Services',
				dog_image_url: 'assets/imgs/dogs-adoption/yoda.png'
			},
			{
				id: 5,
				name: 'Ziggy',
				age: 5,
				shelter_name: 'Animal Action Rescue',
				dog_image_url: 'assets/imgs/dogs-adoption/ziggy.png'
			},
			{
				id: 6,
				name: 'Billy',
				age: 7,
				shelter_name: 'Animal Action Rescue',
				dog_image_url: 'assets/imgs/dogs-adoption/billy.png'
			}
		];

		this.addNewCard();
		this.addNewCard();
	}

	getAllShelterAnimals() {
		this.http.get(this.restProvider.getUrlApi() + '/animal/getAllShelterAnimals?user_id=' + this.user.id + '&shelter_id=' + this.shelter_id, this.restProvider.getHeadersJson()).toPromise()
			.then((data: any) => {
				console.log(data);

			}).catch((error) => {
			console.log(error);
		});
	}

	// Called whenever we drag an element
	onItemMove(element, x, y, r) {
		let nope = element.querySelector('.stamp-nope');
		let like = element.querySelector('.stamp-like');
		let caculatedValue = Math.min(100, Math.abs(x) - 20) / 100;// 0 - 1

		if (x < 0 && Math.abs(x) > 20) {
			nope.style.opacity = caculatedValue;
		} else {
			like.style.opacity = caculatedValue;
		}

		element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;

		// Zoom effect for the cards underneath
		let cardBehind = this.swingCards.toArray()[1].getNativeElement();
		cardBehind.style['transform'] = `scale(${0.94 + 0.06 * caculatedValue}, ${0.94 + 0.06 * caculatedValue})`;
	}

	// Add new cards to our array
	addNewCard() {
		let difference = _.difference(this.animals, this.cards);
		let randomIndex = Math.floor(Math.random() * (difference.length));

		this.cards.push(difference[randomIndex]);

		console.info('CURRENT STACK:', this.cards.map(c => c.name));
	}

	disliked() {
		this.addNewCard();
		let removedCard = this.cards.shift();

		console.log('You disliked: ' + removedCard.name);
	}

	liked(matchAnimalId) {
		this.addNewCard();
		let removedCard = this.cards.shift();
		this.checkMatching(removedCard);


		// this.http.get(this.restProvider.getUrlApi() + '/animal/matchAnimal?match_animal_id=' + matchAnimalId, this.restProvider.getHeadersJson()).toPromise()
		// 	.then((data: any) => {
		// 		console.log(data);
		//
		// 	}).catch((error) => {
		// 	console.log(error);
		// });

		console.log('You liked: ' + removedCard.name);
	}

	checkMatching(card) {
		// if (card.name == 'Hieu Pham') {
		//   let modal = this.modalCtrl.create(MatchedPage);
		//   modal.present();
		// }
	}

	goToMe() {
		// this.navCtrl.push(MePage, {}, {
		//   direction: 'back'
		// });
	}

	goToMessaging() {
		// this.navCtrl.push(MessagingPage, {}, {
		//   direction: 'forward'
		// });
	}

	openProfile(isMe) {
		// let modal = this.modalCtrl.create(ProfilePage, {isMe: isMe});
		// modal.present();
	}

	getMoreCards() {
		if (this.cards.length == 0) {
			this.addNewCard();
		}
	}

	trackByFn(index, item) {
		return item.id;
	}

}
