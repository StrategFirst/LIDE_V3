<template>
	<v-app>
		<v-app-bar
			color="appbar"
			height="56"
			elevation="1"
			dark
			clipped-left
			flat
			app
		>
			<img width="130" src="@/assets/img/ua.png" style="margin: auto;"/>
		</v-app-bar>

		<v-main class="mt-3">
			<v-container>
				<v-row>
					<v-col cols="6" style="margin: auto;">
						<v-text-field
							label="Identifiant"
							outlined
						></v-text-field>
						<v-text-field
							label="Mot de passe"
							outlined
							type="password"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="6" style="margin: auto; display: grid; grid-template-columns: repeat(2, 1fr); grid-gap: 3rem;">
						<v-btn 
							color="light-grey"
							class="font-weight-bold"
							@click="foldback()"
							>	↩</v-btn>
						<v-btn color="blue" @click="login()">Se connecter</v-btn>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>

import AppBar from "../components/appbar/AppBar";
import Explorer from "../components/explorer/Explorer";
import Editor from "../components/editor/Editor";
import Terminal from "../components/terminal/Terminal";
import ActionTerminal from "../components/terminal/ActionTerminal";
import SettingDrawer from "../components/drawer/SettingDrawer";
import HelpDrawer from "../components/drawer/HelpDrawer";
import Notification from "../components/utils/Notification";

export default {
	name: "Login",

	methods: {
		login: function () {
			this.$store.dispatch('user/setUsername', this.username);
			this.$store.dispatch('user/createUser',this.$store);
			this.$router.push('/app');
		},

		foldback: function () {
			this.$router.push('/');
		}
	}
};
</script>
<style>
</style>