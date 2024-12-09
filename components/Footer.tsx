import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-2 px-4 bg-background text-gray-12 text-center">
      <div className="text-sm font-medium">
        <Link href="/privacy" className="px-2 hover:text-indigo-12">
          Datenschutz
        </Link>
        <Link href="/imprint" className="px-2 hover:text-indigo-12">
          Impressum
        </Link>
      </div>
      <div className="space-x-6 mt-4 text-sm font-medium">
        <p>&copy; {new Date().getFullYear()} WaterGuardian</p>
      </div>
    </footer>
  )
}

export default Footer
