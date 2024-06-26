import axios from 'axios'
import {config} from '../../Constants'

export const tourismApi = {
    authenticate,
    signup,
    numberOfUsers,
    numberOfBooks,
    getUsers,
    deleteUser,
    getBooks,
    deleteBook,
    addBook,
    getRoute,

    //
    createRoute,
    updateRoute,
    createTask,
    getTask,
    updateTask
}

function authenticate(username, password) {
    return instance.post('/auth/authenticate', {username, password}, {
        headers: {'Content-type': 'application/json'}
    })
}

function signup(user) {
    return instance.post('/auth/signup', user, {
        headers: {'Content-type': 'application/json'}
    })
}

function numberOfUsers() {
    return instance.get('/public/numberOfUsers')
}

function numberOfBooks() {
    return instance.get('/public/numberOfBooks')
}

function getUsers(user, username) {
    const url = username ? `/api/users/${username}` : '/api/users'
    return instance.get(url, {
        headers: {'Authorization': basicAuth(user)}
    })
}

function deleteUser(user, username) {
    return instance.delete(`/api/users/${username}`, {
        headers: {'Authorization': basicAuth(user)}
    })
}

function getBooks(user, text) {
    const url = text ? `/api/books?text=${text}` : '/api/books'
    return instance.get(url, {
        headers: {'Authorization': basicAuth(user)}
    })
}

function deleteBook(user, isbn) {
    return instance.delete(`/api/books/${isbn}`, {
        headers: {'Authorization': basicAuth(user)}
    })
}

function addBook(user, book) {
    return instance.post('/api/books', book, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': basicAuth(user)
        }
    })
}

function getRoute(id, user){
    return instance.get(`/route/get/${id}`, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': basicAuth(user)
        }
    })
}

function createRoute(routeData, user) {
    return instance.post('/route/create', routeData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth(user)
        }
    });
}


function updateRoute(routeID,updatedData , user) {
    return instance.post(`/route/update/${routeID}`, updatedData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth(user)
        }
    });
}

function getTask(taskID, user){
    return instance.get(`/task/get/${taskID}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth(user)
        }
    });
}

//ID ir konkretas lokacijas id
function createTask(taskData, user, id) {
    return instance.post(`/location/${id}/task/create`, taskData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth(user)
        }
    });
}

function updateTask(taskID,updatedData , user) {
    return instance.post(`/task/${taskID}/update`, updatedData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth(user)
        }
    });
}
// -- Axios

const instance = axios.create({
    baseURL: config.url.API_BASE_URL
})

// -- Helper functions

function basicAuth(user) {
    return `Basic ${user.authData}`
}