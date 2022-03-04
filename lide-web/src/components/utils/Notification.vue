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

this.$store.subscribe((mutation,state) => {
	if(mutation.type=='AJOUT_NOTIF') {
		console.log('AJOUT_NOTIF',state);
	}
});

export default {
	props: ['name','localPath'],
};
</script>