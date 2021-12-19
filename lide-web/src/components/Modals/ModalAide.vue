<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          class="modal-header"
          id="modalTitle"
        >
          <slot name="header">
            AIDE
          </slot>
          <button
            type="button"
            class="btn-close"
            @click="close"
            aria-label="Close modal"
          >
            x
          </button>
        </header>

        <section
          class="modal-body"
          id="modalDescription"
        >
          <slot name="body">
            <h4>Comment créer un nouveau dossier ou fichier ?</h4>
            <p class="text_content">Sur LIDE, la création de dossiers ou de fichiers est simple
          d'utilisation, pour ajouter un projet, il suffit de cliquer sur l'icon
          dossier plus dans le menu de gauche puis de remplir les champs
          demandés. Pour ajouter un fichier, vous trouverez un bouton "Ajouté un
          fichier" en déroulant le menu de votre nouveau projet, comme pour le
          projet, remplissez les champs demandés. Et voilà, vous pouvez
          commencer à développer en cliquant sur votre fichier.
            </p>
          </slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer">
            <h4>Comment compiler et exécuter mon code ?</h4>
            <p>LIDE a été pensé pour simplifier la compilation et l'exécution du
          code. Il vous suffit juste dans un premier temps de sauvegarder votre
          fichier en cliquant sur le bouton "Sauvegarder" (icône disquette). Une
          fois votre fichier sauvegardé, il suffit simplement d'appuyer sur le
          bouton "Exécuter" (icône play) et l'UIDE se chargera de compiler et
          exécuter votre code. Si tout se passe bien, vous verrez votre résultat
          de compilation apparaître dans le Terminal en bas de l'application.
            </p>
          </slot>
          <button
            type="button"
            class="btn-green"
            @click="close"
            aria-label="Close modal"
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'ModalAide',
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>

<style>
  .text_content {
      left: 30px;
      right: 30px;
  }

  .modal-backdrop {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #004ccf;
    justify-content: space-between;
    text-align: center;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #004ccf;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #004ccf;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }
</style>