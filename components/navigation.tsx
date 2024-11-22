import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export function Navigation() {
  return (
    <nav className="flex justify-between p-2 bg-slate-100 shadow-md">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold text-gray-800">
            Story Time
          </Link>
          <div className="space-x-4">
            <Link href="/" className="text-gray-600 hover:text-gray-800">
              Home
            </Link>
            <Link href="/story" className="text-gray-600 hover:text-gray-800">
              Read a Story
            </Link>
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  )
}