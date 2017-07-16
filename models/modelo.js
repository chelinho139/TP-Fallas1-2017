var preguntas = [
    {
        pregunta: "Peso Carga",
        descripcion: "Ingrese la carga del puesto (Kg.): ",
        respuestas : [
            "0 - 10",
            "10 - 15",
            "15 - 20",
            "20 - 25",
            "25 - 35",
            "35 - 40",
            "40+"
        ]
    },
    {
        pregunta: "Edad",
        descripcion: "Presión más baja medida en las arterias; se produce cuando el músculo cardíaco está relajado entre latidos. Medida en  mmHg",
        respuestas : [
            "18 - 27",
            "27 - 35",
            "45 - 60"
        ]
    },
    {
        pregunta: "Estado Fisico",
        descripcion: "El empleado realiza entrenamiento fisico (gimnasio, correr, deporte)",
        respuestas : [
            "Si",
            "No",
        ]
    },

];

var resultados = [
    {
      id: 0,
      titulo: "Verde probabilidad de portar la enfermedad diabetes",
      descripcion: "ASDísticas inherentes a su persona se considera baja la probabilidad de poseer la enfermedad"
    },
    {
      id: 1,
      titulo: "Verde marillo de existencia de la enfermedad",
      descripcion: "ASDDAS sus antecedentes familiares y estudios, presenta posibilidades de estar en un grupo de riesgo. Se recomienda consultar un especialista y realizar seguimiento periódico."
    },
        {
      id: 2,
      titulo: "Amirllo Rojo",
      descripcion: "DDA sus antecedentes familiares y estudios, presenta posibilidades de estar en un grupo de riesgo. Se recomienda consultar un especialista y realizar seguimiento periódico."
    },

        {
      id: 3,
      titulo: "Rojo",
      descripcion: "DadRRRos sus antecedentes familiares y estudios, presenta posibilidades de estar en un grupo de riesgo. Se recomienda consultar un especialista y realizar seguimiento periódico."
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
