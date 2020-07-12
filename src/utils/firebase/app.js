import firebase from 'firebase/app'


const getFirebase = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp({
            projectId: process.env.FIREBASE_PROJECT_ID,
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN
        })
    }
    return firebase
}


export {
    getFirebase
}
