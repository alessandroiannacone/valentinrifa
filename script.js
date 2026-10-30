/**
 * ====================================================================
 * SCRIPT PRINCIPAL - RIFA 00 AL 99 ("TODOS POR VALENTÍN")
 * ====================================================================
 * 
 * Este script procesa los datos definidos en 'numeros.js', valida las reglas
 * de negocio, calcula las estadísticas de ocupación y genera la cuadrícula
 * visual de 100 números con sus respectivos colores y leyendas.
 */

// 1. CONFIGURACIÓN GENERAL EDITABLE
const CONFIG = {
    // Número telefónico para WhatsApp (con código de país, sin espacios ni símbolos)
    // Perú: código 51 seguido de los 9 dígitos
    telefonoWhatsApp: "51998167789",

    // Mensaje predeterminado al hacer clic en contactar
    mensajeWhatsApp: "Hola, quiero apoyar a valentin 🥺 en tu rifa. Deseo el numero ",

    // Datos informativos
    precioNumero: "S/ 20",
    totalNumeros: 100
};

// 2. INICIALIZACIÓN AL CARGAR LA PÁGINA
document.addEventListener("DOMContentLoaded", () => {
    inicializarRifa();
    configurarBotonesWhatsApp();
    configurarBuscadorYFiltros();
    configurarModalImagen();
});

/**
 * Función principal que valida, procesa y renderiza el estado de la rifa.
 */
function inicializarRifa() {
    // Validar existencia de datos en 'numeros.js'
    const datosRaw = typeof numeros !== "undefined" ? numeros : { disponibles: [], reservados: [], noDisponibles: [], participantes: {} };

    // Sanitizar y validar los arrays para cumplir con todas las restricciones
    const { reservadosSet, noDisponiblesSet, participantesMap } = sanitizarListas(datosRaw);

    // Mapear el estado de cada uno de los 100 números (del 0 al 99)
    const estadoNumeros = [];
    let contadorDisponibles = 0;
    let contadorReservados = 0;
    let contadorNoDisponibles = 0;

    for (let i = 0; i < CONFIG.totalNumeros; i++) {
        let estado = "disponible";

        // Regla: No permitir que un número tenga dos estados diferentes.
        // Si está en noDisponibles tiene máxima prioridad (pagado).
        if (noDisponiblesSet.has(i)) {
            estado = "no-disponible";
            contadorNoDisponibles++;
        } else if (reservadosSet.has(i)) {
            estado = "reservado";
            contadorReservados++;
        } else {
            estado = "disponible";
            contadorDisponibles++;
        }

        const participante = participantesMap.get(i) || "";

        estadoNumeros.push({
            numero: i,
            numeroFormateado: i.toString().padStart(2, "0"),
            estado: estado,
            participante: participante
        });
    }

    // Actualizar contadores y estadísticas
    actualizarEstadisticas({
        disponibles: contadorDisponibles,
        reservados: contadorReservados,
        noDisponibles: contadorNoDisponibles,
        total: CONFIG.totalNumeros
    });

    // Renderizar la cuadrícula de 100 números
    renderizarCuadricula(estadoNumeros);
}

/**
 * Sanitiza las listas de números:
 * - Valida que sean enteros entre 0 y 99.
 * - Elimina duplicados.
 * - Resuelve colisiones (si está en reservados y noDisponibles, prevalece noDisponibles).
 * - Mapea los nombres de participantes asociados a cada número.
 */
