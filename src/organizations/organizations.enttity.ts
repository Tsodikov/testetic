import { IOrganization } from './organizations.entity.interface';

export class Organization {
	organization: IOrganization;
	constructor(
		private readonly _name: string,
		private readonly _category: string,
		private readonly _description: string,
		private readonly _country: string,
		private readonly _state: string,
		private readonly _city: string,
		private readonly _website: string,
		private readonly _phone: string,
		private readonly _adress: string,
		private readonly _zip: string,
		private readonly _logo: string,
		private readonly _backgroundImage: string,
		private readonly _terms: boolean,
	) {
		this.organization = {
			name: this._name,
			category: this._category,
			description: this._description,
			country: this._country,
			state: this._state,
			city: this._city,
			website: this._website,
			phone: this._phone,
			adress: this._adress,
			zip: this._zip,
			logo: this._logo,
			backgroundImage: this._backgroundImage,
			terms: this._terms,
		};
	}
}
