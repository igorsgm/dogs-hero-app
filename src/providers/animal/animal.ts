import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RestProvider} from "../rest/rest";

@Injectable()
export class AnimalProvider {

	/**
	 * AnimalProvider constructor
	 *
	 * @param {RestProvider} restProvider
	 * @param {HttpClient} http
	 */
	constructor(private restProvider: RestProvider, private http: HttpClient) {
		console.log('Hello AnimalProvider Provider');
	}


	/**
	 * Retrieves the list of shelter animals
	 *
	 * @param {int|string}    idUser
	 * @param {int|string}    idShelter
	 * @returns {Promise<Object>}
	 */
	getAllShelterAnimals(idUser, idShelter) {
		let url = this.restProvider.getUrlApi() + '/animal/getAllShelterAnimals?user_id=' + idUser + '&shelter_id=' + idShelter;

		return this.http.get(url, this.restProvider.getHeadersUrlEncoded()).toPromise();
	}

	/**
	 * Method to send a match in an aminal when user liked some pet in adoption page
	 *
	 * @param {int|string}idUser
	 * @param {int|string} matchAnimalId
	 * @returns {Promise<Object>}
	 */
	matchAnimal(idUser, matchAnimalId) {
		let url = this.restProvider.getUrlApi() + '/animal/matchAnimal?match_user_id=' + idUser + '&match_animal_id=' + matchAnimalId;

		return this.http.get(url, this.restProvider.getHeadersUrlEncoded()).toPromise();
	}

}
