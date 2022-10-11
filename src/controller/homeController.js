import pool from '../configs/connectDB';

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
module.exports = {
    getHomepage,
    getDetailPage,
    createNewUser,
}