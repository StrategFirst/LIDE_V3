<template>
	<div>
		<v-alert
			:color="couleur"
			>
				{{ text }}
		</v-alert>
	</div>
</template>

<script>
import NotificationStore from '@/store/modules/notification.js';


export default {
	props: ['name','localPath'],
	methods: {
		listen:function() {	
			this.$store.subscribe((mutation,state) => {
				if(mutation.type=='AJOUT_NOTIF') {
					console.log('AJOUT_NOTIF',state);
				}
			});
		}
	}
};
</script>