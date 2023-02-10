<template>
	<ion-item :router-link="`/continents/${continent.code}`">
		<ion-label>
			<h2>{{continent.name}}</h2>
			<p>{{continent.code}}</p>
		</ion-label>
	</ion-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Continent } from '@/models/Continent.model'
import common from "./common-ionic-components"
export default defineComponent({
	props:{
		continent:{
			type:Object,
			required: true,
		}
	},
	components:{
		...common
	},
	setup () {
		

		return {}
	}
})
</script>

<style scoped>

</style>