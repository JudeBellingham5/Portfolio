import { motion } from 'motion/react';
import { CheckCircle2, ShieldCheck, Search, FileText } from 'lucide-react';

export default function Trust() {
  const points = [
    { icon: Search, text: '데이터 출처 및 수집 방식 명시' },
    { icon: FileText, text: '전처리 과정 및 해석 근거 설명' },
    { icon: ShieldCheck, text: '문제 정의와 수행 역할의 명확한 분리' },
    { icon: CheckCircle2, text: '인사이트와 습득 역량 중심의 서술' },
  ];

  return (
    <section id="trust" className="section-padding bg-navy-900 text-white overflow-hidden relative">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 skew-x-12 translate-x-1/4 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-4xl text-white mb-8">Why Trust My Work</h2>
            <div className="space-y-6">
              <p className="text-xl text-slate-300 leading-relaxed">
                저는 결과만 제시하기보다 데이터 출처, 수집 방식, 전처리 과정, 해석 근거를 함께 설명하는 방식을 지향합니다.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed">
                프로젝트마다 문제 정의, 수행 역할, 분석 과정, 결과를 분리해 정리하고, 성과가 명확하지 않은 경우에는 과장된 표현 대신 인사이트와 습득 역량 중심으로 서술합니다.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {points.map((point, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                  <point.icon className="w-8 h-8 text-blue-400 mb-4" />
                  <p className="text-white font-medium leading-snug">{point.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
