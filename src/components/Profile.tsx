import { motion } from 'motion/react';
import { Calendar, GraduationCap, Award, BookOpen } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';

export default function Profile() {
  const { data, isLoaded } = usePortfolioData();

  if (!isLoaded) return null;

  const { profile } = data;

  const infoItems = [
    { icon: Calendar, label: 'Birth', value: profile.info.birth },
    { icon: GraduationCap, label: '학력', value: profile.info.education },
    { icon: GraduationCap, label: '전공', value: profile.info.major },
    { icon: GraduationCap, label: '복수전공', value: profile.info.doubleMajor },
    { icon: GraduationCap, label: '학점', value: profile.info.gpa },
    { icon: Award, label: '자격증', value: profile.info.certifications },
    { icon: BookOpen, label: '교육사항', value: profile.info.training },
  ];

  return (
    <section id="profile" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/3"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-8 border-slate-50">
              <img 
                src={profile.image} 
                alt="Profile" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent"></div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-2/3"
          >
            <h2 className="text-4xl text-navy-900 mb-6">Profile</h2>
            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed font-medium break-keep">
              데이터를 기반으로 문제를 해석하고, 이를 마케팅 전략으로 연결하는 <br className="hidden md:block" />
              <span className="text-navy-900 font-bold underline decoration-blue-500 underline-offset-4">데이터 분석 기반 마케터</span>를 지향합니다.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {infoItems.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
                  <div className="bg-white p-2.5 rounded-lg shadow-sm text-blue-600">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-slate-800 font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


