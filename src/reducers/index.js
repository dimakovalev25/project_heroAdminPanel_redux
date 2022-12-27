const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    activefilters: 'all'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_HEROES':
            return {
                ...state,
                heroes: [
                    ...state.heroes,
                    action.payload]
            }


        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }

        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }

        case 'FILTERS_FETCHED':
            return {
                ...state,
                 filters: action.payload,
            }

        case 'ACTIVE_FILTERS_FETCHED':
            return {
                ...state,
                activefilters: action.payload,
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        default: return state
    }
}

export default reducer;