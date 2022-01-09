import service from "../../services/user-service";

const state = () => ({
    username: "",
    users: []
});

const getters = {
    username (state) {
        return state.username;
    },
}

const actions = {

    setUsername({commit}, username){
        commit('SET_USERNAME', username)
    },
    async createUser(context) {
        let response = await service.createUser(context.getters.username, context.getters.password);
	if( response.status == 200 ) {
            localStorage.username = context.getters.username;
            return response;
	} else
            throw response;
    },

    async fetchUsers({ commit }) {
        await service.getAll()
            .then( res => res.json() )
            .then( value => commit("SET_USERS", value) )
    },

}

const mutations = {
    SET_USERNAME(state, username){
        state.username = username;
    },
    SET_USERS(state, users){
        state.users = users;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
