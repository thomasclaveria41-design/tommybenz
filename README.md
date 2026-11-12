# TOMMYBENZ AUTOMOTRIZ · Cotizador

Aplicación web (React + TypeScript + Vite + Lucide) para cotizar pintura automotriz: piezas, difuminados, desabolladura, descuentos, anticipo 50 % / saldo 50 %, historial, PDF y envío por WhatsApp.

## Ejecutar en tu computador
Requiere [Node.js 20+](https://nodejs.org).
```bash
npm install      # solo la primera vez
npm run dev      # abre http://localhost:5173
npm run build    # revisa tipos y genera la carpeta dist/
```

## Publicar en GitHub Pages
1. Crea un repositorio en github.com (botón **New**), por ejemplo `cotizador-tommybenz`.
2. Sube **todos** los archivos de esta carpeta, incluida la carpeta oculta `.github` (con Git: `git init`, `git add .`, `git commit -m "Primera versión"`, `git branch -M main`, `git remote add origin <URL>`, `git push -u origin main`).
3. En el repositorio: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Espera 1–2 minutos (pestaña **Actions**). La dirección queda en **Settings → Pages**: `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.
5. Ábrela en el celular y usa "Agregar a pantalla de inicio".

El archivo `.github/workflows/deploy.yml` ya está configurado y `vite.config.ts` usa `base: './'`, así que no hay que cambiar nada según el nombre del repositorio. Si el repositorio es privado, GitHub Pages puede requerir un plan de pago; en ese caso usa Vercel.

## Publicar en Vercel (alternativa)
Entra a vercel.com con tu cuenta de GitHub → **Add New → Project** → elige el repositorio → **Deploy**. Detecta Vite solo.

## Actualizar la aplicación
Cambia los archivos (en tu computador o editándolos en github.com) y súbelos a la rama `main`: la publicación se actualiza sola. Los datos de los clientes no se pierden porque viven en el dispositivo, no en el código.

## Estructura
```
src/
  components/  piezas reutilizables de la interfaz
  pages/       Cotizar, Historial y Tarifas
  hooks/       estado: cotización en edición, historial, tarifas, avisos
  services/    almacenamiento, respaldo, WhatsApp y PDF
  utils/       cálculos, formatos y tarifario por defecto
  types/       tipos de TypeScript
  styles/      global.css (diseño)
```
- **Precios oficiales:** `src/utils/defaults.ts`. Solo se aplican la primera vez; luego mandan los que edites en la pestaña Tarifas.
- **Cálculos:** `src/utils/calc.ts`.

## Almacenamiento y nube
Hoy todo se guarda en `localStorage` del navegador, detrás de la interfaz `Repository` (`src/services/storage.ts`). Para usar una base de datos en la nube, crea otra implementación de `Repository` (Supabase, Firebase…) y cámbiala en la línea `export const repository`. No hay que tocar componentes.

Limitaciones: los datos son por navegador y dispositivo, y se pierden si se borran los datos del sitio. Usa **Tarifas → Respaldo** con frecuencia. Los respaldos de la versión HTML anterior también se pueden importar ahí.

## PDF
**Generar PDF** abre el diálogo de impresión del navegador; elige **Guardar como PDF**.
