const passport =  require("passport")
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/person')


//Authentication using passport
passport.use(new LocalStrategy(async(USERNAME,password,done)=>{
    //authentication logic here
    try{
      console.log("Recieved credentials: ", USERNAME,password)
      const user = await Person.findOne({username:USERNAME})
      if(!user)
        return done(null,false,{message:"Incorrect username."})
      const isPasswordMatch = user.password===password ? true:false
      if(isPasswordMatch){
            return done(null,user)
      }
      else{
        return done(null,false,{message:"Incorrect passsword."})
      }
    }catch(error){
       return done(error)
    }
  }))

  module.exports = passport; // Export configured passport