import Vue from 'vue';
import Vuex from 'vuex';
import { mutations } from './mutations';
import * as actions from './actions';

Vue.use(Vuex);


const state = {

    app: {
        isDrawerOpen: false,
        isReadMorePanelOpen: false,
        isNewsListModalOpen: false,
    },
    news: {
        selectedNews: [],
        socialShareData: {}
    },
    settings: {
        country: 'in',
    },
    toast: ''
};

export default new Vuex.Store({
    state,
    mutations,
    actions
})