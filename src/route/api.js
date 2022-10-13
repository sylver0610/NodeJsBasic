import express from "express";
import apiController from '../controller/apiController'

let router = express.Router();

const initAPIRoute = (app) => {

    router.get('/users', apiController.getAllUsers); //read data
    router.post('/create-user', apiController.createNewUser); //create data
    router.put('/update-user', apiController.updateUser);
    router.delete('/delete-user/:id', apiController.deleteUser);

    return app.use('/api/v1/', router);
}

export default initAPIRoute;