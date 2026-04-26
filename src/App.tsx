import { motion } from "motion/react";
import { GraduationCap, Briefcase, Heart, Users, ArrowRight, CheckCircle2, Menu, X, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";
import { useState } from "react";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const services = [
    {
      title: "Career Counseling",
      description: "Psychometric testing and expert guidance to map your professional trajectory with precision.",
      icon: <GraduationCap className="w-6 h-6 text-white" />,
      color: "bg-brand-blue"
    },
    {
      title: "University Selection",
      description: "Custom matching with top-tier global institutions based on your unique academic profile and goals.",
      icon: <Users className="w-6 h-6 text-white" />,
      color: "bg-brand-sky"
    },
    {
      title: "Visa Assistance",
      description: "End-to-end documentation support ensuring a 98% hassle-free approval rate for your journey.",
      icon: <Briefcase className="w-6 h-6 text-white" />,
      color: "bg-brand-blue"
    },
    {
      title: "Social Empowerment",
      description: "Taking effective steps to examine and solve critical social problems through systemic education reform.",
      icon: <Heart className="w-6 h-6 text-white" />,
      color: "bg-brand-sky"
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden selection:bg-brand-navy selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-100 bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-12 h-24 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-navy rounded-lg flex items-center justify-center">
              <span className="font-display font-bold text-xl text-white">A</span>
            </div>
            <span className="text-2xl font-black tracking-tighter text-brand-navy">AMYOB<span className="text-brand-sky underline decoration-4 underline-offset-4 ml-1">EDUCATION</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#programs" className="nav-link text-brand-navy">Services</a>
            <a href="#mission" className="nav-link">Mission</a>
            <a href="#contact" className="nav-link">Contact</a>
            <button className="btn-primary">Free Consultation</button>
          </div>

          <button className="md:hidden text-brand-navy" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-b border-slate-100 px-8 py-10 flex flex-col gap-6 items-center shadow-xl"
          >
            <a href="#programs" onClick={() => setIsMenuOpen(false)} className="nav-link text-lg">Services</a>
            <a href="#mission" onClick={() => setIsMenuOpen(false)} className="nav-link text-lg">Mission</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="nav-link text-lg">Contact</a>
            <button className="btn-primary w-full">Free Consultation</button>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-48 pb-24 px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 pr-8"
          >
            <div className="mb-6 inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-brand-navy text-xs font-bold uppercase tracking-widest border border-blue-100">
              <span className="w-2 h-2 rounded-full bg-brand-sky mr-2 animate-pulse"></span> India's Premier Education initiative
            </div>
            <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] text-black mb-8 tracking-tighter">
              Navigate Your <br/> <span className="text-brand-blue tracking-tight">Global Future</span>
            </h1>
            <p className="max-w-xl text-slate-600 text-lg md:text-xl font-normal mb-10 leading-relaxed">
              Specialized consultancy for Study Abroad, Career Pathing, and University Admissions. We bridge the gap between Indian ambition and global opportunities.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <button className="btn-primary px-8 py-4 flex items-center gap-2 group">
                GET STARTED <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-secondary px-8 py-4">Our Methodology</button>
            </div>

            {/* Stats Row */}
            <div className="flex space-x-12 pt-12 mt-12 border-t border-slate-100">
              {[
                { label: "Countries", value: "12+" },
                { label: "Success Stories", value: "500+" },
                { label: "Visa Approval", value: "98%" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-black text-brand-navy tracking-tight">{stat.value}</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 relative mt-20 lg:mt-0 p-8"
          >
            <div className="relative aspect-square">
              {/* Geometric Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply opacity-50 blur-3xl"></div>
              <div className="absolute bottom-10 left-0 w-72 h-72 bg-sky-100 rounded-3xl rotate-12 mix-blend-multiply opacity-50 blur-3xl"></div>
              
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border-8 border-white group">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                  alt="Students collaborating" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-8 -right-8 bg-black text-white p-6 rounded-2xl shadow-2xl max-w-[200px]">
                 <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 opacity-60">Success Rates</p>
                 <div className="flex items-end gap-2">
                    <span className="text-4xl font-black">98%</span>
                    <span className="text-brand-sky text-xs font-bold mb-1">↑ Global</span>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid - Dark Mode Accent */}
      <section id="programs" className="bg-black py-32 px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Empowering <span className="text-brand-sky italic">Indian Excellence</span></h2>
            <p className="text-slate-500 max-w-xl">Comprehensive support systems designed to transform academic potential into global achievement.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -8 }}
                className="p-8 bg-brand-dark border border-slate-800 rounded-2xl group transition-all"
              >
                <div className={`w-12 h-12 flex items-center justify-center rounded-lg mb-6 ${service.color} shadow-lg transition-transform group-hover:scale-110`}>
                  {service.icon}
                </div>
                <h3 className="text-white text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-32 px-12 bg-slate-50">
        <div className="max-w-7xl mx-auto border-b border-slate-200 pb-20 mb-20">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1200" 
                  alt="Student collaboration" 
                  className="w-full h-full object-cover grayscale opacity-90" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 bg-brand-navy/10 rounded-3xl z-20"></div>
            </div>
            
            <div className="order-1 lg:order-2">
               <div className="mb-6 inline-flex items-center px-4 py-1.5 rounded-full bg-white text-brand-navy text-[10px] font-bold uppercase tracking-[0.2em] border border-slate-200">
                 Our Commitment
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-black mb-10 leading-[1.1] tracking-tighter">
                Ethical <span className="text-brand-sky underline decoration-sky-300 underline-offset-8">Consultancy</span>
              </h2>
              <div className="space-y-10">
                {[
                  { title: "Personalized Roadmap", text: "We don't believe in one-size-fits-all. Every student gets a custom career trajectory." },
                  { title: "Transparency First", text: "End-to-end clarity on university choices, visa procedures, and financial planning." },
                  { title: "Continuous Mentorship", text: "Our relationship doesn't end at admission; we support your integration abroad." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-8 h-8 rounded bg-brand-navy flex items-center justify-center group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-2 text-black">{item.title}</h4>
                      <p className="text-slate-500 leading-relaxed text-sm">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Engagement Gallery Section */}
        <div className="max-w-7xl mx-auto mt-20">
          <div className="grid grid-cols-12 gap-4 h-[500px]">
            <div className="col-span-8 rounded-3xl overflow-hidden group relative shadow-2xl">
              <img src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=2070&auto=format&fit=crop" alt="Campus environment" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <p className="text-white font-bold tracking-tight">Vibrant Learning Culture</p>
              </div>
            </div>
            <div className="col-span-4 grid grid-rows-2 gap-4">
              <div className="rounded-3xl overflow-hidden group shadow-xl">
                 <img src="https://images.unsplash.com/photo-1524178232363-1fb28f74b573?q=80&w=2070&auto=format&fit=crop" alt="Learning session" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
              </div>
              <div className="rounded-3xl overflow-hidden group shadow-xl">
                 <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop" alt="Graduation" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden grid lg:grid-cols-2">
            <div className="p-16 flex flex-col justify-between">
              <div>
                <h2 className="text-5xl font-bold text-black mb-8 tracking-tighter">Connect with <br /><span className="text-brand-blue">Excellence.</span></h2>
                <p className="text-slate-500 mb-12 max-w-sm">Start your transformation today. Our consultants are ready to guide your next move.</p>
                
                <div className="space-y-8">
                  <div className="flex items-center gap-6 group">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-brand-navy transition-colors">
                      <Mail className="w-5 h-5 text-brand-navy group-hover:text-white" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Us</div>
                      <div className="text-brand-navy font-bold">hello@amyob.india</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 group">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-brand-navy transition-colors">
                      <Phone className="w-5 h-5 text-brand-navy group-hover:text-white" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Call Expert</div>
                      <div className="text-brand-navy font-bold">+91 1800 200 300</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-16 border-l border-slate-100">
               <form className="space-y-6">
                 <div>
                    <label className="block text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">Full Name</label>
                    <input type="text" className="w-full bg-white border border-slate-200 rounded-xl h-14 px-5 focus:border-brand-navy outline-none transition-colors" placeholder="Ex: Rahul Sharma" />
                 </div>
                 <div>
                    <label className="block text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">Target Country</label>
                    <select className="w-full bg-white border border-slate-200 rounded-xl h-14 px-5 focus:border-brand-navy outline-none transition-colors appearance-none">
                      <option>Select Destination</option>
                      <option>United Kingdom</option>
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Australia</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">Brief Inquiry</label>
                    <textarea className="w-full bg-white border border-slate-200 rounded-xl h-32 p-5 focus:border-brand-navy outline-none transition-colors" placeholder="Tell us about your background..." />
                 </div>
                 <button className="btn-primary w-full py-5 text-xs font-black tracking-widest">SCHEDULE NOW</button>
               </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
        <div className="mb-4 md:mb-0">&copy; 2026 AMYOB EDUCATION INDIA</div>
        <div className="flex space-x-12 mb-4 md:mb-0">
          <span className="hover:text-brand-navy transition-colors cursor-pointer">Facebook</span>
          <span className="hover:text-brand-navy transition-colors cursor-pointer">Instagram</span>
          <span className="hover:text-brand-navy transition-colors cursor-pointer">LinkedIn</span>
        </div>
        <div>EMPOWERING INDIAN EXCELLENCE</div>
      </footer>
    </div>
  );
}
