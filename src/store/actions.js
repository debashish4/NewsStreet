import * as types from '../constants/mutation_types'

const toggleReadMorePanel = ({ commit }) => {
    commit(types.TOGGLE_READ_MORE_PANEL)
};

const toggleNewsListModal = ({ commit }) => {
    commit(types.TOGGLE_NEWS_LIST_MODAL)
};

const closeNewsListModal = ({ commit }) => {
    commit(types.CLOSE_NEWS_LIST_MODAL, false)
};

const saveSelectedNews = ({ commit }, payload) => {
    commit(types.SAVE_SELECTED_NEWS, payload)
};

const toggleDrawer = ({ commit }) => {
    commit(types.TOGGLE_DRAWER)
};

const openDrawer = ({ commit }) => {
    commit(types.OPEN_DRAWER)
};

const saveSocialShareData = ({ commit }, payload) => {
    commit(types.SAVE_SOCIAL_SHARE_DATA, payload)
};

const changeCountry = ({ commit }, payload) => {
    commit(types.CHANGE_COUNTRY, payload)
};

const triggerToast = ({ commit }, payload) => {
    commit(types.TRIGGER_TOAST, payload)
};

export { triggerToast, changeCountry, saveSocialShareData, openDrawer, toggleDrawer, toggleReadMorePanel, toggleNewsListModal, closeNewsListModal, saveSelectedNews }