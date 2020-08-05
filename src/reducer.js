const reducer = (state, action) => {
    switch(action.type){
        case 'SIGN_IN_SUCCESS':
            return {
            ...state,
            bs_user: action.payload,
            isAuthenticated: true
            }
        case 'USER_IS_AUTHENTICATED':
            return {
            ...state,
            isAuthenticated: true
            }
        case 'LOG_OUT':
            return {
            ...state,
            isAuthenticated: false
            }
        case 'LOADING_DISABLED':
            return {
            ...state,
            isLoading: false
            }
        case 'LOADING_ENABLED':
            return {
            ...state,
            isLoading: true
            }
        case 'TOGGLE_SIDEMODAL':
            return {
            ...state,
            sideModalOpen: action.payload
            }
        case 'UPDATE_ACTIVE_STEP':
            return {
            ...state,
            activeScreen: action.payload
            }
        case 'GET_PROFILE_DETAILS':
            return {
            ...state,
            bs_user: {
                ...state.bs_user,
                profile: action.payload
                }
            }
        case 'UPDATE_PROFILE_IMAGE':
            return {
            ...state,
            bs_user: {
                ...state.bs_user,
                profile: {
                    ...state.bs_user.profile,
                    profile_image: action.payload,
                }
            }
            }
        case 'EDIT_MAP_COORDINATES':
            return {
                ...state,
                editMap: {
                    ...state.editMap,
                    active: true,
                    coordinates: action.payload
                }
            }
        default:
            throw Error('reducer error');
    }
}

export default reducer