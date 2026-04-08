import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, Save, AlertCircle, Edit3, Plus, Trash2, Loader2, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePortfolio } from '../context/PortfolioContext';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const { data, updateData, isLoaded } = usePortfolio();
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('hero');
  const [isSaving, setIsSaving] = useState(false);

  // Local form states initialized from hook data
  const [localData, setLocalData] = useState(data);
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);

  useEffect(() => {
    if (isLoaded) {
      setLocalData(data);
    }
  }, [isLoaded, data]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '000925') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password. Please try again.');
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Ensure we are saving the latest localData
      await updateData(localData);
      alert('모든 변경사항이 클라우드에 영구적으로 저장되었습니다!');
      onClose(); // Close the admin panel to show the portfolio
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && (e.target as HTMLElement).tagName !== 'TEXTAREA') {
      handleSave();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      // Basic image compression using Canvas
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Max dimensions
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          // Compress to JPEG with 0.7 quality
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          callback(compressedBase64);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isLoaded) return null;

  const updateHero = (field: string, value: string) => {
    setLocalData({
      ...localData,
      hero: { ...localData.hero, [field]: value }
    });
  };

  const updateProfile = (field: string, value: string) => {
    if (field === 'image') {
      setLocalData({
        ...localData,
        profile: { ...localData.profile, image: value }
      });
    } else {
      setLocalData({
        ...localData,
        profile: {
          ...localData.profile,
          info: { ...localData.profile.info, [field]: value }
        }
      });
    }
  };

  const updateProject = (id: number, field: string, value: any, subField?: string) => {
    const newProjects = localData.projects.map(p => {
      if (p.id === id) {
        if (subField) {
          return {
            ...p,
            [field]: { ...(p as any)[field], [subField]: value }
          };
        }
        return { ...p, [field]: value };
      }
      return p;
    });
    setLocalData({ ...localData, projects: newProjects });
  };

  const addProject = () => {
    const newId = Math.max(0, ...localData.projects.map(p => p.id)) + 1;
    const newProject = {
      id: newId,
      title: '새 프로젝트',
      summary: '프로젝트 요약',
      period: '',
      personnel: '',
      keywords: ['키워드'],
      iconName: 'Search',
      image: 'https://picsum.photos/seed/new/800/600',
      links: { ppt: '', report: '' },
      details: {
        background: '',
        role: '',
        execution: '',
        result: ''
      }
    };
    setLocalData({ ...localData, projects: [...localData.projects, newProject] });
    setEditingProjectId(newId);
  };

  const deleteProject = (id: number) => {
    if (confirm('정말 이 프로젝트를 삭제하시겠습니까?')) {
      setLocalData({
        ...localData,
        projects: localData.projects.filter(p => p.id !== id)
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/80 backdrop-blur-sm p-4 md:p-6"
          onKeyDown={handleKeyDown}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-white sticky top-0 z-10">
              <h2 className="text-xl font-bold text-navy-900 flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-600" />
                Admin Portfolio Manager
              </h2>
              <button onClick={onClose} className="text-slate-400 hover:text-navy-900 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 md:p-8">
              {!isAuthenticated ? (
                <div className="max-w-md mx-auto py-12">
                  <form onSubmit={handleLogin} className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-navy-900">Restricted Access</h3>
                      <p className="text-slate-500">Enter password to manage your portfolio.</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Password</label>
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••"
                        className="h-12 text-center text-2xl tracking-[0.5em]"
                        autoFocus
                      />
                    </div>

                    {error && (
                      <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm font-medium">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                      </div>
                    )}

                    <Button type="submit" className="w-full h-12 bg-navy-900 hover:bg-navy-800 text-white font-bold rounded-xl">
                      Unlock Panel
                    </Button>
                  </form>
                </div>
              ) : (
                <div className="space-y-8">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-5 mb-8 bg-slate-100 p-1 rounded-xl">
                      <TabsTrigger value="hero" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Hero</TabsTrigger>
                      <TabsTrigger value="profile" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Profile</TabsTrigger>
                      <TabsTrigger value="projects" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Projects</TabsTrigger>
                      <TabsTrigger value="skills" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Skills</TabsTrigger>
                      <TabsTrigger value="contact" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Contact</TabsTrigger>
                    </TabsList>

                    <TabsContent value="hero" className="space-y-6">
                      <Card className="border-slate-200 shadow-none">
                        <CardHeader>
                          <CardTitle className="text-lg">Hero Section Content</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase">Main Heading</label>
                            <Textarea 
                              value={localData.hero.heading} 
                              onChange={(e) => updateHero('heading', e.target.value)}
                              className="min-h-[100px]" 
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase">Sub Heading</label>
                            <Input 
                              value={localData.hero.subHeading} 
                              onChange={(e) => updateHero('subHeading', e.target.value)}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="profile" className="space-y-6">
                      <Card className="border-slate-200 shadow-none">
                        <CardHeader>
                          <CardTitle className="text-lg">Profile Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                              <ImageIcon className="w-3 h-3" /> Profile Image Upload
                            </label>
                            <div className="flex items-center gap-4">
                              <img src={localData.profile.image} alt="Preview" className="w-16 h-16 rounded-lg object-cover border border-slate-200" />
                              <Input 
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, (base64) => updateProfile('image', base64))}
                                className="flex-grow cursor-pointer"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-400 uppercase">Birth</label>
                              <Input 
                                value={localData.profile.info.birth} 
                                onChange={(e) => updateProfile('birth', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-400 uppercase">Education (University)</label>
                              <Input 
                                value={localData.profile.info.education} 
                                onChange={(e) => updateProfile('education', e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-400 uppercase">Major</label>
                              <Input 
                                value={localData.profile.info.major} 
                                onChange={(e) => updateProfile('major', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-400 uppercase">Double Major</label>
                              <Input 
                                value={localData.profile.info.doubleMajor} 
                                onChange={(e) => updateProfile('doubleMajor', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-400 uppercase">GPA</label>
                              <Input 
                                value={localData.profile.info.gpa} 
                                onChange={(e) => updateProfile('gpa', e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase">Certifications</label>
                            <Input 
                              value={localData.profile.info.certifications} 
                              onChange={(e) => updateProfile('certifications', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase">Training</label>
                            <Input 
                              value={localData.profile.info.training} 
                              onChange={(e) => updateProfile('training', e.target.value)}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="projects" className="space-y-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-navy-900">Manage Projects ({localData.projects.length})</h3>
                        <Button size="sm" className="bg-blue-600 text-white" onClick={addProject}>
                          <Plus className="w-4 h-4 mr-2" /> Add Project
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        {localData.projects.map((project) => (
                          <div key={project.id} className="border border-slate-200 rounded-xl overflow-hidden">
                            <div className="flex items-center justify-between p-4 bg-slate-50">
                              <div className="flex items-center gap-3">
                                <img src={project.image} alt="" className="w-10 h-10 rounded object-cover" />
                                <span className="font-medium text-navy-900">{project.title}</span>
                              </div>
                              <div className="flex gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => setEditingProjectId(editingProjectId === project.id ? null : project.id)}
                                  className={editingProjectId === project.id ? 'text-blue-600 bg-blue-50' : 'text-slate-400'}
                                >
                                  <Edit3 className="w-4 h-4 mr-1" /> {editingProjectId === project.id ? 'Close' : 'Edit'}
                                </Button>
                                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-red-600" onClick={() => deleteProject(project.id)}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            
                            {editingProjectId === project.id && (
                              <div className="p-6 border-t border-slate-100 bg-white space-y-6 animate-in fade-in slide-in-from-top-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="space-y-4">
                                    <div className="space-y-2">
                                      <label className="text-xs font-bold text-slate-400 uppercase">Project Title</label>
                                      <Input value={project.title} onChange={(e) => updateProject(project.id, 'title', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                      <label className="text-xs font-bold text-slate-400 uppercase">Summary</label>
                                      <Textarea value={project.summary} onChange={(e) => updateProject(project.id, 'summary', e.target.value)} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase">Period (기간)</label>
                                        <Input value={project.period || ''} onChange={(e) => updateProject(project.id, 'period', e.target.value)} placeholder="예: 2023.01 - 2023.03" />
                                      </div>
                                      <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase">Personnel (수행 인원)</label>
                                        <Input value={project.personnel || ''} onChange={(e) => updateProject(project.id, 'personnel', e.target.value)} placeholder="예: 4명" />
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <label className="text-xs font-bold text-slate-400 uppercase">Project Image Upload</label>
                                      <div className="flex items-center gap-4">
                                        <img src={project.image} alt="Preview" className="w-12 h-12 rounded object-cover border border-slate-200" />
                                        <Input 
                                          type="file"
                                          accept="image/*"
                                          onChange={(e) => handleImageUpload(e, (base64) => updateProject(project.id, 'image', base64))}
                                          className="flex-grow cursor-pointer"
                                        />
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1">
                                          <LinkIcon className="w-3 h-3" /> PPT Link
                                        </label>
                                        <Input value={project.links.ppt} onChange={(e) => updateProject(project.id, 'links', e.target.value, 'ppt')} />
                                      </div>
                                      <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1">
                                          <LinkIcon className="w-3 h-3" /> Report Link
                                        </label>
                                        <Input value={project.links.report} onChange={(e) => updateProject(project.id, 'links', e.target.value, 'report')} />
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-4">
                                    <div className="space-y-2">
                                      <label className="text-xs font-bold text-slate-400 uppercase">Background</label>
                                      <Textarea value={project.details.background} onChange={(e) => updateProject(project.id, 'details', e.target.value, 'background')} className="min-h-[80px]" />
                                    </div>
                                    <div className="space-y-2">
                                      <label className="text-xs font-bold text-slate-400 uppercase">Role</label>
                                      <Textarea value={project.details.role} onChange={(e) => updateProject(project.id, 'details', e.target.value, 'role')} className="min-h-[80px]" />
                                    </div>
                                    <div className="space-y-2">
                                      <label className="text-xs font-bold text-slate-400 uppercase">Execution</label>
                                      <Textarea value={project.details.execution} onChange={(e) => updateProject(project.id, 'details', e.target.value, 'execution')} className="min-h-[80px]" />
                                    </div>
                                    <div className="space-y-2">
                                      <label className="text-xs font-bold text-slate-400 uppercase">Result</label>
                                      <Textarea value={project.details.result} onChange={(e) => updateProject(project.id, 'details', e.target.value, 'result')} className="min-h-[80px]" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="skills" className="space-y-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-navy-900">Core Competencies ({localData.competencies.length})</h3>
                        <Button size="sm" className="bg-blue-600 text-white" onClick={() => {
                          setLocalData({
                            ...localData,
                            competencies: [...localData.competencies, { title: 'New Skill', description: 'Skill description' }]
                          });
                        }}>
                          <Plus className="w-4 h-4 mr-2" /> Add Skill
                        </Button>
                      </div>
                      <Card className="border-slate-200 shadow-none">
                        <CardContent className="space-y-4 pt-6">
                          {localData.competencies.map((comp, idx) => (
                            <div key={idx} className="relative group grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl">
                              <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase">Skill Title</label>
                                <Input 
                                  value={comp.title} 
                                  onChange={(e) => {
                                    const newComps = [...localData.competencies];
                                    newComps[idx].title = e.target.value;
                                    setLocalData({ ...localData, competencies: newComps });
                                  }} 
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase">Description</label>
                                <div className="flex gap-2">
                                  <Input 
                                    value={comp.description} 
                                    onChange={(e) => {
                                      const newComps = [...localData.competencies];
                                      newComps[idx].description = e.target.value;
                                      setLocalData({ ...localData, competencies: newComps });
                                    }} 
                                    className="flex-grow"
                                  />
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-slate-400 hover:text-red-600"
                                    onClick={() => {
                                      const newComps = localData.competencies.filter((_, i) => i !== idx);
                                      setLocalData({ ...localData, competencies: newComps });
                                    }}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="contact" className="space-y-6">
                      <Card className="border-slate-200 shadow-none">
                        <CardHeader>
                          <CardTitle className="text-lg">Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase">Email Address</label>
                            <Input 
                              value={localData.contact.email} 
                              onChange={(e) => setLocalData({
                                ...localData,
                                contact: { ...localData.contact, email: e.target.value }
                              })}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <div className="mt-8 pt-6 border-t border-slate-100 flex gap-4">
                      <Button 
                        onClick={handleSave} 
                        disabled={isSaving}
                        className="flex-grow h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl"
                      >
                        {isSaving ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4 mr-2" />
                        )}
                        Save All Changes
                      </Button>
                      <Button variant="outline" onClick={onClose} className="h-12 rounded-xl">Cancel</Button>
                    </div>
                  </Tabs>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}




