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
			<img width="130" src="@/assets/img/ua.png" class="mx-auto"/>
		</v-app-bar>

		<v-main class="mt-3">
			<v-container>
				<v-row>
					<v-col cols="6" class="mx-auto">
						<v-text-field
							v-model="username"
							label="Identifiant"
							outlined
						></v-text-field>
						<v-text-field
							v-model="password"
							label="Mot de passe"
							outlined
							type="password"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row style="justify-content: center;">
					<v-col
						cols="1"
						>
						<v-btn 
							color="light-grey"
							class="font-weight-bold"
							@click="foldback()"
							>↩</v-btn>
					</v-col>
					<v-col
						cols="1">

						<v-btn color="blue" @click="login()">Se connecter</v-btn>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>

import AppBar from "../components/appbar/AppBar";	
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