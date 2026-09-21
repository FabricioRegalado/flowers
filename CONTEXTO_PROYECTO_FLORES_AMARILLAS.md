# Proyecto: Flores Amarillas Interactivas

## 1. Descripción general

Este proyecto consiste en una experiencia web romántica e interactiva inspirada en una animación de flores amarillas.

La aplicación mostrará inicialmente una flor individual acompañada de una indicación para interactuar. Al tocarla, se iniciará una secuencia animada en la que crecerá un árbol, aparecerán ramas y posteriormente múltiples girasoles que terminarán formando un corazón.

Al finalizar la animación, se mostrará un mensaje personalizado acompañado de la composición floral.

El proyecto será completamente **estático**:

- No requiere backend.
- No requiere base de datos.
- No requiere autenticación.
- No requiere APIs externas.
- No requiere servicios en la nube para funcionar.
- Toda la información editable se almacenará dentro del propio proyecto.

La aplicación deberá funcionar correctamente al desplegarse como sitio estático en plataformas como:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages
- Hosting web tradicional

---

# 2. Objetivo del proyecto

Crear una experiencia visual emotiva, elegante y fluida que pueda utilizarse como detalle digital para una persona especial.

Los principales objetivos son:

1. Reproducir la experiencia visual del video de referencia.
2. Optimizar la experiencia para dispositivos móviles.
3. Mantener una interfaz limpia y sin elementos innecesarios.
4. Crear animaciones suaves y agradables.
5. Permitir modificar fácilmente el contenido textual sin tocar los componentes visuales.
6. Mantener una arquitectura sencilla y fácil de mantener.
7. Garantizar un buen rendimiento en teléfonos de gama media.
8. Mantener el proyecto completamente estático.

---

# 3. Stack tecnológico

El proyecto se desarrollará utilizando:

## Framework

- React

## Bundler

- Vite

## Estilos

- Tailwind CSS

## Lenguaje recomendado
- JavaScript


## Animaciones

Prioridad:

1. CSS / Tailwind
2. React state
3. JavaScript únicamente cuando sea necesario controlar la secuencia

Opcionalmente puede utilizarse:

- Framer Motion

Sin embargo, no deberá añadirse si las animaciones pueden resolverse correctamente con CSS.

La prioridad debe ser mantener el bundle ligero.

---

# 4. Principio de diseño: Mobile First

La experiencia debe diseñarse inicialmente para pantallas móviles.

Resolución base recomendada:

```text
360 x 800 px
```

También deberá probarse como mínimo en:

```text
320 px
375 px
390 px
414 px
430 px
```

Posteriormente se deberán adaptar los estilos para:

- Tablet
- Laptop
- Escritorio
- Pantallas ultrawide

La versión de escritorio no deberá ser simplemente una versión ampliada de móvil.

El layout deberá reorganizarse cuando exista suficiente espacio horizontal.

---

# 5. Flujo general de la experiencia

La experiencia tendrá diferentes estados.

```text
INTRO
  ↓
INTERACTION
  ↓
TREE_GROWTH
  ↓
FLOWERS_APPEAR
  ↓
HEART_COMPLETE
  ↓
MESSAGE_REVEAL
  ↓
FINAL_SCENE
```

---

# 6. Estado 1 — Pantalla inicial

La pantalla inicial deberá ser minimalista.

Contenido:

- Fondo crema claro.
- Una flor amarilla/girasol centrada.
- Texto corto indicando que puede tocarse.
- Indicador visual apuntando hacia la flor.

Ejemplo:

```text
       Click aquí
           ↘

          🌻
```

En móvil deberá preferirse el texto:

```text
Toca aquí
```

en lugar de:

```text
Click aquí
```

La interfaz puede detectar dispositivos táctiles o utilizar una frase universal como:

```text
Toca para comenzar
```

---

# 7. Interacción inicial

La flor deberá funcionar como botón.

Debe ser accesible mediante:

```html
<button>
```

y no solamente mediante un `div`.

La interacción deberá responder a:

- Tap
- Click
- Enter
- Space

Al activarse:

1. El indicador desaparece.
2. La flor realiza una pequeña animación.
3. Inicia la secuencia principal.
4. Se bloquean múltiples activaciones.

---

# 8. Animación principal

La animación deberá sentirse orgánica.

No deberá aparecer todo simultáneamente.

Secuencia recomendada:

