<template>
	<div>
		<HeaderExplorer />
		<v-divider></v-divider>	
		<StudentExplorer />
		<v-divider></v-divider>
		<TreeviewExplorer />
	</div>
</template>

<script>
import HeaderExplorer from "./HeaderExplorer";
import TreeviewExplorer from "./TreeviewExplorer";
import StudentExplorer from "./StudentExplorer.vue";

export default {
	name: "Explorer",

	components: {
		HeaderExplorer,
		TreeviewExplorer,
		StudentExplorer
	},
	computed: {
		explorerDrawer: {
			get:function() { return this.$store.state.drawer.explorerDrawer},
			set: () => null
		}
	},
};
</script>

<style scoped>

</style>