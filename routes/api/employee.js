var uuidv4 = require('uuid/v4');
var express = require('express');
var router = express.Router();

//function initEmployee(db) {
  var empModel = require('./employeeModel')(db);

  var bigThingTp = {
    'id':'',
    'email':'',
    'phone':'',
    'name':null,
    'age':'',
    'company':null,
    'email':false,
    'tags':false,
    
  };
 
  //rutas a implementar
  // metodo     ruta                     body
  /*
      GET       /all
      GET       /byid/:id
      GET       /bycompany/:company
      GET       /byagerange/:min/:max
      GET       /bytag/:tag
      POST      /addtag/:id              tag
      DELETE    /delete/:id
      POST      /makeolder               age
   */

  router.get('/', function(req, res, next) {
    if(!data){
        fileModel.read(function(err, filedata){
          if(err){
            console.log(err);
            data = [];
            return res.status(500).json({'error':'Error Obteniendo data'});
          }
          data = JSON.parse(filedata);
          return res.status(200).json(data);
        });
      } else {
        return res.status(200).json(data);
      }
  }); //get/

  router.post('/new', function(req, res, next){
    var _thingsData = Object.assign({} , bigThingTp, req.body);
    var dateT = new Date();
    var dateD = new Date();
    dateD.setDate(dateT.getDate()+ 3);
    _thingsData.fcIng = dateT;
    _thingsData.due = dateD;
    _thingsData.id = uuidv4();
    if(!data){
      data = [];
    }
    data.push(_thingsData);
    fileModel.write(data, function(err){
      if(err){
        console.log(err);
        return res.status(500).json({ 'error': 'Error al Obtener Data' });
      }
      return res.status(200).json(_thingsData);
    });
  });
  
//  return router;
//}
router.delete('/delete/:thingId', function(req, res, next){
    var _thingId = req.params.thingId;
    var newData = data.filter(
      function (doc, i) {
        if (doc.id == _thingId) {
          return false;
        }
        return true;
      }
    );// end map
    data = newData;
    fileModel.write(data, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({ 'error': 'Error al Guardar Data' });
      }
      return res.status(200).json({"delete": _thingId});
    });
  }); // end delete
  
  fileModel.read(function(err , filedata){
    if(err){
      console.log(err);
    } else{
      data = JSON.parse(filedata);
    }
  });
module.exports = initEmployee;