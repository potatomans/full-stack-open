import { useState } from 'react'

const NoteForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    
    const addBlog = (event) => {
        event.preventDefault()
        createBlog({ title, author, url })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                <div>title: <input type="text" value={title} name="Title" onChange={({target}) => setTitle(target.value)} id='title' /></div>
                <div>author: <input type="text" value={author} name="Author" onChange={({target}) => setAuthor(target.value)} id='author' /></div>
                <div>url: <input type="text" value={url} name="Url" onChange={({target}) => setUrl(target.value)} id='url' /></div>
                <button type="submit" id='create'>create</button>
            </form>
        </div>
    )
}

export default NoteForm