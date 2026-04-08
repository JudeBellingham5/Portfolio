import { Database } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="bg-navy-900 p-1.5 rounded-md">
            <Database className="w-5 h-5 text-white" />
          </div>
          <span className="font-serif font-bold text-xl tracking-tight text-navy-900">
            Data<span className="text-blue-600">Marketer</span>
          </span>
        </div>
        
        <p className="text-slate-400 text-sm">
          © {new Date().getFullYear()} Data-Driven Marketer Portfolio. All rights reserved.
        </p>

        <div className="flex gap-6 text-sm font-medium text-slate-500">
          <a href="#profile" className="hover:text-navy-900 transition-colors">Profile</a>
          <a href="#projects" className="hover:text-navy-900 transition-colors">Projects</a>
          <a href="#contact" className="hover:text-navy-900 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
