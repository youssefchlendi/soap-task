<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Continents</ion-title>
			</ion-toolbar>
			<ion-toolbar>
				<ion-searchbar @ionChange="search($event)"></ion-searchbar>
			</ion-toolbar>
		</ion-header>
		<ion-content >
			<ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
				<ion-refresher-content></ion-refresher-content>
			</ion-refresher>
			<ion-grid>
				<ion-row class="ion-justify-content-center">
					<ion-col v-if="continents.length == 0 || continentsLoading === true" size="auto">
						<ion-spinner ></ion-spinner>
					</ion-col>
					<ion-col v-else>
						<continent-component  :continents="myContinents">
						</continent-component>
					</ion-col>
				</ion-row>
			</ion-grid>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'
import { useContinentService } from '@/services/Continent.service'
import ContinentComponent from "@/components/continent/ContinentComponent.vue"
import common from "@/components/common-ionic-components";
import { Continent } from '@/models/Continent.model';
export default defineComponent({
	components: {
		ContinentComponent,
		...common,
	},
	setup() {
		const { continentsLoading, continents, fetchContinents } = useContinentService();
		const myContinents = ref<Continent[]>([]);

		const search = (e: any) => {
			const val = e?.target?.value;
			if (val && val.trim() !== '') {
				myContinents.value = continents.value.filter((continent: any) => {
					return (continent.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
				})
			} else {
				myContinents.value = continents.value;
			}
		}
		const handleRefresh = async (event: CustomEvent) => {
			await fetchContinents();
			event.detail.complete();
		};


		watch(continents, () => {
			myContinents.value = continents.value;
			search("");
		})


		return {
			continentsLoading,
			continents,
			fetchContinents,
			search,
			myContinents,
			handleRefresh
		}
	}
})
</script>

<style scoped>

</style>