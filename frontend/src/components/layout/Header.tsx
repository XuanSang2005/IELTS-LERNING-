import { Link } from '@tanstack/react-router'

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-lg font-bold text-slate-900">
          IELTS<span className="text-brand-600">.learn</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-700">
          <Link
            to="/"
            className="hover:text-brand-600"
            activeProps={{ className: 'text-brand-600' }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>
          <Link to="/about" className="hover:text-brand-600" activeProps={{ className: 'text-brand-600' }}>
            About
          </Link>
        </nav>
      </div>
    </header>
  )
}
