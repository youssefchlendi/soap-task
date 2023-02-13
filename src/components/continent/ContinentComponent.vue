<template>
		<ion-list class="w-full">
			<ion-item v-for="continent in continents" :key="continent.code"
				:router-link="{
					name: 'Countries',
					params: {
						code: continent.name
					}
				}">
				<ion-avatar slot="start">
					<ion-img :src="`https://flagcdn.com/${continent.img}.svg`"></ion-img>
				</ion-avatar>
				<ion-label>
					<h2>{{ continent.name }}</h2>
				</ion-label>
				<p>{{ continent.code }}</p>
			</ion-item>
		</ion-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Continent } from '@/models/Continent.model'
import common from "@/components/common-ionic-components";
export default defineComponent({
	props: {
		continents: {
			type: Array<Continent>,
			required: true
		}
	},
	components: {
		...common,
	},
	setup() {


		return {}
	}
})
</script>

<style scoped>

</style>