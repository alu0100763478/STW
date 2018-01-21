const Libro = require('../models/producto');
const User = require('../models/user');
const Relato = require('../models/relatos');
const Voto = require('../models/votos');

module.exports = (app, passport) =>{
    
    app.get('/', (req, res)  => {
    	res.render('index', { 
    	    message: req.flash('indexMessage')
    	});
    });
    
    app.post('/', passport.authenticate('local-login', {
        successRedirect: '/mislibros',
        failureRedirect: '/',
        failureFlash: true
     }));
     
    app.get('/register', (req, res)  => {
    	res.render('register', { 
    	    message: req.flash('resgisterMessage')
    	});
    });
    
    app.post('/register', passport.authenticate('local-signup', {
        successRedirect: '/mislibros',
        failureRedirect: '/register',
        failureFlash: true
     }));
    
    app.get('/librosDisponibles',isLoggedIn, (req,res) => {
    	Libro.find({},function(err, libros) {
    		if(err) {
    			res.send(err);
    		}
    		res.send(libros);
    	});
    });
    
    app.get('/editProfile',isLoggedIn, (req,res) => {
    	res.render('editProfile',{
           user: req.user , relato: req.relato
    	});
    });
    
    app.post('/editUsername', isLoggedIn, (req, res) => {
        let newUsername = req.body.username;
        
        User.findByIdAndUpdate(req.user.id, { $set: { username: newUsername }}, { new: true }, function (err, user) {
              if (err) return handleError(err);
              res.redirect('editProfile');
        });
    });
    
    app.post('/editEmail', isLoggedIn, (req, res) => {
        let newEmail = req.body.newEmail;
        
        User.findByIdAndUpdate(req.user.id, { $set: { email: newEmail }}, { new: true }, function (err, user) {
              if (err) return handleError(err);
              res.redirect('editProfile');
        });
    });
    
    app.post('/editImg', isLoggedIn, (req, res) => {
        let imgPerfil = req.body.img;

        User.findByIdAndUpdate(req.user.id, { $set: { picture: imgPerfil }}, { new: true }, function (err, user) {
              if (err) return handleError(err);
              res.redirect('editProfile');
        });
    });
    
    app.get('/crearRelato',isLoggedIn, (req, res) => {
        res.render('crearRelato', { 
    	    message: req.flash('resgisterMessage'),
           user: req.user , relato: req.relato
        });
    });
    
    app.post('/crearRelato', isLoggedIn, (req, res) => {
        let titulo = req.body.titulo;
        let textoRelato = req.body.textoRelato;
        let idUsuario = req.user.id;
        let usuario = req.user.username;
        let nrelatos = req.user.nrelatos+1;
        let categoria = req.body.categoria;

        Relato.findOne({'titulo': titulo}, function(err,relato){
          if (err){
              res.send(err);
          } 
          if (relato){
              req.flash('TituloMessage','Lo sentimos, ya hay un relato con ese título');  
          }else{
              User.findByIdAndUpdate(idUsuario, { $set: { nrelatos: nrelatos }}, { new: true }, function (err, user) {
              if (err) return err;
              });
              var newRelato = new Relato();
              newRelato.titulo = titulo;
              newRelato.id_autor = idUsuario;
              newRelato.textoRelato = textoRelato;
              newRelato.categoria = categoria;
              newRelato.usuario = usuario;
              newRelato.positivo = 0;
              newRelato.negativo = 0;
              newRelato.save(function(err){
                  if (err){ throw err;}
              });
          }
          res.redirect('mislibros');
        })  
    });
    
    app.get('/mislibros',isLoggedIn, (req, res) => {
        Relato.find({'id_autor': req.user.id}, function(err,relato){
          if (err){
              res.send(err);
          } 
          if(relato){
            res.render('mislibros',{
            user: req.user, relato: relato 
            });  
          }
          else{
            res.render('mislibros',{user: req.user});
          }    
        });
    });
    
    app.post('/eliminarRelato', isLoggedIn, (req, res) => {
        let titulo = req.body.relatoEliminar.split('Elimina ');
        let idUsuario = req.user.id;
        let nrelatos = req.user.nrelatos-1;
        
        Relato.findOne({'titulo': titulo}, function(err,relato){
          if (err){
              res.send(err);
          } 
          else{
              User.findByIdAndUpdate(idUsuario, { $set: { nrelatos: nrelatos }}, function (err, user) {
              if (err) return err;
              });
              relato.remove(err => {
                if (err) res.status(500).send({message: `Error al borrar el producto: ${err}`})
                else {
                    Relato.find({'id_autor': req.user.id}, function(err,relato){
                      if (err)   res.send(err); 
                      if(relato){
                        res.render('mislibros',{user: req.user, relato: relato });  
                      }
                      else{
                        res.render('mislibros',{user: req.user});
                      }    
                    });
                }
              })
          }
          
        })  
    });
    
    app.post('/votarRelato', isLoggedIn, (req, res) => {
        
        let parts = req.body.opinion.split(': ')
        let usuario = req.user.username;
        let titulo = parts[0];
        let voto = parts[1];

        console.log("Titulo", titulo)
        console.log("Usuario", usuario)
        console.log("Voto", voto)
        Voto.findOne({'titulo': titulo, 'usuario': usuario}, function(err,votos){
          if (err){
              res.send(err);
          } 
//          if(usuario){
//              console.log("Lucy está aquí")
//              res.status(500).send({message: ` ${usuario} ya ha votado por el relato: ${titulo}. El voto no será tomado en cuenta`})
//          }
          
          else{
              console.log("Entreeeee")
              if(voto == "Me gustó"){
                  Relato.findOne({'titulo': titulo}, function (err, relato) {
                    if (err) return err;
                    else{
                        let positivo = relato.positivo+1;
                        relato.update({$set: { positivo: positivo }}, function (err, user) {
                            if (err) return err;
                        });
                    }
                  });     
              }    
              if(voto == "No me gustó")
                    Relato.findOne({'titulo': titulo}, function (err, relato) {
                    if (err) return err;
                    else{
                        let positivo = relato.negativo+1;
                        relato.update({$set: { negativo: negativo }}, function (err, user) {
                            if (err) return err;
                        });
                    }
                  });     
              } 
          res.redirect('relatos');
          
        })  
    });
    
    app.get('/relatos',isLoggedIn, (req, res) => {
        Relato.find({}, function(err,relato){
          if (err){
              res.send(err);
          } 
          else{
               res.render('relatos',{user: req.user, relato: relato });
            
          }
  
        });
    }); 
    
    app.get('/mostrarLibro',isLoggedIn, (req, res) => {
        
        res.render('mostrarLibro',{user: req.user});
    }); 
    
    app.post('/mostrarLibro', isLoggedIn, (req, res) => {
        let libro = req.body.libro;
        
        Libro.findOne({'name': libro}, function (err, libro) {
                    if (err) return err;
                    else{
                        res.render('mostrarLibro',{libro: libro});
                    }
        });       
    });
    
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
    
};

function isLoggedIn(req,res,next){
    if (req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}

function refrescarPagina(autor){
    Relato.find({'id_autor': autor}, function(err,relato){
          if (err){
              res.send(err);
          } 
          else{
             return relato;
          }
          
        })  
}