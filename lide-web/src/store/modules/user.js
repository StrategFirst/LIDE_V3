import service from "../../services/user-service";
import cas from "../../services/cas-service";
const state = () => ({
    username: "",
    users: []
});

const getters = {
    username (state)  {
        return state.username;
    },
	password (state)  {
		return state.password;
	}

}

const actions = {

    setUsername({commit}, username){
        commit('SET_USERNAME', username)
    },
    createUser(context){
		console.log( cas.login(context.getters.username, context.getters.password ).then( console.log ) );
        console.log("user du createUser du store " + context.getters.username);
        // (Tanguy) on stocke le nom de l'utilisateur dans un objet localStorage qui stocke des données côté client
        localStorage.username = context.getters.username;
        service.createUser(context.getters.username);
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