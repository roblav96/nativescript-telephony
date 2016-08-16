// 

import {Observable} from 'data/observable';
import {Telephony} from 'nativescript-telephony';

export class HelloWorldModel extends Observable {

	public message: string;

	constructor() {
		super();

		this.message = "HAIII :D"

	}

	public onTap() {
		Telephony().then(function(resolved) {
			console.log('');
			console.log('================');
			console.warn('resolved >', resolved)
			console.dir(resolved);
			console.log('================');
		}).catch(function(error) {
			console.log('');
			console.log('================');
			console.error('error >', error)
			console.dir(error);
			console.log('================');
		})
	}

}