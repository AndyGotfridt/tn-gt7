import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Papa from 'papaparse';
import { Routes, Route, useParams, Link, useLocation } from 'react-router-dom';
import {
  Trophy,
  ShieldCheck,
  Gavel,
  Settings,
  MessageSquare,
  ChevronRight,
  Users,
  User,
  Flag,
  Ruler,
  Calendar,
  MapPin,
  Clock,
  Car,
  Globe,
  Loader2,
  Menu,
  X,
  ChevronDown,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle
} from "lucide-react";

const Navbar = ({ activeSection }: { activeSection: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChampionshipOpen, setIsChampionshipOpen] = useState(false);
  const { slug } = useParams();
  const location = useLocation();

  const navItems = [
    { id: 'circuits', label: 'FECHAS' },
    { id: 'drivers', label: 'PILOTOS' },
    { id: 'standings', label: 'TABLA DE POSICIONES' },
    { id: 'regulations', label: 'REGLAMENTO' },
  ];

  const getHref = (id: string) => {
    return slug ? `/${slug}#${id}` : `/#${id}`;
  };

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    if (location.hash === `#${id}`) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const currentChampionship = CHAMPIONSHIP_CONFIG[slug || 'default'] || CHAMPIONSHIP_CONFIG['default'];

  return (
      <>
        <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md shadow-[0_0_15px_rgba(37,89,244,0.3)] flex justify-between items-center px-8 py-4">
          <div className="flex items-center gap-4 md:gap-8">
            <Link to={slug ? `/${slug}` : "/"} className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0">
              <img
                  src="logo-tn.png"
                  alt="TN ARGENTINA LOGO"
                  className="h-10 md:h-12 w-auto"
                  referrerPolicy="no-referrer"
                  draggable="false"
              />
            </Link>

            {/* Championship Switcher Desktop */}
            <div className="hidden md:block relative">
              <button
                  onClick={() => setIsChampionshipOpen(!isChampionshipOpen)}
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-sm transition-all group"
              >
              <span className="text-[9px] md:text-[10px] font-black italic uppercase tracking-widest text-primary">
                {currentChampionship.label}
              </span>
                <ChevronDown className={`w-3 h-3 md:w-4 h-4 text-slate-500 transition-transform duration-300 ${isChampionshipOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isChampionshipOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-slate-900 border border-white/10 rounded-sm shadow-2xl overflow-hidden z-50"
                    >
                      {Object.entries(CHAMPIONSHIP_CONFIG).map(([key, config]) => (
                          <Link
                              key={key}
                              to={key === 'default' ? '/' : `/${key}`}
                              onClick={() => setIsChampionshipOpen(false)}
                              className={`block px-4 py-3 text-[10px] font-black italic uppercase tracking-widest transition-colors ${
                                  (slug === key || (!slug && key === 'default'))
                                      ? 'bg-primary text-white'
                                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                              }`}
                          >
                            {config.label}
                          </Link>
                      ))}
                    </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            {navItems.map((item) => (
                <Link
                    key={item.id}
                    to={getHref(item.id)}
                    onClick={() => handleNavClick(item.id)}
                    className={`font-black italic uppercase tracking-tighter transition-all duration-500 hover:scale-105 ${
                        activeSection === item.id
                            ? 'text-primary border-b-2 border-primary pb-1'
                            : 'text-slate-400 hover:text-slate-100'
                    }`}
                >
                  {item.label}
                </Link>
            ))}
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <button
                className="text-white p-2"
                onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
              <motion.div
                  initial={{ opacity: 0, x: '100%' }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="fixed inset-0 z-[45] bg-slate-950 flex flex-col items-center justify-center gap-8 md:hidden p-8"
              >
                {/* Championship Switcher Mobile */}
                <div className="w-full max-w-xs mb-8">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary block mb-4 text-center">CAMPEONATO</span>
                  <div className="flex flex-col gap-2">
                    {Object.entries(CHAMPIONSHIP_CONFIG).map(([key, config]) => (
                        <Link
                            key={key}
                            to={key === 'default' ? '/' : `/${key}`}
                            onClick={() => setIsOpen(false)}
                            className={`px-6 py-4 text-center text-sm font-black italic uppercase tracking-widest rounded-sm border transition-all ${
                                (slug === key || (!slug && key === 'default'))
                                    ? 'bg-primary border-primary text-white'
                                    : 'bg-white/5 border-white/10 text-slate-400'
                            }`}
                        >
                          {config.label}
                        </Link>
                    ))}
                  </div>
                </div>

                <div className="h-px w-full max-w-xs bg-white/10 mb-8"></div>

                {navItems.map((item) => (
                    <Link
                        key={item.id}
                        to={getHref(item.id)}
                        onClick={() => handleNavClick(item.id)}
                        className={`text-3xl font-black italic uppercase tracking-tighter transition-all duration-300 ${
                            activeSection === item.id
                                ? 'text-primary scale-110'
                                : 'text-slate-400 hover:text-slate-100'
                        }`}
                    >
                      {item.label}
                    </Link>
                ))}
              </motion.div>
          )}
        </AnimatePresence>
      </>
  );
};

const Hero = ({ label }: { label: string }) => {
  const { slug } = useParams();
  const href = slug ? `/${slug}#circuits` : `/#circuits`;

  return (
      <section className="relative h-screen flex items-center justify-start px-4 md:px-24 overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img
              className="w-full h-full object-cover grayscale brightness-50 contrast-125"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAp0H5tB8uMNNkhT7g63Ej5C-Wto_Awq1Ch_ALlECEnbjIbg7Q0FqwEwHfU7MDoMZIRLgffNzM2AcJuUtVXpAyMTGVsVDVMflPxqp1V-hcG43eH2Q5qJG05nd-JttUusCk97mDUI0e7tcGJe8MMj2G_Fs3a-HE-nANq8N5PF8OY-UDyLITxeCyLIZa1hxtJptwbAivtBqXovgnyUF3YJwIxt32no0Z4btw7EMqP8zimVlHFiA4VYYDOh9tcMXa7Xg8z-ZdScHSsnCom"
              alt="GT3 racing car"
              referrerPolicy="no-referrer"
              draggable="false"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest/60 to-transparent"></div>
        </div>
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-4xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1 h-12 bg-primary"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">CENTRO OFICIAL DE COMPETICIÓN</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-8 text-white">
            TN ARGENTINA <br/> <span className="text-primary">{label}</span>
          </h1>
          <p className="text-slate-400 max-w-xl text-lg mb-10 leading-relaxed">
            Siente la adrenalina del Turismo Nacional en Gran Turismo 7. Carreras chapa a chapa, competitividad al límite y el espíritu del automovilismo argentino en cada curva.
          </p>
          <div className="flex gap-4">
            <Link
                to={href}
                className="bg-primary text-white px-10 py-4 font-black italic uppercase tracking-widest text-sm rounded-sm hover:scale-105 hover:shadow-lg hover:shadow-primary/30 transition-all duration-700 inline-block"
            >
              VER FECHAS
            </Link>
          </div>
        </motion.div>
      </section>
  );
};

const getGoogleSheetUrl = (sheetId: string, gid: string) => {
  return `https://docs.google.com/spreadsheets/d/e/${sheetId}/pub?gid=${gid}&single=true&output=csv`;
};

const getGoogleDocUrl = (docId: string) => {
  return `https://docs.google.com/document/d/e/${docId}/pub?embedded=true`;
};

const CHAMPIONSHIP_CONFIG: Record<string, any> = {
  'default': {
    label: 'TEMPORADA 2026',
    year: 2026,
    sheetId: '2PACX-1vT9iRfIsi7F7CsW5LZ6le2Gw-CaYUhE_tlRXavHrjnchuzL7cH6eMtcAxiAojq7VEGnjXao2UCTdDBl',
    gids: {
      calendar: '1120488754',
      driversC2: '374086502',
      driversC3: '893514097',
      standingsC2: '0',
      standingsC3: '571161266',
      resultsC2: '1242669178',
      resultsC3: '162410582'
    },
    docId: '2PACX-1vTcSLz_ZguMXN2uVHR0KwqzxfJYDs5ygSUDd1m3LcV35qmxs1XPyr_sVzVG5iF0rUmZ-TPdwVFFFGnz'
  },
  'temporada-2025': {
    label: 'TEMPORADA 2025',
    year: 2025,
    sheetId: '2PACX-1vQDsPF23zqyAvLiFjPQuFgg3U6BN8oz0_Y4E-2e7-95fmXmfnZx-reCABeGeSG1VeIW2_QRofDwrrqz',
    gids: {
      calendar: '1120488754',
      driversC2: '374086502',
      driversC3: '893514097',
      standingsC2: '0',
      standingsC3: '571161266',
      resultsC2: '1242669178',
      resultsC3: '162410582'
    },
    docId: '2PACX-1vTcSLz_ZguMXN2uVHR0KwqzxfJYDs5ygSUDd1m3LcV35qmxs1XPyr_sVzVG5iF0rUmZ-TPdwVFFFGnz'
  }
};

const ResultsModal = ({ event, activeClass, config, onClose }: { event: any, activeClass: string, config: any, onClose: () => void }) => {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const gid = activeClass === 'CLASE 2' ? config.gids.resultsC2 : config.gids.resultsC3;
        const url = getGoogleSheetUrl(config.sheetId, gid);
        const response = await fetch(url);
        if (!response.ok) throw new Error('No se pudieron cargar los resultados');
        const csvString = await response.text();

        Papa.parse(csvString, {
          header: true,
          skipEmptyLines: true,
          complete: (parsed) => {
            // Filter by FECHA (matching event.FECHA)
            const filtered = parsed.data.filter((row: any) => {
                const rowKeys = Object.keys(row);
                const pilotoKey = rowKeys.find(k => k.toUpperCase() === 'PILOTO');
                const fechaKey = rowKeys.find(k => k.toUpperCase() === 'FECHA');
                
                const piloto = pilotoKey ? (row[pilotoKey] || '').trim() : '';
                if (!piloto) return false;
                
                const rowFecha = fechaKey ? (row[fechaKey] || '').trim() : '';
                const eventFecha = (event.FECHA || '').trim();
                const roundNumber = (event.roundNumber || '').trim();
                
                return rowFecha === eventFecha || 
                       rowFecha === roundNumber ||
                       (rowFecha.length > 0 && eventFecha.length > 0 && 
                        (rowFecha.startsWith(eventFecha) || eventFecha.startsWith(rowFecha)));
            }).map((row: any) => {
                // Normalize keys for rendering
                const rowKeys = Object.keys(row);
                const getVal = (key: string) => {
                  const found = rowKeys.find(k => k.toUpperCase() === key.toUpperCase());
                  return found ? row[found] : '';
                };
                
                return {
                  POS: getVal('POS'),
                  PILOTO: getVal('PILOTO'),
                  FECHA: getVal('FECHA'),
                  PUNTOS: getVal('PUNTOS') || getVal('PTS') || '0',
                  TIEMPO: getVal('TIEMPO') || getVal('DIF') || '-'
                };
            }).sort((a: any, b: any) => {
                const posA = parseInt(a.POS) || 999;
                const posB = parseInt(b.POS) || 999;
                return posA - posB;
            });

            setResults(filtered);
            setLoading(false);
          },
          error: (err) => {
            console.error('CSV Error:', err);
            setError('Error al procesar los resultados');
            setLoading(false);
          }
        });
      } catch (err: any) {
        console.error('Fetch Error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchResults();
  }, [event.FECHA, activeClass, config]);

  return (
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-slate-950/90 backdrop-blur-md"
          onClick={onClose}
      >
        <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-4xl bg-surface-container border border-white/10 rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-900/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/20 rounded-sm">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary block mb-1">RESULTADOS OFICIALES</span>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">
                  {event.cleanName} <span className="text-primary">/ {activeClass}</span>
                </h3>
              </div>
            </div>
            <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            {loading ? (
                <div className="py-20 flex flex-col items-center justify-center gap-4">
                  <Loader2 className="w-10 h-10 text-primary animate-spin" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">PROCESANDO DATOS...</p>
                </div>
            ) : error ? (
                <div className="py-20 text-center">
                  <p className="text-red-500 font-black uppercase italic tracking-widest text-sm mb-4">{error}</p>
                  <button
                      onClick={onClose}
                      className="px-6 py-2 bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors"
                  >
                    CERRAR
                  </button>
                </div>
            ) : results.length === 0 ? (
                <div className="py-20 flex flex-col items-center justify-center text-center">
                  <Flag className="w-16 h-16 text-slate-700 mb-6 opacity-20" />
                  <p className="text-slate-400 font-black italic uppercase tracking-widest text-lg">PROCESANDO RESULTADOS</p>
                  <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-widest">LA INFORMACIÓN SE CARGARÁ AL FINALIZAR LA REVISIÓN</p>
                </div>
            ) : (
                <div className="space-y-6">
                  {/* Podium Highlight */}
                  <div className="grid grid-cols-3 gap-2 md:gap-4 mb-8">
                    {[1, 0, 2].map((idx) => {
                      const row = results[idx];
                      if (!row) return null;
                      return (
                          <div
                              key={idx}
                              className={`relative p-4 rounded-sm border flex flex-col items-center text-center transition-all ${
                                  idx === 0 ? 'bg-yellow-500/10 border-yellow-500/30 order-2 scale-110 z-10' :
                                      idx === 1 ? 'bg-slate-300/10 border-slate-300/30 order-1 mt-4' :
                                          'bg-amber-700/10 border-amber-700/30 order-3 mt-4'
                              }`}
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black italic mb-2 ${
                                idx === 0 ? 'bg-yellow-500 text-black' :
                                    idx === 1 ? 'bg-slate-300 text-black' :
                                        'bg-amber-700 text-white'
                            }`}>
                              {idx + 1}
                            </div>
                            <span className="text-[10px] md:text-xs font-black uppercase italic tracking-tighter text-white line-clamp-1">
                        {row.PILOTO}
                      </span>
                            <span className="text-[8px] font-black text-primary italic mt-1">
                        +{row.PUNTOS} PTS
                      </span>
                          </div>
                      );
                    })}
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                      <tr className="border-b border-white/10">
                        <th className="py-3 px-4 text-left text-[9px] font-black uppercase tracking-widest text-slate-500">POS</th>
                        <th className="py-3 px-4 text-left text-[9px] font-black uppercase tracking-widest text-slate-500">PILOTO</th>
                        <th className="py-3 px-4 text-right text-[9px] font-black uppercase tracking-widest text-slate-500">TIEMPO / DIF</th>
                        <th className="py-3 px-4 text-right text-[9px] font-black uppercase tracking-widest text-slate-500">PTS</th>
                      </tr>
                      </thead>
                      <tbody>
                      {results.map((row, idx) => (
                          <tr
                              key={idx}
                              className={`border-b border-white/5 hover:bg-white/5 transition-colors group ${idx < 3 ? 'bg-primary/5' : ''}`}
                          >
                            <td className="py-2 px-4">
                              <div className={`w-6 h-6 flex items-center justify-center font-black italic text-[10px] ${
                                  idx === 0 ? 'bg-yellow-500 text-black' :
                                      idx === 1 ? 'bg-slate-300 text-black' :
                                          idx === 2 ? 'bg-amber-700 text-white' :
                                              'text-slate-500'
                              }`}>
                                {row.POS}
                              </div>
                            </td>
                            <td className="py-2 px-4">
                          <span className="text-xs font-black uppercase italic tracking-tighter text-white group-hover:text-primary transition-colors">
                            {row.PILOTO}
                          </span>
                            </td>
                            <td className="py-2 px-4 text-right">
                          <span className="font-mono text-[10px] text-slate-400">
                            {row.TIEMPO}
                          </span>
                            </td>
                            <td className="py-2 px-4 text-right">
                          <span className="text-xs font-black text-primary italic">
                            +{row.PUNTOS}
                          </span>
                            </td>
                          </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
                </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-950 border-t border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">DATOS SINCRONIZADOS CON COMISARIATO</span>
            </div>
            <span className="text-[8px] font-black uppercase tracking-widest text-slate-600">TN ARGENTINA OFFICIAL RESULTS SYSTEM</span>
          </div>
        </motion.div>
      </motion.div>
  );
};

const Championships = ({ config }: { config: any }) => {
  const [activeClass, setActiveClass] = useState<'CLASE 2' | 'CLASE 3'>('CLASE 2');
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  // URL del Sheet para el Calendario
  const calendarSheetUrl = getGoogleSheetUrl(config.sheetId, config.gids.calendar);

  useEffect(() => {
    const fetchCalendar = () => {
      setLoading(true);
      setError(null);
      setIsExpanded(false); // Reset expansion on class change

      Papa.parse(calendarSheetUrl, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const now = new Date();

          // Procesamos y parseamos las fechas
          const processed = results.data
              .filter((item: any) => item.CLASE?.toLowerCase() === (activeClass === 'CLASE 2' ? 'c2' : 'c3'))
              .map((item: any, idx: number) => {
                try {
                  // Parseamos FECHA (DD/MM) y HORA (HH:mm)
                  const [day, month] = item.FECHA.split('/').map(Number);
                  const [hour, minute] = (item.HORA || '21:00').split(':').map(Number);

                  const eventDate = new Date(config.year || now.getFullYear(), month - 1, day, hour, minute);

                  const diffMs = now.getTime() - eventDate.getTime();
                  const diffHours = diffMs / (1000 * 60 * 60);

                  let status: 'LIVE' | 'UPCOMING' | 'PAST' = 'UPCOMING';
                  if (diffHours >= 0 && diffHours <= 1) {
                    status = 'LIVE';
                  } else if (diffHours > 1) {
                    status = 'PAST';
                  }

                  // Extraer Fecha y Nombre Limpio (Ej: "F1 - Interlagos" -> "FECHA 1" e "Interlagos")
                  const parts = (item.NOMBRE || '').split(' - ');
                  let roundNumber = (idx + 1).toString();
                  let displayFecha = `FECHA ${roundNumber}`;
                  let cleanName = item.NOMBRE;

                  if (parts.length > 1) {
                    const prefix = parts[0].trim();
                    roundNumber = prefix.replace('F', '').trim();
                    displayFecha = `FECHA ${roundNumber}`;
                    cleanName = parts.slice(1).join(' - ').trim();
                  }

                  return { ...item, eventDate, status, displayFecha, cleanName, roundNumber };
                } catch (e) {
                  return { ...item, eventDate: new Date(0), status: 'PAST', displayFecha: 'FECHA ?', cleanName: item.NOMBRE };
                }
              });

          // Ordenamos: LIVE primero, luego UPCOMING (por fecha), luego PAST (al final)
          const sorted = processed.sort((a: any, b: any) => {
            // Prioridad 1: LIVE
            if (a.status === 'LIVE' && b.status !== 'LIVE') return -1;
            if (b.status === 'LIVE' && a.status !== 'LIVE') return 1;

            // Prioridad 2: UPCOMING vs PAST
            if (a.status === 'UPCOMING' && b.status === 'PAST') return -1;
            if (a.status === 'PAST' && b.status === 'UPCOMING') return 1;

            // Orden cronológico dentro de su grupo
            return a.eventDate.getTime() - b.eventDate.getTime();
          });

          setEvents(sorted);
          setLoading(false);
        },
        error: (err) => {
          console.error('PapaParse Error:', err);
          setError(`Error al cargar el calendario: ${calendarSheetUrl}`);
          setLoading(false);
        }
      });
    };

    fetchCalendar();
  }, [activeClass, config]);

  return (
      <section className="py-12 md:py-24 px-4 md:px-8 bg-surface-container-low" id="circuits">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-16 gap-4 md:gap-8">
            <div className="flex items-center gap-4">
              <div className="w-1 h-10 bg-primary"></div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary block mb-1">CALENDARIO OFICIAL</span>
                <h2 className="text-5xl font-black uppercase italic tracking-tighter text-white">FECHAS</h2>
              </div>
            </div>

            <div className="flex bg-surface-container p-1 rounded-sm border border-white/10 kinetic-skew">
              {['CLASE 2', 'CLASE 3'].map((cls) => (
                  <button
                      key={cls}
                      onClick={() => setActiveClass(cls as any)}
                      className={`px-10 py-3 text-[10px] font-black italic uppercase tracking-widest transition-all duration-500 ${
                          activeClass === cls
                              ? 'bg-primary text-white shadow-lg shadow-primary/30'
                              : 'text-slate-500 hover:text-slate-300'
                      }`}
                  >
                    {cls}
                  </button>
              ))}
            </div>
          </div>

          {error && (
              <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 text-red-500 text-center font-black uppercase italic tracking-widest text-xs">
                {error}
              </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative min-h-[400px]">
            <AnimatePresence mode="wait">
              {loading || isExpanding ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-950/20 backdrop-blur-[2px] z-10">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">CARGANDO CALENDARIO...</p>
                  </div>
              ) : events.length === 0 ? (
                  <div className="col-span-full py-20 flex flex-col items-center justify-center bg-surface-container border border-dashed border-white/10 rounded-sm">
                    <Calendar className="w-12 h-12 text-slate-500 mb-4 opacity-20" />
                    <p className="text-slate-400 font-black italic uppercase tracking-widest text-sm">Falta cargar información de fechas</p>
                    <span className="text-[10px] text-slate-500 mt-2">PRÓXIMAMENTE DISPONIBLE</span>
                  </div>
              ) : (
                  events
                      .slice(0, isExpanded ? undefined : 6)
                      .map((event, idx) => {
                        const specs = [
                          { label: 'CLIMA', value: event.CLIMA },
                          { label: 'DAÑOS', value: event.DAÑOS || event.DANOS },
                          { label: 'DESGASTE', value: event.DESGASTE }
                        ].filter(s => s.value);

                        return (
                            <motion.div
                                key={(event.NOMBRE || idx) + activeClass}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative aspect-[16/11] bg-surface-container overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-500 shadow-2xl"
                            >
                              {/* Background Image with Zoom and Color Effect */}
                              <img
                                  src={event.IMAGEN || 'https://picsum.photos/seed/racing/800/500'}
                                  alt={event.NOMBRE}
                                  className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-1000 grayscale group-hover:grayscale-0"
                                  referrerPolicy="no-referrer"
                                  draggable="false"
                              />

                              {/* Technical Grid Overlay */}
                              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>

                              {/* Overlay Gradient */}
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

                              {/* Content */}
                              <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                                <div className="flex justify-between items-start">
                                  <div className="flex flex-col gap-2">
                                    <div className="bg-primary px-3 py-1 kinetic-skew self-start">
                            <span className="text-[10px] font-black italic text-white flex items-center gap-2">
                              <Calendar className="w-3 h-3" />
                              {event.FECHA}
                            </span>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-md px-3 py-1 kinetic-skew self-start border border-white/10">
                            <span className="text-[10px] font-black italic text-white/80 flex items-center gap-2">
                              <Clock className="w-3 h-3" />
                              {event.HORA} HS
                            </span>
                                    </div>
                                  </div>

                                  <div className="flex flex-col items-end gap-2">
                                    {idx === 0 && event.status === 'LIVE' && (
                                        <div className="flex items-center gap-2 bg-red-600/20 border border-red-600/50 px-3 py-1 rounded-full backdrop-blur-sm">
                                          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                                          <span className="text-[8px] font-black uppercase tracking-widest text-red-500">EN VIVO</span>
                                        </div>
                                    )}
                                    {idx === 0 && event.status === 'UPCOMING' && (
                                        <div className="flex items-center gap-2 bg-primary/20 border border-primary/50 px-3 py-1 rounded-full backdrop-blur-sm">
                                          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                                          <span className="text-[8px] font-black uppercase tracking-widest text-primary">PRÓXIMA</span>
                                        </div>
                                    )}
                                    {event.status === 'PAST' && (
                                        <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setSelectedEvent(event);
                                            }}
                                            className="flex items-center gap-2 bg-primary hover:bg-white hover:text-primary border border-primary px-3 py-1 rounded-full transition-all duration-300 group/btn"
                                        >
                                          <Trophy className="w-3 h-3 group-hover/btn:scale-110 transition-transform" />
                                          <span className="text-[8px] font-black uppercase tracking-widest">RESULTADOS</span>
                                        </button>
                                    )}
                                  </div>
                                </div>

                                <div className="transform group-hover:-translate-y-2 transition-transform duration-500">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">{event.displayFecha}</span>
                                    <div className="h-px w-8 bg-primary/30"></div>
                                  </div>
                                  <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white group-hover:text-primary transition-colors leading-none mb-2">
                                    {event.cleanName}
                                  </h3>
                                </div>
                              </div>

                              {/* Hover Reveal: Technical Specs */}
                              {specs.length > 0 && (
                                  <div className="absolute bottom-0 left-0 right-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 p-3 flex justify-around items-center">
                                    {specs.map((spec, i) => (
                                        <div key={spec.label} className="flex items-center gap-4">
                                          <div className="flex flex-col items-center">
                                            <span className="text-[7px] font-black text-white/60 uppercase">{spec.label}</span>
                                            <span className="text-[9px] font-black text-white italic">{spec.value}</span>
                                          </div>
                                          {i < specs.length - 1 && <div className="w-px h-6 bg-white/20"></div>}
                                        </div>
                                    ))}
                                  </div>
                              )}

                              {/* Border Glow */}
                              <div className="absolute inset-0 border border-white/0 group-hover:border-primary/30 transition-all pointer-events-none"></div>
                            </motion.div>
                        );
                      })
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {selectedEvent && (
                <ResultsModal
                    event={selectedEvent}
                    activeClass={activeClass}
                    config={config}
                    onClose={() => setSelectedEvent(null)}
                />
            )}
          </AnimatePresence>

          {/* Expand Button outside the grid */}
          {!loading && !error && events.length > 6 && (
              <div className="mt-12 flex justify-center">
                <button
                    onClick={() => {
                      if (!isExpanded) {
                        setIsExpanding(true);
                        setTimeout(() => {
                          setIsExpanded(true);
                          setIsExpanding(false);
                        }, 800);
                      } else {
                        setIsExpanded(false);
                      }
                    }}
                    className="bg-surface-container border border-white/10 px-10 py-4 rounded-sm font-black italic uppercase tracking-widest text-[11px] text-white hover:bg-primary hover:text-white hover:scale-105 transition-all duration-500 shadow-2xl flex items-center gap-3 group"
                >
                  {isExpanded ? 'VER MENOS' : 'VER MÁS'}
                  <ChevronRight className={`w-5 h-5 transition-transform duration-500 group-hover:translate-x-1 ${isExpanded ? '-rotate-90' : 'rotate-90'}`} />
                </button>
              </div>
          )}
        </div>
      </section>
  );
};

const Drivers = ({ config }: { config: any }) => {
  const [activeClass, setActiveClass] = useState<'CLASE 2' | 'CLASE 3'>('CLASE 2');
  const [drivers, setDrivers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [initialVisible, setInitialVisible] = useState(12);

  useEffect(() => {
    const updateVisible = () => {
      setInitialVisible(window.innerWidth < 768 ? 6 : 12);
    };
    updateVisible();
    window.addEventListener('resize', updateVisible);
    return () => window.removeEventListener('resize', updateVisible);
  }, []);

  const visibleDrivers = showAll ? drivers : drivers.slice(0, initialVisible);

  const driverSheetUrls = {
    'CLASE 2': getGoogleSheetUrl(config.sheetId, config.gids.driversC2),
    'CLASE 3': getGoogleSheetUrl(config.sheetId, config.gids.driversC3)
  };

  useEffect(() => {
    const fetchDrivers = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = driverSheetUrls[activeClass];
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch drivers (Status: ${response.status})`);
        const csvString = await response.text();

        Papa.parse(csvString, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            // Filter out rows where PILOTO is empty
            const filtered = results.data.filter((d: any) => d.PILOTO && d.PILOTO.trim() !== '');
            setDrivers(filtered);
            setLoading(false);
          },
          error: (err: any) => {
            console.error('CSV Parsing Error:', err);
            setError('Error al procesar los pilotos');
            setLoading(false);
          }
        });
      } catch (err: any) {
        console.error('Fetch Error:', err);
        setError(`Error al cargar la lista de pilotos: ${err.message}`);
        setLoading(false);
      }
    };

    fetchDrivers();
    setShowAll(false); // Reset showAll when class changes
  }, [activeClass, config]);

  return (
      <section className="py-12 md:py-24 px-4 md:px-8 bg-surface-container-lowest" id="drivers">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-16 gap-4 md:gap-8">
            <div className="flex items-center gap-4">
              <div className="w-1 h-10 bg-primary"></div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary block mb-1">GRID OFICIAL</span>
                <h2 className="text-5xl font-black uppercase italic tracking-tighter text-white">PILOTOS</h2>
              </div>
            </div>

            <div className="flex bg-surface-container p-1 rounded-sm border border-white/10 kinetic-skew">
              {['CLASE 2', 'CLASE 3'].map((cls) => (
                  <button
                      key={cls}
                      onClick={() => setActiveClass(cls as any)}
                      className={`px-10 py-3 text-[10px] font-black italic uppercase tracking-widest transition-all duration-500 ${
                          activeClass === cls
                              ? 'bg-primary text-white shadow-lg shadow-primary/30'
                              : 'text-slate-500 hover:text-slate-300'
                      }`}
                  >
                    {cls}
                  </button>
              ))}
            </div>
          </div>

          {error && (
              <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 text-red-500 text-center font-black uppercase italic tracking-widest text-xs">
                {error}
              </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 relative min-h-[400px]">
            <AnimatePresence mode="popLayout">
              {loading ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-950/20 backdrop-blur-[2px] z-10">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">CARGANDO PILOTOS...</p>
                  </div>
              ) : drivers.length === 0 ? (
                  <div className="col-span-full py-20 flex flex-col items-center justify-center bg-surface-container border border-dashed border-white/10 rounded-sm">
                    <Users className="w-12 h-12 text-slate-500 mb-4 opacity-20" />
                    <p className="text-slate-400 font-black italic uppercase tracking-widest text-sm">Preparando grilla de Pilotos</p>
                  </div>
              ) : (
                  visibleDrivers.map((driver, idx) => (
                      <motion.div
                          layout
                          key={(driver.PILOTO || idx) + activeClass}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{
                            duration: 0.3,
                            delay: idx % initialVisible * 0.03
                          }}
                          className="group relative aspect-[3/4] bg-surface-container overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-500 shadow-xl"
                      >
                        {/* Driver Image */}
                        {driver.IMAGEN ? (
                            <img
                                src={driver.IMAGEN}
                                alt={driver.PILOTO}
                                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
                                referrerPolicy="no-referrer"
                                draggable="false"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50">
                              <User className="w-16 h-16 text-slate-800 group-hover:text-primary/20 transition-colors duration-500" />
                            </div>
                        )}

                        {/* Technical Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>

                        {/* Number Badge */}
                        <div className="absolute top-2 right-2 bg-primary px-2 py-0.5 kinetic-skew z-20">
                          <span className="text-sm font-black italic text-white">#{driver.NUMERO || '??'}</span>
                        </div>

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                          <div className="flex items-center gap-1.5 mb-1">
                            <div className="w-3 h-px bg-primary"></div>
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-primary">PILOTO</span>
                            <span className="px-1 py-0.5 bg-primary/20 border border-primary/30 rounded-sm text-[6px] font-black text-primary uppercase tracking-widest">
                        {activeClass}
                      </span>
                          </div>
                          <h3 className="text-base font-black italic uppercase tracking-tighter text-white leading-none mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {driver.PILOTO}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2">
                            {driver.AUTO && (
                                <div className="flex items-center gap-1">
                                  <Car className="w-2.5 h-2.5 text-primary" />
                                  <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400">{driver.AUTO}</span>
                                </div>
                            )}
                            {driver.NACIONALIDAD && (
                                <div className="flex items-center gap-1">
                                  <Globe className="w-2.5 h-2.5 text-primary" />
                                  <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400">{driver.NACIONALIDAD}</span>
                                </div>
                            )}
                          </div>
                        </div>

                        {/* Border Glow */}
                        <div className="absolute inset-0 border border-white/0 group-hover:border-primary/30 transition-all pointer-events-none"></div>
                      </motion.div>
                  ))
              )}
            </AnimatePresence>
          </div>

          {!loading && drivers.length > initialVisible && (
              <div className="mt-12 flex justify-center">
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="group relative px-12 py-4 bg-surface-container border border-white/10 hover:border-primary/50 transition-all duration-500 kinetic-skew overflow-hidden"
                >
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors"></div>
                  <div className="relative flex items-center gap-3">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">
                  {showAll ? 'VER MENOS' : 'VER GRILLA COMPLETA'}
                </span>
                    <ChevronRight className={`w-4 h-4 text-primary transition-transform duration-500 ${showAll ? '-rotate-90' : 'rotate-90'}`} />
                  </div>
                </button>
              </div>
          )}
        </div>
      </section>
  );
};

const Standings = ({ config }: { config: any }) => {
  const [activeClass, setActiveClass] = useState<'CLASE 2' | 'CLASE 3'>('CLASE 2');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);

  const sheetUrls = {
    'CLASE 2': getGoogleSheetUrl(config.sheetId, config.gids.standingsC2),
    'CLASE 3': getGoogleSheetUrl(config.sheetId, config.gids.standingsC3)
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setIsExpanded(false); // Reset expansion on class change
      try {
        const url = sheetUrls[activeClass];
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch standings (Status: ${response.status})`);
        const csvString = await response.text();

        Papa.parse(csvString, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setData(results.data);
            setLoading(false);
          },
          error: (err: any) => {
            console.error('CSV Parsing Error:', err);
            setError('Error al procesar los datos');
            setLoading(false);
          }
        });
      } catch (err: any) {
        console.error('Fetch Error:', err);
        setError(`Error al cargar la tabla de posiciones: ${err.message}`);
        setLoading(false);
      }
    };

    fetchData();
  }, [activeClass, config]);

  const filteredData = data.filter(row => {
    // Filtramos filas que no tengan piloto (asumimos que la segunda columna es el piloto)
    const values = Object.values(row);
    return values.length > 1 && values[1] && String(values[1]).trim() !== "" && String(values[1]).trim() !== "-";
  });

  return (
      <section className="py-12 md:py-24 px-4 md:px-8 bg-surface-container-lowest" id="standings">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 gap-4 md:gap-6">
            <div className="flex items-center gap-4">
              <div className="w-1 h-8 bg-primary"></div>
              <h2 className="text-4xl font-black uppercase italic tracking-tighter">TABLA DE POSICIÓNES</h2>
            </div>

            <div className="flex bg-surface-container p-1 rounded-sm border border-white/10 kinetic-skew">
              {['CLASE 2', 'CLASE 3'].map((cls) => (
                  <button
                      key={cls}
                      onClick={() => setActiveClass(cls as any)}
                      className={`px-8 py-2 text-[10px] font-black italic uppercase tracking-widest transition-all duration-300 ${
                          activeClass === cls
                              ? 'bg-primary text-white shadow-lg shadow-primary/30'
                              : 'text-slate-500 hover:text-slate-300'
                      }`}
                  >
                    {cls}
                  </button>
              ))}
            </div>
          </div>

          <div className="w-full min-h-[400px] bg-surface-container rounded-sm overflow-hidden border border-white/10 shadow-2xl relative">
            {loading || isExpanding ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-950/50 backdrop-blur-sm">
                  <Loader2 className="w-10 h-10 text-primary animate-spin" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">CARGANDO DATOS...</p>
                </div>
            ) : error ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
                  <p className="text-red-500 font-black uppercase italic tracking-tighter text-xl">{error}</p>
                  <button
                      onClick={() => window.location.reload()}
                      className="text-[10px] font-black uppercase tracking-widest text-primary border-b border-primary"
                  >
                    REINTENTAR
                  </button>
                </div>
            ) : filteredData.length === 0 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
                  <Trophy className="w-12 h-12 text-slate-500 mb-2 opacity-20" />
                  <p className="text-slate-400 font-black italic uppercase tracking-widest text-sm">Procesando resultados de carreras</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="bg-slate-900 border-b border-white/10">
                      {data.length > 0 && Object.keys(data[0]).map((header, idx) => (
                          <th key={idx} className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-slate-400 italic">
                            {header}
                          </th>
                      ))}
                    </tr>
                    </thead>
                    <tbody>
                    {filteredData
                        .slice(0, isExpanded ? undefined : 10)
                        .map((row, rowIdx) => (
                            <tr
                                key={rowIdx}
                                className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200 group"
                            >
                              {Object.values(row).map((cell: any, cellIdx) => (
                                  <td key={cellIdx} className={`px-6 py-4 text-sm font-medium ${cellIdx === 0 ? 'text-primary font-black italic' : 'text-slate-300'}`}>
                                    {cell}
                                  </td>
                              ))}
                            </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
            )}

            <div className="absolute inset-0 pointer-events-none border border-white/5"></div>

            {/* Subtle gradient overlay when collapsed */}
            {!loading && !error && data.length > 10 && !isExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none"></div>
            )}
          </div>

          {/* Expand Button outside the sheet */}
          {!loading && !error && data.length > 10 && (
              <div className="mt-8 flex justify-center">
                <button
                    onClick={() => {
                      if (!isExpanded) {
                        setIsExpanding(true);
                        setTimeout(() => {
                          setIsExpanded(true);
                          setIsExpanding(false);
                        }, 800);
                      } else {
                        setIsExpanded(false);
                      }
                    }}
                    className="bg-surface-container border border-white/10 px-10 py-4 rounded-sm font-black italic uppercase tracking-widest text-[11px] text-white hover:bg-primary hover:text-white hover:scale-105 transition-all duration-500 shadow-2xl flex items-center gap-3 group"
                >
                  {isExpanded ? 'VER MENOS' : 'VER MÁS'}
                  <ChevronRight className={`w-5 h-5 transition-transform duration-500 group-hover:translate-x-1 ${isExpanded ? '-rotate-90' : 'rotate-90'}`} />
                </button>
              </div>
          )}

          <p className="mt-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-center">
            * LOS DATOS SE ACTUALIZAN AUTOMÁTICAMENTE DESDE EL PANEL DE COMISARIOS
          </p>
        </div>
      </section>
  );
};

const Regulations = ({ config }: { config: any }) => {
  const [activeTab, setActiveTab] = useState<'VISTA RÁPIDA' | 'REGLAMENTO COMPLETO'>('VISTA RÁPIDA');
  const [activeClass, setActiveClass] = useState<'CLASE 2' | 'CLASE 3'>('CLASE 2');
  const [stewards, setStewards] = useState<any[]>([]);
  const [loadingStewards, setLoadingStewards] = useState(true);
  const [errorStewards, setErrorStewards] = useState<string | null>(null);

  const regulationDocUrl = getGoogleDocUrl(config.docId);

  const driverSheetUrls = {
    'CLASE 2': getGoogleSheetUrl(config.sheetId, config.gids.driversC2),
    'CLASE 3': getGoogleSheetUrl(config.sheetId, config.gids.driversC3)
  };

  useEffect(() => {
    const fetchStewards = async () => {
      setLoadingStewards(true);
      setErrorStewards(null);
      try {
        const url = driverSheetUrls[activeClass];
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch drivers (Status: ${response.status})`);
        const csvString = await response.text();

        Papa.parse(csvString, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            // Filter drivers where COMISARIO is checked (TRUE, X, or 1) and name is not empty
            const filtered = results.data.filter((d: any) => {
              const val = (d.COMISARIO || '').toString().toUpperCase().trim();
              const isChecked = val === 'TRUE' || val === 'X' || val === '1';
              const hasName = d.PILOTO && d.PILOTO.trim() !== '';
              return isChecked && hasName;
            });
            setStewards(filtered);
            setLoadingStewards(false);
          },
          error: (err: any) => {
            console.error('CSV Parsing Error:', err);
            setErrorStewards('Error al procesar los comisarios');
            setLoadingStewards(false);
          }
        });
      } catch (err: any) {
        console.error('Fetch Error:', err);
        setErrorStewards(`Error al cargar la lista de comisarios: ${err.message}`);
        setLoadingStewards(false);
      }
    };

    if (activeTab === 'VISTA RÁPIDA') {
      fetchStewards();
    }
  }, [activeClass, config, activeTab]);

  const classSpecs = {
    'CLASE 2': [
      { label: "POTENCIA", value: "230 HP" },
      { label: "PESO INICIAL", value: "1050 KG" },
      { label: "AERODINÁMICA", value: "SIN CARGAS" }
    ],
    'CLASE 3': [
      { label: "POTENCIA", value: "300 HP" },
      { label: "PESO INICIAL", value: "1140 KG" },
      { label: "AERODINÁMICA", value: "KIT LIBRE" }
    ]
  };

  const classRegulations = {
    'CLASE 2': [
      {
        id: "ART. 01",
        icon: Gavel,
        title: "COMISARIOS Y VOTACIÓN",
        items: [
          "4 comisarios oficiales por clase",
          "Votación neutral obligatoria",
          "Involucrados sin derecho a voto"
        ],
        accent: "border-primary"
      },
      {
        id: "ART. 02",
        icon: Flag,
        title: "PENALIZACIONES",
        items: [
          "Recargos: 5s / 15s / 30s",
          "Límite de tiempo excedido",
          "BANDERA NEGRA inmediata"
        ],
        accent: "border-red-500"
      },
      {
        id: "ART. 03",
        icon: ShieldCheck,
        title: "COMPORTAMIENTO",
        items: [
          "Obstaculizar: Pase y siga",
          "Banderas: Pit Stop próxima fecha",
          "2 Inasistencias: Exclusión"
        ],
        accent: "border-emerald-500"
      },
      {
        id: "ART. 04",
        icon: Settings,
        title: "BOXES Y AERO",
        items: [
          "Sin cargas aerodinámicas",
          "Sin alerón, faldones ni spoilers",
          "Boxes en Clasificación: Sanción"
        ],
        accent: "border-amber-500"
      }
    ],
    'CLASE 3': [
      {
        id: "ART. 01",
        icon: Gavel,
        title: "COMISARIOS Y VOTACIÓN",
        items: [
          "4 comisarios oficiales por clase",
          "Votación neutral obligatoria",
          "Involucrados sin derecho a voto"
        ],
        accent: "border-primary"
      },
      {
        id: "ART. 02",
        icon: Flag,
        title: "PENALIZACIONES",
        items: [
          "Recargos: 5s / 15s / 30s",
          "Límite de tiempo excedido",
          "BANDERA NEGRA inmediata"
        ],
        accent: "border-red-500"
      },
      {
        id: "ART. 03",
        icon: ShieldCheck,
        title: "COMPORTAMIENTO",
        items: [
          "Obstaculizar: Pase y siga",
          "Banderas: Pit Stop próxima fecha",
          "2 Inasistencias: Exclusión"
        ],
        accent: "border-emerald-500"
      },
      {
        id: "ART. 04",
        icon: Settings,
        title: "BOXES Y AERO",
        items: [
          "Kit aerodinámico libre",
          "Prohibido boxes en clasificación",
          "Sanción: Pase y siga en carrera"
        ],
        accent: "border-amber-500"
      }
    ]
  };

  return (
      <section className="py-12 md:py-24 px-4 md:px-8 bg-surface-container-low" id="regulations">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 md:mb-12 gap-4 md:gap-8">
            <div className="flex items-center gap-4">
              <div className="w-1 h-8 bg-primary"></div>
              <h2 className="text-4xl font-black uppercase italic tracking-tighter">REGLAMENTO TÉCNICO</h2>
            </div>

            <div className="flex flex-wrap gap-4">
              {/* Selector de Clase */}
              <div className="flex bg-surface-container p-1 rounded-sm border border-white/10 kinetic-skew">
                {['CLASE 2', 'CLASE 3'].map((cls) => (
                    <button
                        key={cls}
                        onClick={() => setActiveClass(cls as any)}
                        className={`px-6 py-2 text-[10px] font-black italic uppercase tracking-widest transition-all duration-300 ${
                            activeClass === cls
                                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                : 'text-slate-500 hover:text-slate-300'
                        }`}
                    >
                      {cls}
                    </button>
                ))}
              </div>

              {/* Selector de Vista */}
              <div className="flex bg-surface-container p-1 rounded-sm border border-white/10">
                {['VISTA RÁPIDA', 'REGLAMENTO COMPLETO'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`px-6 py-2 text-[10px] font-black italic uppercase tracking-widest transition-all duration-300 ${
                            activeTab === tab
                                ? 'bg-white text-slate-950'
                                : 'text-slate-500 hover:text-slate-300'
                        }`}
                    >
                      {tab}
                    </button>
                ))}
              </div>
            </div>
          </div>

          {activeTab === 'VISTA RÁPIDA' ? (
              <>
                <div className="flex flex-col lg:flex-row gap-16">
                  <div className="lg:w-1/3">
                    <div className="mb-8">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary block mb-4">ESPECIFICACIONES {activeClass}</span>
                      <div className="grid grid-cols-2 gap-4">
                        {classSpecs[activeClass].map((spec, i) => (
                            <div key={i} className="bg-surface-container p-4 border-l-2 border-primary/30">
                              <span className="text-[9px] font-black text-slate-500 uppercase block mb-1">{spec.label}</span>
                              <span className="text-white font-bold italic tracking-tight">{spec.value}</span>
                            </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary block mb-4">SISTEMA DE PUNTOS</span>
                      <div className="bg-surface-container border border-white/5 overflow-hidden">
                        <div className="grid grid-cols-1 divide-y divide-white/5">
                          {[
                            { p: "1°", v: "25 PTS", color: "text-primary" },
                            { p: "2°", v: "18 PTS", color: "text-white" },
                            { p: "3°", v: "15 PTS", color: "text-white" },
                            { p: "4°", v: "12 PTS", color: "text-slate-400" },
                            { p: "5°", v: "10 PTS", color: "text-slate-400" },
                            { p: "6°", v: "8 PTS", color: "text-slate-500" },
                            { p: "7°", v: "6 PTS", color: "text-slate-500" }
                          ].map((pt, i) => (
                              <div key={i} className="flex justify-between items-center px-4 py-2 hover:bg-white/5 transition-colors">
                                <span className="text-[10px] font-black text-slate-500 italic">{pt.p} PUESTO</span>
                                <span className={`text-xs font-black italic ${pt.color}`}>{pt.v}</span>
                              </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary block mb-4">SISTEMA DE LASTRES</span>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { p: "1°", w: "15", unit: "KG", label: "WINNER" },
                          { p: "2°", w: "10", unit: "KG", label: "RUNNER-UP" },
                          { p: "3°", w: "5", unit: "KG", label: "PODIUM" }
                        ].map((ls, i) => (
                            <div key={i} className="bg-surface-container p-3 border border-white/5 flex flex-col items-center justify-center kinetic-skew group hover:border-primary/50 transition-all">
                              <span className="text-[8px] font-black text-slate-500 mb-1">{ls.p} LUGAR</span>
                              <div className="flex items-baseline gap-0.5">
                                <span className="text-xl font-black italic text-white group-hover:text-primary transition-colors">+{ls.w}</span>
                                <span className="text-[8px] font-bold text-slate-400">{ls.unit}</span>
                              </div>
                            </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-primary/10 border-l-4 border-primary p-6 relative overflow-hidden group">
                      <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
                        <Flag className="w-24 h-24 rotate-12" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary block mb-3">SISTEMA DE ASCENSO Y DESCENSO</span>
                      <div className="space-y-4 relative z-10">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                            <ChevronRight className="w-4 h-4 text-primary -rotate-90" />
                          </div>
                          <div>
                            <p className="text-white text-[11px] font-black uppercase italic leading-none">CLASE 2 → CLASE 3</p>
                            <p className="text-slate-400 text-[10px] font-bold uppercase">TOP 4 ASCIENDEN DIRECTO</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                            <ChevronRight className="w-4 h-4 text-red-500 rotate-90" />
                          </div>
                          <div>
                            <p className="text-white text-[11px] font-black uppercase italic leading-none">CLASE 3 → CLASE 2</p>
                            <p className="text-slate-400 text-[10px] font-bold uppercase">ÚLTIMOS 4 DESCIENDEN</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {classRegulations[activeClass].map((item, idx) => (
                        <div key={idx} className={`relative p-8 bg-surface-container hover:bg-surface-container-high transition-all group border-l-4 ${item.accent} overflow-hidden`}>
                          {/* Background Decoration */}
                          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <item.icon className="w-32 h-32 -mr-12 -mt-12 rotate-12" />
                          </div>

                          <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                              <div className="p-3 bg-white/5 rounded-sm group-hover:bg-primary/20 transition-colors">
                                <item.icon className="w-6 h-6 text-primary" />
                              </div>
                              <span className="text-[10px] font-black font-mono text-slate-600 tracking-widest">{item.id}</span>
                            </div>

                            <h3 className="text-xl font-black uppercase italic tracking-tighter text-white mb-4 group-hover:text-primary transition-colors">
                              {item.title}
                            </h3>

                            <ul className="space-y-3">
                              {item.items.map((bullet, i) => (
                                  <li key={i} className="flex items-center gap-3">
                                    <div className="w-1 h-1 bg-primary rounded-full"></div>
                                    <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400 group-hover:text-slate-200 transition-colors">
                            {bullet}
                          </span>
                                  </li>
                              ))}
                            </ul>
                          </div>

                          {/* Technical Scanline Effect */}
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-1/2 -translate-y-full group-hover:animate-[scanline_2s_linear_infinite] pointer-events-none"></div>
                        </div>
                    ))}
                  </div>
                </div>

                {/* Comisarios Section */}
                <div className="mt-24">
                  <div className="flex items-center gap-4 mb-12">
                    <div className="w-1 h-8 bg-primary"></div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary block mb-1">CUERPO TÉCNICO</span>
                      <h3 className="text-3xl font-black uppercase italic tracking-tighter">COMISARIOS {activeClass}</h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 relative min-h-[200px]">
                    {loadingStewards ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-950/20 backdrop-blur-[2px] z-10">
                          <Loader2 className="w-10 h-10 text-primary animate-spin" />
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">CARGANDO COMISARIOS...</p>
                        </div>
                    ) : errorStewards ? (
                        <div className="col-span-full py-10 text-center text-red-500 font-black uppercase italic tracking-widest text-xs">
                          {errorStewards}
                        </div>
                    ) : stewards.length === 0 ? (
                        <div className="col-span-full py-10 flex flex-col items-center justify-center bg-surface-container border border-dashed border-white/10 rounded-sm">
                          <ShieldCheck className="w-12 h-12 text-slate-500 mb-4 opacity-20" />
                          <p className="text-slate-400 font-black italic uppercase tracking-widest text-sm">No hay comisarios asignados para esta clase</p>
                        </div>
                    ) : (
                        stewards.map((steward, idx) => (
                            <motion.div
                                key={(steward.PILOTO || idx) + activeClass}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="group relative aspect-[3/4] bg-surface-container overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-500 shadow-xl"
                            >
                              {/* Steward Image */}
                              {steward.IMAGEN ? (
                                  <img
                                      src={steward.IMAGEN}
                                      alt={steward.PILOTO}
                                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
                                      referrerPolicy="no-referrer"
                                      draggable="false"
                                  />
                              ) : (
                                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50">
                                    <User className="w-16 h-16 text-slate-800 group-hover:text-primary/20 transition-colors duration-500" />
                                  </div>
                              )}

                              {/* Technical Overlays */}
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>

                              {/* Content */}
                              <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                                <div className="flex items-center gap-1.5 mb-1">
                                  <div className="w-3 h-px bg-primary"></div>
                                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-primary">COMISARIO</span>
                                  <span className="px-1 py-0.5 bg-primary/20 border border-primary/30 rounded-sm text-[6px] font-black text-primary uppercase tracking-widest">
                          {activeClass}
                        </span>
                                </div>
                                <h3 className="text-base font-black italic uppercase tracking-tighter text-white leading-none mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                  {steward.PILOTO}
                                </h3>
                                {steward.NACIONALIDAD && (
                                    <div className="flex items-center gap-1">
                                      <Globe className="w-2.5 h-2.5 text-primary" />
                                      <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400">{steward.NACIONALIDAD}</span>
                                    </div>
                                )}
                              </div>

                              {/* Border Glow */}
                              <div className="absolute inset-0 border border-white/0 group-hover:border-primary/30 transition-all pointer-events-none"></div>
                            </motion.div>
                        ))
                    )}
                  </div>
                </div>
              </>
          ) : (
              <div className="w-full h-[800px] bg-surface-container rounded-sm overflow-hidden border border-white/10 shadow-2xl relative">
                <iframe
                    src={regulationDocUrl}
                    className="w-full h-full grayscale invert-[0.9] opacity-90 contrast-[1.1] brightness-[0.8]"
                    frameBorder="0"
                ></iframe>
                <div className="absolute inset-0 pointer-events-none border border-white/5"></div>
              </div>
          )}
        </div>
      </section>
  );
};

const Footer = () => {
  const { slug } = useParams();
  return (
      <footer className="bg-slate-950 w-full py-12 px-8 border-t-4 border-primary flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
          <Link to={slug ? `/${slug}` : "/"} className="hover:opacity-80 transition-opacity mb-4">
            <img
                src="logo-tn.png"
                alt="Andy Gotfridt"
                className="h-8 w-auto brightness-200 contrast-150"
                referrerPolicy="no-referrer"
                draggable="false"
            />
          </Link>
          <div className="font-black uppercase tracking-widest text-[10px] text-slate-500">
            © 2026 TN Argentina - Powered by <a href='https://prism.com.ar'>Prism</a>
          </div>
        </div>
        <div className="flex gap-6">
          {[
            { icon: Instagram, url: "https://www.instagram.com/turismonacionalgt7", label: "Instagram" },
            //{ icon: Facebook, url: "https://www.facebook.com/", label: "Facebook" },
            //{ icon: Youtube, url: "https://www.youtube.com/", label: "YouTube" },
            //{ icon: MessageCircle, url: "https://wa.me/", label: "WhatsApp" },
          ].map((social) => (
              <a
                  key={social.label}
                  className="p-3 bg-white/5 rounded-full text-slate-500 hover:text-primary hover:bg-primary/10 transition-all duration-300 group"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
              >
                <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
          ))}
        </div>
      </footer>
  );
};

const MainContent = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const { slug } = useParams();
  const location = useLocation();
  const config = CHAMPIONSHIP_CONFIG[slug || 'default'] || CHAMPIONSHIP_CONFIG['default'];

  // Handle anchor scrolling
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Small delay to ensure content is rendered and layout is stable
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const sections = ['hero', 'circuits', 'drivers', 'standings', 'regulations'];

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [slug]);

  return (
      <div className="min-h-screen bg-surface-container-lowest text-slate-100 font-sans selection:bg-primary selection:text-white">
        <Navbar activeSection={activeSection} />
        <div id="hero">
          <Hero label={config.label} />
        </div>
        <Championships config={config} />
        <Drivers config={config} />
        <Standings config={config} />
        <Regulations config={config} />
        <Footer />
      </div>
  );
};

const MainContentWrapper = () => {
  const { slug } = useParams();
  return <MainContent key={slug || 'default'} />;
};

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<MainContentWrapper />} />
        <Route path="/:slug" element={<MainContentWrapper />} />
      </Routes>
  );
}