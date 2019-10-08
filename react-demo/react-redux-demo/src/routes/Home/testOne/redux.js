export function createStore(reducer, enhancer) {
    if (enhancer) {
        return enhancer(createStore)(reducer)
    }
    let currentState = {}
    let currentListeners = []

    function getState() {
        return currentState;
    }

    function subscribe(listener) {
        currentListeners.push(listener)
    }

    function dispatch(action) {
        currentState = reducer(currentState, action)
        currentListeners.forEach(l => l())
        return action
    }

    dispatch({ type: '@init/store' })

    return { getState, subscribe, dispatch }
}

