<template>
    <div class="bloc-modale" >

        <div class="overlay"></div>




        <v-card class="modale">
            <v-btn elevation="2" text class="btn-modale btn btn-danger" @click="$emit('close')">X</v-btn> 
            <h2>
                <p class="mt-5 text-center size-text-1 text--blue">Contactez-nous</p>
            </h2>
            <br>
            <v-form v-model="valid" ref="form" lazy-validation>
                <v-container>
                    <v-row class="form-exemple">
                        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required> </v-text-field>
                    </v-row>

                    <v-row>
                        <v-text-field v-model="object" :rules="objetRules"  label="Objet" required></v-text-field>
                    </v-row>

                    <v-row>
                        <v-textarea
                           v-model="content"
                           :rules="messageRules"
                            label="Message"
                            required></v-textarea>
                    </v-row>
                    <br>
                    <v-btn 
                        color="success"
                        class="mr-4"
                        @click.prevent="sendMail"
                        :disabled="!valid"
                    >
                        Envoyer
                    </v-btn>
  

                </v-container>
            </v-form>
        </v-card>
    </div>
</template>

<script>

export default {
    name: 'Modal',
    data(){
        return{
            emailRules: [
                            v=> !!v || "L'email est obligatoire",
                        
                        ],
            objetRules: [
                            v=> !!v || "L'objet est obligatoire",
                        
                        ],
            messageRules: [
                            v=> !!v || "Le contenu du message vide",
                        
                        ],
            valid: false,
            object: '',
            email: '',
            content: ''
        }
    },
    methods: {
        sendMail: function () {
            if(this.object == "" || this.email == "" || this.content == 0){
                alert('Formulaire invalide');
            }else{
                this.$store.dispatch('mail/setEmail', this.email);
                this.$store.dispatch('mail/setObject', this.object);
                this.$store.dispatch('mail/setContent', this.content);
                this.$store.dispatch('mail/sendMail',this.$store);
                this.$emit('close');
                alert('Votre message a bien été envoyé');
            }
            
        }
    }
    
}

</script>

<style scoped>

    .bloc-modale {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .overlay {
        background: rgba(0,0,0,0.5);
    }
    .modale {
        background: #ffffff;
        color: #333333;
        padding: 60px;
        position: fixed;
        bottom: 25%;
        width: 40%;
    }
    .btn-modale {
        position: absolute;
        top: 10px;
        right: 10px;
    }
</style>