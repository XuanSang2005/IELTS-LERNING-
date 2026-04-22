import { createFileRoute } from '@tanstack/react-router'
import { Method } from '@/features/method/Method'

export const Route = createFileRoute('/method')({
  component: Method,
})
