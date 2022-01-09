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

    async createUser( {commit} , { username, password} ) {
        let response = await service.createUser( username, password );
	if( response.status == 200 ) {
            commit("SET_USERNAME", username);
            let data = await response.json();
            localStorage.authtoken = data.token;
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
