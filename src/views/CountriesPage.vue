<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>{{ params.code }}'s countries</ion-title>
				<ion-buttons slot="start">
					<ion-back-button default-href="/" />
				</ion-buttons>
			</ion-toolbar>
			<ion-toolbar>
				<ion-searchbar  @ionChange="search($event)"></ion-searchbar>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
				<ion-refresher-content></ion-refresher-content>
			</ion-refresher>
			<ion-grid>
				<ion-row class="ion-justify-content-center">
					<ion-col v-if="myCountries.length == 0 || countriesLoading === true" size="auto">
						<ion-spinner ></ion-spinner>
					</ion-col>
					<ion-col v-else>
						<ion-list>
				<ion-item v-for="country in myCountries" :key="country.code"
					:router-link="{
						name: 'Country',
						params: {
							code: country.code
						}
					}">
					<ion-avatar slot="start">
						<ion-img :src="country.flag"></ion-img>
					</ion-avatar>
					<ion-label>
						<h2>{{ country.name }}</h2>
					</ion-label>
					<p>{{ country.code }}</p>
				</ion-item>
			</ion-list>
					</ion-col>
				</ion-row>
			</ion-grid>
			
			</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router';
import {IonButtons,IonBackButton} from '@ionic/vue';
import { useCountryService } from '@/services/Country.service'
import common from "@/components/common-ionic-components";
import { CountryDetails } from '@/models/Country.model';
export default defineComponent({
	components: {
		...common,
		IonButtons,
		IonBackButton
	},
	setup () {
		const { params } = useRoute()
		const { countriesLoading,Countries,fetchCountries } = useCountryService();

		const myCountries = ref<CountryDetails[]>([]);

		const search = (e: any) => {
			const val = e?.target?.value;
			if (val && val.trim() !== '') {
				myCountries.value = Countries.value?.filter((country: any) => {
					return (country.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
				})
			} else {
				myCountries.value = Countries.value;
			}
		}

		watch(Countries, () => {
			myCountries.value = Countries.value;
			search("");
		})


		watch(params, () => {
			fetchCountries(params.code as string)
		}, { immediate: true })

		const handleRefresh = async (event: CustomEvent) => {
			await fetchCountries(params.code as string);
			event.detail.complete();
		};

		return {
			params,
			Countries,
			myCountries,
			search,
			countriesLoading,
			handleRefresh
		}
	}
})
</script>

<style scoped>

</style>