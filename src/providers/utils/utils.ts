import {Injectable} from '@angular/core';

@Injectable()
export class UtilsProvider {

	/**
	 * Returns a random number between min (inclusive) and max (exclusive)
	 *
	 * @param min
	 * @param max
	 * @returns {any}
	 */
	getRandomNumber(min, max) {
		return Math.random() * (max - min) + min;
	}

}
