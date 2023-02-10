<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>{{ params.code }}'s countries</ion-title>
				<ion-buttons slot="start">
					<ion-back-button default-href="/" />
				</ion-buttons>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<ion-list>
				<ion-item v-for="country in Countries" :key="country.code"
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
		const { Countries,fetchCountries } = useCountryService();

		watch(params, () => {
			fetchCountries(params.code as string)
		}, { immediate: true })

		return {params,Countries}
	}
})
</script>

<style scoped>

</style>