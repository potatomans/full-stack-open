import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

//export const setFilter = (value) => {
    //return {
      //type: 'SET_FILTER',
      //payload: { value }
    //}
  //}
  
//const filterReducer = (state = '', action) => {
    //console.log('state now: ', state)
    //console.log('action', action)
    //switch (action.type) {
        //case 'SET_FILTER':
        //return action.payload.value
    //default: return state
    //}
//}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter(state, action) {
            const value = action.payload
            return value
        }
    }
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer