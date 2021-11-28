import service from "../../services/user-service";

const state = () => ({
    username: "",
    users: []
});

const getters = {
    username (state)  {
        return state.username;
    }
}

const actions = {
    setUsername({commit}, username){
        commit('SET_USERNAME', username)
    },
    createUser(context){
        console.log("user du createUser du store " + context.getters.username);
        localStorage.username = context.getters.username;
        service.createUser(context.getters.username);
    },
    async fetchUsers({ commit }) {
        await service.getAll()
            .then(res => {
                res.json().then(value => commit("SET_USERS", value));
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