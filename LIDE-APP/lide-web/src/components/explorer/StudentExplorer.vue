<template>
    <div>
        <v-card class="px-5">
            <v-card-title>Liste des élèves</v-card-title>
            <v-select v-model="test"
            :items="users"
            item-text="username"
            label="Choisissez"
            outlined>
            </v-select>
            <span>Projets de : {{test}}</span>
        </v-card>
        
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {

	data() {
		return {
            test: '',
		};
	},
	computed: {
		...mapState({
			users: (state) => state.user.users,
		}),
	},
	methods: {
        getProject: function(){
            this.test = 'Ok'
        },

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
        }
    },

    mounted() {
        this.getAllUsers();
    },
};

</script>

<style>

</style>
