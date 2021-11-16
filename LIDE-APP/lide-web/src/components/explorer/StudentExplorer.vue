<template>
    <div>
        <v-card class="px-5">
            <v-card-title>Liste des élèves</v-card-title>
            <v-select v-model="test"
            :items="students"
            item-text="name"
            label="Choisissez"
            outlined>
            </v-select>
            <span>Projets de : {{test}}</span>
        </v-card>
        
    </div>
</template>

<script>

export default {
	data() {
		return {
            test: '',
            students: [
                {ID:'1', name: 'Horion Antoine'},
                {ID:'2', name: 'UnJean Antoine'},
                {ID:'3', name: 'UnAutreJean Antoine'},
            ],
		};
	},
	computed: {
		
	},
	methods: {
        getProject: function(){
            this.test = 'Ok'
        }
    }
};

</script>

<style>

</style>
