<template>
	<div>
		<v-subheader>
			EXPLORER
			<v-spacer></v-spacer>
			<v-tooltip bottom>
				<template v-slot:activator="{ on, attrs }">
					<v-btn v-bind="attrs" v-on="on" icon @click="openDialogExport">
						<v-icon>mdi-export-variant</v-icon>
					</v-btn>
				</template>
				<span>Exporter ses fichiers</span>
			</v-tooltip>
			<v-tooltip bottom>
				<template v-slot:activator="{ on, attrs }">
					<v-btn v-bind="attrs" v-on="on" @click="openDialogCreateProject" icon>
						<v-icon>mdi-folder-plus</v-icon>
					</v-btn>
				</template>
				<span>Créer un projet</span>
			</v-tooltip>
		</v-subheader>

		<v-dialog v-model="dialogCreateProject" persistent max-width="410">
			<v-card
				class="px-5"
				v-on:keydown.esc="closeDialogCreateProject"
				v-on:keydown.enter="createProject"
			>
				<v-card-title class="title">Créer un nouveau projet</v-card-title>
				<v-form ref="projetForm" @submit.prevent="createProject">
					<v-text-field
						class="mt-2"
						label="Nom du projet"
						v-model="projectname"
						outlined
						dense
						autofocus
						:rules="projetRules"
						required
					>
					</v-text-field>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							color="red darken-1"
							small
							outlined
							@click="closeDialogCreateProject"
							>Annuler</v-btn
						>
						<v-btn color="green darken-1" small outlined type="submit"
							>Créer</v-btn
						>
					</v-card-actions>
				</v-form>
			</v-card>
		</v-dialog>

		<v-dialog v-model="dialogExport" persistent width="auto">
			<v-card
				v-on:keydown.esc="dialogExport = false"
				v-on:keydown.enter="exportFile"
				class="pa-4"
			>
				<v-card-title class="title">Exporter vos fichiers</v-card-title>
				<v-card-actions>
					<v-btn
						color="red darken-1"
						small
						outlined
						@click="dialogExport = false"
						>Annuler</v-btn
					>
					<v-btn color="green darken-1" small outlined @click="exportFileZIP"
						>Exporter (zip)</v-btn
					>
					<v-btn color="green darken-1" small outlined @click="exportFileTGZ"
						>Exporter (tgz)</v-btn
					>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import { mapState } from "vuex";

// Service
import ExportService from "../../services/export-service";

export default {
	data() {
		return {
			projectname: "",
			dialogCreateProject: false,
			dialogExport: false,
			projetRules: [
				(p) => p != null || "Vous devez écrire au moins un caractère !",
				(p) => /^[^\s][a-zA-Z0-9_-]*$/.test(p) || "Nom du projet invalide.",
			],
		};
	},

	methods: {
		createProject: function () {
			// (Tanguy) Il n'y a plus de catch car le back retourne une erreur et celle-ci refuse
			// d'aller dans le catch par conséquent dans le 'then' je compare le status de la 'promise' 
			if (this.$refs.projetForm.validate() && this.projectname != "") {
				this.$store
					.dispatch("project/create", this.projectname)
					.then((res) => {
						// status Ok
						if(res.status == 201){
							this.$store.dispatch("notification/notif", {
								texte: "Votre projet a bien été créé.",
								couleur: "success",
							});
						}else {
							// status bad request
							this.$store.dispatch("notification/notif", {
								texte: "Une erreur est survenue lors de la création du projet.",
								couleur: "error",
							});
						}
					});
				this.$refs.projetForm.reset();
				this.dialogCreateProject = false;
			}
		},
		openDialogCreateProject() {
			this.dialogCreateProject = true;
		},
		closeDialogCreateProject() {
			this.$refs.projetForm.reset();
			this.dialogCreateProject = false;
		},

		openDialogExport() {
			this.dialogExport = true;
		},
    
		async exportFileZIP() { try { await ExportService.exporter('zip',this.username); this.dialogExport=false; } catch(err) { this.$store.dispatch("notification/notif", { texte: "Une erreur est survenue lors de l'exportation.", couleur: "error",	});} },
		async exportFileTGZ() { try { await ExportService.exporter('tgz',this.username); this.dialogExport=false; } catch(err) { this.$store.dispatch("notification/notif", { texte: "Une erreur est survenue lors de l'exportation.", couleur: "error",	});} },

	},
	computed: {
		...mapState({
			username: (state) => state.user.username,
		}),
	},
};

</script>

<style scoped>
</style>
