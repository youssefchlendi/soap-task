<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>{{ params.code }}'s details</ion-title>
				<ion-buttons slot="start">
					<ion-back-button  />
				</ion-buttons>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<ion-card v-if="country">
				<ion-card-header>
					<ion-row class="ion-justify-content-between">
						<ion-col>
							<ion-avatar class="ion-justify-content-center">
								<img :src="country.flag" />
							</ion-avatar>
						</ion-col>
						<ion-col>
							<ion-card-subtitle>{{ country.region }}</ion-card-subtitle>
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
						<ion-label>Population</ion-label>
						<ion-text>{{ country.population }}</ion-text>
					</ion-item>
					<ion-item>
						<ion-label>Area</ion-label>
						<ion-text>{{ country.area }}</ion-text>
					</ion-item>
					<ion-item>
						<ion-label>Languages</ion-label>
						<ion-item v-for="language in country.languages" :key="language.name">
							<ion-label>{{ language.name }}</ion-label>
						</ion-item>
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

		return {params,country}
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