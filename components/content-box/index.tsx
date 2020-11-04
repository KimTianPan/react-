


import * as React from 'react';
import store, { reducer, initialState } from './store';
import { ContentOptions } from './types';
import ContentBoxUI from './contentBox-ui';
import { SET_OPTION } from './actionsTypes'

export function ContentBox(props: ContentOptions) {
    const [state, dispatch] = React.useReducer(reducer, (initialState as any))

    let { headerOptions, bodyOptions } = props.options;
    let { className } = props;

    React.useEffect(() => {
        dispatch({
            type: SET_OPTION,
            value: {
                headerOptions: headerOptions,
                bodyOptions: bodyOptions,
                className: className ? className : ''
            }
        })

    }, [props.options])

    return (
        <store.Provider value={{ state, dispatch }} >
            <ContentBoxUI />
        </store.Provider>
    )
}
