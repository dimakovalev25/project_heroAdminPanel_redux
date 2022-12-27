export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const activeFiltersFetched = (activefilters) => {
    return {
        type: 'ACTIVE_FILTERS_FETCHED',
        payload: activefilters
    }
}

export const addHeroes = (newHeroes) => {
    return {
        type: 'ADD_HEROES',
        payload: newHeroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}