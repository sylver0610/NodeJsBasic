import express from "express";
import homeController from '../controller/homeController';

let router = express.Router();

const initWebRoute = (app) => {

    router.get('/', homeController.getHomepage);

    router.get('/about', (req, res) => {
        res.send('Hello World!')
    })

    router.get('/detail/user/:userId', homeController.getDetailPage)
    router.get('/edit-user/:userId', homeController.editUser)
    router.post('/create-new-user', homeController.createNewUser)
    router.post('/delete-user', homeController.deleteUser)
    router.post('/update-user', homeController.updateUser)

    return app.use('/', router);
}

export default initWebRoute;