/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'motion/react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  ChevronDown, 
  X, 
  ArrowRight,
  ExternalLink,
  Users,
  Lightbulb,
  Activity,
  Coffee,
  Cookie,
  Martini,
  Linkedin,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// --- CONFIGURABLE CONSTANTS ---
const PURCHASE_TICKET_URL = "https://www.sympla.com.br/evento/leapy-on-2026-conferencia-anual-de-jovens-talentos/3397818";

// --- DATA STRUCTURES ---

const SPEAKERS = [
  {
    name: "Michelle Schneider",
    type: "Palestra",
    title: "Especialista em futuro do trabalho\ne autora best seller",
    role: "Especialista em futuro do trabalho, autora best-seller de \"O Profissional do Futuro\" e uma das principais vozes sobre o futuro do trabalho no Brasil. Com duas décadas de experiência liderando equipes em empresas como Google, LinkedIn e TikTok, hoje é professora convidada da Singularity University e sócia da consultoria americana de IA Signal & Cipher, onde ajuda empresas e líderes a repensar o trabalho e o papel humano na era da inteligência artificial.",
    image: "https://39765206.fs1.hubspotusercontent-na1.net/hubfs/39765206/Michelle%20Schneider.png",
    linkedin: "https://www.linkedin.com/in/mtschneider/?locale=pt_BR"
  },
  {
    name: "Matheus Fonseca",
    type: "Palestra",
    title: "Cofundador da Leapy",
    role: "Matheus Fonseca, cofundador da Leapy. Formado no programa Ignite de Stanford, tem mais de oito anos de experiência em RH. Liderou a expansão dos programas de entrada da Movile e fundou a Fundação 1Bi.",
    image: "https://39765206.fs1.hubspotusercontent-na1.net/hubfs/39765206/Matheus%20Fonseca.png",
    linkedin: "https://www.linkedin.com/in/mvrfonseca/"
  },
  {
    name: "Ana K Melo",
    type: "Painel",
    title: "Executiva de RH e mentora pela\nLearn to Fly",
    role: "Executiva de RH, mentora pela Learn to Fly e fundadora da Catarse HUB, consultoria especializada em Pessoas e Liderança. \n\nCom passagens por Diageo e XP Inc., onde se tornou a primeira e única mulher com deficiência a se tornar sócia, acumula mais de uma década desenvolvendo lideranças, estruturando áreas de people e construindo culturas organizacionais que funcionam na prática.\n\nTEDx Speaker, mentora de carreiras e lideranças, especialista em diversidade e inclusão, coautora de dois livros e reconhecida como Top 20 HR Influencers 2025.",
    image: "https://39765206.fs1.hubspotusercontent-na1.net/hubfs/39765206/Template%20Speakers%20Leapy%20ON%20(1).png",
    linkedin: "https://www.linkedin.com/in/anakmeloo/?originalSubdomain=br"
  },
  {
    name: "Maira Habimorad",
    type: "Painel",
    title: "CEO do Inteli",
    role: "CEO do Inteli (Instituto de Tecnologia e Lideranças), Maíra também é membro do conselho do BTG Pactual e do Banco Pan, além de cofundadora da Bettha. Por nove anos, liderou a Cia de Talentos, do Grupo DMRH.\n\nÉ formada em Relações Internacionais pela FAAP e em Filosofia pela Mackenzie, combinando uma formação que a capacitou a entender as complexidades do mundo dos negócios e educação.",
    image: "https://39765206.fs1.hubspotusercontent-na1.net/hubfs/39765206/Ma%C3%ADra%20Habimorad.png",
    linkedin: "https://www.linkedin.com/in/maira-habimorad-738a81/"
  },
  {
    name: "Gislaine Lima",
    type: "Painel",
    title: "Superintendente de capital humano no Banco Bradesco",
    role: "Com mais de 22 anos de experiência em Recursos Humanos. Executiva com forte atuação em educação corporativa, desenvolvimento organizacional e cultura, lidera a criação e implementação de estratégias e programas de liderança, gestão de desempenho, sucessão e experiência do colaborador, com impacto no Brasil e em operações internacionais. É formada em Comunicação Social, com pós-graduação em Administração de RH pela FAAP e MBA em Ciências do Consumo pela ESPM.",
    image: "https://39765206.fs1.hubspotusercontent-na1.net/hubfs/39765206/Gislaine.jpeg",
    linkedin: "https://www.linkedin.com/in/limagislaine/"
  },
  {
    name: "Rachel Sarti",
    type: "Painel",
    title: "Head de Gente & Gestão na DASA",
    role: "Executiva de Recursos Humanos com trajetória consolidada em grandes empresas, liderando transformações culturais, desenvolvimento de lideranças e estratégias de engajamento. Com experiência em múltiplos setores, atua na construção de ambientes de alta performance e cultura forte. Atualmente na Dasa, conduz iniciativas de Desenvolvimento, Cultura, ESG e Experiência do Colaborador, conectando pessoas à estratégia do negócio.",
    image: "https://39765206.fs1.hubspotusercontent-na1.net/hubfs/39765206/Rachel.jpeg",
    linkedin: "https://www.linkedin.com/in/rachel-sarti-61189021/"
  },
  {
    name: "Tatiane Santos",
    type: "Palestra",
    title: "Customer Success na Leapy",
    role: "Na Leapy, atua como principal parceira das empresas clientes, conduzindo-as na construção de suas metas de sucesso — da efetivação de jovens aprendizes à redução da carga operacional do RH, permitindo que a área atue de forma mais estratégica.\n\nSua própria trajetória começou como aprendiz. Desde então, construiu uma carreira conectada à transformação social, sempre na intersecção entre pessoas, desenvolvimento e impacto.",
    image: "https://39765206.fs1.hubspotusercontent-na1.net/hubfs/39765206/Tati-1.png?v=2",
    linkedin: "https://www.linkedin.com/in/tatianesant/"
  },
  {
    name: "Ághata Brito",
    type: "Cerimonialista",
    title: "Estagiária na Rede Globo",
    role: "Ághata Brito trabalha com comunicação estratégica, marketing de conteúdo e análise de dados, desenvolvendo projetos voltados para posicionamento digital e construção de narrativas autênticas. \n\nAtualmente faz parte do time de Marketing de Influência e Produção da Rede Globo e teve passagem pela Stone, quando foi Jovem Aprendiz com apoio da Leapy.\n\nSua trajetória reúne experiências em Publicidade, Marketing e Comunicação Social, com foco em criatividade, estratégia e conexão com pessoas.",
    image: "https://39765206.fs1.hubspotusercontent-na1.net/hubfs/39765206/image%20(42).png",
    linkedin: "https://www.linkedin.com/in/%C3%A1ghata-brito-0a61b4237/"
  },
  {
    name: "Roberta Saragiotto",
    type: "Mediação",
    title: "Cofundadora da Blumi",
    role: "Executiva de RH com 20 anos de experiência, com passagem por Credit Suisse, Credit Agricole e Morgan Stanley. Especialista em jovens talentos, recrutamento e convivência entre gerações, iniciou sua relação com a Start Carreiras como investidora-anjo. Hoje é cofundadora da Blūmi, responsável por estratégia, mercado e relacionamento com empresas.",
    image: "https://39765206.fs1.hubspotusercontent-na1.net/hubfs/39765206/Foto%20-%20Roberta%20Saragiotto.png",
    linkedin: "https://www.linkedin.com/in/roberta-saragiotto-53508116/"
  },
  {
    name: "Mateus Alcantra",
    type: "Painelista",
    title: "Jovem Aprendiz no Ifood",
    role: "Jovem Aprendiz no iFood Benefícios, com formação pela Leapy, atua no time de Eficiência Financeira, onde aplica na prática seus conhecimentos em tecnologia no mundo financeiro. Está cursando Análise e Desenvolvimento de Sistemas pela Faculdade SENAI e essa jornada tem despertado nele um interesse crescente por Inteligência Artificial — uma área que pretende aprofundar e que enxerga como o futuro da tecnologia aplicada aos negócios.",
    image: "https://39765206.fs1.hubspotusercontent-na1.net/hubfs/39765206/image%20(43).png",
    objectPosition: "50% 15%",
    linkedin: "https://www.linkedin.com/in/mateusalcantara13/",
    scale: 1.2
  },
  {
    name: "Estela Moraes",
    type: "Painelista",
    title: "Analista de dados jr na Stone",
    role: "Desde pequena, sempre foi apaixonada por aprender e se desafiar a ser melhor em tudo o que faz. Embora tenha iniciado sua trajetória no curso técnico em Edificações, foi na área de dados e tecnologia que encontrou seu verdadeiro propósito, ingressando na FATEC para cursar Big Data para Negócios.\n\nSua jornada profissional começou como Jovem Aprendiz em Service Desk e ganhou ainda mais força ao entrar na Stone, onde conquistou sua efetivação em menos de um ano. Atualmente, atua como Analista Júnior em Revenue Assurance na Stone, unindo análise, estratégia e uma forte vontade de crescer, sempre buscando evoluir e gerar impacto por onde passa.",
    image: "https://39765206.fs1.hubspotusercontent-na1.net/hubfs/39765206/image%20(44).png",
    linkedin: "https://www.linkedin.com/in/estela-moraes-382104256/"
  },
  {
    name: "Em breve",
    role: "Conexões que transformam. Aguarde o anúncio de mais um palestrante confirmado para o Leapy ON.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    isPlaceholder: true
  },
  {
    name: "Em breve",
    role: "O futuro dos jovens talentos em debate. Nova confirmação em breve em nossos canais oficiais.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop",
    isPlaceholder: true
  }
];

