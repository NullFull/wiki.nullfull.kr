import cookie from 'cookie'
import { getFirebase } from 'utils/firebase/admin'


const SESSION_KEY = 'session'
const MAX_AGE = 60 * 60 * 1000


export default async (req, res) => {
    const firebase = getFirebase()

    if (req.method === 'GET') {
        const session = req.cookies[SESSION_KEY]

        try {
            const decoded = await firebase.auth().verifySessionCookie(session)

            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(JSON.stringify({
                data: decoded
            }))
        } catch (e) {
            res.end(JSON.stringify({

            }))
        }
    } else if (req.method === 'POST') {
        const idToken = req.body.idToken.toString()

        const session = await firebase.auth().createSessionCookie(idToken, {expiresIn: MAX_AGE})

        res.setHeader('Set-Cookie', cookie.serialize(SESSION_KEY, session, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/'
        }))
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.end(JSON.stringify({
            session
        }))
    } else if (req.method === 'DELETE') {
        res.setHeader('Set-Cookie', cookie.serialize(SESSION_KEY, {}, {
            expires: new Date(1),
            path: '/'
        }))
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.end(JSON.stringify({}))
    }

}