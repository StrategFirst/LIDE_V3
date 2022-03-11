
const state = () => ({
    enonces: [
        "tutorat-algo1"
    ],
    enonce: null
});

const getters = {
    enonce(state) {
        return state.enonce;
    },
    enonces(state) {
	return state.enonces;
    },
}

const actions = {
    setEnonce({ commit }, val) {
        commit('SET_ENONCE', val);
    },
}

const mutations = {
    SET_ENONCE(state, enonce) {
        state.enonce = enonce;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
