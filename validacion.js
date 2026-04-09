"use strict";

// ─── Funciones de retroalimentación ─────────────────────────────────────────

/**
 * Muestra un mensaje de error en el campo indicado y aplica clase CSS "invalido".
 * @param {string} campoId - ID del input (sin el prefijo "#").
 * @param {string} mensaje  - Texto del mensaje de error a mostrar.
 */
function mostrarError(campoId, mensaje) {
  const campo = document.querySelector(`#${campoId}`);
  const span  = document.querySelector(`#error-${campoId}`);
  campo.classList.add("invalido");
  campo.classList.remove("valido");
  span.textContent = mensaje;
  span.classList.add("visible");
}

/**
 * Limpia el mensaje de error de un campo y aplica clase CSS "valido".
 * @param {string} campoId - ID del input (sin el prefijo "#").
 */
function limpiarError(campoId) {
  const campo = document.querySelector(`#${campoId}`);
  const span  = document.querySelector(`#error-${campoId}`);
  campo.classList.remove("invalido");
  campo.classList.add("valido");
  span.textContent = "";
  span.classList.remove("visible");
}

/**
 * Limpia los errores de todos los campos del formulario.
 */
function limpiarTodo() {
  ["nombre", "email", "password", "confirmar", "telefono"]
    .forEach(id => limpiarError(id));
}

// ─── Validadores por campo ───────────────────────────────────────────────────

/**
 * Valida el campo "nombre" usando la Constraint Validation API.
 * @returns {boolean} true si el campo es válido, false en caso contrario.
 */
function validarNombre() {
  const campo = document.querySelector("#nombre");

  if (campo.validity.valueMissing) {
    mostrarError("nombre", "El nombre es obligatorio.");
    return false;
  }
  if (campo.validity.tooShort) {
    mostrarError("nombre", `El nombre debe tener al menos ${campo.minLength} caracteres.`);
    return false;
  }

  limpiarError("nombre");
  return true;
}

/**
 * Valida el campo "email" usando la Constraint Validation API.
 * Verifica que el campo no esté vacío y que el formato de correo sea correcto.
 * @returns {boolean}
 */
function validarEmail() {
  const campo = document.querySelector("#email");

  if (campo.validity.valueMissing) {
    mostrarError("email", "El correo es obligatorio.");
    return false;
  }
  if (campo.validity.typeMismatch) {
    mostrarError("email", "El formato del correo no es válido.");
    return false;
  }

  limpiarError("email");
  return true;
}

/**
 * Valida el campo "password":
 *  - Campo obligatorio y longitud mínima (Constraint Validation API).
 *  - Validación manual con regex: al menos una mayúscula y un número.
 * @returns {boolean}
 */
function validarPassword() {
  const campo = document.querySelector("#password");

  if (campo.validity.valueMissing) {
    mostrarError("password", "La contraseña es obligatoria.");
    return false;
  }
  if (campo.validity.tooShort) {
    mostrarError("password", "La contraseña debe tener al menos 8 caracteres.");
    return false;
  }

  // Validación manual con expresión regular: al menos una mayúscula y un dígito.
  const regex = /^(?=.*[A-Z])(?=.*\d).+$/;
  if (!regex.test(campo.value)) {
    mostrarError("password", "Debe incluir al menos una mayúscula y un número.");
    return false;
  }

  limpiarError("password");
  return true;
}

/**
 * Valida el campo "confirmar": no vacío y que coincida con el campo "password".
 * @returns {boolean}
 */
function validarConfirmar() {
  const password  = document.querySelector("#password").value;
  const confirmar = document.querySelector("#confirmar").value;

  if (!confirmar) {
    mostrarError("confirmar", "La confirmación es obligatoria.");
    return false;
  }
  if (password !== confirmar) {
    mostrarError("confirmar", "Las contraseñas no coinciden.");
    return false;
  }

  limpiarError("confirmar");
  return true;
}

/**
 * Valida el campo "telefono" (opcional).
 * Si está vacío se considera válido; si tiene valor debe cumplir el patrón HTML.
 * @returns {boolean}
 */
function validarTelefono() {
  const campo = document.querySelector("#telefono");

  // Campo opcional: vacío es válido.
  if (!campo.value.trim()) {
    limpiarError("telefono");
    return true;
  }
  if (campo.validity.patternMismatch) {
    mostrarError("telefono", "Solo dígitos, entre 7 y 15 caracteres.");
    return false;
  }

  limpiarError("telefono");
  return true;
}

// ─── Validación en tiempo real (blur por campo) ───────────────────────────────

document.querySelector("#nombre")   .addEventListener("blur", validarNombre);
document.querySelector("#email")    .addEventListener("blur", validarEmail);
document.querySelector("#password") .addEventListener("blur", validarPassword);
document.querySelector("#confirmar").addEventListener("blur", validarConfirmar);
document.querySelector("#telefono") .addEventListener("blur", validarTelefono);

// Limpiar error de confirmación al comenzar a reescribir.
document.querySelector("#confirmar").addEventListener("input", () => {
  if (document.querySelector("#confirmar").value) limpiarError("confirmar");
});

// ─── Indicador de fortaleza de contraseña ────────────────────────────────────

/**
 * Evalúa la fortaleza de una contraseña basándose en 4 criterios:
 *  1. Longitud ≥ 8 caracteres.
 *  2. Al menos una letra mayúscula.
 *  3. Al menos un dígito.
 *  4. Al menos un carácter especial.
 *
 * @param {string} valor - Contraseña a evaluar.
 * @returns {{ nivel: string, color: string, puntos: number, clase: string }}
 */
function evaluarFortaleza(valor) {
  let puntos = 0;
  if (valor.length >= 8)            puntos++;
  if (/[A-Z]/.test(valor))          puntos++;
  if (/[0-9]/.test(valor))          puntos++;
  if (/[^A-Za-z0-9]/.test(valor))   puntos++;

  const niveles = ["", "Débil", "Regular", "Buena", "Fuerte"];
  const colores = ["", "#fc8181", "#f6ad55", "#63b3ed", "#76e4b0"];
  const clases  = ["", "activo-debil", "activo-regular", "activo-buena", "activo-fuerte"];

  return { nivel: niveles[puntos], color: colores[puntos], puntos, clase: clases[puntos] };
}

const campoPassword = document.querySelector("#password");

campoPassword.addEventListener("input", () => {
  const { nivel, color, puntos, clase } = evaluarFortaleza(campoPassword.value);

  // Actualizar los 4 segmentos de la barra de fortaleza.
  for (let i = 1; i <= 4; i++) {
    const seg = document.querySelector(`#seg-${i}`);
    seg.className = "segmento"; // Resetear clases.
    if (i <= puntos) seg.classList.add(clase);
  }

  // Actualizar la etiqueta de texto.
  const label = document.querySelector("#fortaleza-label");
  label.textContent = puntos > 0 ? nivel : "";
  label.style.color = color;
});

// ─── Toggle mostrar/ocultar contraseña ───────────────────────────────────────

const btnToggle = document.querySelector("#toggle-pass");

btnToggle.addEventListener("click", () => {
  const input     = document.querySelector("#password");
  const eyeOpen   = btnToggle.querySelector(".eye-open");
  const eyeClosed = btnToggle.querySelector(".eye-closed");

  const esPassword = input.type === "password";
  input.type       = esPassword ? "text" : "password";
  eyeOpen.style.display   = esPassword ? "none"  : "block";
  eyeClosed.style.display = esPassword ? "block" : "none";
  btnToggle.setAttribute("aria-label", esPassword ? "Ocultar contraseña" : "Mostrar contraseña");
});

// ─── Manejo del evento submit ─────────────────────────────────────────────────

const form = document.querySelector("#form-registro");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Siempre prevenir el envío por defecto.

  // Ejecutar todas las validaciones y recoger resultados en un arreglo.
  const resultados = [
    validarNombre(),
    validarEmail(),
    validarPassword(),
    validarConfirmar(),
    validarTelefono(),
  ];

  // Verificar con Array.every() que todos los validadores retornaron true.
  const todoValido = resultados.every(r => r === true);

  if (todoValido) {
    // Mostrar mensaje de éxito con animación.
    const mensajeExito = document.querySelector("#mensaje-exito");
    mensajeExito.classList.remove("oculto");
    mensajeExito.classList.add("visible");

    // Limpiar formulario después de 2 segundos.
    setTimeout(() => {
      form.reset();
      limpiarTodo();

      // Resetear barra de fortaleza.
      for (let i = 1; i <= 4; i++) {
        document.querySelector(`#seg-${i}`).className = "segmento";
      }
      document.querySelector("#fortaleza-label").textContent = "";

      mensajeExito.classList.remove("visible");
      mensajeExito.classList.add("oculto");
    }, 2000);

  } else {
    // Enfocar el primer campo que tiene la clase "invalido".
    const primerInvalido = form.querySelector(".invalido");
    if (primerInvalido) primerInvalido.focus();
  }
});
