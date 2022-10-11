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

module.exports = {
    getHomepage,
    getDetailPage,
    createNewUser,
    deleteUser,
    editUser,
    updateUser,
}