const AGENDA = [
  {
    time: "13h00 – 13h30",
    title: "Chegada e primeiras conexões",
    details: "Credenciamento, welcome coffee e acesso às ativações e mini-exposição dos parceiros",
    icon: "coffee"
  },
  {
    time: "13h30 – 13h45",
    title: "O que esperar do dia",
    details: "Contexto do evento, combinados e o fio condutor da agenda"
  },
  {
    time: "13h45 – 14h30",
    title: "O trabalho está sendo redesenhado. Por onde se começa agora?",
    details: "Provocações pela Michelle Schneider, especialista em futuro do trabalho\ne autora best seller, palestrante no SXSW."
  },
  {
    time: "14h30 – 14h50",
    title: "Soluções para quem está na linha de frente",
    details: "Apresentação dos patrocinadores que também contribuem para o ecossistema"
  },
  {
    time: "14h50 – 15h30",
    title: "A nova lógica do desenvolvimento de talentos",
    details: "Como o olhar skill-based muda a forma de atrair, desenvolver e avaliar jovens talentos"
  },
  {
    time: "15h30 – 16h10",
    title: "Leituras do mercado: Dados e insights que ajudam a tomar melhores decisões em programas de entrada",
    details: "Curadoria e apresentação de pesquisas e boas práticas"
  },
  {
    time: "16h10 – 16h40",
    title: "pausa para recarregar",
    details: "Coffee break com acesso às ativações e espaços dos parceiros",
    icon: "snack"
  },
  {
    time: "16h40 – 17h25",
    title: "Do palco para a troca",
    details: "Rodas de conversa em pequenos grupos para discussão de desafios reais e construções coletivas.\n\nTRILHA 1: Como influenciar a efetivação e construir programas de entrada que funcionem como pipelines de talentos\n\nTRILHA 2: Como lidar com os impactos da IA na contratação e no desenvolvimento de jovens talentos\n\nTRILHA 3: Como engajar jovens talentos em jornadas de aprendizagem e desenvolvimento\n\nTRILHA 4: Como comunicar a marca empregadora e atrair jovens talentos"
  },
  {
    time: "17h25 – 17h45",
    title: "Networking em movimento",
    details: "Uma dinâmica divertida para facilitar conexões e ampliar as trocas entre participantes"
  },
  {
    time: "17h45 – 18h15",
    title: "O que as novas gerações têm a dizer",
    details: "Jovens no palco trazendo percepções reais sobre trabalho, carreira, sonhos, expectativas e conflitos"
  },
  {
    time: "18h15 – 19h00",
    title: "Vozes do trabalho: a pauta de jovens talentos sob a lente executiva",
    details: "Lideranças debatem como a pauta jovens talentos é vista de cima, como conectá-la ao negócio e o papel de empresas e academia no desenvolvimento de pessoas em um cenário de tantas transformações."
  },
  {
    time: "19h00 – 19h30",
    title: "Encerramento e próximos passos",
    details: "Download do dia, premiações e nosso compromisso coletivo"
  },
  {
    time: "19h30 – 20h00",
    title: "Happy Hour",
    details: "Onde as conversas continuam",
    icon: "cocktail"
  }
];

