# Registro de Usuario — U4 Post-Contenido 2

Laboratorio de validación de formularios con JavaScript para la asignatura **Programación Web**, Unidad 4 — JavaScript Básico. Universidad Francisco de Paula Santander, Ingeniería de Sistemas 2026.

## Descripción

Formulario de registro con **validación completa del lado del cliente**, que combina:

- Constraint Validation API nativa del navegador (`validity.valueMissing`, `validity.tooShort`, `validity.typeMismatch`, `validity.patternMismatch`).
- Validación manual con expresiones regulares (contraseña: mayúscula + dígito).
- Retroalimentación visual inmediata por campo (clases `.valido` / `.invalido`).
- Indicador de fortaleza de contraseña en tiempo real (4 niveles con barra de segmentos).
- Control del evento `submit` con `e.preventDefault()`.
- Sintaxis ES6: `const`/`let`, arrow functions, template literals, destructuring.

## Estructura del Proyecto

```
apellido-post2-u4/
├── index.html      → Estructura HTML del formulario con atributos de validación nativa
├── styles.css      → Estilos con CSS variables, estados válido/inválido y animaciones
└── validacion.js   → Lógica de validación, eventos blur/submit e indicador de fortaleza
```

## Campos del Formulario

| Campo | Validación |
|---|---|
| Nombre completo | Obligatorio, mínimo 3 caracteres |
| Correo electrónico | Obligatorio, formato email válido |
| Contraseña | Obligatorio, mín. 8 chars, ≥1 mayúscula y ≥1 número |
| Confirmar contraseña | Obligatorio, debe coincidir con la contraseña |
| Teléfono | Opcional, solo dígitos, 7–15 caracteres |

## Instrucciones de Ejecución

1. Clonar o descargar el repositorio.
2. Abrir la carpeta en **Visual Studio Code**.
3. Iniciar **Live Server** (clic derecho en `index.html` → *Open with Live Server*).
4. El formulario se abre en `http://127.0.0.1:5500`.

No se requieren dependencias externas ni pasos de instalación.

## Checkpoints Verificados

- ✅ **Checkpoint 1** — Al enviar sin completar campos, cada uno muestra su error específico con borde rojo.
- ✅ **Checkpoint 2** — Validación en tiempo real al salir de cada campo (`blur`); el error desaparece al corregir.
- ✅ **Checkpoint 3** — Al completar todo correctamente aparece el mensaje de éxito; el formulario se limpia tras 2 s.
- ✅ **Checkpoint 4** — El indicador de fortaleza (Débil / Regular / Buena / Fuerte) se actualiza con cada tecla.

## Tecnologías Utilizadas

- HTML5 (atributos `required`, `minlength`, `maxlength`, `pattern`, `type="email"`)
- CSS3 (variables, transiciones, animaciones, Flexbox)
- JavaScript ES6+ (arrow functions, template literals, destructuring, `const`/`let`)
- Constraint Validation API
- Google Fonts — DM Serif Display + DM Sans

## Commits del Repositorio

```
feat: estructura HTML del formulario con atributos de validación nativa
feat: funciones de retroalimentación visual y validadores por campo (blur)
feat: manejo del submit, indicador de fortaleza y toggle de contraseña
```
