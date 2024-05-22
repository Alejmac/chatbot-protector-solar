// MESSAGE INPUT
const textarea = document.querySelector('.chatbox-message-input');
const chatboxForm = document.querySelector('.chatbox-message-form');
// Objeto para almacenar las respuestas del usuario
const answers = {};
let preguntasRespondidas = 0;
let preguntaActual = '';
let dialogoIniciado = false;
let preguntaRepetida = false;


document.addEventListener('DOMContentLoaded', () => {

    dialogoIniciado = true;
})

const chatboxToggle = document.querySelector('.chatbox-toggle');
const chatboxMessage = document.querySelector('.chatbox-message-wrapper');

chatboxToggle.addEventListener('click', function () {
    
    chatboxMessage.classList.toggle('show');
    if (chatboxMessage.classList.contains('show')) {
        iniciarDialogo();
        dialogoIniciado = true;
    }
});

const dropdownToggle = document.querySelector('.chatbox-message-dropdown-toggle');
const dropdownMenu = document.querySelector('.chatbox-message-dropdown-menu');

dropdownToggle.addEventListener('click', function () {
    dropdownMenu.classList.toggle('show');
});

document.addEventListener('click', function (e) {
    if (!e.target.matches('.chatbox-message-dropdown, .chatbox-message-dropdown *')) {
        dropdownMenu.classList.remove('show');
    }
});
// Agregar el controlador de eventos para enviar el formulario al presionar Enter
textarea.addEventListener('keypress', function (e) {
    // Si la tecla presionada es Enter
    if (e.key === 'Enter') {
        // Evita la acción por defecto (añadir una nueva línea)
        e.preventDefault();
        // Envía el formulario
        chatboxForm.dispatchEvent(new Event('submit'));
    }
});


// CHATBOX mensaje
const chatboxMessageWrapper = document.querySelector('.chatbox-message-content');
const chatboxNoMessage = document.querySelector('.chatbox-message-no-message');
// Seleccionar el formulario y el campo de entrada
 var form = document.querySelector('.chatbox-message-form');
var input = document.querySelector('.chatbox-message-input'); 

chatboxForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Obtiene el mensaje del textarea
    const messageText = textarea.value.trim();

    // Crea un nuevo elemento de mensaje
    const messageElement = document.createElement('div');
    messageElement.classList.add('chatbox-message-item', 'sent');
    messageElement.textContent = messageText;

    // Agrega el nuevo mensaje al contenedor de mensajes
    chatboxMessageWrapper.appendChild(messageElement);

    // Procesa la respuesta del usuario y hace la siguiente pregunta
    manejarRespuesta(messageText);

    // Limpia el textarea
    textarea.value = '';

    // Desplaza el contenedor de mensajes hacia abajo para mostrar el nuevo mensaje
    chatboxMessageWrapper.scrollTop = chatboxMessageWrapper.scrollHeight;
});

function addZero(num) {
    return num < 10 ? '0' + num : num;
}

// funcion para limpiar la pantalla
function clearChatbox() {
    chatboxMessageWrapper.innerHTML = '';
}

//añadir un  scroll
function scrollBottom() {
    chatboxMessageWrapper.scrollTo(0, chatboxMessageWrapper.scrollHeight);
}

//funcion para escribir en pantalla
function writeMessage(message) {
    const today = new Date();
    let formattedMessage = `
        <div class="chatbox-message-item received animate">
            <span class="chatbox-message-item-text">${message}</span>
            <span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
        </div>
    `;
    chatboxMessageWrapper.insertAdjacentHTML('beforeend', formattedMessage);
    scrollBottom();
}

function isValid(value) {
    let text = value.replace(/\n/g, '');
    text = text.replace(/\s/g, '');
    return text.length > 0;
}

