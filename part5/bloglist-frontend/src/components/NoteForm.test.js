import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NoteForm from './NoteForm'

describe('<NoteForm />', () => {
    test('form accepts inputs', async () => {
        const createBlog = jest.fn()

        const { container } = render(<NoteForm createBlog={createBlog} />)

        const user = userEvent.setup()

        const title = container.querySelector('#title')
        const author = container.querySelector('#author')
        const url = container.querySelector('#url')
        const sendButton = screen.getByText('create')

        await user.type(title, 'Mockingjay')
        await user.type(author, 'Rowlings')
        await user.type(url, 'mockingjay.com')
        await user.click(sendButton)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe('Mockingjay') // note: createBlog.mock.calls[0][0] is an objects whose properties are filled by form inputs
        expect(createBlog.mock.calls[0][0].author).toBe('Rowlings')
        expect(createBlog.mock.calls[0][0].url).toBe('mockingjay.com')
    })
})