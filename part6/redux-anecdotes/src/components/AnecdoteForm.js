import { useDispatch } from 'react-redux'
import { createAnecdote, sendAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addAnecdote = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdotes.value 
        event.target.anecdotes.value = ''
        dispatch(createAnecdote(anecdote))
        dispatch(setNotification(`you created '${anecdote}'`), 5)
      }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdotes" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm