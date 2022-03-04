
const state = () => ([]);

const getters = {
    last(state) {
        return state[0];
    },
}

const actions = {
    notif({ commit }, { texte, type }) {
        commit('AJOUT_NOTIF', { texte, type } );
    },
    lu({ commit }, _ ) {
        commit('RETRAIT_NOTIF', _);
    },
}

const mutations = {
    AJOUT_NOTIF(state, {texte,type}) {
        state.texte = texte;
    },
    RETRAIT_NOTIF(state, _) {
        state.couleur = couleur;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
