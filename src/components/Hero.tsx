import { motion } from 'motion/react';
import { ArrowRight, BarChart3, Github } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePortfolio } from '../context/PortfolioContext';

export default function Hero() {
  const { data, isLoaded } = usePortfolio();

  if (!isLoaded) return null;

  const { hero } = data;

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-navy-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:40px_40px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
              <BarChart3 className="w-3.5 h-3.5" />
              Data-Driven Marketing Strategy
            </div>
            <h1 className="text-3xl md:text-6xl text-white mb-6 leading-[1.2] whitespace-pre-wrap break-keep">
              {hero.heading}
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl break-keep">
              {hero.subHeading}
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#projects" 
                className={cn(buttonVariants({ size: "lg" }), "bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 h-14 text-lg flex items-center")}
              >
                프로젝트 보기
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a 
                href="#competencies" 
                className={cn(buttonVariants({ size: "lg", variant: "outline" }), "border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white rounded-full px-8 h-14 text-lg flex items-center")}
              >
                역량 보기
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Element */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute right-[-10%] bottom-[-10%] w-[600px] h-[600px] bg-blue-600 rounded-full blur-[120px] pointer-events-none"
      />
    </section>
  );
}



