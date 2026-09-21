# Flores amarillas

Experiencia interactiva estática construida con React, Vite y Tailwind CSS.

## Desarrollo local

```bash
npm install
npm run dev
```

## Deploy en GitHub Pages

El proyecto incluye una GitHub Action en `.github/workflows/deploy.yml`.

1. Crea un repositorio en GitHub y sube este proyecto a la rama `main`.
2. En GitHub abre `Settings > Pages`.
3. En `Build and deployment`, selecciona `GitHub Actions` como fuente.
4. Cada push a `main` construirá y publicará automáticamente el sitio.

La configuración calcula automáticamente la ruta del repositorio para que los assets de Vite funcionen en GitHub Pages.

## Comandos

```bash
npm run lint
npm run build
npm run preview
```

---

## Vite template reference

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
