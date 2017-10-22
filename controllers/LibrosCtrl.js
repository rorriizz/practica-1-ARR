var libros=[
	{
		id:'101',
		titulo: 'Codigo Da Vinci',
		autor: 'Dan Brown',
		anio: 2012,
		genero: 'novela'
	},
	{
		id:'102',
		titulo: 'Relatos de un viejo indecente',
		autor: 'Charles bukowski',
		anio: 2012,
		genero: 'Relato'
	},
	{
		id:'103',
		titulo: 'Otro',
		autor: 'Dan Brown',
		anio: 2012,
		genero: 'novela'
	},
	{
		id:'104',
		titulo: 'Las batallas en el desierto',
		autor: 'Jose Emilio Pacheco',
		anio: 1981,
		genero: 'Cuento'
	}
]

exports.getLibros=function(req, res, next){
  console.log('GET/libros');
  	res.status(200).jsonp(libros);
};

exports.addLibro=function(req,res,next){
	//req.body traer la información del post
	console.log('POST/libros');
	libros.push(req.body);
	res.status(200).jsonp(libros);
};
//GET libros/:id
exports.getById=function(req, res, next){
	console.log('GET/libros/:id');
	console.log(req.params.id);
	//res.status(200).jsonp(libros[0]);

	//regresar el id del libro
	var encontrar=false;
	for (var i = 0; i < libros.length; i++) { 
 		if(libros[i].id==req.params.id){
 			res.status(200).jsonp(libros[i]);
 			encontrar=true;
		}
	}
	if(!encontrar){
		res.status(200).jsonp({valor: '404 Not found'});
	}
};
//PUT libros/:id 
exports.updateLibro=function(req, res, next){
	console.log('PUT/libros/:id');
	console.log(req.params.id);
	console.log(req.body.titulo+" ");
	//res.status(200).jsonp(libros[0]);
	var encontrar=false;
	for (var i = 0; i < libros.length; i++) { 
 		if(libros[i].id==req.params.id){ 			
 			libros[i]=req.body;
 			res.status(200).jsonp(libros[i]);
 			encontrar=true;
		}
	}
	if(!encontrar){
		res.status(200).jsonp({valor: '404 Not found id to update'});
	}
};
//DELETE libros/:id 
exports.deleteLibro=function(req, res, next){
	console.log('DELETE/libros/:id');
	console.log(req.params.id);
	//res.status(200).jsonp(libros[0]);
	var encontrar=false;
	for (var i = 0; i < libros.length; i++) { 
 		if(libros[i].id==req.params.id){ 			
 			res.status(200).jsonp('Se eliminó el libro: '+req.params.id);
 			libros.splice(i,1);		//libros[i]='null'; //delete libros[i];
 			encontrar=true;
		}
	}
	if(!encontrar){
		res.status(200).jsonp({valor: '404 Not found - couldn´t delete'});
	}
};

//GET /autores
exports.getAutores=function(req, res, next){
	console.log('GET/autores');
	console.log('BODY '+req.body);
	//res.status(200).jsonp(libros[1].autor);
	var autorLibros=[];
	for (var i = 0; i < libros.length; i++) { 
 		console.log('Autores: '+ libros[i].autor);
 		autorLibros.push(libros[i].autor);
	}
	res.status(200).jsonp(autorLibros);
};
//GET autores/:nombre
exports.getByAutor=function(req, res, next){
	console.log('GET/autores/:nombre');
	console.log(req.params.nombre);

	var autor=String(req.params.nombre);
	console.log('Autor '+autor);

	//regresar el nombre del autor
	var comparar
	var nombreAutor
	var c=0;
	var encontrar=false;
	var LibrosAutor=[];
	for (var i = 0; i < libros.length; i++) { 
 		nombreAutor=String(libros[i].autor);

 		//nombreAutor=':'+nombreAutor;
 		autor=autor.toUpperCase();
 		nombreAutor=nombreAutor.toUpperCase();
 		
 		comparar=autor.localeCompare(nombreAutor); 

 		if(comparar==0){ 		//0=equal 
 			c++;
 			encontrar=true;
 			LibrosAutor[c]=libros[i];
		}
	}
	if(encontrar==true){
		res.status(200).jsonp(LibrosAutor);
	}
	if(!encontrar){
		res.status(200).jsonp({valor: '404 - Autor Not found'});
	}
};
//PUT /autores/:nombre 
exports.updateAutores=function(req, res, next){
	console.log('PUT/autores/:nombre');
	console.log(req.body);

	var encontrar=false;
	for(var i in libros){
		if(req.params.nombre.toUpperCase()===libros[i].autor.toUpperCase()){
			libros[i].autor=req.body.autor;
			encontrar=true;
		}
	}
	if(!encontrar){
		res.status(200).jsonp({valor: '404 Not found - couldn´t update'});
	}else
	{
		res.status(200).jsonp(libros);
	}
};


//DELETE autores/:nombre --------------------***********
exports.deleteAutor=function(req, res, next){
	console.log('DELETE/autores/:nombre');
	console.log(req.params.nombre);

	var autor=String(req.params.nombre);
	var nombreAutor;
	var encontrar=false;
	for (var i = 0; i < libros.length; i++) { 
		nombreAutor=String(libros[i].autor);
 		autor=autor.toUpperCase();
 		nombreAutor=nombreAutor.toUpperCase();

 		if(nombreAutor==autor){ 			
 			res.status(200).jsonp('Se eliminó el libro: '+req.params.nombre);
 			libros.splice(i,1);			//libros[i]='null'; //delete libros[i];
 			encontrar=true;
		}
	}
	if(!encontrar){
		res.status(200).jsonp({valor: '404 Not found - couldn´t delete'});
	}
};
