import * as types from '../constants/mutation_types'

const toggleReadMorePanel = ({commit}) => {
    commit(types.TOGGLE_READ_MORE_PANEL, true)
}

export { toggleReadMorePanel }