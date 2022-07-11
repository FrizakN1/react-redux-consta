const defaultState = {
    orders: [],
    showOrders: [],
    ordersCount: 0,
    showOrdersCount: 0,
    showOrderAmount: 10,
    search: ""
}

export const orderReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "GET_TABLE_DATA":
            return {...state, orders: [...action.payload], ordersCount: action.payload.length}
        case "ADD_SHOW_ORDERS":
            return {...state, showOrders: [...action.payload.showOrders], showOrdersCount: action.payload.showOrdersCount}
        case "ONINPUT_SHOW_ORDER_AMOUNT":
            return {...state, showOrderAmount: action.payload}
        case "MORE_SHOW_ORDER_AMOUNT":
            return {...state, showOrderAmount: state.showOrderAmount + action.payload}
        case "ONINPUT_SEARCH":
            return {...state, search: action.payload}
        default:
            return state
    }
}