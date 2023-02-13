import { Continent } from "@/models/Continent.model";
import { ref } from "vue";
import axios from "axios";
import { isPlatform } from "@ionic/vue";
import { Http } from "@capacitor-community/http";
const continents = ref<Continent[]>([]);
const continentsLoading = ref<boolean>(false);

export function useContinentService() {
	return {
		continents,
		fetchContinents,
		continentsLoading
	}
}

fetchContinents();

export async function fetchContinents() {
	continentsLoading.value = true;
	if (isPlatform('capacitor')) {
		console.log('Android');
		try {
			const res = await Http.request({
				method: 'GET',
				url: 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso/ListOfContinentsByName',
			});

			const continentsData = new DOMParser().parseFromString(res.data, "text/xml").getElementsByTagName("tContinent");
			continents.value = Array.from(continentsData).map((continent: any) => {
				return {
					name: continent.getElementsByTagName("sName")[0].innerHTML,
					code: continent.getElementsByTagName("sCode")[0].innerHTML,
					img: continent.getElementsByTagName("sCode")[0].innerHTML.toLowerCase()
				}
			}
			);
		} catch (e) {
			console.log(e)
		}

	}
	else {
		console.log('Not Android');
		const { data } = await axios.get("/websamples.countryinfo/CountryInfoService.wso/ListOfContinentsByName")
		const continentsData = new DOMParser().parseFromString(data, "text/xml").getElementsByTagName("tContinent");
		continents.value = Array.from(continentsData).map((continent: any) => {
			return {
				name: continent.getElementsByTagName("sName")[0].innerHTML,
				code: continent.getElementsByTagName("sCode")[0].innerHTML,
				img: continent.getElementsByTagName("sCode")[0].innerHTML.toLowerCase()
			}
		});
	}
	continentsLoading.value = false;
}