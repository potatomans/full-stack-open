import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()
    const vote = (id) => {
        console.log('vote', id)
        const anecdoteToChange = anecdotes.find(anecdote => anecdote.id === id)
        dispatch(addVote(anecdoteToChange))
        dispatch(setNotification(`you voted '${anecdoteToChange.content}'`, 5))
    }
    return (
        <div>
        {anecdotes.filter(anecdote => anecdote.content.toString().includes(filter.toString()) === true).map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
        )}
        </div>
    )
}

export default AnecdoteList