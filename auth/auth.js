import passport from 'passport' ;

import passportLocal from 'passport-local' ;
import UserModel from '../models/userModel.js';
const {Strategy} = passportLocal

passport.use(
    'signup', 
    new Strategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) =>{ // done est l'équivalent de next
        try{
            const user = await UserModel.create({ email, password })

            return done(null, user) // null veut dire que je lui passe aucune erreur et que je lui passe le user
        }catch (error) {
            done(error)
        }
    }
    )
)

export default passport