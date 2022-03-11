<template>
	<!-- Enonce TD/TP Drawer -->
	<v-navigation-drawer
		class="drawer-enoncetdtp"
		v-model="enonceTDTPDrawerStatus"
		color="bodysecondary"
		:width="enoncePanelWidth"
		right
		absolute
	>
		<v-card height="48" color="bodysecondary" outlined tile>
			<v-row>
				<v-col cols="8">
					<h2 class="ml-5 mt-2 text--secondary">Enonce</h2>
				</v-col>
				<v-col cols="1">
					<v-btn
						class="mt-2 ml-3 text--secondary close-btn"
						@click="closeDrawerEnonceTDTP"
						small
						text
					>
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</v-col>
			</v-row>
		</v-card>
		<v-row justify="center">
			<v-col cols="18">
				<v-select
					class="mx-3 my-1"
					v-model="selectedEnonce"
					:items="enonces"
					dense
					outlined
					label="Choisissez l'énoncé à afficher."
					@change="setEnonce"
				></v-select>
			</v-col>
		</v-row>
		<iframe
			:src="pathToEnonce" >
		</iframe>
	</v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
export default {
	name: "EnonceTDTPDrawer",
	data() {
		return {};
	},
	computed: {
		...mapState({
			enonceTDTPDrawer: (state) => state.drawer.enonceTDTPDrawer,
			enonces: (state) => state.enonce.enonces,
			enonceShown: (state) => state.enonce.enonce,
			enoncePanelWidth: (state) => `${state.settings.enoncePanelWidth}vw`,
			pathToEnonce: (state) => `/enonce/${state.enonce.enonce}.pdf`,
		}),
		enonceTDTPDrawerStatus: {
			get() {
				return this.enonceTDTPDrawer;
			},
			set(val) {
				return val;
			},
		},

                selectedEnonce: {
                        get() {
                                return this.enonceShown;
                        },
                        set(val) {
                                return val;
                        },
                },
	},
	methods: {
		closeDrawerEnonceTDTP: function () {
			this.$store.dispatch("drawer/closeEnonceTDTPDrawer");
		},
                setEnonce(value) {
                        this.$store.dispatch("enonce/setEnonce", value);
                },
	},
};
</script>

<style scoped>
.drawer-enoncetdtp iframe {
	width: 100%;
	height: Calc(100% - 8rem);
}

.close-btn {
	position: absolute;
	right: 0;
}
</style>
