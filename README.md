# 🐾 Página Web de Rifa: "Todos por Valentín" (00 al 99)

Sitio web moderno, elegante, responsive y 100% frontend para mostrar la disponibilidad en tiempo real de los 100 números (del **00** al **99**) de la rifa benéfica pro fondos para la operación de Valentín.

---

## 📋 Características Principales

- **Tecnologías puras**: Desarrollado con **HTML5**, **CSS3** y **Vanilla JavaScript** (sin frameworks, sin backend, sin base de datos ni APIs externas).
- **Diseño Responsive & Mobile-First**: Adaptado especialmente para teléfonos celulares y con vista de 10 columnas en pantallas de computadora.
- **Cuadrícula de 100 números (00 al 99)**: Visualización limpia con dos dígitos obligatorios.
- **3 Estados con colores oficiales**:
  - 🟢 **Verde (`#16A34A`)**: **DISPONIBLE** (Libre).
  - 🟠 **Amarillo Anaranjado (`#F59E0B`)**: **RESERVADO** (Pendiente de pago).
  - 🔴 **Rojo (`#DC2626`)**: **NO DISPONIBLE / PAGADO** (Vendido).
- **Contadores en tarjetas**: Número de disponibles, reservados, no disponibles y porcentaje de ocupación con barra de progreso.
- **Botón de WhatsApp oficial**:
  - Botón principal en la cabecera.
  - Botón flotante siempre visible en celulares y computadoras con animación de pulso y enlace configurado a `+51 998 167 789`.
- **Buscador y filtros visuales**: Permite al usuario buscar rápidamente si su número de la suerte está libre (sin modificar el tablero ni permitir selecciones interactivas de compra).
- **Afiche oficial con zoom**: Permite visualizar y ampliar la imagen del sorteo (`valentin.jpg`).

---

## 📁 Estructura del Proyecto

```text
cocker-valentin/
├── index.html        # Estructura principal y semántica de la página
├── style.css         # Estilos, colores oficiales, diseño responsive y animaciones
├── script.js         # Lógica de validación, contadores y generación de la cuadrícula
├── numeros.js        # ARCHIVO DE ADMINISTRACIÓN (Aquí modificas los estados)
├── valentin.jpg      # Afiche oficial de la rifa y premios
└── README.md         # Documentación e instrucciones de despliegue
```

---

## ⚙️ Cómo Administrar los Números (`numeros.js`)

**No necesitas panel de administración ni base de datos.** Todos los cambios se realizan editando únicamente el archivo `numeros.js`.

Abre `numeros.js` con cualquier editor de texto o directamente desde GitHub:

```javascript
const numeros = {
    disponibles: [],
    reservados: [5, 12, 23, 44, 78],
    noDisponibles: [3, 8, 15, 22, 47, 81, 99]
};
```

### Reglas de actualización:
1. **Para marcar un número como RESERVADO (Color Ámbar #F59E0B):**
   - Agrégalo a la lista `reservados`.
   - Ejemplo: `reservados: [5, 12, 23, 77]`
2. **Para marcar un número como PAGADO / NO DISPONIBLE (Color Rojo #DC2626):**
   - Si estaba en `reservados`, quítalo de allí y agrégalo a `noDisponibles`.
   - Ejemplo: `noDisponibles: [3, 8, 15, 22, 47, 81, 77]`
3. **Para marcar un número como DISPONIBLE (Color Verde #16A34A):**
   - Simplemente bórralo de `reservados` y de `noDisponibles`.
   - Automáticamente el sistema lo considerará libre y lo pintará de verde.

> **Nota:** Todos los números entre 0 y 99 que no estén en `reservados` ni en `noDisponibles` pasan a ser **Disponibles** de forma automática. El sistema previene colisiones y duplicados de forma transparente.

---

## 📱 Configuración de WhatsApp (`script.js`)

Si en el futuro deseas cambiar el número de teléfono o el mensaje predeterminado, abre `script.js` y edita las primeras líneas:

```javascript
const CONFIG = {
    // Código de país (51 para Perú) + número de celular (998167789)
    telefonoWhatsApp: "51998167789",

    // Mensaje que se abrirá automáticamente en el WhatsApp del comprador
    mensajeWhatsApp: "Hola, estoy interesado en participar en tu rifa. ¿Qué números tienes disponibles?",

    precioNumero: "S/ 20",
    totalNumeros: 100
};
```

---

## 🚀 Publicación Gratuita en GitHub y Netlify

### Paso 1: Subir el proyecto a GitHub

1. En la carpeta de tu proyecto, abre una terminal (PowerShell o Git Bash) y ejecuta:
   ```bash
   git init
   git add .
   git commit -m "Versión inicial: Rifa Todos por Valentín"
   ```
2. Crea un repositorio nuevo en [GitHub.com](https://github.com/new) (por ejemplo: `rifa-valentin`).
3. Conecta y sube tus archivos con los comandos que te proporciona GitHub:
   ```bash
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/rifa-valentin.git
   git push -u origin main
   ```

---

### Paso 2: Desplegar gratis en Netlify

1. Entra a [Netlify.com](https://www.netlify.com/) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en el botón **"Add new site"** > **"Import an existing project"**.
3. Selecciona **GitHub** y escoge tu repositorio `rifa-valentin`.
4. En las opciones de despliegue:
   - **Branch to deploy**: `main`
   - **Build command**: *(dejar en blanco)*
   - **Publish directory**: *(dejar en blanco o colocar `.`)*
5. Haz clic en **"Deploy site"**.
6. En 10 segundos tu página web estará disponible en una URL como `https://rifa-valentin.netlify.app`. Puedes asignarle el subdominio gratuito que quieras en *Site configuration > Change site name*.

---

### 🔄 ¿Cómo actualizar los números una vez publicado?

¡Es súper fácil! Tienes 2 opciones:

#### Opción A (La más rápida, directo desde tu celular o navegador web):
1. Entra a tu repositorio en GitHub desde tu computadora o celular.
2. Abre el archivo `numeros.js` y presiona el ícono del **Lápiz** (Edit this file).
3. Modifica los números en `reservados` o `noDisponibles`.
4. Presiona el botón verde **"Commit changes"**.
5. ¡Listo! Netlify detectará el cambio y en 15 segundos tu página web se actualizará automáticamente sin que tengas que hacer nada más.

#### Opción B (Desde tu computadora local):
1. Edita `numeros.js` en tu editor preferido.
2. Guarda el archivo y ejecuta en tu terminal:
   ```bash
   git add numeros.js
   git commit -m "Actualizar estados de números"
   git push
   ```
3. Netlify actualizará el sitio web automáticamente.

