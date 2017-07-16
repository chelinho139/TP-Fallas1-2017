var _ = require('lodash');

module.exports = function (app, log) {
  var Pregunta = require("../models/modelo");
  var TestModel = require("../models/modelo").TestModel;
  var Preguntas = require("../models/modelo").Preguntas;
  var Resultados = require("../models/modelo").Resultados;
  var nools = require("nools");
  var questionFlow = nools.compile("flow/basic.nools", {
    scope: {
      logger: log
    }
  });
  var Question = questionFlow.getDefined("question");


  var resultsFlow = nools.compile("flow/rules.nools", {
    scope: {
      logger: log
    }
  });

  var Result = resultsFlow.getDefined("result");

  app.get('/', function (req, res) {
    res.render('index');
    // res.render('home/home', {
    //   appName: "75.67",
    //   pageTitle: "75.67 - Sistemas Automáticos de Diagnóstico y Detección de Fallas I"
    // });
  });

  app.get('/resultados', function (req, res) {
    res.render('modelo/resultados.jade', {
      appName: "75.67",
      pageTitle: "75.67 - Resultados",
      resultados: Resultados
    });
  });

  app.get('/preguntas', function (req, res) {
    res.render('modelo/preguntas.jade', {
      appName: "75.67",
      pageTitle: "75.67 - Preguntas",
      preguntas: Preguntas
    });
  });

    app.get('/preguntas2', function (req, res) {
    res.render('modelo/preguntas', {
      appName: "75.67",
      pageTitle: "75.67 - Preguntas",
      preguntas: Preguntas
    });
  });

  app.get('/comenzar', function (req, res) {
    req.session.test = new TestModel();
    res.render('analisis/comenzar.jade', {
      appName: "75.67",
      pageTitle: "75.67 - Sistemas Automáticos de Diagnóstico y Detección de Fallas I"
    });
  });

  app.get('/analisis', function (req, res) {
    var pregunta = new Pregunta(0);
    res.render('analisis/analisis.jade', {
      appName: "75.67",
      pageTitle: "75.67 - Análisis",
      pregunta: pregunta
    });
  });

  app.post('/analisis', function (req, res) {
    var pregunta = new Pregunta(req.body.pregunta);
    pregunta.responder(parseInt(req.body.respuesta));
    ejecutarReglas(req, res, pregunta);
  });

  app.get('/resultado', function (req, res) {

    var verdeRules = [];
    var verdeAmarilloRules = [];
    var amarilloRules = [];
    var rojoamarilloRules = [];
    var rojoRules = [];

    var questionsResult = req.session.test.optionsSelected;

    console.log(questionsResult);

    var session = resultsFlow.getSession(new Result({
      carga: questionsResult.carga,
      edad: questionsResult.edad,
      entrenado: questionsResult.entrenado
    }));

    session.on("VERDE", function (rule) {
      verdeRules.push(rule);
    });
    session.on("VERDEAM", function (rule) {
      verdeAmarilloRules.push(rule);
    });
    session.on("AMARILLO", function (rule) {
      amarilloRules.push(rule);
    });
    session.on("ROJOAM", function (rule) {
      rojoamarilloRules.push(rule);
    });
    session.on("ROJO", function (rule) {
      rojoRules.push(rule);
    });

    session.match(function () {
      var resultado;

      if (verdeRules.length != 0) {
        resultado = Resultados[0];
      } 
      else if (verdeAmarilloRules.length != 0) {
        resultado = Resultados[1];
      }
      else if (amarilloRules.length != 0) {
        resultado = Resultados[2];
      }
      else if (rojoamarilloRules.length != 0) {
        resultado = Resultados[3];
      }      
      else if (rojoRules.length != 0) {
        resultado = Resultados[4];
      }
      console.log(verdeRules.length);
      console.log(verdeAmarilloRules.length);
      console.log(amarilloRules.length);
      console.log(rojoamarilloRules.length);
      console.log(rojoRules.length);
      console.log(resultado);

      res.render('analisis/resultado.jade', {
        appName: "75.67",
        pageTitle: "75.67 - Resultado",
        resultado: resultado
      });
    });
  });

  function ejecutarReglas(req, res, pregunta) {
    var currTest = req.session.test;
    currTest.preguntas[pregunta.id] = pregunta;
    currTest.optionsSelected = currTest.optionsSelected || {};

    session = questionFlow.getSession(new Question({
      id: pregunta.id,
      ans: pregunta.respuesta
    }));

    _(['carga', 'edad', 'entrenado']).forEach(function (variableName) {
      session.on(variableName, function (result) {
        currTest.optionsSelected[variableName] = result;
      });
    });

    session.match()
    .then(function () {
      req.session.test = currTest;
      var siguiente = pregunta.siguiente();
      if (siguiente) {
        log.info("Siguiente pregunta: " + JSON.stringify(siguiente));
        res.render('analisis/analisis.jade', {
          appName: "75.67",
          pageTitle: "75.67 - Hacer test",
          pregunta: siguiente
        });
      } else {
        res.redirect("/resultado");
      }
    });
  }

};
