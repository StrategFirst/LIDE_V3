import UserService from "../../services/user-service";
import ProjectService from "../../services/project-service";

/* ------------------------- PROJECT STATE ------------------------- */
const state = () => ({
    projects: [],
    currentProjectId: "",
});

/* ------------------------- PROJECT GETTERS ------------------------- */
const getters = {
    projects(state) {
        return state.projects;
    },
    currentProjectId(state) {
        return state.currentProjectId;
    },
};

/* ------------------------- PROJECT ACTIONS ------------------------- */
const actions = {
    async fetchProjects({ commit, rootState }) {
        await UserService.getUserProjects( )
            .then(res => {
                res.json().then(value => commit("SET_PROJECTS", value));
            })
    },

    async fetchProjectsFromUser({ commit }, usernameTarget ){
        await UserService.getUserProjects( usernameTarget )
            .then(res => {
                res.json().then(value => commit("SET_PROJECTS", value));
            })
    },

    async create({ dispatch , rootState }, projectname) {
        return await ProjectService.create(projectname, rootState.user.username ).then((res) => {
                dispatch('fetchProjects');
                return res;
            })
    },

    async remove({ dispatch , rootState }, projectid) {
        await ProjectService.remove(projectid, rootState.user.username )
            .then(() => {
                dispatch('fetchProjects');
            })
    },

    async rename({ dispatch, rootState }, { projectid, newprojectname }) {
        return await ProjectService.rename(projectid, newprojectname, rootState.user.name ).then((res) => {
                dispatch('fetchProjects');
                return res;
            })
    },

    async setCurrentProjectId({ commit }, projectid) {
        commit("SET_CURRENT_PROJECT_ID", projectid);
    },
};

/* ------------------------- PROJECT MUTATIONS ------------------------- */
const mutations = {
    SET_PROJECTS(state, projects) {
        state.projects = projects;
    },
    SET_CURRENT_PROJECT_ID(state, projectid) {
        state.currentProjectId = projectid;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