function sanitizarListas(datos) {
    const filtrarValidos = (arr) => {
        if (!Array.isArray(arr)) return [];
        return arr
            .map(n => parseInt(n, 10))
            .filter(n => !isNaN(n) && n >= 0 && n < CONFIG.totalNumeros);
    };

    const noDisponiblesLimpios = Array.from(new Set(filtrarValidos(datos.noDisponibles)));
    const noDisponiblesSet = new Set(noDisponiblesLimpios);

    // Si un número está en noDisponibles, no puede estar en reservados
    const reservadosLimpios = Array.from(new Set(filtrarValidos(datos.reservados)))
        .filter(n => {
            if (noDisponiblesSet.has(n)) {
                console.warn(`[Aviso Rifa] El número ${n} estaba en reservados y noDisponibles. Se priorizó como No Disponible (Pagado).`);
                return false;
            }
            return true;
        });

    const reservadosSet = new Set(reservadosLimpios);

    // Sanitizar nombres de los participantes (acepta claves numéricas o con ceros a la izquierda)
    const participantesMap = new Map();
    if (datos && datos.participantes && typeof datos.participantes === "object") {
        Object.entries(datos.participantes).forEach(([clave, nombre]) => {
            const num = parseInt(clave, 10);
            if (!isNaN(num) && num >= 0 && num < CONFIG.totalNumeros && typeof nombre === "string") {
                const nombreLimpio = nombre.trim();
                if (nombreLimpio) {
                    participantesMap.set(num, nombreLimpio);
                }
            }
        });
    }

    return { reservadosSet, noDisponiblesSet, participantesMap };
}

/**
 * Renderiza las 100 tarjetas no interactivas en la cuadrícula.
 */
function renderizarCuadricula(listaNumeros) {
    const grid = document.getElementById("grid-numeros");
    if (!grid) return;

    grid.innerHTML = "";

    const fragment = document.createDocumentFragment();

    listaNumeros.forEach(item => {
        const celda = document.createElement("div");
        celda.className = `numero-item estado-${item.estado}`;
        celda.id = `num-${item.numeroFormateado}`;
        celda.setAttribute("data-numero", item.numeroFormateado);
        celda.setAttribute("data-estado", item.estado);
        celda.setAttribute("data-participante", item.participante);
        celda.setAttribute("role", "status");

        // Texto accesible para el estado
        let textoEstado = "Disponible";
        let iconoEstado = "🟢";
        if (item.estado === "reservado") {
            textoEstado = "Reservado";
            iconoEstado = "🟠";
        } else if (item.estado === "no-disponible") {
            textoEstado = "No disponible / Pagado";
            iconoEstado = "🔴";
        }

        let tituloTooltip = `Número ${item.numeroFormateado} • ${textoEstado}`;
        if (item.participante) {
            tituloTooltip += ` • Participante: ${item.participante}`;
        }
        celda.setAttribute("title", tituloTooltip);

        celda.innerHTML = `
            <span class="numero-digitos">${item.numeroFormateado}</span>
            ${item.participante ? `<span class="numero-participante">${item.participante}</span>` : ""}
            <span class="numero-etiqueta">${textoEstado}</span>
        `;

        fragment.appendChild(celda);
    });

    grid.appendChild(fragment);
}

/**
 * Actualiza los contadores visuales y la barra de progreso de ocupación.
 */
function actualizarEstadisticas(stats) {
    const elDisponibles = document.getElementById("stat-disponibles");
    const elReservados = document.getElementById("stat-reservados");
    const elNoDisponibles = document.getElementById("stat-no-disponibles");
    const elTotal = document.getElementById("stat-total");
    const elPorcentaje = document.getElementById("stat-porcentaje");
    const barraProgreso = document.getElementById("barra-progreso");
    const labelProgreso = document.getElementById("label-progreso");

    if (elDisponibles) elDisponibles.textContent = stats.disponibles;
    if (elReservados) elReservados.textContent = stats.reservados;
    if (elNoDisponibles) elNoDisponibles.textContent = stats.noDisponibles;
    if (elTotal) elTotal.textContent = stats.total;

    // Ocupación: (reservados + no disponibles) / total * 100
    const ocupados = stats.reservados + stats.noDisponibles;
    const porcentajeOcupacion = Math.round((ocupados / stats.total) * 100);

    if (elPorcentaje) elPorcentaje.textContent = `${porcentajeOcupacion}%`;
    if (barraProgreso) {
        barraProgreso.style.width = `${porcentajeOcupacion}%`;
        barraProgreso.setAttribute("aria-valuenow", porcentajeOcupacion);
    }
    if (labelProgreso) {
        labelProgreso.textContent = `${ocupados} de ${stats.total} números ocupados (${porcentajeOcupacion}%)`;
    }
}

