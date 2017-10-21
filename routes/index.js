var express = require('express');
var router = express.Router();

var multer = require('multer');//v1.0.5
var upload = multer();//parsing multipart/form-data

var LibrosCtrl = require('../controllers/LibrosCtrl')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', saludo: 'Gen 2017' });
});

/*router.get('/libros', function(req, res, next){
  res.render('index', { title: 'Express', saludo: ' Libros' });
});

router.post('/libros', function(req, res, next){
  res.status(200).jsonp({ nombre: 'Código Da Vinci', autor: 'Dan Brown' });
});
*/
router.route('/libros')
	.get(LibrosCtrl.getLibros)
	.post(upload.array(),LibrosCtrl.addLibro);

router.route('/libros/:id')
	.get(LibrosCtrl.getById)
	.put(upload.array(),LibrosCtrl.updateLibro) //----------------------------------------------------------------
	.delete(LibrosCtrl.deleteLibro);

router.route('/autores')
	.get(LibrosCtrl.getAutores);//devolver todos los autores
	
router.route('/autores/:nombre')
	.get(LibrosCtrl.getByAutor)//devolver todos los libros del autor
	.put(upload.array(),LibrosCtrl.updateAutores)//actualizar nombre de autor en los libros
	.delete(LibrosCtrl.deleteAutor);//eliminar libros del autor
	//utilizar git, crear una cuenta en github y subir tarea ; no subir los node_modules y hacer un README.md

module.exports = router;


