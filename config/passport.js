const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');


module.exports = (passport) =>{
    
    passport.serializeUser(function(user,done){
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id,done){
        User.findById(id, function(err,user){
            done(err, user);
        });
    });
    
    //Registrar usuario
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true 
    },
    
    function (req, email, password, done){
      console.log("estoy dentro del post register");
      User.findOne({'email': email}, function(err,user){
          if (err){
              return done(err);
          } 
          if (user){
              console.log("registrado yaaaaaaaaaaaa!!!!!");
            return done(null,false, req.flash('resgisterMessage','El email ya ha sido registrado'));  
          }else{
              var newUser = new User();
              newUser.email = email;
              newUser.password = newUser.generateHash(password);
              newUser.username = email.split('@',1);
              newUser.picture = "https://gravatar.com/avatar/?s=200&d=retro";
              newUser.nrelatos = 0;
              newUser.save(function(err){
                  if (err){ throw err;}
                  return done(null,newUser)
              })
          } 
      })  
        
    }));
    
    //Iniciar sesión
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true 
    },
    
    function (req, email, password, done){
      User.findOne({'email': email}, function(err,user){
          if (err){
              return done(err);
          } 
          if (!user){
            return done(null,false, req.flash('indexMessage','El usuario no está registrado'));  
          }
          if (!user.validatePassword(password)){
              return done(null,false, req.flash('indexMessage','La contraseña introducida no es correcta'))
          }
          
          return done(null, user)
          
      })  
        
    }));
    
};    