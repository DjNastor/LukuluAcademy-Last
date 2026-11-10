// Working Academy proposal. Display prices for enquiries; never authorise access from these values.
export const academyModules = [
  { id: 'P1', track: 'production', name: 'FL Studio Essentials', price: 350, weeks: 'Weeks 1–2', description: 'Interface, channel rack, playlist, piano roll and mixer.' },
  { id: 'P2', track: 'production', name: 'Drums & Groove', price: 450, weeks: 'Weeks 2–3', description: 'Step sequencing, percussion, swing and an 8-bar groove.' },
  { id: 'P3', track: 'production', name: 'Chords, Melodies & Arrangement', price: 550, weeks: 'Weeks 4–5', description: 'Keys, bass, MIDI, sound selection and song structure.' },
  { id: 'P4', track: 'production', name: 'Mix, Master & Export', price: 650, weeks: 'Week 6', description: 'Gain staging, EQ, compression, effects, stems and a final track.' },
  { id: 'B1', track: 'business', name: 'Music Industry Foundations', price: 300, weeks: 'Weeks 7–8', description: 'Copyright, masters, publishing, split sheets and agreements.' },
  { id: 'B2', track: 'business', name: 'Royalties & Registration', price: 400, weeks: 'Weeks 8–9', description: 'ISRCs, metadata, collecting societies and royalty tracking.' },
  { id: 'B3', track: 'business', name: 'Distribution & Marketing', price: 450, weeks: 'Weeks 10–11', description: 'Delivery, release timelines, EPKs, social media and outreach.' },
  { id: 'B4', track: 'business', name: 'Artist Business & Final Release Plan', price: 550, weeks: 'Week 12', description: 'Budgeting, bookings and a practical release campaign.' },
] as const;

export const academyTracks = [
  { id: 'production', name: 'Music Production', software: 'FL Studio' },
  { id: 'business', name: 'Music Business', software: null },
] as const;

export const academyProgramme = { name: 'Full Academy programme', price: 3000, accessDays: 90, suggestedWeeks: 12, pricingStatus: 'proposed' } as const;
export const formatRand = (amount: number) => `R${amount.toLocaleString('en-ZA')}`;
export const trackTotal = (track: string) => academyModules.filter(module => module.track === track).reduce((sum, module) => sum + module.price, 0);
