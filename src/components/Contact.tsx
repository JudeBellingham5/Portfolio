import { motion } from 'motion/react';
import { Mail, Github, Globe, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { usePortfolio } from '../context/PortfolioContext';

export default function Contact() {
  const { data, isLoaded } = usePortfolio();

  if (!isLoaded) return null;

  const { contact } = data;

  return (
    <section id="contact" className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-4xl text-navy-900 mb-6">Contact</h2>
            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed break-keep">
              데이터 분석을 통해 문제를 구조화하고, 이를 마케팅 전략으로 연결하는 역할에 관심이 있습니다. 
              프로젝트, 협업, 포지션 제안과 관련한 연락은 아래 채널로 부탁드립니다.
            </p>

            <div className="space-y-6">
              <a 
                href={`mailto:${contact.email}`}
                className="flex items-center gap-4 p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all group max-w-md"
              >
                <div className="bg-slate-50 p-4 rounded-xl text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
                  <Mail className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</p>
                  <p className="text-xl text-navy-900 font-bold">{contact.email}</p>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <div className="report-card p-8 md:p-10">
              <h3 className="text-2xl text-navy-900 mb-8">Quick Message</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Name</label>
                    <Input placeholder="Your Name" className="border-slate-200 focus:border-blue-500 h-12" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Email</label>
                    <Input type="email" placeholder="Your Email" className="border-slate-200 focus:border-blue-500 h-12" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Message</label>
                  <Textarea placeholder="How can I help you?" className="border-slate-200 focus:border-blue-500 min-h-[150px] resize-none" />
                </div>
                <Button className="w-full bg-navy-900 hover:bg-navy-800 text-white h-14 text-lg font-bold rounded-xl">
                  Send Message
                  <Send className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
