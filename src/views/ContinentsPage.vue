<template>
	<continent-component :continents="continents">

	</continent-component>
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