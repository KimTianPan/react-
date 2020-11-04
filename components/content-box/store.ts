import * as React from 'react';
import { SET_OPTION } from './actionsTypes';
import { ContentOptions } from './types';
const _join = require('loadsh')

const store = React.createContext(({} as any));


export const initialState: ContentOptions = {
    options: {
        bodyOptions: {
            contentList: []
        }
    },
    className: ''

}
export function reducer(state = initialState, action: any) {
    const newState = _join.cloneDeep(state)
    const { value } = action
    switch (action.type) {
        case SET_OPTION:
            newState.headerOptions = value.headerOptions
            newState.bodyOptions = value.bodyOptions
            newState.className = value.className
            return { ...state, ...newState }

        default:
            throw new Error();
    }
}

export default store;
