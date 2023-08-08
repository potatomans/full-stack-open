import { createSlice } from '@reduxjs/toolkit'
import anecdoteServices from '../services/anecdotes'

/*
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
*/

const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const sortObjs = (objs) => {
  objs.sort((a, b) => b.votes - a.votes)
  return objs
}

/*

this goes on under the hood of:

export const sendAnecdote = (anecdote) => {
  return {
    type: 'ADD_ANECDOTE',
    payload: { anecdote }
  }
}

export const sendVote = (id) => {
  return {
    type: 'VOTE',
    payload: { id }
  }
}

export const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE': {
      const id = action.payload.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return sortObjs(state.map(anecdote => anecdote.id === id ? changedAnecdote : anecdote))
    }
    case 'ADD_ANECDOTE':
      const newAnecdote = action.payload.anecdote
      const newObj = asObject(newAnecdote)
      return sortObjs(state.concat(newObj))
    default: return state
  }
}

*/

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    sendAnecdote(state, action) {
      state.push(action.payload)
    },
    sendVote(state, action) {
      const anecdoteToChange = action.payload
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return sortObjs(state.map(anecdote => anecdote.id === changedAnecdote.id ? changedAnecdote : anecdote))
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { sendAnecdote, sendVote, setAnecdotes } = anecdoteSlice.actions

export const initialiseAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteServices.getAll() // communicate with backend
    dispatch(setAnecdotes(anecdotes)) // update state
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteServices.createNew(content)
    dispatch(sendAnecdote(newAnecdote))
  }
}

export const addVote = (newObj) => {
  return async dispatch => {
    await anecdoteServices.addVote(newObj)
    dispatch(sendVote(newObj))
  }
}

export default anecdoteSlice.reducer