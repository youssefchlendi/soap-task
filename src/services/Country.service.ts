import { CountryDetails } from "@/models/Country.model";
import { ref } from "vue";
import axios, { AxiosRequestConfig } from "axios";
const Countries = ref<CountryDetails[]>();

export function useCountryService() {
	return {
		Countries,
		fetchCountries
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