<template>
    <div>
        <v-card class="px-5">
            <v-card-title>Liste des élèves</v-card-title>
            <v-select v-model="idUser"
            :items="users"
            item-text="username"
            item-value='username'
            label="Choisissez"
            v-on:change="getAllProjectsUser"
            outlined>
            </v-select>
            <span>Projets de : {{idUser}}</span>
        </v-card>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {

	data() {
		return {
            idUser: '',
		};
	},
	computed: {
		...mapState({
			users: (state) => state.user.users,
            projects: (state) => state.project.projects
		}),
	},
	methods: {

        getAllUsers: function(){
            this.$store
				.dispatch("user/fetchUsers")
				.catch((error) => {
					this.$store.dispatch("notification/notif", {
						texte: "Un problème est survenue.",
						couleur: "error",
					});
				})
				.then(() => {
					this.$store.dispatch("notification/notif", {
						texte: "Récupération des utilisateurs, Ok !",
						couleur: "success",
					});
				});
        },

        getAllProjectsUser: function(){
            console.log(this.idUser)
            this.$store
				.dispatch("project/fetchProjectsFromUser", this.idUser)
				.catch((error) => {
					this.$store.dispatch("notification/notif", {
						texte: "Un problème est survenue.",
						couleur: "error",
					});
				})
				.then(() => {
					this.$store.dispatch("notification/notif", {
						texte: "Récupération des projets, Ok !",
						couleur: "success",
					});
				}); 
                console.log(this.projects)
        }
    },

    mounted() {
       this.getAllUsers();
    },
};

</script>

<style>

</style>
