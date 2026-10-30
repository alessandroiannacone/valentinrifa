/**
 * ====================================================================
 * CONFIGURACIÓN DE NÚMEROS DE LA RIFA (00 AL 99)
 * ====================================================================
 * 
 * INSTRUCCIONES DE USO:
 * 
 * 1. Para marcar números como RESERVADOS (Pendientes de pago - Color Ámbar #F59E0B):
 *    Agrégalos a la lista 'reservados'.
 *    Ejemplo: reservados: [5, 12, 23, 77]
 * 
 * 2. Para marcar números como NO DISPONIBLES (Ya pagados / Vendidos - Color Rojo #DC2626):
 *    Agrégalos a la lista 'noDisponibles'.
 *    Ejemplo: noDisponibles: [3, 8, 15, 22, 47, 81]
 * 
 * 3. Para asignar NOMBRE Y PRIMER APELLIDO a cualquier número:
 *    Agrégalos en el diccionario 'participantes' con el número y el nombre.
 *    Ejemplo:
 *    participantes: {
 *        1: "Carlos Pérez",
 *        7: "María Gómez"
 *    }
 * 
 * 4. Para marcar un número como DISPONIBLE (Libre - Color Verde #16A34A):
 *    Simplemente asegúrate de que NO esté ni en 'reservados' ni en 'noDisponibles'.
 *    Todos los números no incluidos se consideran disponibles automáticamente.
 * 
 * NOTAS IMPORTANTES:
 * - Los números se escriben como números enteros (0, 1, 2... 99). En la web se mostrarán automáticamente con dos dígitos (00, 01, 02...).
 * - Si un número se repite por error en ambas listas, el sistema automáticamente le dará prioridad a 'noDisponibles' (pagado).
 * - No necesitas escribir comillas en los números, solo sepáralos por comas.
 */

const numeros = {
    // Lista opcional para forzar disponibles (por defecto cualquier número no reservado ni pagado ya es disponible)
    disponibles: [],

    // Números que alguien apartó pero aún no confirma el pago (Color Ámbar)
    reservados: [],

    // Números ya cancelados / vendidos (Color Rojo)
    noDisponibles: [
        1, 2, 3, 4, 5, 7, 8, 9, 11, 12, 13, 15, 18, 19, 21, 22, 25, 26, 27, 29, 30, 32, 33, 58, 53, 88
    ],

    // Nombre y primer apellido de los participantes (para saber a quién pertenece cada número)
    participantes: {
        1: "Gabriela Cañari",
        2: "Gabriela Cañari",
        3: "Rudy Reyson",
        4: "Isabel Iannacone",
        5: "Fatima Zamudio",
        7: "Yoselin Huayhua",
        8: "Patty Chloe",
        9: "Aaron Gaby",
        11: "Aaron Gaby",
        12: "Isabel Iannacone",
        13: "Ursula Sanden",
        15: "Isabel Iannacone",
        18: "Isabel Iannacone",
        19: "Jesus Abanto",
        21: "Lucero Rivera",
        22: "Aishe Karimah",
        25: "Isabel Iannacone",
        26: "Aishe Karimah",
        27: "Kristell Moreno",
        29: "Fatima Zamudio",
        30: "Sebastian Genesis",
        32: "Ursula Sanden",
        33: "Jeremias Mondragon",
        58: "Fatima Zamudio",
        88: "Fatima Zamudio",
        53: "Carmen Ticlla"
    }
};

