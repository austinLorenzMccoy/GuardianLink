import Link from 'next/link';
import MetaMaskConnect from './MetaMaskConnect';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">GuardianLink 🌍⚡</span>
          <span className="text-sm text-gray-500">AI-Driven Crisis Response & Mental Health Protocol</span>
        </div>
        
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6 ">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/disaster-response" className="text-gray-700 hover:text-blue-600 transition-colors">
              Disaster Response
            </Link>
            <Link href="/mental-health" className="text-gray-700 hover:text-blue-600 transition-colors">
              Mental Health
            </Link>
          </nav>
          
          <MetaMaskConnect />
        </div>
      </div>
    </header>
  );
};

export default Header;