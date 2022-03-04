<template>
	<v-alert
		type="warning"

		dismissible
		flat
		id="InfoBeta"
	> 
		<b> LIDE V3 est en beta ! </b>
		Si vous avez un <u>problème</u> ou trouvez qu'il <u>manque une fonctionnalité</u>
		contactez <a href="mailto:matoulon@etud.univ-angers.fr">matoulon@etud.univ-angers.fr</a>
	</v-alert>
</template>

<script>
export default {
	name: "BetaInfo",
	components: {},
};
</script>

<style>

#InfoBeta {
	width: 80vw;
	margin: 2rem 0;

	z-index: 999999;

	position: fixed;
	top: 0;
	left: 50%;
	transform: translate(-50%, 0);

	background-color: #FF9800;
	font-family: "Roboto", monospace, sans-serif;
	box-shadow: #fff 0 0 2px 2px,#fff7 0 0 8px 8px;
}

#InfoBeta a {
	color: inherit;
}

</style>
