import { defineConfig, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'

function serveVayasPaper(server: Pick<ViteDevServer, 'middlewares'>) {
  server.middlewares.use((req, _res, next) => {
    const requestUrl = req.url ?? ''
    const queryStart = requestUrl.indexOf('?')
    const pathname = queryStart === -1 ? requestUrl : requestUrl.slice(0, queryStart)

    if (pathname === '/research/vayas-age-stratified-asr' || pathname === '/research/vayas-age-stratified-asr/') {
      req.url = `/paper-vayas.html${queryStart === -1 ? '' : requestUrl.slice(queryStart)}`
    }

    next()
  })
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'vayas-paper-document',
      configureServer: serveVayasPaper,
      configurePreviewServer: serveVayasPaper,
    },
  ],
})
