const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

initialUsers = [
    {
        "username": "potatomans",
        "password": "thisisastrongpassword",
        "name": "Nathanael"
    },
    {
        "username": "veryproman",
        "password": "iloveweakpasswords",
        "name": "Samantha"
    }
]

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
}, 10000)

describe('invalid users are not created', () => {
    test('rejects missing username', async () => {
        const noUsername = {
            "password": "ulululul",
            "name": "Jonathan"
        }

        await api
            .post('/api/users')
            .send(noUsername)
            .expect(400)
    })

    test('rejects missing password', async () => {
        const noPassword = {
            "username": "ulululul",
            "name": "Jonathan"
        }

        const result = await api
            .post('/api/users')
            .send(noPassword)
            .expect(400)
        
        expect(result.body.error).toContain('please include password')
    })

    test('rejects short username', async () => {
        const shortUsername = {
            "username": "po",
            "password": "ulululul",
            "name": "Jonathan"
        }

        await api
            .post('/api/users')
            .send(shortUsername)
            .expect(400)
    })
    // rejects short password
    test('rejects short pasword', async () => {
        const shortPassword = {
            "username": "peteryap",
            "password": "po",
            "name": "Jonathan"
        }

        const result = await api
            .post('/api/users')
            .send(shortPassword)
            .expect(400)
        
        expect(result.body.error).toContain('password too short')
    })

    // rejects non-unique username
    test('rejects repeated username', async () => {
        const repeatUsername = {
            "username": "root",
            "password": "ulululul",
            "name": "Jonathan"
        }

        await api
            .post('/api/users')
            .send(repeatUsername)
            .expect(400)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})
