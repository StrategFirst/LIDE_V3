<template>
  <v-card
    class="pl-1 terminal-title"
    color="bodysecondary"
    width="100%"
    height="20"
    tile
  >
    <div class="d-flex justify-space-between">
      <span class="ml-2">TERMINAL</span>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
           size="18"
           color="blue"
           class="loading"
           v-bind="attrs"
           v-on="on"
           v-show="checkExecutionInProgress()"
           >mdi-loading</v-icon>
        </template>
        <span> Exécution en cours ... </span>
      </v-tooltip>

      <div class="mx-5">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              v-show="checkExecutionInProgress()"
              dark
              height="20"
              color="red"
              icon
              tile
              @click="kill"
            >
              <v-icon size="22">mdi-stop</v-icon>
            </v-btn>
          </template>
          <span>Arrêter l'exécution</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              height="20"
              icon
              tile
              @click="clear"
            >
              <v-icon size="18">mdi-delete</v-icon>
            </v-btn>
          </template>
          <span>Nettoyer le terminal</span>
        </v-tooltip>
      </div>
    </div>
  </v-card>
</template>

<script>
import ExecService from "../../services/exec-service";
import { mapState } from "vuex";

export default {
  name: "ActionTerminal",

  computed: {
    ...mapState({
      executionInProgress: (state) => state.execution.executionInProgress,
    }),
  },
  methods: {
    kill() {
      ExecService.killExecution( this.$store.getters['user/username'] )
        .then(() => {
          this.$root.$refs.Terminal.terminal.reset();
          this.$store.dispatch("notification/notif", {
            texte: "Exécution stoppée",
            couleur: "success",
          });
        })
        .catch(() => {
          this.$store.dispatch("notification/notif", {
            texte: "Impossible de stopper l'exécution.",
            couleur: "error",
          });
        });
    },
    clear() {
      this.$root.$refs.Terminal.terminal.clear();
      this.$store.dispatch("notification/notif", {
        texte: "Terminal nettoyé.",
        couleur: "success",
      });
    },
    checkExecutionInProgress() {
      return this.executionInProgress;
    },
  },
};
</script>

<style scoped>
.terminal-title {
  font-weight: bold;
  font-size: 0.775rem;
  letter-spacing: 0.1rem;
}

.loading {
  animation: rotate 2s linear forwards infinite;
}

@keyframes rotate {
  from {
    transform: rotate( 0turn);
  }

  to {
    transform: rotate( 1turn);
  }
}
</style>