/**
 * Configura los enlaces directos para WhatsApp con número y mensaje configurados.
 */
function configurarBotonesWhatsApp() {
    const enlaceWsp = `https://wa.me/${CONFIG.telefonoWhatsApp}?text=${encodeURIComponent(CONFIG.mensajeWhatsApp)}`;

    // Todos los elementos con clase 'btn-whatsapp' o 'link-whatsapp'
    const botones = document.querySelectorAll(".accion-whatsapp");
    botones.forEach(btn => {
        btn.setAttribute("href", enlaceWsp);
        btn.setAttribute("target", "_blank");
        btn.setAttribute("rel", "noopener noreferrer");
    });
}

/**
 * Configura buscador en tiempo real y filtros de visualización
 * (Únicamente ayuda visual, sin selección ni modificación de estados).
 */
function configurarBuscadorYFiltros() {
    const inputBusqueda = document.getElementById("input-busqueda");
    const resultadoBusqueda = document.getElementById("resultado-busqueda");
    const botonesFiltro = document.querySelectorAll(".btn-filtro");

    if (inputBusqueda) {
        inputBusqueda.addEventListener("input", (e) => {
            const valor = e.target.value.trim();
            const todosLosNumeros = document.querySelectorAll(".numero-item");

            // Remover resaltados previos
            todosLosNumeros.forEach(el => el.classList.remove("resaltado", "atenuado"));
            if (resultadoBusqueda) resultadoBusqueda.textContent = "";

            if (valor === "") return;

            const numPad = valor.padStart(2, "0");
            const tarjeta = document.getElementById(`num-${numPad}`);

            if (tarjeta) {
                // Atenuar los demás y resaltar el encontrado
                todosLosNumeros.forEach(el => {
                    if (el !== tarjeta) el.classList.add("atenuado");
                });
                tarjeta.classList.add("resaltado");
                tarjeta.scrollIntoView({ behavior: "smooth", block: "center" });

                const estado = tarjeta.getAttribute("data-estado");
                const participante = tarjeta.getAttribute("data-participante");
                let desc = "Disponible 🟢";
                if (estado === "reservado") desc = "Reservado 🟠";
                if (estado === "no-disponible") desc = "No disponible / Pagado 🔴";

                if (resultadoBusqueda) {
                    const extraParticipante = participante ? ` • 👤 <strong>${participante}</strong>` : "";
                    resultadoBusqueda.innerHTML = `Número <strong>${numPad}</strong>: <span class="badge-${estado}">${desc}</span>${extraParticipante}`;
                }
            } else {
                if (resultadoBusqueda) {
                    resultadoBusqueda.textContent = "Ingresa un número válido del 00 al 99";
                }
            }
        });
    }

    // Filtros de visualización por pestañas
    botonesFiltro.forEach(boton => {
        boton.addEventListener("click", () => {
            botonesFiltro.forEach(b => b.classList.remove("activo"));
            boton.classList.add("activo");

            const filtro = boton.getAttribute("data-filtro");
            const celdas = document.querySelectorAll(".numero-item");

            celdas.forEach(celda => {
                const estado = celda.getAttribute("data-estado");
                if (filtro === "todos" || estado === filtro) {
                    celda.style.display = "flex";
                } else {
                    celda.style.display = "none";
                }
            });
        });
    });
}

/**
 * Modal para visualizar el afiche o premio en pantalla completa
 */
function configurarModalImagen() {
    const triggerPremio = document.getElementById("img-premio-trigger");
    const aficheImg = document.getElementById("afiche-img");
    const modal = document.getElementById("modal-lightbox");
    const modalImg = document.getElementById("modal-img");
    const btnCerrar = document.getElementById("modal-cerrar");

    if (!triggerPremio || !modal) return;

    triggerPremio.addEventListener("click", () => {
        modal.classList.add("activo");
        if (modalImg && aficheImg) {
            modalImg.src = aficheImg.src;
        }
    });

    if (btnCerrar) {
        btnCerrar.addEventListener("click", () => {
            modal.classList.remove("activo");
        });
    }

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("activo");
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("activo")) {
            modal.classList.remove("activo");
        }
    });
}

