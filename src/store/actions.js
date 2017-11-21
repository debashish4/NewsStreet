import * as types from '../constants/mutation_types'

const toggleReadMorePanel = ({commit}) => {
    commit(types.TOGGLE_READ_MORE_PANEL)
};

const toggleNewsListModal = ({commit}) => {
    commit(types.TOGGLE_NEWS_LIST_MODAL)
};

const closeNewsListModal = ({ commit }) => {
    commit(types.CLOSE_NEWS_LIST_MODAL, false)
}

const saveSelectedNews = ({commit}, payload) => {
    commit(types.SAVE_SELECTED_NEWS, payload)
}

export { toggleReadMorePanel, toggleNewsListModal, closeNewsListModal, saveSelectedNews}