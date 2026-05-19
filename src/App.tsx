/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  addMonths, 
  eachDayOfInterval, 
  endOfMonth, 
  endOfWeek, 
  format, 
  isSameDay, 
  isSameMonth, 
  isToday, 
  startOfMonth, 
  startOfWeek, 
  subMonths 
} from 'date-fns';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Shield, 
  Sword, 
  Zap, 
  Target, 
  Info,
  Calendar as CalendarIcon,
  X,
  Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useMemo } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { HEROES, INITIAL_EVENTS, type Event } from './constants';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');

  // Calendar logic
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  
  const days = useMemo(() => {
    return eachDayOfInterval({ start: startDate, end: endDate });
  }, [startDate, endDate]);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const eventsOnSelectedDay = useMemo(() => {
    return events.filter(event => isSameDay(event.date, selectedDate));
  }, [events, selectedDate]);

  const handleAddEvent = () => {
    if (!newEventTitle) return;
    const newEvent: Event = {
      id: Math.random().toString(36).substr(2, 9),
      date: selectedDate,
      title: newEventTitle,
      description: 'Mission protocol initiated.',
      type: 'mission',
    };
    setEvents([...events, newEvent]);
    setNewEventTitle('');
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen tech-grid text-avenger-silver selection:bg-avenger-teal selection:text-avenger-dark p-4 md:p-8">
      <div className="scanner-line pointer-events-none" />
      
      {/* Header */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="space-y-2">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-avenger-teal font-display text-sm tracking-widest uppercase"
          >
            <Shield className="w-4 h-4" />
            <span>Avengers Command Center</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-black text-white tracking-tighter"
          >
            MISSION <span className="text-avenger-red">LOG</span>
          </motion.h1>
          <p className="text-avenger-silver/60 max-w-md text-xs uppercase tracking-widest font-medium">
            Strategic temporal synchronization system. Monitoring threats across multiverse sectors.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <div className="text-xs text-avenger-teal font-display uppercase tracking-widest">Protocol Status</div>
            <div className="text-lg font-display text-white">ACTIVE</div>
          </div>
          <div className="w-12 h-12 rounded-full border border-avenger-teal flex items-center justify-center animate-pulse">
            <Bell className="w-6 h-6 text-avenger-teal" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Calendar Column */}
        <div className="lg:col-span-8 space-y-6">
          <div className="avenger-card p-6 rounded-xl shadow-2xl backdrop-blur-md">
            
            {/* Calendar Controls */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-display text-white flex items-center gap-3">
                {format(currentDate, 'MMMM')} <span className="text-avenger-teal">{format(currentDate, 'yyyy')}</span>
              </h2>
              <div className="flex gap-2">
                <button 
                  onClick={prevMonth}
                  className="p-2 border border-avenger-teal/30 hover:bg-avenger-teal hover:text-avenger-dark transition-colors rounded"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setCurrentDate(new Date())}
                  className="px-4 py-1 text-xs font-display uppercase border border-avenger-teal/30 hover:bg-avenger-teal hover:text-avenger-dark transition-colors rounded"
                >
                  Present
                </button>
                <button 
                  onClick={nextMonth}
                  className="p-2 border border-avenger-teal/30 hover:bg-avenger-teal hover:text-avenger-dark transition-colors rounded"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center py-2 text-[10px] font-display uppercase text-avenger-teal/50 tracking-widest font-bold">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Rows */}
            <div className="grid grid-cols-7 border-t border-l border-avenger-teal/10">
              {days.map((day, idx) => {
                const dayEvents = events.filter(e => isSameDay(e.date, day));
                const isSelected = isSameDay(day, selectedDate);
                const isCurrentMonth = isSameMonth(day, monthStart);
                const isTodayDate = isToday(day);

                return (
                  <motion.div
                    key={day.toString()}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.005 }}
                    onClick={() => setSelectedDate(day)}
                    className={cn(
                      "min-h-[100px] p-2 border-r border-b border-avenger-teal/10 cursor-pointer transition-all relative group",
                      !isCurrentMonth ? "bg-black/20 text-avenger-silver/20" : "text-avenger-silver",
                      isSelected && "bg-avenger-teal/5 ring-1 ring-inset ring-avenger-teal/50",
                      isTodayDate && "bg-avenger-red/5 ring-1 ring-inset ring-avenger-red/50"
                    )}
                  >
                    <div className="flex justify-between items-start">
                      <span className={cn(
                        "text-sm font-display",
                        isTodayDate && "text-avenger-red",
                        isSelected && "text-avenger-teal"
                      )}>
                        {format(day, 'd')}
                      </span>
                      {dayEvents.length > 0 && (
                        <div className="flex gap-0.5">
                          {dayEvents.slice(0, 3).map((event, i) => (
                            <div 
                              key={i} 
                              className={cn(
                                "w-1.5 h-1.5 rounded-full",
                                event.type === 'hero' ? "bg-avenger-red" : event.type === 'milestone' ? "bg-yellow-500" : "bg-avenger-teal"
                              )} 
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-2 space-y-1">
                      {dayEvents.slice(0, 2).map((event) => (
                        <div 
                          key={event.id} 
                          className="text-[9px] uppercase leading-tight truncate px-1 py-0.5 border-l border-avenger-teal/30 bg-avenger-teal/5 text-avenger-silver/80"
                        >
                          {event.title}
                        </div>
                      ))}
                    </div>

                    {isTodayDate && (
                      <div className="absolute top-1 right-1">
                        <motion.div 
                          animate={{ scale: [1, 1.2, 1] }} 
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="w-2 h-2 rounded-full bg-avenger-red"
                        />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar / Details Column */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div 
            layout
            className="avenger-card p-6 rounded-xl border-avenger-red/30"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-display text-white">Daily Intelligence</h3>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="p-2 bg-avenger-red text-white hover:bg-avenger-red/80 transition-colors rounded-lg shadow-lg shadow-avenger-red/20"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4">
              <div className="text-xs uppercase tracking-widest text-avenger-teal font-display">Sector Date</div>
              <div className="text-2xl font-display">{format(selectedDate, 'eeee, MMM d')}</div>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {eventsOnSelectedDay.length > 0 ? (
                  eventsOnSelectedDay.map((event) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="p-4 bg-white/5 border border-white/10 rounded-lg group hover:border-avenger-teal/50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "p-2 rounded-md",
                          event.type === 'hero' ? "bg-avenger-red/20 text-avenger-red" : "bg-avenger-teal/20 text-avenger-teal"
                        )}>
                          {event.type === 'hero' ? <Sword className="w-4 h-4" /> : <Target className="w-4 h-4" />}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-display text-white uppercase tracking-tight">{event.title}</div>
                          <div className="text-xs text-avenger-silver/60 mt-1">{event.description}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-12 text-center border-2 border-dashed border-white/5 rounded-xl"
                  >
                    <Info className="w-8 h-8 text-white/10 mx-auto mb-2" />
                    <p className="text-xs text-white/20 uppercase tracking-[0.2em]">No missions detected</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Quick Stats / Global Status */}
          <div className="avenger-card p-6 rounded-xl">
             <h3 className="text-xs font-display text-avenger-teal uppercase tracking-widest mb-4">Hero Roster Status</h3>
             <div className="grid grid-cols-2 gap-4">
                {HEROES.map((hero) => (
                  <div key={hero.id} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: hero.color }} />
                    <span className="text-[10px] uppercase font-bold text-avenger-silver/80">{hero.alias}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </main>

      {/* Add Event Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md avenger-card p-8 rounded-2xl border-avenger-teal/30"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-1 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h2 className="text-2xl font-display text-white mb-6 flex items-center gap-3">
                <Target className="text-avenger-teal" />
                INITIATE MISSION
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-avenger-teal mb-2">Subject Title</label>
                  <input 
                    type="text" 
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    placeholder="Enter mission objective..."
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-avenger-teal transition-colors"
                  />
                </div>
                
                <div className="p-4 bg-avenger-teal/5 border border-avenger-teal/10 rounded-lg">
                  <div className="text-[10px] uppercase font-bold text-avenger-teal mb-1">Target Date</div>
                  <div className="text-lg font-display text-white">{format(selectedDate, 'PPP')}</div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 rounded-lg border border-white/10 text-[11px] font-display uppercase tracking-widest hover:bg-white/5 transition-colors"
                  >
                    Abort
                  </button>
                  <button 
                    onClick={handleAddEvent}
                    className="px-6 py-3 rounded-lg bg-avenger-teal text-avenger-dark text-[11px] font-display uppercase tracking-widest font-black hover:shadow-[0_0_20px_rgba(102,252,241,0.4)] transition-all"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer Info */}
      <footer className="max-w-7xl mx-auto mt-20 pt-8 border-t border-avenger-teal/10 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-white/20">
        <div>Proprietary System of Stark Industries © 2026</div>
        <div className="flex gap-6 mt-4 md:mt-0">
          <span>Shield Encrypted</span>
          <span>Level 7 Access Only</span>
          <span>Earth-616 Protocol</span>
        </div>
      </footer>
    </div>
  );
}
