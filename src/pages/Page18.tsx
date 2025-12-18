import React from 'react';
import { Link } from 'react-router-dom';
import { Film, ChevronRight, ChevronLeft, Home } from 'lucide-react';

const Page18 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <nav className="bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Film className="w-8 h-8 text-blue-400" />
              <span className="text-white font-bold text-xl">MandaStrong Studio</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Page 18</h1>
          <p className="text-xl text-gray-300">Video production workspace and media tools</p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-2xl">
          <h2 className="text-2xl font-semibold text-white mb-6">Navigate Your Studio</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Link to="/" className="flex items-center justify-between p-4 bg-slate-700 hover:bg-slate-600 rounded-xl transition-all transform hover:scale-105">
              <div className="flex items-center space-x-3">
                <Home className="w-5 h-5 text-white" />
                <span className="text-white font-medium">Home</span>
              </div>
            </Link>

            <Link to="/page17" className="flex items-center justify-between p-4 bg-slate-700 hover:bg-slate-600 rounded-xl transition-all transform hover:scale-105">
              <ChevronLeft className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Previous</span>
            </Link>

            <Link to="/page19" className="flex items-center justify-between p-4 bg-slate-700 hover:bg-slate-600 rounded-xl transition-all transform hover:scale-105">
              <span className="text-white font-medium">Next Page</span>
              <ChevronRight className="w-5 h-5 text-white" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {[...Array(21)].map((_, i) => (
              <Link key={i} to={i === 0 ? '/' : `/page${i + 1}`} className={`p-3 rounded-lg text-center transition-all transform hover:scale-110 ${i === 17 ? 'bg-blue-600 text-white font-bold' : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600'}`}>
                {i + 1}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page18;
