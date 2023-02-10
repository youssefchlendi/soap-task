import { CountryID } from "./Country.model";

export interface Continent {
	code: string;
	name: string;
	contries: CountryID[]
}