// --- COMPONENTS ---

const SpeakerCard = ({ speaker, index }: any) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group [perspective:1000px] h-[450px] w-full cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      onKeyDown={(e) => e.key === 'Enter' && setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
      aria-label={`Ver bio de ${speaker.name}`}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d]"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* FRONT SIDE */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden]" style={{ backfaceVisibility: 'hidden' }}>
          <div className="relative w-full h-full overflow-hidden rounded-3xl bg-brand-light border border-black/5 shadow-lg group-hover:shadow-2xl transition-shadow duration-500">
            {speaker.isPlaceholder ? (
              <div className="absolute inset-0 bg-brand-purple/10 overflow-hidden group-hover:bg-brand-orange/10 transition-colors duration-500">
                {/* Silhouette Effect */}
                <div className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity">
                  <img 
                    src={speaker.image} 
                    alt={speaker.name}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.2] contrast-[1.5]"
                    style={{ maskImage: 'linear-gradient(to top, black, transparent)', WebkitMaskImage: 'linear-gradient(to top, black, transparent)' }}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-purple/90 to-transparent" />
                </div>
                {/* Decorative Icon */}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-center pb-12 pointer-events-none">
                  <Users size={220} className="text-white/5 transform translate-y-12" strokeWidth={1} />
                </div>
              </div>
            ) : (
              <img
                src={speaker.image}
                alt={speaker.name}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-110"
                style={{ objectPosition: (speaker as any).objectPosition || 'center center' }}
              />
            )}
            {/* Overlay Gradient */}
            <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
              {speaker.type && !speaker.isPlaceholder && (
                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full shadow-lg">
                  {speaker.type}
                </div>
              )}
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-brand-purple/90 via-brand-purple/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
            
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex justify-between items-end">
                <div className="flex-1">
                  <h4 className="text-xl md:text-2xl font-black text-white leading-tight font-display tracking-tight uppercase">
                    {speaker.name}
                  </h4>
                  {speaker.title && (
                    <p className="bg-brand-orange text-white text-[10px] font-black uppercase tracking-wider mt-2 px-2 py-1 inline-block rounded-sm shadow-lg whitespace-pre-line leading-tight max-w-[85%]">
                      {speaker.title}
                    </p>
                  )}
                </div>
                {speaker.linkedin && (
                  <a 
                    href={speaker.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="mb-1 p-2 bg-white/10 hover:bg-brand-orange text-white rounded-lg transition-all duration-300 backdrop-blur-md"
                    title={`LinkedIn de ${speaker.name}`}
                  >
                    <Linkedin size={18} />
                  </a>
                )}
              </div>
              <div className="flex items-center gap-2 text-[10px] text-brand-orange mt-4 uppercase tracking-widest font-black opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 text-shadow-sm">
                {speaker.isPlaceholder ? 'Em breve novidades' : 'Conteúdo & Bio'} <ArrowRight size={12} strokeWidth={3} />
              </div>
            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="w-full h-full bg-brand-purple rounded-3xl p-8 flex flex-col justify-between border-2 border-brand-orange/30 shadow-2xl relative overflow-hidden">
            {/* Decorative background icon */}
            <div className="absolute -right-8 -top-8 text-white/5 pointer-events-none transform -rotate-12">
              <Users size={180} />
            </div>

              <div className="relative z-10 flex-1 overflow-hidden flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange shrink-0">
                    <Lightbulb size={20} />
                  </div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest font-black border border-white/10 px-3 py-1 rounded-full shrink-0">
                    Bio Completa
                  </div>
                </div>
                
                <h4 className="text-xl font-black text-white font-display uppercase tracking-tight mb-2 leading-none shrink-0">
                  {speaker.name}
                </h4>
                <div className="h-1 w-12 bg-brand-orange mb-6 shrink-0" />
                
                <div className="text-white/80 text-sm md:text-base leading-relaxed font-medium overflow-y-auto pr-2 custom-scrollbar flex-1 whitespace-pre-line">
                  {speaker.role}
                </div>
              </div>

            <div className="relative z-10 pt-4 flex items-center justify-between border-t border-white/10">
              <span className="text-[10px] text-brand-orange uppercase tracking-[0.2em] font-black">{speaker.isPlaceholder ? 'Palestrante Oficial' : speaker.type}</span>
              <div className="text-white/40 text-[10px] font-black uppercase tracking-widest">Clique p/ voltar</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-purple/90 backdrop-blur-md"
        />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-2xl bg-white rounded-[40px] p-8 md:p-12 shadow-2xl overflow-hidden"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-brand-purple/40 hover:text-brand-orange transition-colors z-10"
          >
            <X size={32} />
          </button>
          {children}
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const ButtonCTA = ({ children, className = "", secondary = false, animate }: any) => (
  <motion.a 
    href={PURCHASE_TICKET_URL}
    target="_blank"
    rel="noopener noreferrer"
    animate={animate}
    className={`inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-display text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl ${
      secondary 
        ? 'bg-transparent border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white' 
        : 'bg-brand-orange text-white hover:bg-brand-vibrant shadow-brand-orange/20'
    } ${className}`}
  >
    {children}
    <ArrowRight size={20} />
  </motion.a>
);

export default function App() {
  const [expandedAgenda, setExpandedAgenda] = useState<number | null>(null);
  const ticketControls = useAnimation();
  const scrollerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollerRef.current) {
      const cardWidth = window.innerWidth < 768 ? 300 : 380;
      const gap = 24; // gap-6
      const scrollAmount = (cardWidth + gap) * (direction === 'left' ? -1 : 1);
      scrollerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      
      // Pause auto-scroll briefly when user interacts
      (window as any).isScrollingPaused = true;
      setTimeout(() => {
        (window as any).isScrollingPaused = false;
      }, 8000);
    }
  };

  const handleTicketClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const heroSection = document.getElementById('home');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    }

    ticketControls.start({
      scale: 1.15,
      backgroundColor: "#0055FF", // A vibrant blue
      transition: { duration: 0.4 } 
    }).then(() => {
      setTimeout(() => {
        ticketControls.start({
          scale: 1,
          backgroundColor: "#FF6600", // Original brand-orange
          transition: { duration: 0.4 }
        });
      }, 1500);
    });
  };

  return (
    <div className="min-h-screen selection:bg-brand-orange selection:text-white bg-brand-light overflow-x-hidden text-brand-purple">
      
      {/* 1. HERO SECTION (Refined & Elegant) */}
      <header id="home" className="relative min-h-screen w-full flex items-center justify-center">
        {/* Background Video */}
        <div className="absolute inset-0 bg-brand-purple overflow-hidden pointer-events-none">
          <iframe
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[177.77vh] h-[100vh] min-w-[100vw] min-h-[56.25vw] md:w-[100vw] md:h-[56.25vw] md:min-h-[100vh] md:min-w-[177.77vh] object-cover opacity-75 max-w-none pointer-events-none"
            src="https://www.youtube.com/embed/fI4B7r6z1jA?autoplay=1&mute=1&loop=1&playlist=fI4B7r6z1jA&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1"
            title="Leapy ON Background Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          {/* Subtle Overlay */}
          <div className="absolute inset-0 z-[1] video-overlay-light" />
          {/* Bottom Fade Gradient */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-purple to-transparent z-10" />
        </div>

        {/* Blocks mouse events from reaching the YouTube iframe compositor layer */}
        <div className="absolute inset-0 z-[5]" />

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-5 md:px-6 h-full flex flex-col pt-8 md:pt-16 pb-20 text-white">
          <nav className="flex justify-between items-center mb-10 md:mb-32">
            <img 
              src="https://39765206.fs1.hubspotusercontent-na1.net/hubfs/39765206/Leapy_On_6%20(1).png" 
              alt="Leapy ON logo" 
              className="h-6 md:h-12 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.4em] text-white/60">
              <a href="#palestrantes" className="hover:text-brand-orange transition-colors">Palco</a>
              <a href="#agenda" className="hover:text-brand-orange transition-colors">Agenda</a>
              <a href="#sobre" className="hover:text-brand-orange transition-colors">Sobre</a>
              <a href="#parcerias" className="hover:text-brand-orange transition-colors">Parcerias</a>
              <a href="https://www.leapy.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">A Leapy</a>
              <a 
                href="#home" 
                onClick={handleTicketClick}
                className="hover:text-brand-orange transition-colors"
              >
                Ingressos
              </a>
            </div>
          </nav>

          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-20 items-start lg:items-center">
            {/* Left Side: Title & Description */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 xl:col-span-8"
            >
              <h1 className="text-[40px] md:text-[65px] lg:text-[75px] xl:text-[85px] mb-8 leading-tight font-black uppercase font-display tracking-tight">
                FORMAR O FUTURO É <br /><span className="text-brand-orange">TRABALHO DE AGORA</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed max-w-2xl text-shadow-premium">
                Leapy ON — sua conferência anual sobre jovens talentos. <br className="hidden md:block" />
                Um espaço de trocas, inspiração e conexões entre quem está na liderando programas de entrada.
              </p>
            </motion.div>

            {/* Right Side: Actions & Info Bar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 xl:col-span-4 flex flex-col gap-8 items-start w-full"
            >
              {/* Event Key Info Bar - Re-styled for Vertical Stack */}
              <div className="flex flex-col gap-6 bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-3xl w-full">
                <div className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-brand-orange flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,102,0,0.4)] transition-transform duration-300 group-hover:scale-110 shrink-0">
                    <Calendar size={24} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col">
                     <span className="text-brand-orange text-[10px] font-black tracking-[0.2em] uppercase mb-0.5">Quando</span>
                     <span className="text-xl md:text-2xl font-black tracking-tight uppercase font-display leading-none">
                       27 de Maio <span className="text-sm md:text-base opacity-70 ml-2 font-medium tracking-normal lowercase opacity-60">13h às 20h</span>
                     </span>
                  </div>
                </div>

                <div className="w-full h-px bg-white/10" />

                <div className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-brand-orange flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,102,0,0.4)] transition-transform duration-300 group-hover:scale-110 shrink-0">
                    <MapPin size={24} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col">
                     <span className="text-brand-orange text-[10px] font-black tracking-[0.2em] uppercase mb-0.5">Onde</span>
                     <span className="text-xl md:text-2xl font-black tracking-tight uppercase font-display leading-none">Learning Village SP</span>
                  </div>
                </div>
              </div>

              <ButtonCTA 
                animate={ticketControls} 
                className="px-10 py-5 text-base w-full md:w-auto shadow-2xl"
              >
                Garanta seu ingresso
              </ButtonCTA>
            </motion.div>
          </div>
        </div>
      </header>
 
      {/* 2. PALESTRANTES (Auto-scrolling Container) */}
      <section id="palestrantes" className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6 mb-16 text-center">
          <h2 className="text-brand-blue text-[10px] tracking-[0.4em] font-bold mb-4 uppercase">CURADORIA</h2>
          <h3 className="text-4xl md:text-6xl text-brand-purple font-black font-display uppercase tracking-tight">NOSSO PALCO</h3>
        </div>
        
        <div className="relative px-4 md:px-12">
          {/* Controls */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center text-brand-purple hover:bg-brand-orange hover:text-white transition-all active:scale-95"
            aria-label="Anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center text-brand-purple hover:bg-brand-orange hover:text-white transition-all active:scale-95"
            aria-label="Próximo"
          >
            <ChevronRight size={24} />
          </button>

          {/* Gradient Fades for depth */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Scrolling Container */}
          <div 
            id="speakers-container"
            ref={scrollerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-6 md:px-[10vw] pb-12 snap-x snap-mandatory"
            onMouseEnter={() => {
              (window as any).isScrollingPaused = true;
            }}
            onMouseLeave={() => {
              (window as any).isScrollingPaused = false;
            }}
            onTouchStart={() => {
              (window as any).isScrollingPaused = true;
            }}
            onTouchEnd={() => {
              // Wait a bit after touch ends before resuming auto-scroll
              setTimeout(() => {
                (window as any).isScrollingPaused = false;
              }, 4000);
            }}
          >
            {[...SPEAKERS, ...SPEAKERS, ...SPEAKERS].map((speaker, index) => (
              <div key={index} className="w-[300px] md:w-[380px] shrink-0 snap-center">
                <SpeakerCard speaker={speaker} index={index % SPEAKERS.length} />
              </div>
            ))}
          </div>
        </div>

        {/* CSS for auto-scroll logic (using a small script is more reliable for manual + auto mix) */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            const container = document.getElementById('speakers-container');
            if (!container) return;
            
            let scrollSpeed = 0.5;
            let lastTime = 0;
            
            function step(timestamp) {
              if (!window.isScrollingPaused && container) {
                container.scrollLeft += scrollSpeed;
                
                // Infinite loop logic
                if (container.scrollLeft >= (container.scrollWidth / 3) * 2) {
                  container.scrollLeft = container.scrollWidth / 3;
                }
              }
              requestAnimationFrame(step);
            }
            
            // Initial positioning
            setTimeout(() => {
              if (container) container.scrollLeft = container.scrollWidth / 3;
              requestAnimationFrame(step);
            }, 500);
          })();
        `}} />

      </section>

      {/* 3. ILLUSTRATION SECTION (Subtle Scale) */}
      <section className="bg-white pb-20 overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* The user-provided illustration */}
            <div className="flex justify-center -mb-16 md:-mb-32 lg:-mb-44 relative z-20">
              <img 
                src="/src/community.png" 
                alt="Comunidade Leapy ON" 
                className="w-full max-w-4xl h-auto drop-shadow-2xl"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            
            {/* Decorative background text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 whitespace-nowrap opacity-[0.02] select-none pointer-events-none">
              <span className="text-[200px] font-black uppercase font-display">LEAPY</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. PROGRAMAÇÃO (Modern & Sophisticated) */}
      <section id="agenda" className="section-spacing bg-brand-blue text-white rounded-t-[40px] md:rounded-t-[60px] -mt-12 relative z-10">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-white/40 text-[10px] tracking-[0.4em] font-bold mb-6 uppercase">AGENDA</h2>
              <h3 className="text-4xl md:text-7xl leading-tight font-black uppercase font-display tracking-tight text-white">O QUE <br />PREPARAMOS</h3>
            </div>
            <div className="text-brand-orange text-xs font-bold tracking-widest uppercase py-2.5 px-6 border border-brand-orange/30 rounded-full">
              SESSÃO 2026
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {AGENDA.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className={`group rounded-2xl transition-all duration-300 border ${
                  expandedAgenda === index 
                    ? 'bg-white text-brand-purple border-white shadow-xl' 
                    : 'bg-white/5 border-white/5 hover:border-white/20'
                }`}
                onClick={() => setExpandedAgenda(expandedAgenda === index ? null : index)}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6 p-6 md:p-8 cursor-pointer relative overflow-hidden">
                  {item.icon && (
                    <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none hidden md:block">
                      {item.icon === 'coffee' && <Coffee size={120} />}
                      {item.icon === 'snack' && <Cookie size={120} />}
                      {item.icon === 'cocktail' && <Martini size={120} />}
                    </div>
                  )}
                  <div className={`text-xl font-bold md:w-40 tracking-tight flex items-center gap-3 ${expandedAgenda === index ? 'text-brand-blue' : 'text-brand-orange'}`}>
                    {item.icon && (
                      <span className="md:hidden">
                        {item.icon === 'coffee' && <Coffee size={20} />}
                        {item.icon === 'snack' && <Cookie size={20} />}
                        {item.icon === 'cocktail' && <Martini size={20} />}
                      </span>
                    )}
                    {item.time}
                  </div>
                  <div className="flex-1 flex items-center gap-4">
                    <h4 className="text-lg md:text-xl font-bold leading-tight uppercase font-display tracking-tight flex items-center gap-3">
                      {item.title}
                      {item.icon && (
                        <span className="hidden md:inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-orange/10 text-brand-orange">
                          {item.icon === 'coffee' && <Coffee size={16} />}
                          {item.icon === 'snack' && <Cookie size={16} />}
                          {item.icon === 'cocktail' && <Martini size={16} />}
                        </span>
                      )}
                    </h4>
                    
                    <AnimatePresence>
                      {expandedAgenda === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: "auto", opacity: 0.7, marginTop: 20 }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          className="overflow-hidden text-base font-medium max-w-3xl whitespace-pre-line"
                        >
                          {item.details}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className={`w-10 h-10 shrink-0 flex items-center justify-center rounded-full transition-all duration-300 ${expandedAgenda === index ? 'bg-brand-orange text-white' : 'bg-white/5'}`}>
                    <ChevronDown size={20} className={`transition-transform duration-500 ${expandedAgenda === index ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SOBRE (Clean & Balanced) */}
      <section id="sobre" className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-brand-blue text-[10px] tracking-[0.4em] font-bold mb-6">SOBRE O LEAPY ON</h2>
            <h3 className="text-3xl md:text-5xl text-brand-purple leading-tight font-black uppercase font-display tracking-tight">ESPAÇO DE <span className="text-brand-blue">TROCAS</span> E INSPIRAÇÃO</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {/* Para quem é */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-[32px] border border-brand-light shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start text-left"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center text-brand-blue mb-6">
                <Users size={24} />
              </div>
              <h4 className="text-xl font-black uppercase font-display mb-4 text-brand-purple">Para quem é</h4>
              <p className="text-brand-purple/70 leading-relaxed text-sm mb-4">
                Para quem está na linha de frente do desenvolvimento de talentos — especialmente quem lidera RH e conduz programas de jovem aprendiz, estágio ou trainee.
              </p>
              <p className="text-brand-purple/80 leading-relaxed text-sm font-semibold italic">
                Um encontro pensado para quem não está só acompanhando as mudanças, mas precisa responder a elas na prática.
              </p>
            </motion.div>

            {/* O que você vai encontrar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-[32px] border border-brand-light shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start text-left"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center text-brand-blue mb-6">
                <Lightbulb size={24} />
              </div>
              <h4 className="text-xl font-black uppercase font-display mb-4 text-brand-purple">O que você vai encontrar</h4>
              <p className="text-brand-purple/70 leading-relaxed text-sm mb-4">
                Uma agenda focada nas transformações que já estão impactando os cargos de entrada: o que está mudando, o que já não funciona mais e quais caminhos já estão sendo testados por quem está na ponta.
              </p>
              <p className="text-brand-purple/80 leading-relaxed text-sm font-semibold italic">
                Conteúdos e trocas que geram repertório acionável — ideias que podem começar a ser colocadas em prática no dia seguinte.
              </p>
            </motion.div>

            {/* Como vai acontecer */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-[32px] border border-brand-light shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start text-left"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center text-brand-blue mb-6">
                <Activity size={24} />
              </div>
              <h4 className="text-xl font-black uppercase font-display mb-4 text-brand-purple">Como vai acontecer</h4>
              <p className="text-brand-purple/70 leading-relaxed text-sm mb-4">
                Mais do que um evento para assistir, o Leapy ON é um espaço para participar ativamente.
              </p>
              <p className="text-brand-purple/80 leading-relaxed text-sm font-semibold italic">
                A proposta é tirar a audiência da cadeira e colocar a pauta de jovens talentos em movimento — promovendo troca real entre quem enfrenta os mesmos desafios e entre quem já está construindo novos caminhos.
              </p>
            </motion.div>
          </div>

          {/* Integrated Testimonials - Bubbles Style */}
          <div className="mt-20">
            <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch max-w-5xl mx-auto">
              {/* Testimonial 1 - Yago Guimarães */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex-1 bg-brand-light p-8 rounded-[40px] border border-brand-purple/10 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="text-brand-blue mb-6">
                    <svg width="24" height="18" viewBox="0 0 24 18" fill="currentColor">
                      <path d="M0 18V9C0 4.02944 4.02944 0 9 0V4.5C6.51472 4.5 4.5 6.51472 4.5 9H9V18H0ZM13.5 18V9C13.5 4.02944 17.5294 0 22.5 0V4.5C20.0147 4.5 18 6.51472 18 9H22.5V18H13.5Z" />
                    </svg>
                  </div>
                  <p className="text-brand-purple font-bold italic text-lg leading-relaxed mb-8">
                    "Tira a gente de um lugar de pensar no jovem talento como a gente vem pensando há muito tempo e nos provoca a olhar para esta pauta de outra forma"
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-brand-purple/10 border-2 border-white shadow-sm">
                    <img 
                      src="https://39765206.fs1.hubspotusercontent-na1.net/hubfs/39765206/Yago.png" 
                      alt="Yago Guimarães" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-black uppercase text-[10px] tracking-widest text-brand-purple">Yago Guimarães</span>
                    <span className="text-[9px] text-brand-purple/50 font-bold uppercase tracking-[0.1em] mt-0.5">Global Learning Specialist - Nubank</span>
                  </div>
                </div>
              </motion.div>

              {/* Testimonial 2 - Gabriella Maffei */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex-1 bg-brand-light p-8 rounded-[40px] border border-brand-purple/10 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="text-brand-orange mb-6">
                    <svg width="24" height="18" viewBox="0 0 24 18" fill="currentColor">
                      <path d="M0 18V9C0 4.02944 4.02944 0 9 0V4.5C6.51472 4.5 4.5 6.51472 4.5 9H9V18H0ZM13.5 18V9C13.5 4.02944 17.5294 0 22.5 0V4.5C20.0147 4.5 18 6.51472 18 9H22.5V18H13.5Z" />
                    </svg>
                  </div>
                  <p className="text-brand-purple font-bold italic text-lg leading-relaxed mb-8">
                    "O Leapy ON significa a concretização de uma comunidade que tem um propósito em comum"
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-brand-purple/10 border-2 border-white shadow-sm">
                    <img 
                      src="https://39765206.fs1.hubspotusercontent-na1.net/hubfs/39765206/gabriela.png" 
                      alt="Gabriella Maffei" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-black uppercase text-[10px] tracking-widest text-brand-purple">Gabriella Maffei</span>
                    <span className="text-[9px] text-brand-purple/50 font-bold uppercase tracking-[0.1em] mt-0.5">Gerente de Tech Learning - Serasa</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SPONSORS (Compact Version) */}
      <section id="parcerias" className="section-spacing bg-white border-t border-black/5">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-brand-blue text-[10px] tracking-[0.4em] font-bold mb-4 uppercase">PARCERIAS</h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl text-brand-purple font-black font-display leading-[0.9] uppercase tracking-tighter">
              QUEM FAZ <span className="text-brand-orange">ACONTECER</span>
            </h3>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Main Partners (Realização & Master) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="flex flex-col items-center">
                <span className="text-[11px] uppercase tracking-[0.3em] font-black text-brand-purple/40 mb-6 border-b border-brand-purple/10 pb-1">Realização</span>
                <a 
                  href="https://www.leapy.com.br" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center transition-all duration-300 group cursor-pointer"
                >
                  <img 
                    src="https://39765206.fs1.hubspotusercontent-na1.net/hubfs/39765206/Logotipo_3.png" 
                    alt="Leapy Realização" 
                    className="max-h-24 w-auto transition-all duration-500 group-hover:grayscale group-hover:opacity-60" 
                  />
                </a>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[11px] uppercase tracking-[0.3em] font-black text-brand-purple/40 mb-6 border-b border-brand-purple/10 pb-1">Patrocinador Master</span>
                <a 
                  href="https://www.blumitalents.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center transition-all duration-300 group cursor-pointer"
                >
                  <img 
                    src="https://39765206.fs1.hubspotusercontent-na1.net/hubfs/39765206/C%C3%B3pia%20de%20Logotipo%20Blumi%20com%20descritivo%20-%20verde.png" 
                    alt="Blumi Patrocinador Master" 
                    className="max-h-[61px] w-auto transition-all duration-500 group-hover:grayscale group-hover:opacity-60" 
                  />
                </a>
              </div>
            </div>

            {/* Ouro Tier (Full Width Row) */}
            <div className="flex flex-col items-center mb-16 pb-8 border-b border-brand-purple/5">
              <span className="text-[10px] uppercase tracking-[0.25em] font-black text-brand-purple/30 mb-6 block">Ouro</span>
              <div className="flex flex-row gap-12 md:gap-20 items-center justify-center">
                <a
                  href="https://www.learntofly.com.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center transition-all duration-300 group cursor-pointer"
                >
                  <img
                    src="https://39765206.fs1.hubspotusercontent-na1.net/hubfs/39765206/ltf-logo-color%20(2).png"
                    alt="Learn to fly"
                    className="max-h-[77px] w-auto transition-all duration-500 group-hover:grayscale group-hover:opacity-60"
                  />
                </a>
                <a
                  href="https://www.deulyga.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center transition-all duration-300 group cursor-pointer"
                >
                  <img
                    src="https://39765206.fs1.hubspotusercontent-na1.net/hubfs/39765206/Benchmark%20-%20Programa%20de%20Jovens%20Talentos%20(1200%20x%20800%20px).png"
                    alt="Lyga"
                    className="max-h-[67px] w-auto transition-all duration-500 group-hover:grayscale group-hover:opacity-60"
                  />
                </a>
              </div>
            </div>

            {/* Other Tiers (Horizontal Row) */}
            <div className="grid grid-cols-2 gap-8 items-start max-w-2xl mx-auto">
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-[0.25em] font-black text-brand-purple/30 mb-4 block">Prata</span>
                <div className="w-full min-h-[60px] flex items-center justify-center transition-all duration-300 group">
                  {/* Espaço para logo Prata */}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-[0.25em] font-black text-brand-purple/30 mb-4 block">Bronze</span>
                <a
                  href="https://www.proa.org.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center transition-all duration-300 group cursor-pointer"
                >
                  <img
                    src="https://39765206.fs1.hubspotusercontent-na1.net/hubfs/39765206/Logo%20PROA%20azul.png"
                    alt="PROA"
                    className="max-h-[45px] w-auto transition-all duration-500 group-hover:grayscale group-hover:opacity-60"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-24 bg-brand-purple text-white rounded-t-[40px] md:rounded-t-[60px] relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
            {/* Brand & Description */}
            <div className="lg:col-span-8 flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              <img 
                src="https://39765206.fs1.hubspotusercontent-na1.net/hubfs/39765206/Logotipo_3.png" 
                alt="Leapy" 
                className="h-16 md:h-18 w-auto object-contain brightness-0 invert flex-shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-6">
                <p className="text-white/70 text-sm leading-relaxed max-w-2xl">
                  Contrate, desenvolva e faça a gestão de Jovens Aprendizes com menos esforço e mais resultado. As empresas mais inovadoras do país já contam com a Leapy para transformar essa obrigação legal em uma oportunidade estratégica.
                </p>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-start pt-4">
              <nav className="flex flex-wrap justify-center lg:justify-end gap-x-8 gap-y-4 text-[10px] uppercase tracking-[0.3em] font-bold">
                <a href="https://www.leapy.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">A Leapy</a>
                <a href="https://www.linkedin.com/school/leapywithus/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">LinkedIn</a>
              </nav>
            </div>
          </div>
          
          <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[9px] uppercase tracking-widest font-bold opacity-40">
              © 2026 LEAPY ON | CONFERÊNCIA ANUAL DE TALENTOS
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
