import pool from '../configs/connectDB';
import multer from 'multer';
import path from 'path';

let getHomepage = async (req, res) => {
    //logic
    const [rows, fields] = await pool.execute('SELECT * FROM `users`');
    return res.render('index.ejs', { dataUser: rows })

}

let getDetailPage = async (req, res) => {
    let id = req.params.userId;
    let [user] = await pool.execute('SELECT * FROM `users` WHERE id = ?', [id]);
    //console.log('check params: ', user);
    //return res.send(JSON.stringify(user));
    return res.render('detail.ejs', { detailUser: user[0] })
}

let createNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;
    await pool.execute('insert into users(firstName, lastName, email, address) values (?,?,?,?)', [firstName, lastName, email, address])
    console.log(req.body);
    return res.redirect('/')
}

let deleteUser = async (req, res) => {
    let { id } = req.body;
    await pool.execute('delete from users where id = ?', [id])
    return res.redirect('/')
}

let editUser = async (req, res) => {
    let id = req.params.userId;
    let [user] = await pool.execute('SELECT * FROM `users` WHERE id = ?', [id]);
    console.log(user)
    //return res.send('Edit');
    return res.render('updateUser.ejs', { user: user[0] });
}

let updateUser = async (req, res) => {
    let { id, firstName, lastName, email, address } = req.body;
    await pool.execute('update users set firstName = ? ,lastName = ?, email = ?,address = ? where id = ?', [firstName, lastName, email, address, id]);
    return res.redirect('/')
}

let getUploadFilePage = async (req, res) => {
    return res.render('uploadFile.ejs')
}





const upload = multer().single('profile_pic');

let handleUploadFile = async (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form

    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
        res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    });
}

module.exports = {
    getHomepage,
    getDetailPage,
    createNewUser,
    deleteUser,
    editUser,
    updateUser,
    getUploadFilePage,
    handleUploadFile
}