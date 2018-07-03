import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-chat',
	templateUrl: 'chat.html',
})
export class ChatPage {
	isNewAnimalMatch: boolean = false;
	messages: any[] = [];
	typingMessage: string = '';
	@ViewChild(Content) content: Content;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.isNewAnimalMatch = this.navParams.get('isNewAnimalMatch');
		this.init();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ChatPage');
		this.scrollBottom();
	}

	init() {
		// TODO: can be an API response
		if (!this.isNewAnimalMatch) {
			this.messages = [
				{
					isMe: true,
					type: 'text',// text || image
					body: 'Very Nice one!',
					timestamp: 'Oct 10, 2017 9:47am'
				},
				{
					isMe: false,
					avatar: 'assets/imgs/chat/user1.png',
					type: 'text',// text || image
					body: 'Hey yo what\'s up?',
					timestamp: 'Oct 10, 2017 9:48am'
				},
				{
					isMe: true,
					type: 'text',// text || image
					body: 'Really great!',
					timestamp: 'Oct 10, 2017 9:50am'
				},
				{
					isMe: false,
					avatar: 'assets/imgs/chat/user1.png',
					type: 'text',// text || image
					body: 'Uhul!',
					timestamp: 'Oct 10, 2017 9:52am'
				},
				{
					isMe: true,
					type: 'text',// text || image
					body: 'Where are you, buddy?',
					timestamp: 'Oct 10, 2017 9:53am'
				},
				{
					isMe: false,
					avatar: 'assets/imgs/chat/user1.png',
					type: 'text',// text || image
					body: 'I\'m almost there',
					timestamp: 'Oct 10, 2017 9:53am'
				}
			];
		}
	}

	sendText() {
		this.messages.push({
			isMe: true,
			type: 'text',
			body: this.typingMessage,
			timestamp: 'Sep 13, 2018 9:55am'
		});
		this.typingMessage = '';
		this.scrollBottom();

		this.fakeReply();
	}

	fakeReply() {
		setTimeout(() => {
			this.messages.push({
				isMe: false,
				avatar: 'assets/imgs/chat/user1.png',
				type: 'text',
				body: 'Nice. Keep typing dude',
				timestamp: 'Sep 13, 2018 9:55am'
			});

			this.scrollBottom();
		}, 500);
	}

	scrollBottom() {
		this.content.resize();
		this.content.scrollTo(0, this.content.scrollHeight, 350);
	}

}
