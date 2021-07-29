const initialState = {
    carouselData: [],
    searchData: [],
}
const rootReducer = (state = initialState, action) =>{
    if (action.type === "SET_STATE"){
        state = {...state, carouselData: action.data}
    }
    if (action.type === "SET_SEARCH"){
        state = {...state, searchData: action.data}
    }
    return state;
}

export default rootReducer;