/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'motion/react';
import {
  X,
  ArrowRight,
  Users,
  Lightbulb,
  Linkedin,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX
} from 'lucide-react';

// --- CONFIGURABLE CONSTANTS ---
const PURCHASE_TICKET_URL = "https://www.sympla.com.br/evento/leapy-on-2026-conferencia-anual-de-jovens-talentos/3397818";

// --- DATA STRUCTURES ---

const SPEAKERS = [
  {
    name: "Alexandre Araujo",
    title: "Nubank",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQGOCKFdm-JHew/profile-displayphoto-scale_200_200/B4DZeoke6.HkAg-/0/1750879826316?e=1780531200&v=beta&t=pTEDu7BAS6DkEL0b_qyx_M1dIMVBh8zkmuZgS_OfPRE",
    linkedin: "https://www.linkedin.com/in/alexandreearaujo/?skipRedirect=true"
  },
  {
    name: "Bianca Tufolo",
    title: "Disney",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQHmwNfVsHuN_A/profile-displayphoto-shrink_200_200/B4DZOSu2FiHcAY-/0/1733333574382?e=1780531200&v=beta&t=fFwP4Zz5zStLoMkw6JnorH93uRrO_GrWam5k5TcQEaY",
    linkedin: "https://www.linkedin.com/in/biancatufolo/?locale=pt"
  },
  {
    name: "Bruna Seibert",
    title: "Google",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQEslFpE8mBfgQ/profile-displayphoto-scale_200_200/B4DZwj6.12I8AY-/0/1770129191801?e=1780531200&v=beta&t=wCM8-F0x44DDAaUNUjuyjZFLeydEb447IQE2Imy2lb4",
    linkedin: "https://www.linkedin.com/in/bruna-seibert/"
  },
  {
    name: "Carol Rodrigues",
    title: "Bain",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQEzDgXdkiOt1A/profile-displayphoto-scale_200_200/B4DZuzaBeEJgAY-/0/1768241503416?e=1780531200&v=beta&t=aNqY_SsFkuWiNeLjiF0jICFvQY_gM0vfNaAeiUGO5OU",
    linkedin: "https://www.linkedin.com/in/soucarolinarodrigues/"
  },
  {
    name: "Carolina Abrusio",
    title: "Stone",
    image: "https://media.licdn.com/dms/image/v2/D4E03AQEZ-_ENrurJmw/profile-displayphoto-scale_200_200/B4EZsnhZ5XKkAY-/0/1765894631658?e=1780531200&v=beta&t=6e51Ou-hZUc2TLTQ7Pcmlq76H70mTunXrg-Ws2LvX5s",
    linkedin: "https://www.linkedin.com/in/carolabrusio/?skipRedirect=true"
  },
  {
    name: "Clara Fernandes",
    title: "Sodexo",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQFGBKU_oyoSkQ/profile-displayphoto-scale_200_200/B4DZ0szQo2IoAY-/0/1774573133613?e=1780531200&v=beta&t=hlGXNG0Reb1IpZmFdO-5zLAZ3sXK4usRQTVzP2tC-zI",
    linkedin: "https://www.linkedin.com/in/clara-helena-de-paula-fernandes/"
  },
  {
    name: "Deborah Rochar",
    title: "Einstein",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQFZLNOTnXLFUQ/profile-displayphoto-scale_200_200/B4DZ0_giJYIoAc-/0/1774886988148?e=1780531200&v=beta&t=l0nPA1GkuCiXvbet_39kAATfzJ0xPLRd4O6x7gQAVjU",
    linkedin: "https://www.linkedin.com/in/deborah-rocha-7b903672/"
  },
  {
    name: "Emmely Marques",
    title: "Nestlé",
    image: "https://media.licdn.com/dms/image/v2/D4E03AQGt0NGIOmXCGw/profile-displayphoto-scale_200_200/B4EZvnIXoNG4AY-/0/1769109290567?e=1780531200&v=beta&t=O5MjuzueOaeFCFS6rbxQZi3QXcUgv6ZJ_r4tscCMQbs",
    linkedin: "https://www.linkedin.com/in/emmelymarques/?locale=pt"
  },
  {
    name: "Fabiana Paravatti",
    title: "Mondelez",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQGibikrCD9EzQ/profile-displayphoto-scale_200_200/B4DZq3VmspKQAY-/0/1764012490475?e=1780531200&v=beta&t=-yVmOT5llcuQ3OT3JxIkmXRj54YifCRpgSK93hECWIQ",
    linkedin: "https://www.linkedin.com/in/fabiana-paravatti-622719168/"
  },
  {
    name: "Fernando Costa",
    title: "Vale",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQGNNsVoU7iDCw/profile-displayphoto-scale_200_200/B4DZ2rv3V7I4AY-/0/1776702947131?e=1780531200&v=beta&t=81hNfm94hDxKTVSMSfx3Jj94QWn0M7-A2FMLIPf3VWo",
    linkedin: "https://www.linkedin.com/in/fernandocosta/"
  },
  {
    name: "Jaque Barros",
    title: "Vivo",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQEfNGDFpeF66Q/profile-displayphoto-scale_200_200/B4DZnHANEwJMAc-/0/1759980344795?e=1780531200&v=beta&t=31Qcvvl2X5YR391H6mOwKDg-eDEo_BUC1hRDD2udhZw",
    linkedin: "https://www.linkedin.com/in/jaqueline-barros-b1358826/"
  },
  {
    name: "Jaqueline Garrido",
    title: "Unilever",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQExEvAL8ClxEA/profile-displayphoto-shrink_200_200/B4DZXzFBXAHwAY-/0/1743539936472?e=1780531200&v=beta&t=dGgzDHRpxqE66I9Kd4z1c0GGGsoZOemvJkb5mQwAGII",
    linkedin: "https://www.linkedin.com/in/jaqueline-garrido-120bb6119/"
  },
  {
    name: "João Marcos",
    title: "Azul",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQEtOCbSdAL-7Q/profile-displayphoto-scale_200_200/B4DZ1lGhx7JQAY-/0/1775517704073?e=1780531200&v=beta&t=LqxIfx9KTU2dYn_U3v5kp_ibbHWfhsSCHKaQhpdy4zU",
    linkedin: "https://www.linkedin.com/in/joaomarcosteixeira/"
  },
  {
    name: "Jonathan Sinesio",
    title: "SABESP",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQG0uRZJnP-ECg/profile-displayphoto-scale_200_200/B4DZrP3fsmKIAY-/0/1764424024092?e=1780531200&v=beta&t=l7fpvcGrA032bU2pSaKEPWJVxW_sNbpQ6OWh2Bl1vIQ",
    linkedin: "https://www.linkedin.com/in/jonathan-sinesio-068b35bb/"
  },
  {
    name: "Kaiene Gomes",
    title: "Cielo",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQGMz4i5W-A1tg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1728570486634?e=1780531200&v=beta&t=Dl_PQwNkcun5Is1kmSF7cTctOWAAGKMnts6PDb7-MzY",
    linkedin: "https://www.linkedin.com/in/kaiene-silva/"
  },
  {
    name: "Livia Adorno",
    title: "Pepsico",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQH7VMwwu1cgMQ/profile-displayphoto-scale_200_200/B4DZoq4Zl7KIAY-/0/1761656020744?e=1780531200&v=beta&t=_CEx7Is2rgoegVFM7DScASiK5uA-cAIy12XRsGsAGJI",
    linkedin: "https://www.linkedin.com/in/liviaadorno/"
  },
  {
    name: "Luana Daud",
    title: "iFood",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQHILY5HPBUFEA/profile-displayphoto-scale_200_200/B4DZyZ95tbJAAY-/0/1772109668215?e=1780531200&v=beta&t=jc35I5AYnSeP0QAMIf3y9_ZC6JYxOj2IhoMt2EE5nN0",
    linkedin: "https://www.linkedin.com/in/luana-daud-ba9288110/"
  },
  {
    name: "Mônica Reis",
    title: "Leroy Merlin",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQEQfbws0ymRiA/profile-displayphoto-scale_200_200/B4DZ23AalKJsAc-/0/1776891838271?e=1780531200&v=beta&t=Qh1VWGSdOjbTv12xNTGp8RkhTZnMhYZ3eYIJBHYOtW4",
    linkedin: "https://www.linkedin.com/in/m%C3%B4nica-reis-49508362/?skipRedirect=true"
  },
  {
    name: "Olivia Ferreira",
    title: "L'Oréal",
    image: "https://media.licdn.com/dms/image/v2/C5603AQHmv8sapo4ffw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1655825708940?e=1780531200&v=beta&t=feVc9sF2CuGQnTjQRqPAaaOzkztAvl0CvH7eBK7FV1s",
    linkedin: "https://www.linkedin.com/in/ferreiraolivia/"
  },
  {
    name: "Roberta Leandro",
    title: "Alpargatas",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQHHpjnBBmL5iQ/profile-displayphoto-shrink_200_200/B4DZrR4UpIG8AY-/0/1764457794714?e=1780531200&v=beta&t=DtcCJQiujQxJpBOGis_0NbiCePtyykJOzKTlhWrwWYU",
    linkedin: "https://www.linkedin.com/in/robertaleandro27/"
  }
];

