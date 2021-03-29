import mongoose from 'mongoose'
import bcrypt from 'bcrypt'


// on créé un schema pour permettre de l'enregistrer en lui donnant un type
const UserSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// pré hooks avant d'enregistrer dans mongo, on le crypte 
UserSchema.pre('save', async function(next){
    const user = this

    const hash = await bcrypt.hash(user.password, 10)

    user.password = hash

    next()
})



// mehtode pour vérifier le password

UserSchema.methods.isValidPassword = async function ( password ){
    const user = this

    const isSame = await bcrypt.compare(password, user.password) // on compare le mot de passe rentré avec le mot de passe enregistré dans la base de donnés

    return isSame // return true ou false
}


const UserModel = mongoose.model('User', UserSchema)

export default UserModel