import {Component, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import 'rxjs/Rx';
import * as _ from 'lodash';

import {Direction, StackConfig, SwingCardComponent, SwingStackComponent} from 'angular2-swing';


@IonicPage()
@Component({
	selector: 'page-adoption',
	templateUrl: 'adoption.html',
})
export class AdoptionPage {
	@ViewChild('cardStack') swingStack: SwingStackComponent;
	@ViewChildren('card') swingCards: QueryList<SwingCardComponent>;

	cards: any[];
	stackConfig: StackConfig;
	users: any[];

	constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams) {
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
		this.users = [
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
		let difference = _.difference(this.users, this.cards);
		let randomIndex = Math.floor(Math.random() * (difference.length));

		this.cards.push(difference[randomIndex]);

		console.info('CURRENT STACK:', this.cards.map(c => c.name));
	}

	disliked() {
		this.addNewCard();
		let removedCard = this.cards.shift();

		console.log('You disliked: ' + removedCard.name);
	}

	liked() {
		this.addNewCard();
		let removedCard = this.cards.shift();
		this.checkMatching(removedCard);

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
