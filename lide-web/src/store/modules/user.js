import service from "../../services/user-service";

const state = () => ({
    username: "",
    password: "",
    users: []
});

const getters = {
    username (state) {
        return state.username;
    },
    password (state) {
	return state.password;
    }
}

const actions = {

    setUsername({commit}, username){
        commit('SET_USERNAME', username)
    },
    setPassword({commit}, password){
        commit('SET_PASSWORD', password)
    },
    async createUser(context) {
        let response = await service.createUser(context.getters.username, context.getters.password);
	if( response.status == 200 ) {
            localStorage.username = context.getters.username;
            return response;
	} else {
            throw response;
	}
    },
    async fetchUsers({ commit }) {
        await service.getAll()
            .then(res => {
                res.json().then(value => {
                    commit("SET_USERS", value);
                });
            })
    },
}

const mutations = {
    SET_USERNAME(state, username){
        state.username = username;
    },
    SET_PASSWORD(state, password){
        state.password = password;
        console.log( 'password set');
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
