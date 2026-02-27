/**
 * APLICACIÓN DE CONSOLA — PROYECTO ABP
 * Alumno: Felipe Aylwin
 * Módulo 3: Fundamentos de Javascript
 */

// LECCIÓN 5: Objetos y Metadatos (Estructura principal)
const plataforma = {
    estudiante: "Felipe Aylwin",
    historial: [],
    configuracion: {
        modulo: 3,
        entorno: "Producción",
        fechaSincronizacion: new Date().toLocaleDateString()
    },

    // Método para registrar cada operación con metadatos precisos
    logOperacion: function(operacionEfectuada, resultadoFinal) {
        const metadataEntry = {
            id: Math.random().toString(36).substr(2, 9),
            glosa: operacionEfectuada,
            valor: resultadoFinal,
            timestamp: new Date().toLocaleTimeString(),
            status: "Procesado con éxito"
        };
        this.historial.push(metadataEntry);
        console.log(`%c[SISTEMA]: Registro guardado -> ${operacionEfectuada}`, "color: #7ee787;");
    }
};

// LECCIÓN 4: Funciones (Modularización)
const calculos = {
    adicion: (a, b) => a + b,
    sustraccion: (a, b) => a - b,
    multiplicacion: (a, b) => a * b,
    division: (a, b) => b === 0 ? "ERROR_CRITICO" : a / b
};

// LECCIÓN 1, 2 y 3: Lógica, Flujo e Interacción
function ejecutarApp() {
    console.log("%c--- INICIANDO SISTEMA INTERACTIVO ---", "color: #ef3e12; font-weight: bold; font-size: 14px;");
    
    const nombre = prompt("👤 Identificación de usuario:") || plataforma.estudiante;
    alert(`Bienvenido, ${nombre}. El sistema está listo para procesar datos.`);

    let continuar = true;

    // Estructura de repetición (While)
    while (continuar) {
        const n1 = parseFloat(prompt("🔢 Ingrese primer número:"));
        const operador = prompt("➕ Ingrese operación (+, -, *, /):");
        const n2 = parseFloat(prompt("🔢 Ingrese segundo número:"));

        let res;

        // Estructura condicional (Switch)
        switch (operador) {
            case '+': res = calculos.adicion(n1, n2); break;
            case '-': res = calculos.sustraccion(n1, n2); break;
            case '*': res = calculos.multiplicacion(n1, n2); break;
            case '/': res = calculos.division(n1, n2); break;
            default:
                alert("Operación no reconocida.");
                continue;
        }

        if (res === "ERROR_CRITICO") {
            alert("❌ Error: No es posible dividir por cero.");
        } else {
            alert(`Resultado: ${res}`);
            plataforma.logOperacion(`${n1} ${operador} ${n2}`, res);
        }

        continuar = confirm("¿Desea realizar otro cálculo?");
    }

    finalizarReporte(nombre);
}

// LECCIÓN 3: Arreglos y métodos avanzados (Filter, ForEach)
function finalizarReporte(user) {
    console.log(`\n%c📊 INFORME DE SESIÓN PARA: ${user.toUpperCase()}`, "color: #58a6ff; font-weight: bold;");

    if (plataforma.historial.length > 0) {
        console.log("Listado de transacciones:");
        // Uso de forEach para recorrer el historial
        plataforma.historial.forEach((item, index) => {
            console.log(`${index + 1}. [${item.timestamp}] ${item.glosa} = ${item.valor}`);
        });

        // Uso de Filter: Mostrar solo operaciones con resultados altos
        const filtrados = plataforma.historial.filter(entry => entry.valor > 50);
        if (filtrados.length > 0) {
            console.log("Operaciones con valor significativo (>50):", filtrados);
        }
    }

    console.log("Metadatos de auditoría:", plataforma.configuracion);
    alert(`¡Felicidades ${user}! Has completado el proyecto del Módulo 3.`);
}

// Disparar la aplicación
ejecutarApp();