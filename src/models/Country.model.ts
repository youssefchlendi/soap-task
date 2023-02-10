export interface CountryID {
	code: string;
	name: string;
}

export interface CountryDetails extends CountryID {
	phoneCode: number;
	continentCode: string;
	currencyCode: string;
	flag: string;
	capital: string;
	population: number;
	area: number;
	region: string;
	languages: Language[];
}

export interface Language {
	isoCode: string;
	name: string
}