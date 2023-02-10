export interface CountryID {
	code: string;
	name: string;
}

export interface CountryDetails extends CountryID {
	phoneCode: number;
	continentCode: string;
	currencyCode: string;
	flag: string;
	languages: Language[];
}

export interface Language {
	isoCode: string;
	name: string
}