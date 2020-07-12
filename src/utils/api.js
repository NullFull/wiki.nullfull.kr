import fetch from 'isomorphic-unfetch'


const BASE_URL = 'http://localhost:3000/api'


const client = {
    get: async path => {
        const response = await fetch(BASE_URL + path)
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