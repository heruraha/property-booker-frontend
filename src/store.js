import React from 'react';
import reducer from 'reducer';

const initialState = {
    activeScreen: null,
    isLoading: false,
    bs_user: {
        cgo_api_key: localStorage.getItem('cgo_api_key') || null,
        profile: JSON.parse(localStorage.getItem('profile')) || null,
    },
    isAuthenticated: localStorage.getItem('cgo_api_key') ? true : false,
    sideModalOpen: {
        open: false,
        data: null,
        title: '',
        view: 'default'
    },
    editMap: {
        active: false,
        coordinates: [{
            lat: null,
            lng: null
        }]
    }
}

const CTX = React.createContext();

const Store = (props) => {
    const ctxVal = React.useReducer(reducer,initialState)
    return (
        <CTX.Provider value={ctxVal}>
            {props.children}
        </CTX.Provider>
    )
}

export { CTX }
export default Store;