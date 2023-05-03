import mongoose from "mongoose";
import emailValidator from "email-validator";
import bcrypt from "bcrypt";

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is not send"],
    },
    email: {
        type: String,
        required: [true, "email is missing"],
        unique: true,
        validate:function(){
            return emailValidator.validate(this.email);
        }
    },
    password: {
        type: String,
        required: [true, "password is missing"]
    },
    confirmPassword: {
        type: String,
        required: [true, "confirmPassword is missing "],
        validate:function(){
            return this.confirmPassword==this.password
        }
    } 
})

//We will use posthook to remove confirm password becoause it is a redundant data and we dont want to keep this in db
userSchema.pre('save',function(next){
    this.confirmPassword=undefined;
    next();
})

// userSchema.pre('save',async function(){
//     let salt = await bcrypt.genSalt();
//     let hashedString = await bcrypt.hash(this.password,salt);
//     this.password = hashedString;
//     console.log(hashedString);
// })

export const Auth = mongoose.model('Auth',userSchema);







