import { Continent } from "@/models/Continent.model";
import { ref } from "vue";
import axios, { AxiosRequestConfig } from "axios";
const continents = ref<Continent[]>(
	[
		{
			name: "Africa", code: "AF", img:"tn"
		}, {
			name: "Americas", code: "AM", img:"us"
		}, {
			name: "Asia", code: "AS", img:"jp"
		}, {
			name: "Europe", code: "EU", img:"eu"
		}, {
			name: "Oceania", code: "OC", img:"au"
		}
	]
);

export function useContinentService() {
	return {
		continents,
		fetchContinents
	}
}

export async function fetchContinents() {

	// 	// const myHeaders = new Headers();
	// 	// myHeaders.append("Content-Type", "soap/xml");
	// 	// myHeaders.append("charset", "utf-8");
	// 	// myHeaders.append("SOAPAction", "http://www.oorsprong.org/websamples.countryinfo/ListOfContinentsByName");
	// 	const body = `
	// 	<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
	// 		<Body>
	// 			<ListOfContinentsByName xmlns="http://www.oorsprong.org/websamples.countryinfo"/>
	// 		</Body>
	// 	</Envelope>
	// `;

	// 	// const requestOptions = {
	// 	// 	method: 'POST',
	// 	// 	headers: myHeaders,
	// 	// 	body,
	// 	// };

	// 	const myHeaders = {
	// 		"Content-Type": "soap/xml",
	// 		"charset": "utf-8",
	// 		"SOAPAction": "http://www.oorsprong.org/websamples.countryinfo/ListOfContinentsByName"
	// 	}

	// 	const requestOptions: AxiosRequestConfig = {
	// 		headers: myHeaders,
	// 		data: body,
	// 	}


	// 	axios.post("http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso", requestOptions)
	// 		// .then(response => response.text())
	// 		.then(result => console.log(result))
	// 		.catch(error => console.log('error', error));
}