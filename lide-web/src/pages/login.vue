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
			<Notification />

		</v-main>
	</v-app>
</template>

<script>

import AppBar from "../components/appbar/AppBar";	
import Notification from "../components/utils/Notification";

export default {
	name: "Login",

	components: {
		Notification,
	},

	methods: {
		login: function () {
			this.$store.dispatch('user/setUsername', this.username );
                        this.$store.dispatch('user/setPassword', this.password );
			this.$store.dispatch('user/createUser', this.$store)
				.then( (response)=> {
					this.$router.push('/app');
				} )
				.catch( (response)=> {
					let texte;
					switch( response.status ) {
						case 401: texte = 'Mot de passe ou identifiant incorrect'; break;
						case 501: texte = 'La plateforme ne supporte que les étudiants pour l\'instants !'; break;
						case 503: texte = 'Erreur du CAS'; break;
						default: texte = 'Erreur d\'origine inconnu';
					}
					this.$store.dispatch('notification/notif' , {
						texte,
						couleur: "error"
					} );
				} )
		},

		foldback: function () {
			this.$router.push('/');
		}
	}
};
</script>
