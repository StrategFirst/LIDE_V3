
const state = () => ({
    enonceTDTPDrawer: false,
    settingDrawer: false,
    helpDrawer: false,
});

const getters = {
    enonceTDTPDrawer(state) {
        return state.enonceTDTPDrawer;
    },
    settingDrawer(state) {
        return state.settingDrawer;
    },
    helpDrawer(state) {
        return state.helpDrawer;
    }
}

const actions = {
    openSettingDrawer({commit}){
        commit('SET_SETTING_DRAWER', true);
        commit('SET_HELP_DRAWER', false);
        commit('SET_ENONCETDTP_DRAWER', false);
    },
    openHelpDrawer({commit}){
        commit('SET_HELP_DRAWER', true);
        commit('SET_SETTING_DRAWER', false);
        commit('SET_ENONCETDTP_DRAWER', false);
    },
    openEnonceTDTPDrawer({commit}){
        commit('SET_HELP_DRAWER', false);
        commit('SET_SETTING_DRAWER', false);
        commit('SET_ENONCETDTP_DRAWER', true);
    },
    closeSettingDrawer({commit}){
        commit('SET_SETTING_DRAWER', false);
    },
    closeHelpDrawer({commit}){
        commit('SET_HELP_DRAWER', false);
    },
    closeEnonceTDTPDrawer({commit}){
        commit('SET_ENONCETDTP_DRAWER', false);
    }
}

const mutations = {
    SET_SETTING_DRAWER(state, settingDrawer){
        state.settingDrawer = settingDrawer;
    },
    SET_HELP_DRAWER(state, helpDrawer){
        state.helpDrawer = helpDrawer;
    },
    SET_ENONCETDTP_DRAWER(state, status){
        state.enonceTDTPDrawer = status;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
