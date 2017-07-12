var preguntas = [
    {
        pregunta: "Concentración de glucosa plasmática",
        descripcion: "Catidad de glucosa presente en sangre, medido en mg/dL",
        respuestas : [
            "0 - 99,5",
            "99,5 - 132,66",
            "132,66 - 199"
        ]
    },
    {
        pregunta: "Presión arterial diastólica",
        descripcion: "Presión más baja medida en las arterias; se produce cuando el músculo cardíaco está relajado entre latidos. Medida en  mmHg",
        respuestas : [
            "0 - 67,77",
            "67,77 - 81,33",
            "81,33 - 122"
        ]
    },
    {
        pregunta: "Espesor del pliegue cutáneo del tríceps",
        descripcion: "El espesor del doble pliegue de piel y tejido adiposo subcutáneo comprimido en la parte posterior del tríceps, medido en mm",
        respuestas : [
            "0 - 16,5",
            "16,5 - 33 ",
            "33 - 99 "
        ]
    },
    {
        pregunta: "Índice de masa corporal",
        descripcion: "Es una medida de asociación entre la masa y la talla de un individuo",
        respuestas : [
            "0 - 28,75",
            "28,75 - 38,34",
            "38,34 o más"
        ]
    },
    {
        pregunta: "Función pedigree diabetes",
        descripcion: "Una función que representa la probabilidad que existe para tener la enfermedad mediante la extrapolación de la historia de sus antepasados",
        respuestas : [
            "0,078 - 0,468",
            "0,468 - 0,859",
            "0,859 - 2,42"
        ]
    },
    {
        pregunta: "Edad",
        descripcion: "Edad del paciente",
        respuestas : [
            "26 o menos",
            "27 - 38",
            "39 - 55",
            "56 - 81"
        ]
    },
    {
        pregunta: "Cantidad de embarazos",
        descripcion: "",
        respuestas : [
            "0 - 3",
            "3 o más"
        ]
    }
];

var resultados = [
    {
      id: 0,
      titulo: "Baja probabilidad de portar la enfermedad diabetes",
      descripcion: "Dados sus antecedentes familiares, y características inherentes a su persona se considera baja la probabilidad de poseer la enfermedad"
    },
    {
      id: 1,
      titulo: "Probabilidad de existencia de la enfermedad",
      descripcion: "Dados sus antecedentes familiares y estudios, presenta posibilidades de estar en un grupo de riesgo. Se recomienda consultar un especialista y realizar seguimiento periódico."
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
