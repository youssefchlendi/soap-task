<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>{{ country?.name??params.code }}'s details</ion-title>
				<ion-buttons slot="start">
					<ion-back-button  />
				</ion-buttons>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
				<ion-refresher-content></ion-refresher-content>
			</ion-refresher>
			<ion-card v-if="country">
				<ion-card-header>
					<ion-row class="ion-justify-content-between">
						<ion-col>
							<ion-avatar class="ion-justify-content-center">
								<img :src="country.flag" />
							</ion-avatar>
						</ion-col>
						<ion-col>
							<ion-card-subtitle>{{ country.code }}</ion-card-subtitle>
							<ion-card-title>{{ country.name }}</ion-card-title>
						</ion-col>
					</ion-row>
					<!-- <ion-avatar class="ion-justify-content-center">
						<img :src="country.flag" />
					</ion-avatar>
					<ion-card-subtitle>{{ country.region }}</ion-card-subtitle>
					<ion-card-title>{{ country.name }}</ion-card-title> -->
				</ion-card-header>
				<ion-card-content>
					<ion-item>
						<ion-label>Capital</ion-label>
						<ion-text>{{ country.capital }}</ion-text>
					</ion-item>
					<ion-item>
						<ion-label>Currency</ion-label>
						<ion-text>{{ country.currencyCode }}</ion-text>
					</ion-item>
					<ion-item>
						<ion-label>Phone code</ion-label>
						<ion-text>{{ country.phoneCode }}</ion-text>
					</ion-item>
					<ion-item>
						<ion-label>Continent Code</ion-label>
						<ion-text>{{ country.continentCode }} </ion-text>
					</ion-item>
				</ion-card-content>
			</ion-card>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import { useRoute } from 'vue-router';
import {IonButtons,IonBackButton} from '@ionic/vue';
import { useCountryService } from '@/services/Country.service'
import common from "@/components/common-ionic-components";
export default defineComponent({
	components: {
		...common,
		IonButtons,
		IonBackButton
	},
	setup () {
		const { params } = useRoute()
		const { country,fetchCountry } = useCountryService();

		watch(params, () => {
			fetchCountry(params.code as string)
		}, { immediate: true })

		const handleRefresh = async (event: CustomEvent) => {
			await fetchCountry(params.code as string);
			event.detail.complete();
		};

		return {params,country,handleRefresh}
	}
})
</script>

<style scoped>
ion-avatar {
	border-radius: 50%;
	background-color: skyblue;
	border: 3px solid gainsboro;
}
</style>