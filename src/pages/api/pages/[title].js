import { getFirebase } from 'utils/firebase/admin'
import { url2name } from 'utils/url'


const updatePage = async (req, res, title, content) => {
    const admin = getFirebase()
    const db = admin.firestore()

    db.collection('pages').add({
        title,
        content,
        timeCreated: new Date()
    })

    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({

    }))
}


const getPage = async (req, res, title) => {
    const admin = getFirebase()
    const db = admin.firestore()

    const query = await db.collection('pages')
        .where('title', '==', title)
        .orderBy('timeCreated', 'desc')
        .limit(1)
        .get()

    if (query.empty) {
        res.statusCode = 404
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.end(JSON.stringify({
            message: 'Not Found'
        }))
    }

    const page = query.docs[0].data()

    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({
        data: page
    }))
}


export default (req, res) => {
    const { title } = req.query
    const normalizedTitle = url2name(title)

    if (req.method === 'GET') {
        getPage(req, res, normalizedTitle)
    } else if (req.method === 'POST') {
        const { content } = req.body
        updatePage(req, res, normalizedTitle, content)
    }
}