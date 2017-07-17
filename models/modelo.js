var preguntas = [
    {
        pregunta: "Peso Carga",
        descripcion: "Ingrese la carga del puesto: ",
        respuestas : [
            "0 - 15 kg",
            "15 - 20 kg",
            "20 - 25 kg",
            "25 - 35 kg",
            "35 - 40 kg",
            "40+ kg"
        ]
    },
    {
        pregunta: "Edad",
        descripcion: "Seleccione la edad del trabajador:",
        respuestas : [
            "Joven: 18 a 32",
            "Mayor: 33+"
        ]
    },
    {
        pregunta: "Estado Fisico",
        descripcion: "El empleado esta entrenado fisicamente(gimnasio, deportes)?",
        respuestas : [
            "Si",
            "No",
        ]
    },

];

var resultados = [
    {
      id: 0,
      color: "#4CAF50",
      titulo: "Puesto Verde",
      descripcion: "Conclusion: Dadas las caracteristicas del trabajador y del puesto, se concluye que no se produciran lesiones."
    },
    {
      id: 1,
      color: "#cddc39",
      titulo: "Puesto Verde Amarillo",
      descripcion: "Conclusion: Dadas las caracteristicas del trabajador y del puesto, se concluye que pueden producirse lesiones a largo plazo."
    },

           {
      id: 2,
      color: "#ffeb3b",
      titulo: "Puesto Amarillo",
      descripcion: "Conclusion: Dadas las caracteristicas del trabajador y del puesto, se concluye que se produiran lesiones a largo plazo."
    },
        {
      id: 3,
      color: "#ff9800",
      titulo: "Puesto Rojo Amarillo",
      descripcion: "Conclusion: Dadas las caracteristicas del trabajador y del puesto, se concluye que se produciran lesiones a largo plazo y pueden producirse lesiones a corto plazo."
    },

        {
      id: 4,
      color: "#f44336",
      titulo: "Puesto Rojo",
      descripcion: "Conclusion: Dadas las caracteristicas del trabajador y del puesto, se concluye que se produciran lesiones a corto plazo."
    }


];

function Pregunta(id) {
    var pregunta = preguntas[parseInt(id)];
    this.pregunta = pregunta.pregunta;
    this.descripcion = pregunta.descripcion;
    this.id = parseInt(id);
    this.respuestas = pregunta.respuestas;
    this.respuesta = undefined;
}

Pregunta.prototype.responder = function(respuesta) {
    this.respuesta = ((parseInt(respuesta) % this.respuestas.length) == parseInt(respuesta)) ? parseInt(respuesta) : undefined;
};

Pregunta.prototype.id = function() {
    return this.pregunta.id;
};

Pregunta.prototype.pregunta = function() {
    return this.pregunta;
};

Pregunta.prototype.respuestas = function() {
    return this.respuestas;
};

Pregunta.prototype.respuesta = function() {
    return this.respuesta;
};

Pregunta.prototype.siguiente = function() {
    if (this.id + 1 < preguntas.length)
        return new Pregunta(this.id + 1);
    return undefined;
};

function TestModel() {
    this.preguntas = new Array(preguntas.length);
    this.puntaje = 0;
    this.resultado = undefined;
}

module.exports = Pregunta;
module.exports.preguntasCount = preguntas.length;
module.exports.TestModel = TestModel;
module.exports.Preguntas = preguntas;
module.exports.Resultados = resultados;
