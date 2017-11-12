import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


const state = {
    app: {
        isDrawerOpen: false,
    }
};

export default new Vuex.Store({
    state
})