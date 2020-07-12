import admin from 'firebase-admin'


const getFirebase = () => {
    if (admin.apps.length < 1) {
        admin.initializeApp({
            credential: admin.credential.cert({
                project_id: process.env.FIREBASE_PROJECT_ID,
                private_key: process.env.FIREBASE_PRIVATE_KEY,
                client_email: process.env.FIREBASE_CLIENT_EMAIL
            })
        })
    }
    return admin
}


export {
    getFirebase
}
