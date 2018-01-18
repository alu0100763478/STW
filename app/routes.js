const Libro = require('../models/producto');

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
    
    app.get('/mislibros',isLoggedIn, (req, res) => {
        res.render('mislibros',{
           user: req.user 
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