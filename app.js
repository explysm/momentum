const { useState, useEffect, useMemo } = React;
const { motion, AnimatePresence } = FramerMotion;

const App = () => {
    const [viewDate, setViewDate] = useState(new Date());
    const [now, setNow] = useState(new Date());
    const [focusedDay, setFocusedDay] = useState(null);

    // Update the clock every second for the momentum flow
    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const monthName = viewDate.toLocaleString('default', { month: 'long' });
    const year = viewDate.getFullYear();
    const daysInMonth = useMemo(() => 
        new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate(), 
    [viewDate]);

    const changeMonth = (offset) => {
        setFocusedDay(null);
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
    };

    const dayProgress = (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) / 86400;

    // Organic positioning for the "Human" feel
    const getOrganicOffset = (index) => ({
        x: Math.sin(index * 0.5) * 2,
        y: Math.cos(index * 0.5) * 2
    });

    const getOrdinal = (n) => {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
            
            {/* Ambient Background Breath */}
            <div className="fixed inset-0 pointer-events-none glass-glow">
                <motion.div 
                    animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-1/4 w-[60%] h-[60%] bg-indigo-500/10 blur-[120px] rounded-full"
                />
            </div>

            <div className="w-full max-w-lg z-10 space-y-16">
                {/* Header Section */}
                <header className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-8">
                        <button onClick={() => changeMonth(-1)} className="p-3 text-zinc-600 hover:text-white active:scale-90 transition-all">
                            <i data-lucide="chevron-left"></i>
                        </button>
                        
                        <motion.div 
                            key={monthName}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center"
                        >
                            <h1 className="text-4xl font-extralight tracking-[0.2em] uppercase text-white italic">
                                {monthName}
                            </h1>
                            <p className="text-[10px] tracking-[0.5em] text-zinc-600 mt-2 font-light uppercase">
                                {year}
                            </p>
                        </motion.div>

                        <button onClick={() => changeMonth(1)} className="p-3 text-zinc-600 hover:text-white active:scale-90 transition-all">
                            <i data-lucide="chevron-right"></i>
                        </button>
                    </div>
                </header>

                {/* The Dot Grid */}
                <div className="relative min-h-[340px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={`${monthName}-${year}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, filter: "blur(10px)" }}
                            className="grid grid-cols-7 gap-x-6 gap-y-10"
                        >
                            {Array.from({ length: daysInMonth }).map((_, i) => {
                                const day = i + 1;
                                const isToday = now.getDate() === day && now.getMonth() === viewDate.getMonth();
                                const isPast = new Date(viewDate.getFullYear(), viewDate.getMonth(), day) < new Date(now.getFullYear(), now.getMonth(), now.getDate());
                                const isFocused = focusedDay === day;
                                const offset = getOrganicOffset(i);

                                return (
                                    <div key={day} className="relative flex items-center justify-center">
                                        <AnimatePresence>
                                            {isFocused && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 5 }}
                                                    animate={{ opacity: 1, y: -24 }}
                                                    exit={{ opacity: 0 }}
                                                    className="absolute text-[11px] font-light tracking-widest text-white italic whitespace-nowrap"
                                                >
                                                    {getOrdinal(day)}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <motion.div
                                            whileHover={{ scale: 1.5 }}
                                            onClick={() => setFocusedDay(isFocused ? null : day)}
                                            style={{ x: offset.x, y: offset.y }}
                                            className={`cursor-pointer transition-all duration-700 ease-out
                                                ${isToday ? 'w-3 h-3 bg-white shadow-[0_0_15px_white] rounded-full' : 'w-2 h-2 rounded-[30%]'}
                                                ${isPast ? 'bg-zinc-800' : !isToday ? 'bg-zinc-700/20 border border-white/5' : ''}
                                                ${isFocused ? 'scale-150 rotate-45 ring-2 ring-white/20' : ''}
                                            `}
                                        />
                                    </div>
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Progress Tracking Footer */}
                <footer className="space-y-12 max-w-xs mx-auto text-center" onClick={() => setFocusedDay(null)}>
                    <div className="space-y-4">
                        <div className="h-[1px] w-full bg-white/5 relative">
                            <motion.div 
                                animate={{ width: `${dayProgress * 100}%` }}
                                className="absolute top-0 left-0 h-full bg-white/30"
                            />
                        </div>
                        <div className="flex justify-between items-center text-[8px] tracking-[0.3em] text-zinc-600 font-light uppercase">
                           <span>Dawn</span>
                           <span className="text-zinc-400 font-medium italic">{Math.floor(dayProgress * 100)}% Momentum</span>
                           <span>Dusk</span>
                        </div>
                    </div>

                    <div className="text-2xl font-extralight tracking-[0.4em] text-white/20 italic">
                       {now.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </div>
                </footer>
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// Initialize icons after React render
setTimeout(() => {
    if (window.lucide) {
        window.lucide.createIcons();
    }
}, 500);