// --- COMPONENTS ---

const SpeakerCard = ({ speaker, index }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="flex flex-col items-center group"
    >
      {/* CIRCULAR WINDOW */}
      <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-brand-purple/5 shadow-2xl group-hover:border-brand-orange/40 transition-all duration-500 mb-6">
        {speaker.isPlaceholder ? (
          <div className="w-full h-full bg-brand-purple/10 flex items-center justify-center grayscale brightness-[0.2] contrast-[1.5]">
             <img
               src={speaker.image}
               alt={speaker.name}
               referrerPolicy="no-referrer"
               className="w-full h-full object-cover opacity-60"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-brand-purple/80 to-transparent" />
          </div>
        ) : (
          <img
            src={speaker.image}
            alt={speaker.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-all duration-700 group-hover:grayscale group-hover:scale-110"
          />
        )}

        {/* Hover LinkedIn Overlay */}
        {speaker.linkedin && !speaker.isPlaceholder && (
          <a
            href={speaker.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center bg-brand-purple/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]"
          >
            <div className="w-12 h-12 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-300">
              <Linkedin size={24} />
            </div>
          </a>
        )}
      </div>

      {/* NAME & TITLE OUTSIDE */}
      <div className="text-center px-4">
        <h4 className="text-lg md:text-xl font-black text-brand-purple leading-tight font-display tracking-tight uppercase group-hover:text-brand-orange transition-colors">
          {speaker.name}
        </h4>
        {speaker.title && !speaker.isPlaceholder && (
          <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-brand-purple/50 mt-2 max-w-[200px] mx-auto overflow-hidden text-ellipsis line-clamp-2">
            {speaker.title}
          </p>
        )}
        {speaker.isPlaceholder && (
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand-orange mt-2">
            Em breve
          </p>
        )}
      </div>
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
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ticketControls = useAnimation();
  const scrollerRef = React.useRef<HTMLDivElement>(null);

  const MOSAIC_SPEAKERS = SPEAKERS.map((s, i) => ({ ...s, id: i }));

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
      <header id="home" className="relative min-h-screen w-full flex items-center justify-center bg-[#160120]">
        {/* Background Image - Desktop Only */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          <img
            src="https://39765206.fs1.hubspotusercontent-na1.net/hubfs/39765206/Fundo%20talent%20voices.png?v=20260515"
            alt="Talent Voices Background"
            className="w-full h-full object-contain"
          />
        </div>

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
              <a href="#home" className="hover:text-brand-orange transition-colors">Talent voices</a>
              <a href="#palestrantes" className="hover:text-brand-orange transition-colors">Curadoria</a>
              <a href="#sobre" className="hover:text-brand-orange transition-colors">O congresso</a>
              <a href="https://www.leapy.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors text-white/80">A Leapy</a>
            </div>
          </nav>

          <div className="flex flex-col gap-12 items-center md:items-start text-center md:text-left">
            {/* Title & Description */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto md:mx-0"
            >
              <h1 className="text-[40px] md:text-[65px] lg:text-[75px] xl:text-[85px] mb-8 leading-tight font-black uppercase font-display tracking-tight">
                Talent <br /><span className="text-brand-orange">Voices</span>
              </h1>

              <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed max-w-2xl text-shadow-premium mx-auto md:mx-0">
                Uma seleção de 20 nomes que amplificam a conversa sobre o futuro dos programas de talentos no Brasil
              </p>

              {/* Mobile Only Image */}
              <div className="mt-12 md:hidden">
                <img
                  src="https://39765206.fs1.hubspotusercontent-na1.net/hubfs/39765206/Template%20Speakers%20Leapy%20ON%20(2).png"
                  alt="Talent Voices Mobile Illustration"
                  className="w-full h-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* 2. PALESTRANTES (Mosaic Grid) */}
      <section id="palestrantes" className="py-24 bg-white">
        <div className="container mx-auto px-6 mb-16 text-center">
          <h2 className="text-brand-blue text-[10px] tracking-[0.4em] font-bold mb-4 uppercase">CURADORIA</h2>
          <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-brand-purple font-black font-display uppercase tracking-tight max-w-4xl mx-auto">AS VOZES RECONHECIDAS</h3>
        </div>

        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {MOSAIC_SPEAKERS.map((speaker, index) => (
              <div key={index} className="w-full">
                <SpeakerCard speaker={speaker} index={index} />
              </div>
            ))}
          </div>
        </div>
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

      {/* 4. DYNAMIC TRANSITION BRIDGE: Double Slanted Marquee */}
      <div className="relative z-20 -mt-20 md:-mt-32 pointer-events-none pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-purple to-transparent opacity-20 blur-3xl" />

        <div className="relative -rotate-1 md:-rotate-2 scale-105">
          {/* Row 1: Left to Right */}
          <div className="bg-brand-purple py-4 md:py-6 shadow-2xl relative overflow-hidden">
            <motion.div
              animate={{ x: [-1000, 0] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="flex whitespace-nowrap gap-12 text-[9px] md:text-[11px] font-black uppercase tracking-[0.5em] text-white"
            >
              {Array(10).fill(null).map((_, i) => (
                <div key={i} className="flex items-center gap-12">
                  <span className="opacity-40">MAIO 2026</span>
                  <span className="text-brand-orange">CONEXÃO</span>
                  <span className="opacity-40">LEARNING VILLAGE</span>
                  <span className="text-brand-orange">//</span>
                  <span className="opacity-40">SÃO PAULO</span>
                  <span className="text-brand-orange">FUTURE TALENT</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Row 2: Right to Left */}
          <div className="bg-brand-orange py-2 md:py-3 shadow-xl relative overflow-hidden -mt-1 scale-105">
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex whitespace-nowrap gap-10 text-[8px] font-black uppercase tracking-[0.4em] text-brand-purple"
            >
              {Array(15).fill(null).map((_, i) => (
                <div key={i} className="flex items-center gap-10">
                  <span>LEAPY ON</span>
                  <span>-</span>
                  <span>O CONGRESSO</span>
                  <span>-</span>
                  <span>TALENT VOICES</span>
                  <span className="opacity-30">★</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>

      {/* 5. LEAPY ON INITIATIVE SECTION (Modern & Refined) */}
      <section id="sobre" className="py-24 md:py-32 bg-white text-brand-purple relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_1px_1px,#160120_1px,transparent_0)] [background-size:32px_32px]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Video Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative group lg:pr-8"
            >
              {/* Outer Glow Effect - Refined for light bg */}
              <div className="absolute -inset-4 bg-brand-orange/10 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Main Container with "Frame" feel */}
              <div className="relative aspect-video rounded-[32px] p-1.5 bg-white shadow-2xl overflow-hidden border border-brand-purple/5">
                <div className="absolute inset-0 bg-brand-purple rounded-[28px]" />

                {/* Inner Video with sophisticated mask/rounded corners */}
                <div className="relative h-full w-full rounded-[26px] overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted={isMuted}
                    loop
                    playsInline
                    className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s] ease-out"
                    src="https://39765206.fs1.hubspotusercontent-na1.net/hubfs/39765206/V6%20(2)%20Leapy%20ON%20(2).mp4"
                  />

                  {/* Volume Control Button */}
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="absolute top-4 right-4 z-30 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-all backdrop-blur-sm group/audio"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? (
                      <div className="flex items-center gap-2 px-1">
                        <VolumeX size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-widest overflow-hidden w-0 group-hover/audio:w-auto transition-all">Ativar Som</span>
                      </div>
                    ) : (
                      <Volume2 size={16} className="text-brand-orange" />
                    )}
                  </button>

                  {/* Detail overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Decorative Scanlines or Overlay Grid */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

                  {/* Corner Accents (Bottom Right) */}
                  <div className="absolute bottom-6 right-6 opacity-40">
                    <div className="w-12 h-1 bg-white/20 mb-1" />
                    <div className="w-8 h-1 bg-white/20" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content Column */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col items-start text-left"
            >
              <h2 className="text-brand-blue text-[10px] tracking-[0.4em] font-bold mb-6 uppercase">O CONGRESSO</h2>
              <h3 className="text-3xl md:text-5xl font-black font-display uppercase tracking-tight mb-8 leading-tight text-brand-purple">
                TALENT VOICES <br /> É UMA INICIATIVA <span className="text-brand-orange">LEAPY ON</span>
              </h3>

              <div className="space-y-6 text-lg md:text-xl text-brand-purple/70 font-medium leading-relaxed max-w-xl">
                <p>
                  Talent Voices é uma iniciativa do Leapy ON, o congresso anual sobre jovens talentos. Em 2026, o encontro acontece no dia 26 de maio, no Learning Village, em São Paulo.
                </p>
                <p>
                  Garanta sua inscrição e faça parte do principal encontro de uma comunidade que impulsiona novas conversas e ajuda a redesenhar o futuro dos programas de talentos no Brasil.
                </p>
              </div>

              <div className="mt-12">
                <motion.a
                  href="https://www.on.leapy.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-3 px-8 md:px-10 py-5 rounded-full bg-brand-orange text-white font-display text-[11px] md:text-sm uppercase tracking-widest transition-all shadow-xl shadow-brand-orange/40"
                >
                  Conheça o Leapy ON
                  <ArrowRight size={20} />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative background element - Adjusted for light bg */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-vibrant/5 rounded-full blur-[120px] pointer-events-none" />
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
                <a href="https://www.leapy.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">Leapy</a>
                <a href="https://on.leapy.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">Leapy ON</a>
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
