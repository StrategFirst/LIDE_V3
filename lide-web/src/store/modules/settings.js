
const state = () => ({
    darkMode: false,
    colorMode: "light",
    indentation: 4,
    theme: "base16-dark",
    terminalTheme: "#ffffff",
    ideTheme: "dark",
    enoncePanelWidth: 20,
    themes: [
        "default",
        "3024-day",
        "3024-night",
        "abcdef",
        "ambiance",
        "ayu-dark",
        "ayu-mirage",
        "base16-dark",
        "base16-light",
        "bespin",
        "blackboard",
        "cobalt",
        "colorforth",
        "darcula",
        "dracula",
        "duotone-dark",
        "duotone-light",
        "eclipse",
        "elegant",
        "erlang-dark",
        "gruvbox-dark",
        "hopscotch",
        "icecoder",
        "idea",
        "isotope",
        "lesser-dark",
        "liquibyte",
        "lucario",
        "material",
        "material-darker",
        "material-palenight",
        "material-ocean",
        "mbo",
        "mdn-like",
        "midnight",
        "monokai",
        "moxer",
        "neat",
        "neo",
        "night",
        "nord",
        "oceanic-next",
        "panda-syntax",
        "paraiso-dark",
        "paraiso-light",
        "pastel-on-dark",
        "railscasts",
        "rubyblue",
        "seti",
        "shadowfox",
        "solarized dark",
        "solarized light",
        "the-matrix",
        "tomorrow-night-bright",
        "tomorrow-night-eighties",
        "ttcn",
        "twilight",
        "vibrant-ink",
        "xq-dark",
        "xq-light",
        "yeti",
        "yonce",
        "zenburn",
    ],
    selectIdeBis: [
        "light",
        "dark",
        "orange",
        "red",
        "green",
        "purple",
        "yellow",
    ]
});

const getters = {
    enoncePanelWidth(state) {
        return state.enoncePanelWidth;
    },
    darkMode(state) {
        return state.darkMode;
    },
    colorMode(state) {
        return state.colorMode;
    },
    indentation(state) {
        return state.indentation;
    },
    theme(state) {
        return state.theme;
    },
    terminalTheme(state) {
        return state.terminalTheme;
    },
    ideTheme(state) {
        return state.ideTheme;
    },
    ide(state) {
        return state.ide;
    }

}

const actions = {
    setEnoncePanelWidth({ commit }, size) {
        commit('SET_ENONCEPANELWIDTH', size);
    },
    setDarkMode({ commit }, darkMode) {
        commit('SET_DARKMODE', darkMode);
    },
    setColorMode({ commit }, colorMode) {
        commit('SET_COLOR_MODE', colorMode);
    },
    setTheme({ commit }, theme) {
        commit('SET_THEME', theme);
    },
    setIndentation({ commit }, indentation) {
        commit('SET_INDENTATION', indentation);
    },
    setTerminalTheme({commit}, theme) {
        commit('SET_TERMINAL_THEME', theme);
    },
    setIdeTheme({ commit }, ideTheme) {
        commit('SET_IDE_THEME', ideTheme);
    }
}

const mutations = {
    SET_DARKMODE(state, darkMode) {
        state.darkMode = darkMode;
    },
    SET_COLOR_MODE(state, colorMode) {
        state.colorMode = colorMode;
    },
    SET_THEME(state, theme) {
        state.theme = theme;
    },
    SET_INDENTATION(state, indentation) {
        state.indentation = indentation;
    },
    SET_TERMINAL_THEME(state, theme) {
        state.terminalTheme = theme;
    },
    SET_IDE_THEME(state, ideTheme) {
        state.ideTheme = ideTheme;
    },
    SET_ENONCEPANELWIDTH(state, size) {
       state.enoncePanelWidth = size;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
