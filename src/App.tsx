import { motion } from "motion/react";
import { GraduationCap, Briefcase, Heart, Users, ArrowRight, CheckCircle2, Menu, X, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";
import { useState } from "react";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const services = [
    {
      title: "Awakening",
      description: "Social Consciousness through gender equality, cleanliness (Swacch Bharat), and anti-tobacco drives. Instilling patriotism in young minds.",
      icon: <Users className="w-6 h-6 text-white" />,
      color: "bg-brand-blue"
    },
    {
      title: "Creation of Employment",
      description: "Imparting skills like stitching, embroidery, music, and yoga. Empowering self-reliance through vocational soft skills training.",
      icon: <Briefcase className="w-6 h-6 text-white" />,
      color: "bg-brand-sky"
    },
    {
      title: "Eradication of Illiteracy",
      description: "Grassroots education focused on migrant children. We move beyond memory tests to help children reason and grasp concrete concepts.",
      icon: <GraduationCap className="w-6 h-6 text-white" />,
      color: "bg-brand-blue"
    },
    {
      title: "Social Awareness",
      description: "Nation-wide impact through 'Resonance' seminars, 'Yoga Shivir', and local administrative collaborations across India.",
      icon: <Heart className="w-6 h-6 text-white" />,
      color: "bg-brand-sky"
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden selection:bg-brand-navy selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-100 bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-12 h-20 md:h-24 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-brand-navy rounded-lg flex items-center justify-center">
              <span className="font-display font-bold text-lg md:text-xl text-white">A</span>
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tighter text-brand-navy shrink-0">AMYOB<span className="text-brand-sky underline decoration-4 underline-offset-4 ml-1">EDUCATION</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#programs" className="nav-link text-brand-navy">Services</a>
            <a href="#mission" className="nav-link">Mission</a>
            <a href="#articles" className="nav-link">Articles</a>
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
            <a href="#articles" onClick={() => setIsMenuOpen(false)} className="nav-link text-lg">Articles</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="nav-link text-lg">Contact</a>
            <button className="btn-primary w-full">Free Consultation</button>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 md:pt-48 pb-16 md:pb-24 px-4 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 items-center gap-12 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 lg:pr-8"
          >
            <div className="mb-6 inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-brand-navy text-[10px] md:text-xs font-bold uppercase tracking-widest border border-blue-100">
              <span className="w-2 h-2 rounded-full bg-brand-sky mr-2 animate-pulse"></span> Registered Under Section 25, Indian Companies Act 1956
            </div>
            <h1 className="text-5xl md:text-8xl font-bold leading-[1.1] md:leading-[0.9] text-black mb-6 md:mb-8 tracking-tighter">
              Always Mind Your <br className="hidden md:block" /> <span className="text-brand-blue tracking-tight">Own Business</span>
              <span className="block text-2xl md:text-3xl mt-4 text-slate-400 font-medium tracking-normal">India is Great</span>
            </h1>
            <p className="max-w-xl text-slate-600 text-base md:text-xl font-normal mb-8 md:mb-10 leading-relaxed italic">
              "To serve the Nation is to serve God"
              <span className="block not-italic text-sm mt-2 text-brand-sky font-bold">5 x 2.5 = 1p (Food, Shelter, Clothes, Health, Education)</span>
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 md:gap-5">
              <button className="btn-primary px-8 py-4 flex items-center justify-center gap-2 group">
                GET STARTED <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-secondary px-8 py-4">Our Methodology</button>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-8 md:space-x-12 pt-10 md:pt-12 mt-10 md:mt-12 border-t border-slate-100">
              {[
                { label: "Years Impact", value: "20+" },
                { label: "Centers", value: "05+" },
                { label: "Community", value: "10k+" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">{stat.value}</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 relative p-4 md:p-8"
          >
            <div className="relative aspect-square max-w-md mx-auto lg:max-w-none">
              {/* Geometric Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 bg-blue-100 rounded-full mix-blend-multiply opacity-50 blur-2xl md:blur-3xl"></div>
              <div className="absolute bottom-10 left-0 w-36 md:w-72 h-36 md:h-72 bg-sky-100 rounded-3xl rotate-12 mix-blend-multiply opacity-50 blur-2xl md:blur-3xl"></div>
              
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 md:border-8 border-white group">
                <img 
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200" 
                  alt="Rural education impact in India" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 bg-brand-navy text-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-2xl max-w-[160px] md:max-w-[220px]">
                 <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] mb-2 md:mb-3 opacity-60">Impact Focus</p>
                 <div className="space-y-1">
                    <p className="text-xs md:text-sm font-bold text-brand-sky">80G Certified</p>
                    <p className="text-[10px] leading-tight opacity-80">Income Tax Rebate for Social Good</p>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid - Dark Mode Accent */}
      <section id="programs" className="bg-black py-20 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-16 text-center lg:text-left">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Empowering <span className="text-brand-sky italic">Indian Excellence</span></h2>
            <p className="text-slate-500 max-w-xl mx-auto lg:mx-0">Comprehensive support systems designed to transform academic potential into global achievement.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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

      {/* Trust & Media Section */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="mb-6 inline-flex items-center px-4 py-1.5 rounded-full bg-slate-50 text-brand-navy text-[10px] font-bold uppercase tracking-widest border border-slate-100">
                Media & Recognition
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-black mb-8 leading-tight tracking-tighter">
                A Legacy of <span className="text-brand-blue">National Impact</span>
              </h2>
              <p className="text-slate-500 text-lg mb-10 leading-relaxed">
                Our initiatives have been recognized by several media houses and administrative bodies for over two decades. From 'Resonance' seminars to grassroots literacy programs, we count upon the goodness in humanity to make a difference.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <div className="text-3xl font-black text-brand-navy">20+</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Years of Service</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-black text-brand-navy">5,000+</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Students Empowered</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col justify-center items-center text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                  <CheckCircle2 className="text-brand-sky w-6 h-6" />
                </div>
                <h4 className="font-bold text-black mb-2 tracking-tight">80G Certified</h4>
                <p className="text-slate-400 text-xs">Income Tax Rebate Eligibility for all donations</p>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col justify-center items-center text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                  <CheckCircle2 className="text-brand-sky w-6 h-6" />
                </div>
                <h4 className="font-bold text-black mb-2 tracking-tight">Sec 25 Org</h4>
                <p className="text-slate-400 text-xs">Registered under Indian Companies Act 1956</p>
              </div>
              <div className="md:col-span-2 bg-brand-navy p-8 rounded-3xl text-white">
                <blockquote className="text-lg italic mb-4">
                  "Education is the most powerful weapon which you can use to change the world."
                </blockquote>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">— Nelson Mandela (Core Mission Inspiration)</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="mission" className="py-20 md:py-32 px-6 md:px-12 bg-slate-50">
        <div className="max-w-7xl mx-auto border-b border-slate-200 pb-16 md:pb-20 mb-16 md:mb-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="relative order-2 lg:order-1 max-w-lg mx-auto lg:max-w-none w-full">
              <div className="aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&q=80&w=1200" 
                  alt="Educational leadership" 
                  className="w-full h-full object-cover grayscale opacity-90" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 bg-brand-navy/10 rounded-2xl md:rounded-3xl z-20"></div>
            </div>
            
            <div className="order-1 lg:order-2">
               <div className="mb-6 inline-flex items-center px-4 py-1.5 rounded-full bg-white text-brand-navy text-[10px] font-bold uppercase tracking-[0.2em] border border-slate-200">
                 Our Visionaries
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-black mb-8 md:mb-10 leading-[1.1] tracking-tighter">
                Leadership & <span className="text-brand-sky underline decoration-sky-300 underline-offset-8">Guidance</span>
              </h2>
              <div className="space-y-8 md:space-y-10">
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <h4 className="text-lg font-bold text-black mb-1">Mrs. Neeraj Singh</h4>
                  <p className="text-brand-sky font-bold text-[10px] uppercase tracking-wider mb-3">Chairperson</p>
                  <p className="text-slate-500 text-sm italic mb-4">"Your faith can move mountains, Your doubt can create them."</p>
                  <p className="text-slate-500 text-xs leading-relaxed">A teacher at heart and a disciplinarian on the front, recognized across cities for social awareness impact.</p>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <h4 className="text-lg font-bold text-black mb-1">Dr. Amar Pratap Singh</h4>
                  <p className="text-brand-sky font-bold text-[10px] uppercase tracking-wider mb-3">Managing Director</p>
                  <p className="text-slate-500 text-sm italic mb-4">"Unleashing the power of education to advance Sustainable Development Goals."</p>
                  <p className="text-slate-500 text-xs leading-relaxed">Leading initiatives to advance UNESCO goals through institutional collaboration and grassroots change.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy Section */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
             <div className="mb-4 inline-flex items-center px-4 py-1.5 rounded-full bg-slate-50 text-brand-navy text-[10px] font-bold uppercase tracking-widest border border-slate-100">
                The AMYOB Way
              </div>
            <h2 className="text-4xl md:text-6xl font-bold text-black tracking-tighter">Our Core <span className="text-brand-blue">Philosophy</span></h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Young Minds",
                text: "To instill the messages of Cleanliness, Patriotism and Good Habits in young minds to lay foundations for Model Citizens."
              },
              {
                title: "Self Reliance",
                text: "Imparting self-reliance to the most needy by teaching soft skills like tailoring, music, and spoken English."
              },
              {
                title: "Beyond Memory",
                text: "Helping children reason, question and grasp concepts concretely rather than just passing memory tests."
              }
            ].map((item, i) => (
              <div key={i} className="relative p-8 rounded-3xl bg-slate-50 border border-slate-100 group hover:bg-brand-navy transition-all duration-500">
                <div className="text-4xl font-black text-blue-100 group-hover:text-white/10 mb-4 transition-colors">0{i+1}</div>
                <h4 className="text-xl font-bold text-black group-hover:text-white mb-4 transition-colors">{item.title}</h4>
                <p className="text-slate-500 group-hover:text-slate-300 leading-relaxed text-sm transition-colors">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Historical Impact Gallery */}
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h3 className="text-3xl font-bold text-black tracking-tight mb-2">Our Journey in Pictures</h3>
              <p className="text-slate-500 text-sm">Two decades of grassroots transformation across India.</p>
            </div>
            <div className="flex gap-4">
              <span className="px-4 py-1 rounded-full bg-brand-navy text-white text-[10px] font-bold uppercase tracking-widest">Surat</span>
              <span className="px-4 py-1 rounded-full bg-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-widest">Lucknow</span>
              <span className="px-4 py-1 rounded-full bg-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-widest">Baharaich</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-auto md:h-[600px]">
            <div className="col-span-1 md:col-span-8 h-[350px] md:h-full rounded-2xl md:rounded-3xl overflow-hidden group relative shadow-xl">
              <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2070&auto=format&fit=crop" alt="Eradication of Illiteracy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                <div>
                  <p className="text-brand-sky font-bold text-xs uppercase tracking-[0.3em] mb-2">Impact Story: Surat</p>
                  <p className="text-white font-bold tracking-tight text-xl md:text-2xl mb-2">Resonance: Eradication of Illiteracy</p>
                  <p className="text-white/70 text-sm max-w-lg">Initiating programs to help migrant children reason, question, and grasp concepts concretely beyond mere memory tests.</p>
                </div>
              </div>
            </div>
            <div className="col-span-1 md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-4">
              <div className="rounded-2xl md:rounded-3xl overflow-hidden group shadow-lg relative aspect-square md:aspect-auto">
                 <img src="https://images.unsplash.com/photo-1590664095641-7fa05f689813?q=80&w=2070&auto=format&fit=crop" alt="Vocational Skills" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                 <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center p-4">
                    <p className="text-white font-bold text-sm tracking-tight">Vocational Skills<br /><span className="text-[10px] font-normal opacity-80 uppercase tracking-widest">Self-Reliance & Training</span></p>
                 </div>
              </div>
              <div className="rounded-2xl md:rounded-3xl overflow-hidden group shadow-lg relative aspect-square md:aspect-auto">
                 <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop" alt="Social Awareness Campaigns" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                 <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center p-4">
                    <p className="text-white font-bold text-sm tracking-tight">Awareness Seminars<br /><span className="text-[10px] font-normal opacity-80 uppercase tracking-widest">Resonance Initiatives</span></p>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Campaign Spotlight Section */}
        <div className="max-w-7xl mx-auto mt-20 pt-20 border-t border-slate-100">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-black tracking-tight mb-4">Campaign Spotlight</h3>
            <p className="text-slate-500 max-w-2xl mx-auto">Specific initiatives driving national impact and social reform through awareness and action.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "Yoga Shivir", 
                desc: "Promoting physical and mental well-being through traditional practice.",
                img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop"
              },
              { 
                title: "Swacch Baharaich", 
                desc: "Cleanliness drives to instill a sense of civic duty and hygiene.",
                img: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1200&auto=format&fit=crop"
              },
              { 
                title: "Anti-Tobacco Drive", 
                desc: "Educating youth on the hazards of tobacco and substance abuse.",
                img: "https://images.unsplash.com/photo-1594708767771-a7502209ff51?q=80&w=1200&auto=format&fit=crop"
              }
            ].map((camp, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-4 shadow-md bg-slate-100">
                  <img src={camp.img} alt={camp.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                </div>
                <h4 className="font-bold text-black mb-2">{camp.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{camp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media & Articles Section */}
      <section id="articles" className="py-20 md:py-32 px-6 md:px-12 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center px-4 py-1.5 rounded-full bg-white text-brand-navy text-[10px] font-bold uppercase tracking-widest border border-slate-200">
                In The Headlines
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tighter leading-tight">Featured <span className="text-brand-blue">Press & Articles</span></h2>
              <p className="mt-4 text-slate-500">Several media houses have been kind enough to take our voice to the larger world & make our initiatives successful.</p>
            </div>
            <button className="btn-secondary whitespace-nowrap">View All Press Release</button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                date: "Jan 28, 2016",
                source: "Nav Bharat Times",
                title: "The Fantastic Five: Eradication of Illiteracy",
                desc: "An in-depth feature on AMYOB's impact in Surat, helping hundreds of students bypass memory tests to reason concretely.",
                img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800"
              },
              {
                date: "March 4, 2025",
                source: "Unesco / IEI",
                title: "World Engineering Day: Sustainable Development",
                desc: "Dr. Amar Pratap Singh recognized as Chief Guest at the Delhi State Centre for his contributions to the UN Sustainable Goals.",
                img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800"
              },
              {
                date: "April 12, 2006",
                source: "Dainik Jagran",
                title: "Resonance: Reach Your Potential",
                desc: "Highlighting our 'Introductory Seminars' and social awareness drives that lay foundations for Model Citizens in India.",
                img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800"
              }
            ].map((article, i) => (
              <div key={i} className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="aspect-[16/10] overflow-hidden relative">
                   <img src={article.img} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                   <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-brand-navy shadow-sm">
                     {article.source}
                   </div>
                </div>
                <div className="p-8">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{article.date}</div>
                  <h4 className="text-xl font-bold text-black group-hover:text-brand-blue transition-colors mb-4 leading-tight">{article.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">{article.desc}</p>
                  <div className="flex items-center gap-2 text-brand-navy font-bold text-xs group/btn">
                    READ FULL ARTICLE <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden grid lg:grid-cols-2">
            <div className="p-8 md:p-16 flex flex-col justify-between">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 md:mb-8 tracking-tighter">Connect with <br /><span className="text-brand-blue">Excellence.</span></h2>
                <p className="text-slate-500 mb-8 md:mb-12 max-w-sm">Start your transformation today. Our consultants are ready to guide your next move.</p>
                
                <div className="space-y-6 md:space-y-8">
                  <div className="flex items-start gap-4 md:gap-6 group">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-brand-navy transition-colors shrink-0 mt-1">
                      <Mail className="w-5 h-5 text-brand-navy group-hover:text-white" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Us</div>
                      <div className="text-brand-navy font-bold text-sm md:text-base">aamyob@gmail.com</div>
                      <div className="text-brand-navy font-bold text-sm md:text-base">draspsingh@gmail.com</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 md:gap-6 group">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-brand-navy transition-colors shrink-0 mt-1">
                      <Phone className="w-5 h-5 text-brand-navy group-hover:text-white" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Call Expert</div>
                      <div className="text-brand-navy font-bold text-sm md:text-base">09415347010</div>
                      <div className="text-brand-navy font-bold text-sm md:text-base">08004923343</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 md:gap-6 group">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-brand-navy transition-colors shrink-0 mt-1">
                      <MapPin className="w-5 h-5 text-brand-navy group-hover:text-white" />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Head Office (Surat)</div>
                        <div className="text-brand-navy font-bold text-sm leading-tight">A-402, Vraj Vihar Complex, Adajan Gam, Surat 395009</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lucknow Branch</div>
                        <div className="text-brand-navy font-bold text-sm leading-tight">3/168, Vipul Khand, Gomti Nagar, Lucknow</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Other Presence</div>
                        <div className="text-brand-navy font-bold text-sm leading-tight">Baharaich | Pilibhit</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 md:p-16 border-t lg:border-t-0 lg:border-l border-slate-100">
               <form className="space-y-5 md:space-y-6">
                 <div>
                    <label className="block text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2 md:mb-3">Full Name</label>
                    <input type="text" className="w-full bg-white border border-slate-200 rounded-xl h-12 md:h-14 px-5 focus:border-brand-navy outline-none transition-colors" placeholder="Ex: Rahul Sharma" />
                 </div>
                 <div>
                    <label className="block text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2 md:mb-3">Target Country</label>
                    <select className="w-full bg-white border border-slate-200 rounded-xl h-12 md:h-14 px-5 focus:border-brand-navy outline-none transition-colors appearance-none">
                      <option>Select Destination</option>
                      <option>United Kingdom</option>
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Australia</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2 md:mb-3">Brief Inquiry</label>
                    <textarea className="w-full bg-white border border-slate-200 rounded-xl h-24 md:h-32 p-5 focus:border-brand-navy outline-none transition-colors resize-none" placeholder="Tell us about your background..." />
                 </div>
                 <button className="btn-primary w-full py-4 md:py-5 text-xs font-black tracking-widest">SCHEDULE NOW</button>
               </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 bg-slate-50 border-t border-slate-100 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-brand-navy rounded flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="font-black text-brand-navy">AMYOB EDUCATION</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Empowering India through Awakening, Employment creation, and the Eradication of illiteracy.
            </p>
            <div className="flex gap-4">
              <Facebook className="w-5 h-5 text-slate-400 hover:text-brand-blue cursor-pointer" />
              <Instagram className="w-5 h-5 text-slate-400 hover:text-brand-blue cursor-pointer" />
              <Twitter className="w-5 h-5 text-slate-400 hover:text-brand-blue cursor-pointer" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-12 md:gap-24">
            <div>
              <h5 className="font-bold text-black text-xs uppercase tracking-widest mb-6">Trust</h5>
              <ul className="space-y-4 text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
                <li>Section 25 Co.</li>
                <li>80G Registered</li>
                <li>CSR Partner</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-black text-xs uppercase tracking-widest mb-6">Reach Us</h5>
              <ul className="space-y-4 text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
                <li>Surat</li>
                <li>Lucknow</li>
                <li>Baharaich</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] gap-4">
          <div>&copy; 2026 AMYOB EDUCATION INDIA. All Rights Reserved.</div>
          <div className="flex gap-8">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
