const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt');

router.get('/register', (req,res)=> {
    res.render('register');
})


router.post('/register', 
    body('email').trim().isEmail(),
    body('password').trim().isLength({min:5}),
    body('username').trim().isLength({min:3}),
    async (req,res)=> {

        const errors = validationResult(req)

        console.log(errors);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                messages: 'invalid data'
            })
        }


        const {email, username, password} = req.body;
        
        const newUser = await userModel.create({
            email,
            username,
            password
        })

        res.json(newUser)
})


module.exports = router;
