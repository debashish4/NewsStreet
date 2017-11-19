import * as types from '../constants/mutation_types'


const mutations = {
    [types.TOGGLE_READ_MORE_PANEL](state, payload){
        state.app.isReadMorePanelOpen = !state.app.isReadMorePanelOpen;  
    },
    [types.TOGGLE_NEWS_LIST_MODAL](state, payload){
        state.app.isNewsListModalOpen = !state.app.isNewsListModalOpen;
    },
    [types.CLOSE_NEWS_LIST_MODAL](state, payload){
        state.app.isNewsListModalOpen = false
    }
};

export { mutations };
