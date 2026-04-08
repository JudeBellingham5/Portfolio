import { motion } from 'motion/react';
import { ExternalLink, Search, FileText, Presentation } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePortfolio } from '../context/PortfolioContext';

export default function Projects() {
  const { data, isLoaded } = usePortfolio();

  if (!isLoaded) return null;

  const { projects } = data;

  return (
    <section id="projects" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl text-navy-900 mb-4">Featured Projects</h2>
          <p className="text-xl text-slate-600">
            데이터 수집, 분석, 해석, 전략 제안까지 수행한 주요 프로젝트를 정리했습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, index) => {
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Dialog>
                  <DialogTrigger render={
                    <button type="button" className="report-card group cursor-pointer hover:shadow-xl transition-all h-full flex flex-col text-left w-full" />
                  }>
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-navy-900/20 group-hover:bg-navy-900/0 transition-colors"></div>
                      <div className="absolute top-4 left-4">
                        <div className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-sm">
                          <Search className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>
                    </div>
                    <div className="p-8 flex-grow flex flex-col">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.keywords.map(kw => (
                          <Badge key={kw} variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600 border-none">
                            {kw}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="text-2xl text-navy-900 mb-4 group-hover:text-blue-600 transition-colors break-keep">{project.title}</h3>
                      <p className="text-slate-600 leading-relaxed mb-6 flex-grow break-keep">
                        {project.summary}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center text-blue-600 font-bold text-sm uppercase tracking-wider">
                          자세히 보기
                          <ExternalLink className="ml-2 w-4 h-4" />
                        </div>
                        <div className="flex gap-3">
                          {project.links?.ppt && (
                            <a 
                              href={project.links.ppt} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="p-2 rounded-full bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                              title="PPT 보기"
                            >
                              <Presentation className="w-4 h-4" />
                            </a>
                          )}
                          {project.links?.report && (
                            <a 
                              href={project.links.report} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="p-2 rounded-full bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                              title="보고서 보기"
                            >
                              <FileText className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 border-none bg-slate-50">
                    <div className="relative h-64 md:h-80">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-50 to-transparent"></div>
                    </div>
                    <div className="px-8 pb-12 -mt-12 relative z-10">
                      <DialogHeader className="mb-10">
                        <div className="flex justify-between items-start">
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.keywords.map(kw => (
                              <Badge key={kw} className="bg-blue-600 text-white border-none">
                                {kw}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex gap-4">
                            {project.links?.ppt && (
                              <a 
                                href={project.links.ppt} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm text-slate-600 hover:text-blue-600 transition-colors text-sm font-bold"
                              >
                                <Presentation className="w-4 h-4" /> PPT
                              </a>
                            )}
                            {project.links?.report && (
                              <a 
                                href={project.links.report} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm text-slate-600 hover:text-blue-600 transition-colors text-sm font-bold"
                              >
                                <FileText className="w-4 h-4" /> Report
                              </a>
                            )}
                          </div>
                        </div>
                        <DialogTitle className="text-2xl md:text-4xl text-navy-900 break-keep">{project.title}</DialogTitle>
                      </DialogHeader>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        <div className="space-y-6 md:space-y-8">
                          <div>
                            <h4 className="text-lg font-bold text-navy-900 mb-3 flex items-center gap-2">
                              <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                              프로젝트 배경
                            </h4>
                            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap break-keep">{project.details.background}</p>
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-navy-900 mb-3 flex items-center gap-2">
                              <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                              맡은 역할
                            </h4>
                            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap break-keep">{project.details.role}</p>
                          </div>
                        </div>
                        <div className="space-y-6 md:space-y-8">
                          <div>
                            <h4 className="text-lg font-bold text-navy-900 mb-3 flex items-center gap-2">
                              <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                              수행 내용
                            </h4>
                            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap break-keep">{project.details.execution}</p>
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-navy-900 mb-3 flex items-center gap-2">
                              <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                              결과 및 인사이트
                            </h4>
                            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap break-keep">{project.details.result}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

