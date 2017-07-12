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
    res.render('home/home', {
      appName: "75.67",
      pageTitle: "75.67 - Sistemas Automáticos de Diagnóstico y Detección de Fallas I"
    });
  });

  app.get('/resultados', function (req, res) {
    res.render('modelo/resultados', {
      appName: "75.67",
      pageTitle: "75.67 - Resultados",
      resultados: Resultados
    });
  });

  app.get('/preguntas', function (req, res) {
    res.render('modelo/preguntas', {
      appName: "75.67",
      pageTitle: "75.67 - Preguntas",
      preguntas: Preguntas
    });
  });

  app.get('/comenzar', function (req, res) {
    req.session.test = new TestModel();
    res.render('analisis/comenzar', {
      appName: "75.67",
      pageTitle: "75.67 - Sistemas Automáticos de Diagnóstico y Detección de Fallas I"
    });
  });

  app.get('/analisis', function (req, res) {
    var pregunta = new Pregunta(0);
    res.render('analisis/analisis', {
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

    var negativeRules = [];
    var positiveRules = [];

    var questionsResult = req.session.test.optionsSelected

    var session = resultsFlow.getSession(new Result({
      plas: questionsResult.plas,
      pres: questionsResult.pres,
      skin: questionsResult.skin,
      mass: questionsResult.mass,
      pedi: questionsResult.pedi,
      age: questionsResult.age,
      preg: questionsResult.preg
    }));

    session.on("DIABSI", function (rule) {
      positiveRules.push(rule);
    });

    session.on("DIABNO", function (rule) {
      negativeRules.push(rule);
    });

    session.match(function () {
      var resultado;

      if (positiveRules.length == 0) {
        resultado = Resultados[0];
      } else {
        resultado = Resultados[1];
      }

      res.render('analisis/resultado', {
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

    _(['plas', 'pres', 'skin', 'mass', 'pedi', 'age', 'preg']).forEach(function (variableName) {
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
        res.render('analisis/analisis', {
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
