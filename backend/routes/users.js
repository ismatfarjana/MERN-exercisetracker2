const router = require("express").Router();
let User = require("../models/user.model");

//route for users
router.route('/').get((req, res) => {
    User.find()// find returns a promise
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error:" + err));
});


//routes for adding new user
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const newUser = new User({username});
    console.log(newUser);
    newUser
        .save()
        .then(() => res.json("Congrates! New user successfully added"))
        .catch(err => res.status(400).json("error:" + err));
});

module.exports = router;
