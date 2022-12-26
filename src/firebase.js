import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCpWV9PVasVYl6ibFMVEw0NczDTXuqKlj0',
  authDomain: 'todo-list-b1486.firebaseapp.com',
  databaseURL:
    'https://todo-list-b1486-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'todo-list-b1486',
  storageBucket: 'todo-list-b1486.appspot.com',
  messagingSenderId: '812377487612',
  appId: '1:812377487612:web:19fe56b61dda30439b3f79',
}

const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
export const auth = getAuth()
