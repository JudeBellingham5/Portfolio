import { motion } from 'motion/react';
import { Mail } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Contact() {
  const { data, isLoaded } = usePortfolio();

  if (!isLoaded) return null;

  const { contact } = data;

  return (
    <section id="contact" className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center flex flex-col items-center"
        >
          <h2 className="text-4xl text-navy-900 mb-6 font-bold">Contact</h2>
          <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed break-keep">
            데이터 분석을 통해 문제를 구조화하고, 이를 마케팅 전략으로 연결하는 역할에 관심이 있습니다. 
            프로젝트, 협업, 포지션 제안과 관련한 연락은 아래 채널로 부탁드립니다.
          </p>

          <div className="w-full flex justify-center">
            <a 
              href={`mailto:${contact.email}`}
              className="flex items-center gap-5 p-6 md:p-8 rounded-3xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all group w-fit max-w-[95vw] text-left"
            >
              <div className="bg-slate-50 p-3.5 rounded-xl text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors shadow-sm flex-shrink-0">
                <Mail className="w-7 h-7" />
              </div>
              <div className="flex flex-col justify-center gap-1 overflow-hidden">
                <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.2em] leading-none">Email Address</p>
                <p className="text-lg md:text-2xl text-navy-900 font-bold whitespace-nowrap leading-snug">
                  {contact.email}
                </p>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
