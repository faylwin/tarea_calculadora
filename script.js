/**
 * LÓGICA DE LA APLICACIÓN - MÓDULO 3
 * Cumplimiento de Lecciones 1 a 5
 */

// --- I. GESTIÓN DE DATOS (Objetos y Arreglos - Lección 5) ---
const sistema = {
    historial: [],
    
    // Método para procesar y guardar operaciones
    registrar: function(operacionTexto) {
        const item = {
            id: Date.now(),
            glosa: operacionTexto,
            timestamp: new Date().toLocaleTimeString(),
            metadato: "Cálculo Exitoso" // Agregamos un metadato como solicitaste
        };
        this.historial.unshift(item);
        this.actualizarVistaHistorial();
    },

    // Uso de map para renderizar (Requerimiento Lección 5)
    actualizarVistaHistorial: function() {
        const listaUI = document.getElementById('history-list');
        if (!listaUI) return;

        const html = this.historial.slice(0, 5).map(obj => `
            <li>
                <strong>${obj.glosa}</strong>
                <span>[${obj.timestamp}]</span>
            </li>
        `).join('');

        listaUI.innerHTML = html || '<li class="empty-msg">No hay registros</li>';
    }
};

// --- II. VARIABLES Y ESTADO (Lección 2) ---
let actual = '0';
let anterior = '';
let opPendiente = undefined;

// --- III. FUNCIONES MODULARES (Lección 4) ---
const math = {
    sum: (a, b) => a + b,
    sub: (a, b) => a - b,
    mul: (a, b) => a * b,
    div: (a, b) => b === 0 ? "ERR_DIV_ZERO" : a / b
};

// --- IV. CONTROLADORES DE INTERFAZ ---
function updateDisplay() {
    document.getElementById('curr-val').innerText = actual;
    document.getElementById('prev-val').innerText = opPendiente ? `${anterior} ${opPendiente}` : '';
}

function addNum(n) {
    if (n === '.' && actual.includes('.')) return;
    actual = actual === '0' ? n : actual + n;
    updateDisplay();
}

function setOperacion(op) {
    if (actual === '') return;
    if (anterior !== '') ejecutarCalculo();
    opPendiente = op;
    anterior = actual;
    actual = '';
    updateDisplay();
}

function ejecutarCalculo() {
    let res;
    const n1 = parseFloat(anterior);
    const n2 = parseFloat(actual);

    if (isNaN(n1) || isNaN(n2)) return;

    // Estructura Switch (Lección 2)
    switch (opPendiente) {
        case '+': res = math.sum(n1, n2); break;
        case '-': res = math.sub(n1, n2); break;
        case '*': res = math.mul(n1, n2); break;
        case '/': res = math.div(n1, n2); break;
        default: return;
    }

    if (res === "ERR_DIV_ZERO") {
        alert("Error crítico: División por cero");
        limpiar();
        return;
    }

    sistema.registrar(`${n1} ${opPendiente} ${n2} = ${res}`);
    actual = res.toString();
    opPendiente = undefined;
    anterior = '';
    updateDisplay();
}

function limpiar() {
    actual = '0'; anterior = ''; opPendiente = undefined;
    updateDisplay();
}

function borrar() {
    actual = actual.length > 1 ? actual.slice(0, -1) : '0';
    updateDisplay();
}

// --- V. MODO INTERACTIVO (Ciclos y Prompts - Lección 3) ---
function iniciarModoPrompt() {
    alert("Iniciando Modo Interactivo...");
    let numBase = prompt("Ingrese el primer valor:");
    if (numBase === null) return;
    
    numBase = parseFloat(numBase);
    let activo = true;

    while (activo) { // Bucle While (Lección 3)
        if (isNaN(numBase)) break;

        let oper = prompt(`Valor base: ${numBase}\nIngrese operación (+, -, *, /) o cancela para salir:`);
        if (!oper) break;

        let numSig = prompt("Ingrese el siguiente valor:");
        if (numSig === null) break;
        numSig = parseFloat(numSig);

        let final;
        if (oper === '+') final = math.sum(numBase, numSig);
        else if (oper === '-') final = math.sub(numBase, numSig);
        else if (oper === '*') final = math.mul(numBase, numSig);
        else if (oper === '/') final = math.div(numBase, numSig);
        
        if (final === "ERR_DIV_ZERO" || isNaN(final)) {
            alert("Operación inválida.");
            break;
        }

        alert(`Resultado obtenido: ${final}`);
        sistema.registrar(`(Prompt) ${numBase} ${oper} ${numSig} = ${final}`);
        numBase = final;
        
        activo = confirm("¿Desea continuar operando con este resultado?");
    }
}