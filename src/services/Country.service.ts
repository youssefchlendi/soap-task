import { CountryDetails } from "@/models/Country.model";
import { ref } from "vue";
import axios, { AxiosRequestConfig } from "axios";
const Countries = ref<CountryDetails[]>();
const country = ref<CountryDetails>();

export function useCountryService() {
	return {
		Countries,
		fetchCountries,
		country,
		fetchCountry
	}
}

export async function fetchCountries(continent: string) {
	const config: AxiosRequestConfig = {
		method: "GET",
		url: `https://restcountries.com/v2/region/${continent}`
	}
	const { data } = await axios(config);
	Countries.value = data.map((country: any) => {
		return {
			code: country.alpha2Code,
			name: country.name,
			phoneCode: country.callingCodes[0],
			continentCode: country.region,
			currencyCode: country.currencies[0].code,
			flag: country.flag,
			languages: country.languages.map((language: any) => {
				return {
					isoCode: language.iso639_1,
					name: language.name
				}
			})
		}
	});

}

export async function fetchCountry(countryCode: string) {
	const config: AxiosRequestConfig = {
		method: "GET",
		url: `https://restcountries.com/v2/name/${countryCode}`
	}
	let { data } = await axios(config);
	data = data[0];
	country.value = {
		code: data.alpha2Code,
		name: data.name,
		phoneCode: data.callingCodes[0],
		continentCode: data.region,
		currencyCode: data.currencies[0].code,
		flag: data.flag,
		capital: data.capital,
		population: data.population,
		area: data.area,
		region: data.subregion,
		languages: data.languages.map((language: any) => {
			return {
				isoCode: language.iso639_1,
				name: language.name
			}
		})
	};
}