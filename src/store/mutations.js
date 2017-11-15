import * as types from '../constants/mutation_types'


const mutations = {
    [types.TOGGLE_READ_MORE_PANEL](state, payload){
        state.app.isReadMorePanelOpen = !state.app.isReadMorePanelOpen;  
    }
};

export { mutations };
