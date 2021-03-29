import express from 'express'

import { addRoom, deleteRoom, updateRoom } from '../controllers/roomControllers.js' ;
import { catchErrors } from '../helpers.js' ;

const router = express.Router()

router.post('/api/rooms', catchErrors(addRoom))

router.patch('/api/rooms/:id', catchErrors(updateRoom))

router.delete('/api/rooms/:id', catchErrors(deleteRoom))

router.get('/secret', (req, res) => {
    res.json({
        message: ' connexion secret réussi', 
        user : req.user,
        token: req.query.token // .query parce qu'on la appelé token et qu'on le récupère de la query
    })
})

export default router