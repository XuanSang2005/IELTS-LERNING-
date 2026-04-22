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
  await app.listen(port)
  console.log(`[meridian-api] listening on :${port}`)
}
void bootstrap()
