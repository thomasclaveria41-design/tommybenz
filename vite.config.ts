import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' hace que la app funcione en GitHub Pages (https://usuario.github.io/repo/),
// en Vercel y al abrir dist/ desde cualquier carpeta, sin importar el nombre del repositorio.
export default defineConfig({ base: './', plugins: [react()] })
