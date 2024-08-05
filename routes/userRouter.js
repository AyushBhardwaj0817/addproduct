const express = require('express')
const router = express.Router()
const userController = require("../Controllers/userController.js");

//const user_creation = require('../Controllers/user/user_creation.js');
//const userlist = require('../Controllers/user/userlist.js');
//const usersingle = require('../Controllers/user/usersingle.js');
//const updateuser = require('../Controllers/user/updateuser.js');
//const deleteuser = require('../Controllers/user/deleteuser.js');


router.get('/',userController.userlist);
router.get('/:id',userController.usersingle);
router.delete('/:id', userController.deleteuser);
router.post('/user_creation',userController.user_creation);
router.patch('/:id', userController.updateuser);
// router.get('/home', userController.homePage);

router.get('/asd', )


module.exports = router