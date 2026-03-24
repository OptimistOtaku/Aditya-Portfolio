'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './page.module.css';
import { FiGithub, FiMail, FiLinkedin, FiTerminal, FiCpu, FiDatabase, FiGlobe, FiCode, FiHexagon, FiBox, FiLayers } from 'react-icons/fi';
import MagneticWrapper from '@/components/MagneticWrapper';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 300]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const projectsY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Spice dust particles generation
  const [particles, setParticles] = useState<Array<{id: number, left: string, bottom: string, delay: string, size: string}>>([]);
  
  useEffect(() => {
    const newParticles = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      bottom: `${Math.random() * 100}%`,
      delay: `${Math.random() * 30}s`,
      size: `${Math.max(1, Math.random() * 3)}px`
    }));
    setParticles(newParticles);
  }, []);

  const systems = [
    { name: 'TYPESCRIPT', icon: <FiTerminal /> },
    { name: 'PYTHON', icon: <FiCode /> },
    { name: 'REACT / NEXT.JS', icon: <FiGlobe /> },
    { name: 'NODE.JS / EXPRESS', icon: <FiBox /> },
    { name: 'FASTAPI', icon: <FiDatabase /> },
    { name: 'MACHINE LEARNING', icon: <FiCpu /> },
    { name: 'DEEP LEARNING / CNNs', icon: <FiLayers /> },
    { name: 'DIFFUSION MODELS', icon: <FiHexagon /> },
    { name: 'LLM INTEGRATION', icon: <FiCpu /> },
    { name: 'AI AGENTS', icon: <FiTerminal /> },
    { name: 'SYSTEM DESIGN', icon: <FiBox /> },
    { name: 'POSTGRESQL / MONGODB', icon: <FiDatabase /> },
    { name: 'BLOCKCHAIN / WEB3', icon: <FiHexagon /> },
    { name: 'DOCKER', icon: <FiBox /> }
  ];

  return (
    <main className={styles.main} ref={containerRef}>
      
      {/* Particles (Global) */}
      {particles.map((p) => (
        <div 
          key={p.id}
          style={{
            position: 'fixed',
            left: p.left,
            bottom: p.bottom,
            width: p.size,
            height: p.size,
            backgroundColor: 'rgba(200,134,10,0.6)',
            borderRadius: '0',
            animation: `floatUp 25s linear ${p.delay} infinite`,
            zIndex: 3,
            pointerEvents: 'none'
          }}
        />
      ))}

      {/* NAVIGATION */}
      <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
        <div className={styles.navBrand}>
          <span className={styles.navBrandSymbol}>◈</span>
          <span className={styles.navBrandText}>ADITYA SINGH</span>
        </div>
        <div className={styles.navLinks}>
          <a href="#about" className={styles.navLink}>I. THE OPERATIVE</a>
          <a href="#projects" className={styles.navLink}>II. THE MISSIONS</a>
          <a href="#contact" className={styles.navLink}>III. TRANSMIT</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className={styles.heroSection} id="home">
        <div className={styles.heroBackground} />
        <div className={styles.heroSpiceBloom} />
        <div className={styles.heroSuns} />
        <div className={styles.heroRipples} />

        <motion.div className={styles.heroContent} style={{ y: heroY, opacity: heroOpacity }}>
          <div className={`${styles.heroEyebrow} font-share-tech`}>
            ◈ HOUSE OPERATIVE // ARRAKIS SECTOR // YEAR 10191
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03, y: -5, color: "var(--spice-pale)", textShadow: "0px 15px 30px rgba(200, 134, 10, 0.5)" }}
            transition={{ type: "spring", stiffness: 120, damping: 12, mass: 0.8 }}
            className={`${styles.heroName} font-cinzel cursor-default`}
          >
            ADITYA{'\n'}SINGH
          </motion.h1>
          <div className={styles.heroDivider} />
          <div className={`${styles.heroClass} font-share-tech`}>
            AI ENGINEER  ·  FULL-STACK  ·  ML SYSTEMS
          </div>
          <p className={`${styles.heroBody} font-cormorant`}>
            I build AI-powered products that innovate.
            Driven by love of the game — I work with precision,
            adapt relentlessly, and don't stop until the vision
            is exactly what it needs to be.
          </p>
          <div className={styles.heroActions}>
            <MagneticWrapper>
              <a href="#projects" className={styles.btnPrimary}>
                [ VIEW THE MISSIONS ]
              </a>
            </MagneticWrapper>
            <MagneticWrapper>
              <a href="https://github.com/OptimistOtaku" target="_blank" rel="noopener noreferrer" className={styles.btnSecondary}>
                <FiGithub className="inline mr-2"/> [ GITHUB ARCHIVE ↗ ]
              </a>
            </MagneticWrapper>
          </div>
        </motion.div>

        <div className={styles.heroStatus}>
          <div className="flex items-center gap-2 text-[var(--spice)]"><FiTerminal /> SYS.BOOT SEQ</div>
          LAT: 28.4°N  ·  LONG: 14.7°E  ·  SPICE LEVEL: CRITICAL<br/>
          STATUS: AVAILABLE FOR MISSIONS<span className="animate-blink">_</span>
        </div>
        
      </section>

      {/* MARQUEE SEPARATOR */}
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeTrack}>
          {/* Double loop for seamless effect */}
          {[...systems, ...systems].map((sys, idx) => (
            <div key={idx} className={styles.marqueeItem}>
              <span className={styles.marqueeIcon}>{sys.icon}</span>
              {sys.name}
              <span className="text-[var(--fremen)] mx-4">◈</span>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT SECTION */}
      <section className={`${styles.sectionWrapper} ${styles.aboutSection} vignette-bg`} id="about">
        <div className={styles.sectionInner}>
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`${styles.sectionLabel} ${styles.sectionLabelFremen} font-share-tech flex items-center gap-2`}
          >
            <FiDatabase /> ◈ SIETCH RECORD // MODULE: OPERATIVE_PROFILE
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`${styles.sectionHeading} font-cinzel`}
          >
            I Work Until<br/>The Vision Is Real.
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={styles.quoteWrapper}
          >
             <p className={`${styles.quoteText} font-cormorant`}>
               "The mystery of life isn't a problem to solve,{"\n"}
               but a reality to experience."
             </p>
             <div className={`${styles.quoteAuthor} font-share-tech`}>
               — DUNE · FRANK HERBERT
             </div>
          </motion.div>

          <div className={styles.aboutColumns}>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`${styles.aboutBody} font-cormorant`}
            >
              <p>
                I'm a full-stack engineer and AI builder — focused on systems
                that actually matter. Not demos. Not experiments. Products with
                real architecture and real stakes behind them.
              </p>
              <p>
                What drives me is love of the game. I work with precision,
                I adapt fast, and I don't ship until I've overpowered the problem.
                Every project is a chance to mold a vision exactly in my image.
              </p>
              <p>
                I'm targeting the kind of work that pushes limits — AI integrations,
                ML systems, full-stack platforms. If the problem is hard
                and the stakes are real, I'm interested.
              </p>
              <div className={`${styles.freelanceLine} font-share-tech`}>
                <FiTerminal className="inline mr-2 text-[var(--fremen)]"/>
                OPEN FOR: AI INTEGRATIONS · FULL-STACK · API DEV · ML ENGINEERING
              </div>
            </motion.div>

            {/* TELEMETRY READOUT (Replaces static list) */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={styles.systemsManifest}
            >
              <div className={`${styles.systemsHeader} font-share-tech`}>
                // CORE READOUT — 4 VITAL METRICS
              </div>
              <div className={styles.systemsList}>
                <div className={styles.systemRow}>
                  <span><FiTerminal className="mr-2 text-[var(--fremen)]"/> PRIMARY</span>
                  <div className={styles.systemDots} />
                  <span className={styles.systemActive}>AI SYSTEMS</span>
                </div>
                <div className={styles.systemRow}>
                  <span><FiGlobe className="mr-2 text-[var(--fremen)]"/> TERTIARY</span>
                  <div className={styles.systemDots} />
                  <span className={styles.systemActive}>FULL-STACK WEB</span>
                </div>
                <div className={styles.systemRow}>
                  <span><FiCpu className="mr-2 text-[var(--fremen)]"/> COMPUTE STRATEGY</span>
                  <div className={styles.systemDots} />
                  <span className={styles.systemActive}>EDGE & CLOUD</span>
                </div>
                <div className={styles.systemRow}>
                  <span><FiDatabase className="mr-2 text-[var(--fremen)]"/> DATA ARCH</span>
                  <div className={styles.systemDots} />
                  <span className={styles.systemActive}>RELATIONAL & VECTOR</span>
                </div>
              </div>
              
              <div className="mt-8 font-share-tech text-[0.65rem] text-[var(--text-muted)] leading-relaxed">
                <FiHexagon className="text-[var(--spice)] mb-2" />
                SYSTEM LOG: The architecture prioritises resilience. 
                Heavy adoption of serverless combined with custom inference 
                instances. Model fine-tuning is conducted via low-rank adaptation 
                on constrained hardware to guarantee deployment efficiency.
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section className={`${styles.sectionWrapper} ${styles.projectsSection} vignette-bg`} id="projects">
        <motion.div className={styles.sectionInner} style={{ y: projectsY }}>
          <div className={`${styles.sectionLabel} ${styles.sectionLabelGuild} font-share-tech flex items-center gap-2`}>
            <FiLayers /> ◈ CHOAM REGISTRY // MODULE: MISSION_LOG
          </div>
          <h2 className={`${styles.sectionHeading} font-cinzel`}>
            SELECTED OPERATIONS.
          </h2>

          <div className={styles.bentoGrid}>

            {/* RETINAI */}
            <MagneticWrapper className={`${styles.span2v} ${styles.span2h}`} style={{ display: 'block', height: '100%' }}>
              <motion.a 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                href="https://github.com/OptimistOtaku/RetinAI" target="_blank" rel="noopener noreferrer" className={`${styles.projectCard} ${styles.bgRetinai} h-full`}>
                 <div className={styles.projectMesa}>
                   <span className={styles.missionCode}><FiTerminal className="inline mr-1"/> OP-01 // CLASSIFIED</span>
                   <span className={`${styles.categoryBadge} font-share-tech`}>[ AI · ML ]</span>
                 </div>
                 <h3 className={styles.projectName}>RETINAI</h3>
                 <div className={`${styles.projectOneLiner} font-cormorant`}>
                   Multi-disease retinal classification using diffusion model-based anomaly maps.
                 </div>
                 <div className={`${styles.projectDescription} font-cormorant`}>
                   A medical AI system that detects multiple retinal diseases from fundus images.
                   Built on a diffusion model pipeline for anomaly map generation, paired with
                   specialised CNNs per disease class and a meta-classifier that aggregates
                   outputs for final prediction. Designed for real diagnostic utility — not a toy model.
                 </div>
                 <div className={styles.projectTags}>
                   <span>PYTHON</span><span>·</span>
                   <span>PYTORCH</span><span>·</span>
                   <span>DIFFUSION MODELS</span><span>·</span>
                   <span>CNN</span><span>·</span>
                   <span>META-CLASSIFIER</span>
                 </div>
                 <div className={styles.archiveLink}>
                   &gt;&gt; ACCESS ARCHIVE <span className={styles.archiveLinkArrow}>↗</span>
                 </div>
              </motion.a>
            </MagneticWrapper>

            {/* BUDAI */}
            <MagneticWrapper className={styles.span1} style={{ display: 'block', height: '100%' }}>
              <motion.a 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                href="https://github.com/OptimistOtaku/BudAi" target="_blank" rel="noopener noreferrer" className={`${styles.projectCard} ${styles.bgBudai} h-full`}>
                 <div className={styles.projectMesa}>
                   <span className={styles.missionCode}>OP-02 // ACTIVE</span>
                   <span className={`${styles.categoryBadge} font-share-tech`}>[ AI AGENT ]</span>
                 </div>
                 <h3 className={styles.projectName}>BUDAI</h3>
                 <div className={`${styles.projectOneLiner} font-cormorant`}>
                   Real-time intelligent AI agent — makes calls, manages tasks, operates autonomously.
                 </div>
                 <div className={`${styles.projectDescription} font-cormorant`}>
                   A live AI agent that operates in real-time — capable of making calls,
                   managing tasks, and acting as an always-on personal assistant.
                   Takes action autonomously.
                 </div>
                 <div className={styles.projectTags}>
                   <span>AI AGENT</span><span>·</span>
                   <span>VOICE</span><span>·</span>
                   <span>LLM</span>
                 </div>
                 <div className={styles.archiveLink}>
                   &gt;&gt; ACCESS ARCHIVE <span className={styles.archiveLinkArrow}>↗</span>
                 </div>
              </motion.a>
            </MagneticWrapper>

            {/* GLADIATOR ARENA */}
            <MagneticWrapper className={styles.span1} style={{ display: 'block', height: '100%' }}>
              <motion.a 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                href="https://github.com/OptimistOtaku/Gladiator-Arena" target="_blank" rel="noopener noreferrer" className={`${styles.projectCard} ${styles.bgGladiator} h-full`}>
                 <div className={styles.projectMesa}>
                   <span className={styles.missionCode}>OP-03 // DEPLOYED</span>
                   <span className={`${styles.categoryBadge} ${styles.categoryBadgeWeb3} font-share-tech`}>[ WEB3 ]</span>
                 </div>
                 <h3 className={styles.projectName}>GLADIATOR ARENA</h3>
                 <div className={`${styles.projectOneLiner} font-cormorant`}>
                   On-chain PvP game — win fights, claim opponents' weapons.
                 </div>
                 <div className={`${styles.projectDescription} font-cormorant`}>
                   A fully on-chain PvP battle game with real economic stakes.
                   P2P architecture with smart contract enforcement.
                 </div>
                 <div className={styles.projectTags}>
                   <span>BLOCKCHAIN</span><span>·</span>
                   <span>SMART CONTRACTS</span>
                 </div>
                 <div className={styles.archiveLink}>
                   &gt;&gt; ACCESS ARCHIVE <span className={styles.archiveLinkArrow}>↗</span>
                 </div>
              </motion.a>
            </MagneticWrapper>

            {/* FRAUDEYE */}
            <MagneticWrapper className={styles.span1} style={{ display: 'block', height: '100%' }}>
              <motion.a 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                href="https://github.com/OptimistOtaku/fraudeye" target="_blank" rel="noopener noreferrer" className={`${styles.projectCard} ${styles.bgFraudeye} h-full`}>
                 <div className={styles.projectMesa}>
                   <span className={styles.missionCode}>OP-04 // OPERATIONAL</span>
                   <span className={`${styles.categoryBadge} ${styles.categoryBadgeMuted} font-share-tech`}>[ ML SYSTEMS ]</span>
                 </div>
                 <h3 className={styles.projectName}>FRAUDEYE</h3>
                 <div className={`${styles.projectOneLiner} font-cormorant`}>
                   Hybrid ML + rule-based fraud detection API.
                 </div>
                 <div className={`${styles.projectDescription} font-cormorant`}>
                   A system combining machine learning models with deterministic
                   rule engines — capturing both pattern-based anomalies and hard logic.
                 </div>
                 <div className={styles.projectTags}>
                   <span>PYTHON</span><span>·</span>
                   <span>FASTAPI</span><span>·</span>
                   <span>SCIKIT-LEARN</span>
                 </div>
                 <div className={styles.archiveLink}>
                   &gt;&gt; ACCESS ARCHIVE <span className={styles.archiveLinkArrow}>↗</span>
                 </div>
              </motion.a>
            </MagneticWrapper>

            {/* HANGOUT HERO */}
            <MagneticWrapper className={styles.span3h} style={{ display: 'block', height: '100%' }}>
              <motion.a 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                href="https://github.com/OptimistOtaku/HangOut-Hero" target="_blank" rel="noopener noreferrer" className={`${styles.projectCard} ${styles.bgHangout} h-full`}>
                 <div className={styles.projectMesa}>
                   <span className={styles.missionCode}>OP-05 // DEPLOYED</span>
                   <span className={`${styles.categoryBadge} ${styles.categoryBadgeMuted} font-share-tech`}>[ FULL-STACK ]</span>
                 </div>
                 <h3 className={styles.projectName}>HANGOUT-HERO</h3>
                 <div className={`${styles.projectOneLiner} font-cormorant`}>
                   AI itinerary generator — real-time plans built on mood, location, and group preferences.
                 </div>
                 <div className={`${styles.projectDescription} font-cormorant`}>
                   Generates personalised real-time hangout itineraries by combining user mood,
                   live location data, group size, and preferences.
                   Powered by OpenAI with live maps integration.
                 </div>
                 <div className={styles.projectTags}>
                   <span>TYPESCRIPT</span><span>·</span>
                   <span>OPENAI</span><span>·</span>
                   <span>MAPS API</span><span>·</span>
                   <span>NEXT.JS</span>
                 </div>
                 <div className={styles.archiveLink}>
                   &gt;&gt; ACCESS ARCHIVE <span className={styles.archiveLinkArrow}>↗</span>
                 </div>
              </motion.a>
            </MagneticWrapper>

          </div>

          {/* TELEMETRY BLOCK FOR NEGATIVE SPACE */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className={styles.telemetryGrid}
          >
             <div className={styles.telemetryData}>
                <span className={styles.telemetryLabel}>// NODE CONF</span>
                <span className={styles.telemetryValue}>DISTRIBUTED</span>
             </div>
             <div className={styles.telemetryData}>
                <span className={styles.telemetryLabel}>// LATENCY</span>
                <span className={styles.telemetryValue}>14MS BASE</span>
             </div>
             <div className={styles.telemetryData}>
                <span className={styles.telemetryLabel}>// BANDWIDTH</span>
                <span className={styles.telemetryValue}>NOMINAL</span>
             </div>
             <div className={styles.telemetryData}>
                <span className={styles.telemetryLabel}>// STATUS</span>
                <span className={`${styles.telemetryValue} animate-blink`}>ACTIVE</span>
             </div>
          </motion.div>

        </motion.div>
      </section>

      {/* CONTACT SECTION */}
      <section className={`${styles.sectionWrapper} ${styles.contactSection} vignette-bg`} id="contact">
        <div className={styles.sectionInner}>
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`${styles.sectionLabel} ${styles.sectionLabelSpice} font-share-tech flex items-center justify-center gap-2`}
          >
            <FiGlobe /> ◈ DEEP DESERT // MODULE: OPEN_CHANNEL
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className={`${styles.contactHeading} font-cinzel`}
          >
            Transmit a Signal.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`${styles.contactBody} font-cormorant`}
          >
            Available for AI integrations, full-stack web apps,
            API development, and ML engineering.
            If the problem is hard and the build is real — let's talk.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={styles.contactLinksWrap}
          >
            <MagneticWrapper className="w-full max-w-[380px]">
              <a href="https://github.com/OptimistOtaku" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                <FiGithub className={styles.contactLinkSymbol} /> GITHUB ARCHIVE
              </a>
            </MagneticWrapper>
            <MagneticWrapper className="w-full max-w-[380px]">
              <a href="mailto:optimistotaku@gmail.com" className={styles.contactLink}>
                <FiMail className={styles.contactLinkSymbol} /> EMAIL CHANNEL
              </a>
            </MagneticWrapper>
            <MagneticWrapper className="w-full max-w-[380px]">
              <a href="https://www.linkedin.com/in/adityasinghop/" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                <FiLinkedin className={styles.contactLinkSymbol} /> LINKEDIN RELAY
              </a>
            </MagneticWrapper>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={styles.closingEpigraphWrap}
          >
            <div className={`${styles.closingQuote} font-cormorant`}>
              "He who controls the spice controls the universe."
            </div>
            <div className={`${styles.quoteAuthor} font-share-tech`}>
              <FiTerminal className="inline mr-1" /> — DUNE · FRANK HERBERT
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div>© 10191 A.G. — ADITYA SINGH — ALL RIGHTS RESERVED</div>
        <div className="flex items-center gap-2"><FiHexagon /> DESIGNED & BUILT IN THE SIETCH</div>
      </footer>

    </main>
  );
}