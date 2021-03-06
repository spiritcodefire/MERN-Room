import express from 'express'
import mongoose from 'mongoose'
import routes from './routes/routes.js'
import privateRoutes from './routes/privateRoutes.js'
import passport from 'passport'
import './auth/auth.js'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())

app.use(express.static('client/build'))

mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

// les privatesRoutes doivent être situés au dessus des routes, sinon il pourrait y acceder par routes
app.use('/private', passport.authenticate('jwt', {session: false}), privateRoutes)

app.use(routes)

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
