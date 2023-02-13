import { CountryDetails } from "@/models/Country.model";
import { ref } from "vue";
import axios, { AxiosRequestConfig } from "axios";
import { isPlatform } from "@ionic/vue";
import { Http } from "@capacitor-community/http";
const Countries = ref<CountryDetails[]>([]);
const country = ref<CountryDetails>();
const countriesLoading = ref<boolean>(false);
export function useCountryService() {
	return {
		countriesLoading,
		Countries,
		fetchCountries,
		country,
		fetchCountry
	}
}

export async function fetchCountries(continent: string) {
	countriesLoading.value = true;
	if (isPlatform("capacitor")) {
		console.log('Android');
		try {
			const res = await Http.request({
				method: 'GET',
				url: 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso/ListOfCountryNamesGroupedByContinent',
			});

			const countriesData = new DOMParser().parseFromString(res.data, "text/xml").getElementsByTagName("tCountryCodeAndNameGroupedByContinent");
			Countries.value = [];
			for (const item of countriesData) {
				const htmlItem = item as HTMLElement;
				if (htmlItem.children[0].children[1].innerHTML.trim().toLowerCase() == continent.toLowerCase()) {
					const htmlCountries = htmlItem.children[1].getElementsByTagName("tCountryCodeAndName");
					for (const country of htmlCountries) {
						const htmlCountry = country as HTMLElement;
						Countries.value.push({
							code: htmlCountry.children[0].innerHTML.trim(),
							name: htmlCountry.children[1].innerHTML.trim(),
							phoneCode: 0,
							continentCode: htmlItem.children[0].children[0].innerHTML.trim(),
							capital: "",
							currencyCode: "",
							flag: `https://flagcdn.com/${htmlCountry.children[0].innerHTML.trim().toLowerCase()}.svg`
						});
					}
				}
			}
		} catch (e) {
			console.log(e)
		}

	} else {
		console.log("Web");
		const config: AxiosRequestConfig = {
			method: "GET",
			url: `/websamples.countryinfo/CountryInfoService.wso/ListOfCountryNamesGroupedByContinent`
		}
		const { data } = await axios(config);
		const countriesData = new DOMParser().parseFromString(data, "text/xml").getElementsByTagName("tCountryCodeAndNameGroupedByContinent");
		Countries.value = [];
		for (const item of countriesData) {
			const htmlItem = item as HTMLElement;
			if (htmlItem.children[0].children[1].innerHTML.trim().toLowerCase() == continent.toLowerCase()) {
				const htmlCountries = htmlItem.children[1].getElementsByTagName("tCountryCodeAndName");
				for (const country of htmlCountries) {
					const htmlCountry = country as HTMLElement;
					Countries.value.push({
						code: htmlCountry.children[0].innerHTML.trim(),
						name: htmlCountry.children[1].innerHTML.trim(),
						phoneCode: 0,
						continentCode: htmlItem.children[0].children[0].innerHTML.trim(),
						capital: "",
						currencyCode: "",
						flag: `https://flagcdn.com/${htmlCountry.children[0].innerHTML.trim().toLowerCase()}.svg`
					});
				}
			}
		}

	}
	countriesLoading.value = false;
}

export async function fetchCountry(countryCode: string) {
	if (isPlatform("capacitor")) {
		console.log('Android');
		const res = await Http.request({
			method: 'POST',
			url: 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso',
			data: `<?xml version="1.0" encoding="utf-8"?>
			<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
			  <soap:Body>
				<FullCountryInfo xmlns="http://www.oorsprong.org/websamples.countryinfo">
				  <sCountryISOCode>${countryCode}</sCountryISOCode>
				</FullCountryInfo>
			  </soap:Body>
			</soap:Envelope>`,
			headers: {
				"Content-Type": "text/xml"
			}	
		});

		const fullCountryInfo = new DOMParser().parseFromString(res.data, "text/xml").getElementsByTagName("m:FullCountryInfoResult")[0] as HTMLElement;
		const { code, name, phoneCode, continentCode, capital, currencyCode, flag } = extractCountyInfo(fullCountryInfo);
		country.value = {
			code,
			name,
			phoneCode: parseInt(phoneCode),
			continentCode,
			capital,
			currencyCode,
			flag
		};

	} else {
		console.log("Web");
		const config: AxiosRequestConfig = {
			method: "POST",
			url: `/websamples.countryinfo/CountryInfoService.wso`,
			data: `<?xml version="1.0" encoding="utf-8"?>
			<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
			  <soap:Body>
				<FullCountryInfo xmlns="http://www.oorsprong.org/websamples.countryinfo">
				  <sCountryISOCode>${countryCode}</sCountryISOCode>
				</FullCountryInfo>
			  </soap:Body>
			</soap:Envelope>`,
			headers: {
				"Content-Type": "text/xml"
			}	
		}
		const { data } = await axios(config);
		const fullCountryInfo = new DOMParser().parseFromString(data, "text/xml").getElementsByTagName("m:FullCountryInfoResult")[0] as HTMLElement;
		const { code, name, phoneCode, continentCode, capital, currencyCode, flag } = extractCountyInfo(fullCountryInfo);

		country.value = {
			code,
			name,
			phoneCode: parseInt(phoneCode),
			continentCode,
			capital,
			currencyCode,
			flag
		};

	}
}

function extractCountyInfo(fullCountryInfo: HTMLElement) {
	const code = fullCountryInfo.getElementsByTagName("m:sISOCode")[0].innerHTML.trim();
	const name = fullCountryInfo.getElementsByTagName("m:sName")[0].innerHTML.trim();
	const capital = fullCountryInfo.getElementsByTagName("m:sCapitalCity")[0].innerHTML.trim();
	const phoneCode = fullCountryInfo.getElementsByTagName("m:sPhoneCode")[0].innerHTML.trim();
	const continentCode = fullCountryInfo.getElementsByTagName("m:sContinentCode")[0].innerHTML.trim();
	const currencyCode = fullCountryInfo.getElementsByTagName("m:sCurrencyISOCode")[0].innerHTML.trim();
	const flag = fullCountryInfo.getElementsByTagName("m:sCountryFlag")[0].innerHTML.trim();
	return { code, name, phoneCode, continentCode, capital, currencyCode, flag };
}