```text
0.0s  → interacción inicial

0.2s  → desaparece texto inicial

0.5s  → comienza crecimiento del tallo

1.3s  → aparecen ramas principales

2.0s  → aparecen ramas secundarias

2.6s  → comienzan a aparecer flores

3.0s  → aparecen más flores

4.0s  → comienza a reconocerse el corazón

5.0s  → corazón prácticamente completo

5.5s  → movimiento/reposicionamiento de composición

6.0s  → aparece título

6.5s  → aparece mensaje

7.5s  → aparece frase final
```

Los tiempos pueden ajustarse durante pruebas UX.

---

# 9. Representación del árbol

La implementación del árbol puede realizarse utilizando:

## Opción recomendada

SVG.

Ventajas:

- Escalable.
- Ligero.
- Fácil de animar.
- Mantiene proporciones.
- Permite animar ramas mediante `stroke-dasharray`.
- Mejor control en diferentes resoluciones.

Ejemplo conceptual:

```text
TreeSVG
 ├── trunk
 ├── branch-left
 ├── branch-right
 ├── secondary-branches
 └── decorative-elements
```

La animación de crecimiento puede realizarse utilizando:

```css
stroke-dasharray
stroke-dashoffset
```

---

# 10. Representación de los girasoles

Las flores pueden implementarse mediante:

### Opción A — SVG individual

Recomendada.

Crear un componente:

```tsx
<Sunflower />
```

que permita configurar:

```tsx
<Sunflower
  size={32}
  rotation={12}
  delay={0.4}
/>
```

Ventajas:

- Gran nitidez.
- Bajo peso.
- Fácil cambio de colores.
- Animaciones independientes.

### Opción B — Imagen WebP

Útil si se busca mayor realismo.

### Opción C — Emoji

No recomendado para la versión final debido a diferencias visuales entre sistemas operativos.

---

# 11. Formación del corazón

Las flores deberán posicionarse siguiendo una distribución predefinida.

No se recomienda calcular posiciones aleatorias en cada ejecución.

La composición debe ser reproducible.

Ejemplo:

```ts
const flowers = [
  {
    x: 12,
    y: 18,
    scale: 1,
    rotation: -10,
    delay: 0.2
  },
  {
    x: 20,
    y: 12,
    scale: 0.85,
    rotation: 8,
    delay: 0.35
  }
]
```

Los valores `x` y `y` pueden manejarse como porcentajes para mantener responsividad.

Ejemplo:

```text
x: 50
y: 20
```

representa:

```text
50% horizontal
20% vertical
```

---

# 12. Animación de cada flor

Cada flor deberá aparecer con una pequeña variación.

Animación sugerida:

```text
opacity: 0 → 1

scale:
0 → 1.15 → 1

rotation:
-10deg → 0deg
```

Duración recomendada:

```text
400ms – 700ms
```

Cada flor deberá tener un delay ligeramente diferente.

Esto producirá un crecimiento más natural.

---

# 13. Escena final

Una vez formado el corazón:

## Mobile

Se recomienda:

```text
          CORAZÓN
           🌻🌻
        🌻🌻🌻🌻
          🌻🌻
            │

      TÍTULO

      MENSAJE

   FRASE ESPECIAL
```

Debido al espacio horizontal reducido, se recomienda composición vertical.

## Tablet / Desktop

Se recomienda:

```text
------------------------------------------------

 MENSAJE                     CORAZÓN DE FLORES

 Texto                       🌻🌻🌻🌻
 Texto                     🌻🌻🌻🌻🌻
 Texto                       🌻🌻🌻
                               │
 Frase final                   │

------------------------------------------------
```

Breakpoints sugeridos:

```text
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
```

---

# 14. UI / UX

La experiencia debe mantener una interfaz minimalista.

No deben existir:

- Menús.
- Navegación.
- Headers tradicionales.
- Footers tradicionales.
- Cards innecesarias.
- Botones secundarios.
- Elementos que distraigan.

La experiencia debe sentirse como una pequeña animación interactiva.

---

# 15. Jerarquía visual

La jerarquía debe ser:

```text
1. Corazón de flores
2. Título
3. Mensaje
4. Frase especial
5. Firma
```

---

# 16. Tipografías

Se recomienda utilizar dos familias.

## Texto principal

Opciones:

- Inter
- Poppins
- Nunito
- DM Sans

Recomendación:

```text
Poppins
```

