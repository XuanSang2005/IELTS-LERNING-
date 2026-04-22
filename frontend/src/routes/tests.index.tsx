import { createFileRoute } from '@tanstack/react-router'
import { TestLibrary } from '@/features/tests/components/TestLibrary'

export const Route = createFileRoute('/tests/')({
  component: TestsIndexPage,
})

function TestsIndexPage() {
  return <TestLibrary />
}
