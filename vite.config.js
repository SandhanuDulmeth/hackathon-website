import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add any necessary aliases here
    },
  },
  // No custom esbuild loader here — keep default handling. If you need to
  // force a loader for specific files, prefer using proper file extensions
  // (.jsx/.tsx) or configure esbuild properly.
})