## Texto romántico / frase especial

Opciones:

- Dancing Script
- Great Vibes
- Caveat

Recomendación:

```text
Dancing Script
```

Las fuentes pueden cargarse desde Google Fonts.

Si se desea evitar dependencias externas, deberán incluirse fuentes locales o utilizar stacks del sistema.

---

# 17. Paleta de colores

La paleta debe inspirarse en girasoles, vegetación y tonos cálidos.

## Fondo principal

```text
Cream
#FFF9E8
```

## Fondo secundario

```text
Warm Cream
#FFF4D6
```

## Amarillo principal

```text
Sunflower Yellow
#F6C945
```

## Amarillo intenso

```text
Golden Yellow
#F4B942
```

## Centro de girasol

```text
Warm Brown
#6B4423
```

## Verde principal

```text
Leaf Green
#557A46
```

## Verde oscuro

```text
Forest Green
#355E3B
```

## Texto principal

```text
Soft Black
#2F2A24
```

## Texto secundario

```text
Warm Gray
#6D6258
```

## Acento romántico

```text
Soft Rose
#D98C8C
```

---

# 18. Variables CSS sugeridas

Aunque Tailwind gestionará la mayoría de estilos, puede definirse una capa de variables.

```css
:root {
  --color-background: #FFF9E8;
  --color-background-soft: #FFF4D6;

  --color-sunflower: #F6C945;
  --color-sunflower-dark: #F4B942;

  --color-flower-center: #6B4423;

  --color-leaf: #557A46;
  --color-leaf-dark: #355E3B;

  --color-text: #2F2A24;
  --color-text-secondary: #6D6258;

  --color-romantic: #D98C8C;
}
```

---

# 19. Personalización del texto

El contenido textual NO debe escribirse directamente dentro de los componentes visuales.

Debe separarse la información de la presentación.

Se recomienda crear:

```text
src/data/message.ts
```

o:

```text
src/config/message.ts
```

---

# 20. Estructura recomendada para el mensaje

Ejemplo utilizando TypeScript:

```ts
export const message = {
  recipient: "Javi",

  title: "Feliz Día de las Flores Amarillas",

  paragraphs: [
    "Cada girasol que ves aquí es un latido de mi corazón.",
    "Así como el sol ilumina los campos, tú iluminas mi vida.",
    "Que estas flores te recuerden lo especial que eres para mí."
  ],

  closing: "¡Te amo!",

  quote: "Eres el sol que hace florecer cada uno de mis días.",

  signature: "Con amor ❤️"
};
```

---

# 21. Componente encargado de mostrar el mensaje

Crear:

```text
src/components/message/LoveMessage.tsx
```

El componente deberá importar la configuración.

Ejemplo:

```tsx
import { message } from "@/data/message";

export function LoveMessage() {
  return (
    <section>
      <h1>{message.title}</h1>

      {message.paragraphs.map((paragraph) => (
        <p key={paragraph}>
          {paragraph}
        </p>
      ))}

      <strong>{message.closing}</strong>

      <blockquote>
        {message.quote}
      </blockquote>

      <span>
        {message.signature}
      </span>
    </section>
  );
}
```

Esto permite cambiar el contenido sin modificar la interfaz.

---

# 22. Alternativa: archivo JSON

También puede utilizarse:

```text
src/data/message.json
```

Ejemplo:

```json
{
  "recipient": "Javi",
  "title": "Feliz Día de las Flores Amarillas",
  "paragraphs": [
    "Cada girasol que ves aquí es un latido de mi corazón.",
    "Así como el sol ilumina los campos, tú iluminas mi vida.",
    "Que estas flores te recuerden lo especial que eres para mí."
  ],
  "closing": "¡Te amo!",
  "quote": "Eres el sol que hace florecer cada uno de mis días.",
  "signature": "Con amor ❤️"
}
```

Para este proyecto se recomienda **TypeScript** debido a que permite validar la estructura mediante interfaces.

---

# 23. Tipo de datos del mensaje

Ejemplo:

```ts
export interface LoveMessage {
  recipient?: string;
  title: string;
  paragraphs: string[];
  closing?: string;
  quote?: string;
  signature?: string;
}
```

---

# 24. Configuración visual independiente

También se recomienda separar parámetros de animación.

Crear:

```text
src/config/animation.ts
```

Ejemplo:

