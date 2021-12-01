import FileService from "../../services/file-service";

/* ------------------------- FILE STATE ------------------------- */
const state = () => ({});

/* ------------------------- FILE GETTERS ------------------------- */
const getters = {}

/* ------------------------- FILE ACTIONS ------------------------- */
const actions = {
    // (Tanguy) Crée un fichier puis retourne un objet de type 'file' qui est contenu dans une promise donc 'res' 
    // contient une promise, je retourne une promise car une promise contient un status ce qui me permet de 
    // comparer dans 'TreeviewExplorer' si le back a réussi à créer un fichier ou non  
    async create({ dispatch }, { projectid, filename, extension }) {
        return await FileService.create(projectid, filename, extension).then(res => {
            dispatch("project/fetchProjects", null, { root: true }); 
            return res;   
        });
    },

    // (Tanguy) Le fonctionnement de cette fonction reste similaire à la fonction create qui est juste au-dessus sauf 
    // qu'ici je vérifie qu'un tab(onglet) est présente pour le renommer  
    async rename({ dispatch }, { fileid, newfilename, extension }) {
        return await FileService.rename(fileid, newfilename, extension)
                .then(async (res) => {
                    if(res.status == 200){
                        let tab = await dispatch("tab/getTab", fileid, { root: true });7
                        // on renomme la tab uniquement si elle est ouverte
                        if(tab){
                            dispatch("tab/updateTabFileName", { tab: tab, newfilename: newfilename }, { root: true });
                        }
                        dispatch("project/fetchProjects", null, { root: true });
                    }
                    return res;
                });
    },

    async remove({ dispatch }, fileid) {
        FileService.remove(fileid).then(async () => {
            let tab = await dispatch("tab/getTab", fileid, { root: true });
            dispatch("tab/closeTab", tab, { root: true });
            dispatch("project/fetchProjects", null, { root: true });
        })
    },
}

/* ------------------------- FILE MUTATIONS ------------------------- */
const mutations = {
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
