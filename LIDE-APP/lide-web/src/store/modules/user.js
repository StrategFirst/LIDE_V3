import service from "../../services/user-service";

const state = () => ({
    username: "",
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
    }
}

const mutations = {
    SET_USERNAME(state, username){
        state.username = username;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}