```ts
export const animationConfig = {
  introDelay: 200,
  trunkDuration: 900,
  branchesDuration: 900,
  flowersStartDelay: 2500,
  messageDelay: 5500
};
```

---

# 25. Configuración de flores

Crear:

```text
src/data/flowers.ts
```

Ejemplo:

```ts
export const flowers = [
  {
    id: 1,
    x: 50,
    y: 10,
    scale: 1,
    rotation: -8,
    delay: 0
  },

  {
    id: 2,
    x: 40,
    y: 14,
    scale: 0.9,
    rotation: 12,
    delay: 120
  }
];
```

De esta forma la forma del corazón puede ajustarse sin modificar componentes.

---

# 26. Arquitectura de componentes

Estructura conceptual:

```text
App
│
├── FlowerExperience
│
├── IntroScene
│   ├── IntroFlower
│   └── InteractionHint
│
├── TreeScene
│   ├── TreeSVG
│   ├── Trunk
│   ├── Branches
│   └── FlowerHeart
│       └── Sunflower
│
├── MessageScene
│   ├── Title
│   ├── MessageParagraphs
│   ├── Closing
│   ├── Quote
│   └── Signature
│
└── DecorativeParticles
```

---

# 27. Estructura de carpetas recomendada

```text
src/
│
├── assets/
│   ├── flowers/
│   ├── icons/
│   └── images/
│
├── components/
│   │
│   ├── experience/
│   │   ├── FlowerExperience.tsx
│   │   ├── IntroScene.tsx
│   │   ├── TreeScene.tsx
│   │   └── FinalScene.tsx
│   │
│   ├── flowers/
│   │   ├── Sunflower.tsx
│   │   └── FlowerHeart.tsx
│   │
│   ├── tree/
│   │   └── TreeSVG.tsx
│   │
│   ├── message/
│   │   └── LoveMessage.tsx
│   │
│   └── ui/
│       └── InteractionHint.tsx
│
├── config/
│   └── animation.ts
│
├── data/
│   ├── message.ts
│   └── flowers.ts
│
├── hooks/
│   └── useExperienceSequence.ts
│
├── styles/
│   └── animations.css
│
├── App.tsx
├── main.tsx
└── index.css
```

---

# 28. Manejo de estados

La experiencia puede controlarse mediante un hook.

Ejemplo:

```text
useExperienceSequence
```

Estados:

```ts
type ExperienceState =
  | "intro"
  | "growing"
  | "flowers"
  | "message"
  | "complete";
```

No será necesario Redux, Zustand ni otros gestores globales.

React `useState` será suficiente.

---

# 29. Interacciones adicionales

Opcionalmente se pueden agregar pequeños detalles.

## Movimiento de flores

Algunas flores pueden caer suavemente durante la escena final.

## Movimiento ambiental

El corazón puede tener una animación casi imperceptible:

```text
scale 1 → 1.01 → 1
```

Esto genera sensación de vida.

## Hojas

Algunas hojas pueden moverse lentamente utilizando:

```text
rotate(-1deg)
rotate(1deg)
```

---

# 30. Respeto a `prefers-reduced-motion`

La aplicación deberá detectar:

```css
@media (prefers-reduced-motion: reduce)
```

Cuando esté activo:

- Reducir animaciones.
- Eliminar movimientos repetitivos.
- Mostrar elementos de forma más directa.
- Mantener la experiencia completamente funcional.

---

# 31. Accesibilidad

La experiencia deberá cumplir principios básicos de accesibilidad.

## Botón inicial

Debe contener:

```text
aria-label="Iniciar animación de flores"
```

## Contraste

El texto deberá tener suficiente contraste contra el fondo.

## Navegación por teclado

Debe ser posible iniciar la experiencia utilizando:

```text
TAB
ENTER
SPACE
```

## SVG

Los SVG decorativos deberán usar:

```text
aria-hidden="true"
```

cuando no tengan significado semántico.

---

# 32. Optimización de rendimiento

La aplicación debe priorizar dispositivos móviles.

Objetivo recomendado:

```text
Lighthouse Performance > 90
```

Buenas prácticas:

- Evitar imágenes PNG grandes.
- Preferir SVG o WebP.
- Evitar animar `top` y `left`.
- Utilizar `transform`.
- Utilizar `opacity`.
- Evitar filtros excesivos.
- Mantener el número de elementos DOM bajo control.
- Evitar dependencias innecesarias.
- Lazy-load únicamente si existen recursos pesados.

