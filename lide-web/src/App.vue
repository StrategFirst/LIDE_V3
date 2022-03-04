<template>
	<div>
		<router-view></router-view>
		<BetaInfo />
	</div>
</template>

<script>
import BetaInfo from './components/banner/BetaInfo.vue';

export default {
	components:{
		BetaInfo,
	}
};
</script>

<style>
html {
	overflow-y: auto !important; /* Permet de supprimer la barre de scroll vertical lorsque la page utilise tout l'écran sans le dépasser */
}
</style>
