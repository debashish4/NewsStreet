import * as types from '../constants/mutation_types'


const mutations = {
    [types.TOGGLE_READ_MORE_PANEL](state){
        state.app.isReadMorePanelOpen = !state.app.isReadMorePanelOpen;  
    },
    [types.TOGGLE_NEWS_LIST_MODAL](state){
        state.app.isNewsListModalOpen = !state.app.isNewsListModalOpen;
    },
    [types.CLOSE_NEWS_LIST_MODAL](state, payload){
        state.app.isNewsListModalOpen = false;
    },
    [types.SAVE_SELECTED_NEWS](state, payload){
        state.news.selectedNews = payload;
    },
    [types.TOGGLE_DRAWER](state){
        state.app.isDrawerOpen = !state.app.isDrawerOpen;
    },
    [types.OPEN_DRAWER](state) {
        state.app.isDrawerOpen = true;
    },
    [types.SAVE_SOCIAL_SHARE_DATA](state, payload){
        state.news.socialShareData = payload
    }
};

export { mutations };
