const defaultState = {
    zones: [],
    switchWindow: false,
    recipient: "",
    date: "",
    zone: "Площадка 1",
    zoneID: 1
}

export const zoneReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "GET_ZONES":
            return {...state, zones: [...state.zones, ...action.payload]}
        case "SWITCH_WINDOW":
            return {...state, switchWindow: action.payload}
        case "ONINPUT_RECIPIENT":
            return {...state, recipient: action.payload}
        case "ONINPUT_DATE":
            return {...state, date: action.payload}
        case "ONINPUT_ZONE":
            return {...state, zone: action.payload.zone, zoneID: action.payload.zoneID}
        default:
            return state
    }
}