import fetch from 'isomorphic-unfetch'


const BASE_URL = process.env.API_ENDPOINT || 'http://localhost:3000/api'


const client = {
    get: async path => {
        const response = await fetch(BASE_URL + path)

        if (!response.ok) {
            throw new Error(`${response.status}`)
        }

        const payload = await response.json()
        return [{}, payload.data]
    },
    post: async (path, data) => {
        const response = await fetch(BASE_URL + path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            throw new Error(`${response.status}`)
        }

        const payload = await response.json()
        return [{}, payload.data]
    },
    delete: async path => {
        const response = await fetch(BASE_URL + path, {
            method: 'DELETE'
        })
    }
}


export {
    client
}