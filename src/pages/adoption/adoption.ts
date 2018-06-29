import {Component, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import 'rxjs/Rx';
import * as _ from 'lodash';

import {Direction, StackConfig, SwingCardComponent, SwingStackComponent} from 'angular2-swing';
import {Storage} from "@ionic/storage";
import {RestProvider} from "../../providers/rest/rest";
import {HttpClient} from "@angular/common/http";
import {AnimalProvider} from "../../providers/animal/animal";


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
	cards: any[] = [];
	animals: any[] = [];
	stackConfig: StackConfig;

	constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public localStorage: Storage, public restProvider: RestProvider, public http: HttpClient, public animalProvider: AnimalProvider) {

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
		this.loadAnimals();
		this.addNewCard();

		this.addNewCard();
	}

	loadAnimals() {

		let images = {
			1: 'assets/imgs/dogs-adoption/spike.png',
			2: 'assets/imgs/dogs-adoption/kobe.png',
			3: 'assets/imgs/dogs-adoption/dobby.png',
			4: 'assets/imgs/dogs-adoption/yoda.png',
			5: 'assets/imgs/dogs-adoption/ziggy.png',
			6: 'assets/imgs/dogs-adoption/billy.png'
		};

		this.animalProvider.getAllShelterAnimals(this.user.id, this.shelter_id).then((data: any) => {
			Object.keys(data.stuff).forEach((key, index) => {
				data.stuff[key].dog_image_url = images[key];
				data.stuff[key].id = data.stuff[key].animal_id;
				this.animals.push(data.stuff[key]);
			});

			this.addNewCard();
			this.addNewCard();
		});
	}

	/**
	 * Called whenever we drag an element
	 *
	 * @param element
	 * @param x
	 * @param y
	 * @param r
	 */
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
		if (!_.isEmpty(this.swingCards.toArray()[1])) {
			let cardBehind = this.swingCards.toArray()[1].getNativeElement();
			cardBehind.style['transform'] = `scale(${0.94 + 0.06 * caculatedValue}, ${0.94 + 0.06 * caculatedValue})`;
		}
	}

	/**
	 * Add new cards to our array
	 */
	addNewCard() {
		let difference = _.difference(this.animals, this.cards);

		if (!_.isEmpty(difference)) {
			let randomIndex = Math.floor(Math.random() * (difference.length));
			this.cards.push(difference[randomIndex]);

			console.info('CURRENT STACK:', this.cards.map(c => c.animal_name));
		}
	}

	disliked() {
		this.addNewCard();
		let removedCard = this.cards.shift();

		console.log('You disliked: ' + removedCard.animal_name);
	}

	liked() {
		this.addNewCard();
		let removedCard = this.cards.shift();
		this.checkMatching(removedCard);

		console.log('You liked: ' + removedCard.animal_name);
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
		return item.animal_id;
	}

}
