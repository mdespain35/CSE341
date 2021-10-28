const express = require('express');
const { check, body } = require('express-validator/check');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email address.').normalizeEmail(),
    body('password').isLength({min: 7}).withMessage('Incorrect Password.').trim()
    ], authController.postLogin);

router.post('/logout', authController.postLogout);

router.post('/signup', 
    [check('email')
        .isEmail('Please enter a valid email.')
        .custom((value, {req}) => {
        User.findOne({email: email})
            .then(userDoc => {
                if(userDoc) {
                    return Promise.reject('E-Mail exists already, please picka  different one.');
                }
            })
    }).normalizeEmail(),
    body('password')
        .isLength({min: 7})
        .withMessage('Please enter a password that is at least 7 characters long.').trim(),
    body('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords have to match!');
            }
            return true;
    }).trim()],
    authController.postSignup);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/new-password/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;