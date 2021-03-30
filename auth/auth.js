import passport from 'passport' ;

import passportLocal from 'passport-local' ;
import UserModel from '../models/userModel.js';

import JWT from 'passport-jwt'
const { Strategy: JWTstrategy, ExtractJwt } = JWT

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
          return done(error)
        }
    }
    )
)

passport.use(
    'login', 
    new Strategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) =>{ // done est l'équivalent de next
        try {
            
            const user = await UserModel.findOne({ email })

            if(!user){
                return done(null, false, {message: 'Utilisateur non trouvé'})
            }

            const validate = await user.isValidPassword( password )
            if(!validate){
                return done(null, false, {message: 'Error de connexion'})
            }

            return done(null, user, {message: 'Connexion réussie'})
            


        }catch (error) {
           return done(error)
        }
    }
    )
)

passport.use(
    new JWTstrategy(
        {
            secretOrKey: 'SECRET_KEY_A_MODIFIER',
            jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token')   // jwtfromRequest = recuperer le token depuis une requete ----> grace à la méthode extractJWT qui sera passé en paramètre ( mon adress avec ?), le nom de se paramètre sera token comme marqué à l'interieur
        },
        async (token, done) => {
            try {
                return done(null, token.user) // je return le token en lui passant l'utilisateur qu'il trouve dedans
            } catch (error){
                done(error)
            }
        }
    )
)

export default passport