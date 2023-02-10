import { CountryID } from "./Country.model";

export interface Continent {
	code: string;
	name: string;
	img: string;
}

export interface ContinentDT extends Continent {
	contries: CountryID[]
}

