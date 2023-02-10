<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Continents</ion-title>
			</ion-toolbar>
		</ion-header>
		
		<continent-component :continents="continents">
			
		</continent-component>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useContinentService } from '@/services/Continent.service'
import ContinentComponent from "@/components/continent/ContinentComponent.vue"
import common from "@/components/common-ionic-components";
export default defineComponent({
	components: {
		ContinentComponent,
		...common,
	}, 
	setup () {
		const { continents } = useContinentService();
		return {
			continents
		}
	}
})
</script>

<style scoped>

</style>