// Iniciar diálogo cuando carga la página
function iniciarDialogo() {
    clearChatbox()
    writeMessage("Hola, bienvenido a Harmonie Center");
    setTimeout(() => {
        preguntaActual = '¿Qué tipo de piel tienes?';
        preguntarTipoPiel();
    }, 200);
}
function manejarRespuesta(respuesta) {
    // Convertir la respuesta a minúsculas
    respuesta = respuesta.toLowerCase();

    if (isValid(respuesta)) {
        const isValidAnswer = processAnswer(preguntaActual, respuesta);
        if (isValidAnswer) {
            preguntasRespondidas++;
            mostrarSiguientePregunta();
        } else {
            // Si la respuesta no es válida, informa al usuario
            writeMessage("Opción no válida. Por favor, intenta de nuevo.");
            // Vuelve a hacer la pregunta actual
            chatboxForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const newAnswer = textarea.value.trim();
                manejarRespuesta(newAnswer);
            }, { once: true });
        }
        textarea.value = '';
    }
}
// Función para mostrar la siguiente pregunta
function mostrarSiguientePregunta() {
    switch (Object.keys(answers).length) {
        case 0:
            preguntaActual = '¿Qué tipo de piel tienes?';
            preguntarTipoPiel();
            break;
        case 1:
            preguntaActual = '¿Cuál es tu tono de piel?';
            preguntarTonoPiel();
            break;
        case 2:
            preguntaActual = '¿Qué actividades realizas al aire libre?';
            preguntarActividadesAireLibre();
            break;
        case 3:
            preguntaActual = '¿Qué tipo de textura de producto prefieres?';
            preguntarTexturaProducto();
            break;
        case 4:
            preguntaActual = '¿Usas regularmente productos de protección solar?';
            preguntarUsoProtectorSolar();
            break;
        case 5:
            setTimeout(() => {
                concluirDialogo();
            }, 2000); 
            mostrarRecomendacion();
            break;
        default:
            break;
    }
}
function preguntarTipoPiel() {
    setTimeout(function() {
        writeMessage("¿Qué tipo de piel tienes?, si lo desconoces aquí te dejo un blog que te ayudará a identificarla");
        setTimeout(function() {
            writeMessage("https://escuelademaquillajemadrid.com/blog/tipos-piel/");
            setTimeout(function() {
                writeMessage("- Normal");
                setTimeout(function() {
                    writeMessage("- Seca");
                    setTimeout(function() {
                        writeMessage("- Grasa");
                        setTimeout(function() {
                            writeMessage("- Mixta");
                            setTimeout(function() {
                                writeMessage("- Sensible");
                            }, 2000);
                        }, 2000);
                    }, 2000);
                }, 2000);
            }, 2000);
        }, 2000);
    }, 3000);
}

function preguntarTonoPiel() {
    setTimeout(function() {
        writeMessage("¿Cuál es tu tono de piel?");
        setTimeout(function() {
            writeMessage("- Claro");
            setTimeout(function() {
                writeMessage("- Medio");
                setTimeout(function() {
                    writeMessage("- Oscuro");
                }, 2000);
            }, 2000);
        }, 2000);
    }, 3000);
}

function preguntarActividadesAireLibre() {
    setTimeout(function() {
        writeMessage("¿Qué actividades realizas al aire libre?");
        setTimeout(function() {
            writeMessage("- Deporte");
            setTimeout(function() {
                writeMessage("- Trabajo al aire libre");
                setTimeout(function() {
                    writeMessage("- Otra");
                }, 2000);
            }, 2000);
        }, 2000);
    }, 3000);
}

function preguntarTexturaProducto() {
    setTimeout(function() {
        writeMessage("¿Qué tipo de textura de producto prefieres?");
        setTimeout(function() {
            writeMessage("- Cremoso");
            setTimeout(function() {
                writeMessage("- Lechoso");
                setTimeout(function() {
                    writeMessage("- Otro");
                }, 2000);
            }, 2000);
        }, 2000);
    }, 3000);
}
function preguntarUsoProtectorSolar() {
    setTimeout(function() {
        writeMessage("¿Usas regularmente productos de protección solar?");
        setTimeout(function() {
            writeMessage("- Si");
            setTimeout(function() {
                writeMessage("- No");
            }, 2000);
        }, 2000);
    }, 3000);
}