---

# 33. Animaciones y GPU

Priorizar:

```css
transform
opacity
```

Evitar animaciones continuas de:

```css
width
height
top
left
margin
```

cuando puedan sustituirse mediante transformaciones.

---

# 34. Altura de pantalla móvil

Evitar depender exclusivamente de:

```css
100vh
```

debido a las barras dinámicas de navegadores móviles.

Utilizar preferentemente:

```css
100dvh
```

Ejemplo Tailwind:

```text
min-h-dvh
```

---

# 35. Safe Areas en iPhone

Considerar:

```css
env(safe-area-inset-top)
env(safe-area-inset-bottom)
```

especialmente si existen elementos cerca de los bordes de pantalla.

---

# 36. Diseño responsive

## Mobile

```text
< 768px
```

Diseño vertical.

El corazón aparece principalmente sobre el mensaje.

## Desktop

```text
>= 768px
```

Diseño de dos columnas.

```text
MESSAGE | FLOWER HEART
```

En pantallas grandes:

```text
max-width: 1200px
```

para evitar separación excesiva entre los elementos.

---

# 37. Tailwind — clases generales sugeridas

Contenedor principal:

```text
min-h-dvh
overflow-hidden
bg-[#FFF9E8]
text-[#2F2A24]
```

Contenido:

```text
mx-auto
flex
min-h-dvh
max-w-7xl
items-center
justify-center
px-5
py-8
```

Desktop:

```text
md:grid
md:grid-cols-2
md:gap-10
```

---

# 38. Experiencia de carga

Al ser un proyecto estático pequeño, la página deberá cargar prácticamente de inmediato.

No se recomienda agregar splash screen.

Si los recursos gráficos necesitan precarga, puede mostrarse la pantalla inicial únicamente cuando estén disponibles.

---

# 39. Reiniciar experiencia

Opcionalmente puede permitirse repetir la animación.

Una vez finalizada:

```text
Volver a verla
```

El botón deberá ser discreto.

No deberá competir visualmente con el mensaje principal.

---

# 40. Persistencia

Por defecto NO se guardará el estado.

Si el usuario recarga:

```text
La experiencia comienza nuevamente.
```

Opcionalmente puede utilizarse:

```text
localStorage
```

para registrar si la animación ya fue vista.

Sin embargo, para un detalle romántico se recomienda permitir verla nuevamente desde el inicio.

---

# 41. Audio

El proyecto base no requiere audio.

Si posteriormente se agrega:

- Debe iniciar únicamente después de interacción del usuario.
- Debe existir control para silenciar.
- Nunca deberá reproducirse automáticamente antes de la interacción.

---

# 42. SEO básico

Aunque sea un sitio personal, configurar:

```html
<title>Flores Amarillas 🌻</title>
```

Descripción:

```text
Un pequeño detalle hecho con flores amarillas.
```

También puede configurarse:

- favicon
- OpenGraph image
- theme-color

---

# 43. PWA

No es necesaria.

No deberá añadirse inicialmente para evitar complejidad innecesaria.

---

# 44. Dependencias recomendadas

Dependencias principales:

```text
react
react-dom
```

Desarrollo:

```text
vite
typescript
tailwindcss
```

Opcional:

```text
framer-motion
```

Evitar agregar librerías si no aportan valor claro.

---

# 45. Configuración del contenido

Idealmente el usuario deberá poder modificar únicamente:

```text
src/data/message.ts
```

para personalizar la dedicatoria.

Ejemplo:

```ts
export const message = {
  title: "Para ti 🌻",

  paragraphs: [
    "Cada flor representa un momento bonito contigo.",
    "Gracias por iluminar mis días."
  ],

  closing: "Te amo",

  quote: "Eres mi lugar favorito.",

  signature: "— Javi"
};
```

No deberá ser necesario editar:

```text
LoveMessage.tsx
FlowerExperience.tsx
TreeSVG.tsx
```

para cambiar el texto.

---

# 46. Configuración futura avanzada

Posteriormente podría crearse:

```text
src/config/site.ts
```

Ejemplo:

```ts
export const siteConfig = {
  recipientName: "Javi",

  message: {
    title: "...",
    paragraphs: [],
    closing: "...",
    quote: "...",
    signature: "..."
  },

  animation: {
    enabled: true,
    fallingFlowers: true
  },

  colors: {
    background: "#FFF9E8",
    sunflower: "#F6C945",
    leaf: "#557A46"
  }
};
```

