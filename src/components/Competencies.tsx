import { motion } from 'motion/react';
import { 
  Terminal, 
  ShieldCheck, 
  Database, 
  Zap, 
  Target, 
  PieChart, 
  Lightbulb 
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const iconMap = [
  Terminal, 
  ShieldCheck, 
  Database, 
  Zap, 
  Target, 
  PieChart, 
  Lightbulb 
];

export default function Competencies() {
  const { data, isLoaded } = usePortfolio();

  if (!isLoaded) return null;

  const { competencies } = data;

  return (
    <section id="competencies" className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl text-navy-900 mb-4">Core Competencies</h2>
          <p className="text-xl text-slate-600">
            분석 환경 구축, 데이터 수집, 정제, 시각화, 해석까지 분석 전 과정을 수행할 수 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {competencies.map((item, index) => {
            const Icon = iconMap[index % iconMap.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="report-card p-8 hover:border-blue-500 transition-all group"
              >
                <div className="w-12 h-12 bg-navy-900 rounded-lg flex items-center justify-center text-white mb-6 group-hover:bg-blue-600 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl text-navy-900 mb-4 font-bold break-keep">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed break-keep">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