// Concluir el diálogo
function concluirDialogo() {
    setTimeout(function() {
        writeMessage("Ya estamos por concluir, te sugeri el mejor producto para ti y cada cuanto tiempo te lo deberías aplicar durante tu día 😊");
        setTimeout(function() {
            writeMessage("¡Gracias por utilizar nuestro asistente de recomendación de protector solar! Si tienes más preguntas, no dudes en preguntar.");
        }, 2000);
    }, 2000);
}

// Función para calcular el FPS según el tono de piel
function calcularFpsSegunTonoPiel(tonoPiel) {
    if (tonoPiel === 'claro') {
        return 50
    } else if (tonoPiel === 'medio') {
        return 30
    } else if (tonoPiel === 'oscuro') {
        return 20
    } else {
        return 0;
    }
}

// Función para calcular la frecuencia de aplicación del protector solar
function calcularFrecuenciaAplicacion(fpsSeleccionado) {

    if (fpsSeleccionado === 0) {
        return 0;
    }
    const minutosProteccion = 10 * fpsSeleccionado;
    const horasProteccion = (minutosProteccion / 60).toFixed(1);
    return horasProteccion;
}

function calcularTexturaProtectorSolar(tipoPiel) {
    if (tipoPiel === 'normal' || tipoPiel === 'grasa' || tipoPiel === 'mixta') {
        return 'lechoso';
    } else if (tipoPiel === 'seca' || tipoPiel === 'sensible') {
        return 'cremoso';
    }
}

// Función para procesar las respuestas del usuario
function processAnswer(question, answer) {

    let isValidAnswer = false;
    switch (question) {
        case '¿Qué tipo de piel tienes?':
            if (['normal', 'seca', 'grasa', 'mixta', 'sensible'].includes(answer.toLowerCase())) {
                answers['tipo_piel'] = answer;
                isValidAnswer = true;
            }
            break;
        case '¿Cuál es tu tono de piel?':
            if (['claro', 'medio', 'oscuro'].includes(answer.toLowerCase())) {
                answers['tono_piel'] = answer;
                isValidAnswer = true;
            }
            break;
        case '¿Qué actividades realizas al aire libre?':
            if (['deporte', 'trabajo al aire libre', 'otra'].includes(answer.toLowerCase())) {
                answers['actividades_aire_libre'] = answer;
                isValidAnswer = true;
            }
            break;
        case '¿Qué tipo de textura de producto prefieres?':
            if (['cremoso', 'lechoso', 'otro'].includes(answer.toLowerCase())) {
                answers['textura_producto'] = answer;
                isValidAnswer = true;
            }
            break;
        case '¿Usas regularmente productos de protección solar?':
            if (['si', 'no'].includes(answer.toLowerCase())) {
                answers['uso_protector_solar'] = answer;
                isValidAnswer = true;
            }
            break;
        default:
            break;
    }

    return isValidAnswer;
}
// Función para mostrar la recomendación al usuario
function mostrarRecomendacion() {
    const tipoPiel = answers['tipo_piel'];
    const tonoPiel = answers['tono_piel'];
    const texturaProtectorSolar = calcularTexturaProtectorSolar(tipoPiel);
    const fpsSugerido = calcularFpsSegunTonoPiel(tonoPiel);
    const frecuenciaAplicacion = calcularFrecuenciaAplicacion(fpsSugerido);

    let recomendacion = '';
    if (texturaProtectorSolar && fpsSugerido !== undefined && frecuenciaAplicacion !== NaN) {
        recomendacion = `El mejor protector solar para ti en función de tu piel es ${texturaProtectorSolar}, con un FPS ${fpsSugerido} y deberías aplicarlo cada ${frecuenciaAplicacion} horas.`;
    } else {
        recomendacion = 'No se pudo generar una recomendación debido a información incompleta o incorrecta.';
    }
    writeMessage(recomendacion);
}