Esto permitiría convertir el proyecto en una plantilla reutilizable.

---

# 47. Posible parametrización por URL

No será parte obligatoria de la primera versión.

Como mejora futura podría permitirse:

```text
/?to=Javi
```

y leer el valor mediante:

```ts
URLSearchParams
```

Ejemplo:

```text
flores.com/?to=Javi
```

Sin embargo, los mensajes completos NO deberían enviarse mediante URL.

La fuente principal de información seguirá siendo:

```text
src/data/message.ts
```

---

# 48. Seguridad

Al no existir backend:

- No se almacenan contraseñas.
- No se procesan datos personales.
- No existen endpoints privados.
- No existen credenciales.

Nunca deberán incluirse:

```text
API keys
tokens
passwords
secrets
```

dentro del repositorio.

---

# 49. Criterios de aceptación

La primera versión deberá considerarse terminada cuando:

- La página cargue correctamente en móvil.
- La pantalla inicial muestre la flor.
- La interacción inicial funcione mediante tap/click.
- El árbol crezca progresivamente.
- Las flores aparezcan gradualmente.
- Las flores formen claramente un corazón.
- El mensaje aparezca posteriormente.
- El contenido pueda modificarse desde un archivo independiente.
- La experiencia funcione sin backend.
- La composición responda correctamente en móvil y escritorio.
- No exista scroll horizontal.
- No existan saltos bruscos de layout.
- Las animaciones se mantengan fluidas.
- Funcione con `prefers-reduced-motion`.
- El botón inicial sea accesible mediante teclado.

---

# 50. Prioridad de desarrollo

## Fase 1 — Base

- Crear Vite + React.
- Integrar Tailwind.
- Crear estructura de carpetas.
- Crear archivo `message.ts`.
- Crear layout principal.

## Fase 2 — Escena inicial

- Crear girasol inicial.
- Crear indicador.
- Implementar interacción.

## Fase 3 — Árbol

- Crear SVG.
- Implementar animación de crecimiento.

## Fase 4 — Corazón

- Crear componente `Sunflower`.
- Crear posiciones.
- Construir corazón.
- Animar aparición.

## Fase 5 — Mensaje

- Implementar `LoveMessage`.
- Añadir transiciones.
- Implementar layout responsive.

## Fase 6 — Polish UI/UX

- Ajustar timing.
- Ajustar escalas.
- Ajustar tipografía.
- Optimizar mobile.
- Añadir partículas decorativas.
- Revisar accesibilidad.

## Fase 7 — Optimización

- Lighthouse.
- Bundle.
- Responsive.
- Reduced motion.
- Testing en dispositivos reales.

---

# 51. Resultado esperado

La experiencia final debe sentirse como una pequeña historia visual:

```text
Una flor espera al usuario.

El usuario toca la flor.

La planta comienza a crecer.

Sus ramas se extienden.

Los girasoles comienzan a florecer.

Las flores forman lentamente un corazón.

La composición se estabiliza.

Aparece una dedicatoria.

Finalmente aparece una frase especial.
```

El resultado debe ser emocional, limpio y visualmente atractivo, evitando una interfaz tradicional de aplicación web.

La animación y el mensaje son los protagonistas.

---

# 52. Resumen técnico

```text
Frontend:
Vite + React + TypeScript

UI:
Tailwind CSS

Animaciones:
CSS + React state
Framer Motion opcional

Backend:
No requerido

Base de datos:
No requerida

API:
No requerida

Hosting:
Estático

Diseño:
Mobile First

Contenido:
src/data/message.ts

Configuración visual:
src/config/

Distribución de flores:
src/data/flowers.ts
```

---

# 53. Principio principal del proyecto

> El contenido debe estar separado de la presentación.

Por ello:

```text
message.ts
```

define **qué se dice**.

```text
LoveMessage.tsx
```

define **cómo se muestra**.

```text
flowers.ts
```

define **dónde aparecen las flores**.

```text
Sunflower.tsx
```

define **cómo se dibuja una flor**.

```text
animation.ts
```

define **cuándo ocurren las animaciones**.

```text
FlowerExperience.tsx
```

coordina **toda la experiencia**.

Esta separación permitirá modificar el detalle, reutilizarlo para otra persona o cambiar completamente el texto sin alterar la lógica visual del proyecto.
