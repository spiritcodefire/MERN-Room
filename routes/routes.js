import express from 'express' ;
import passport from 'passport' ;

import jwt from 'jsonwebtoken' ; 
import { catchErrors } from '../helpers.js' ;
import { getRooms, getRoom, addRoom, deleteRoom, updateRoom } from '../controllers/roomControllers.js' ;

// Path avec ES module
import path, { dirname } from 'path' ;
import { fileURLToPath } from 'url' ;
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const router = express.Router()

router.get('/api/rooms', catchErrors(getRooms))

router.get('/api/rooms/:id', catchErrors(getRoom))

router.post('/api/rooms', catchErrors(addRoom))

router.patch('/api/rooms/:id', catchErrors(updateRoom))

router.delete('/api/rooms/:id', catchErrors(deleteRoom))

// Authentification
router.post(
  '/signup', 
passport.authenticate('signup', { session: false} ),
 async(req, res, next ) =>{
   res.json({
     message: 'Signup OK',
     user: req.user
   })
 }
 )

router.post('/login',(req, res, next) => {
  passport.authenticate('login', async (err, user)=>{
    try{
      if( err || !user){
        const error = new Error('Une erreur est survenue')
        return next(error)
      }

      req.login(user, {session: false}, async error =>{
        if(error) return next(error)
        const body = { _id: user._id, email: user.email }
        const token = jwt.sign({ user: body }, 'SECRET_KET_A_MODIFIER')
        res.json({ token, body})
      })
    }catch (error) {
      return next(error)
    }
  })(req, res, next)
})

//  spécifique pour brancher React // veut dire que
router.get('/*', (_, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})


export default router
