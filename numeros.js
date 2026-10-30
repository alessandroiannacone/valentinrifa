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
 * 3. Para marcar un número como DISPONIBLE (Libre - Color Verde #16A34A):
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
    reservados: [5, 12, 23, 44, 78],

    // Números ya cancelados / vendidos (Color Rojo)
    noDisponibles: [1, 2, 3, 5, 7, 8, 9, 11, 13, 19, 22, 29, 32, 33, 58, 88]
};

