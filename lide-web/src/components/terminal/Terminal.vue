<template>
	<div
		ref="terminal"
		class="body px-1"
		:style="{ height: terminalHeight + 'px' }"
	></div>
</template>

<script>
import { Terminal } from "xterm";
import { AttachAddon } from "xterm-addon-attach";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

export default {
	data() {
		return {
			terminalHeight: 0,
			nbRow: 0,
			terminal: new Terminal({ theme: { background: "#151515" } }),
			fitAddon: new FitAddon(),
			socket: null,
		};
	},
	methods: {
		openSocket(containerId) {
			this.$store
				.dispatch("execution/setExecutionInProgress", true)
				.catch((error) => {
					console.error(error);
				});

			console.log("Le terminal a reçu le container ID : " , containerId);
			// Recharger le terminal et le socket si ce n'est pas la première fois
			if(this.socket !== null) {
				this.socket.close();
				this.terminal.reset();
			}
			// this.socket = new WebSocket(process.env.VUE_APP_LIDE_WSS_URL);
			// (Tanguy) en local il faut utiliser le web socket local donc ws:localhost:10001/
			this.socket = new WebSocket(`wss://${window.location.hostname}:10001/`); //new WebSocket("ws:localhost:10001/");
			this.socket.onopen = () => {
				// on récupère l'identifiant du conteneur
				this.socket.send(containerId);
			};
			// Liaison socket-terminal
			this.terminal.loadAddon(new AttachAddon(this.socket, { bidirectional: true }));
 
			// une fois le socket fermé on affiche un message de fin dans le terminal
			this.socket.onclose = () => {	
				this.terminal.writeln("");
				this.terminal.writeln("---- Fin de l'éxécution ---- ");
				this.$store
					.dispatch("execution/setExecutionInProgress", false)
					.catch((error) => {
						console.error(error);
					});
			};

		},
		setSize() {
			this.terminalHeight = (window.innerHeight - 56 - 48 - 20) * (30 / 100);
			this.fitAddon.fit();
		},
	},

	created() {
		this.$root.$refs.Terminal = this;
		window.addEventListener("resize", this.setSize);
		this.setSize();
	},

	destroyed() {
		window.removeEventListener("resize", this.setSize);
	},

	mounted() {
		this.terminal.open(this.$refs.terminal);
		this.terminal.resize(160, this.nbRow);
		this.terminal.loadAddon(this.fitAddon);
		this.setSize();
	},
};
</script>

<style>
.xterm .xterm-viewport {
	overflow-y: auto;
}
</style>
