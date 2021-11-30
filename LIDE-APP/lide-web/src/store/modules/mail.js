import service from "../../services/mail-service";

const state = () => ({
    email: "",
    object: "",
    content: "",
});

const getters = {
    email(state)  {
        return state.email;
    },
    object(state)  {
        return state.object;
    },
    content(state)  {
        return state.content;
    }
}

const actions = {
    setEmail({commit}, email){
        commit('SET_EMAIL', email)
    },
    setObject({commit}, object){
        commit('SET_OBJECT', object)
    },
    setContent({commit}, content){
        commit('SET_CONTENT', content)
    },
    sendMail(context){
        console.log("Envoie mail " + context.getters.email + " " + context.getters.object + " " + context.getters.content);
        service.sendMail(context.getters.email, context.getters.object, context.getters.content);
    }
}

const mutations = {
    SET_EMAIL(state, email){
        state.email = email;
    },
    SET_OBJECT(state, object){
        state.object = object;
    },
    SET_CONTENT(state, content){
        state.content = content;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}