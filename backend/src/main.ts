import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

const LOCALHOST_RE = /^http:\/\/(?:localhost|127\.0\.0\.1|\[::1\]):\d+$/

function buildOriginMatcher(env: string | undefined) {
  const list = (env ?? 'http://localhost:5173')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean)

  const allowAnyLocalhost = list.includes('*') || process.env.NODE_ENV !== 'production'

  return (origin: string | undefined, cb: (err: Error | null, ok?: boolean) => void) => {
    if (!origin) return cb(null, true) // same-origin / curl / server-to-server
    if (list.includes(origin)) return cb(null, true)
    if (allowAnyLocalhost && LOCALHOST_RE.test(origin)) return cb(null, true)
    cb(new Error(`Origin ${origin} not allowed by CORS`), false)
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false })
  app.enableCors({
    origin: buildOriginMatcher(process.env.CORS_ORIGIN),
    credentials: true,
  })
  const port = Number(process.env.PORT ?? 4000)
  // Bind 0.0.0.0 explicitly — Railway/Docker proxies reach the container via the
  // container network interface, not localhost. Default Node bind can fall back
  // to ::1/127.0.0.1 in some Alpine images, producing 502 Bad Gateway at the edge.
  await app.listen(port, '0.0.0.0')
  console.log(`[meridian-api] listening on 0.0.0.0:${port}`)
}
void bootstrap()
