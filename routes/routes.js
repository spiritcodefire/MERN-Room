import express from 'express'
import passport from 'passport'
import { catchErrors } from '../helpers.js'
import {getRooms,getRoom,addRoom,deleteRoom,updateRoom} from '../controllers/roomControllers.js'

// Path avec ES module
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const router = express.Router()

router.get('/api/rooms', catchErrors(getRooms))

router.get('/api/rooms/:id', catchErrors(getRoom))

router.post('/api/rooms', catchErrors(addRoom))

router.patch('/api/rooms/:id', catchErrors(updateRoom))

router.delete('/api/rooms/:id', catchErrors(deleteRoom))

// Authentification
router.post('/signup', 
passport.authenticate('signup', { session: false} ),
 async(req, res, next ) =>{
   res.json({
     message: 'Signup OK',
     user: req.user
   })
 }
 )


router.get('/*', (_, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

export default router
