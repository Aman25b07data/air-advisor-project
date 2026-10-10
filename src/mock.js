export const mockAdvice = {
  naqi: 287,
  band: 'Poor',
  decision: { outdoor: 'Avoid', mask: 'N95/FFP2', remote: 'Recommended' },
  exposure: { plan: 412, best: 268, savedPct: 35 },
  windows: [
    { depart: '11:30', mode: 'Metro', exposure: 268 },
    { depart: '08:30', mode: 'Metro', exposure: 340 },
    { depart: '08:30', mode: 'Bike', exposure: 412 },
  ],
}
export const mockReport = {
  totalExposure: 2450,
  averageDailyExposure: 350,

  bestDay: {
    date: '2026-10-08',
    exposure: 180,
  },

  worstDay: {
    date: '2026-10-06',
    exposure: 520,
  },

  daily: [
    { date: 'Oct 04', exposure: 320 },
    { date: 'Oct 05', exposure: 410 },
    { date: 'Oct 06', exposure: 520 },
    { date: 'Oct 07', exposure: 350 },
    { date: 'Oct 08', exposure: 180 },
    { date: 'Oct 09', exposure: 370 },
    { date: 'Oct 10', exposure: 300 },
  ],

  insights: [
    'Your lowest estimated exposure was on October 8.',
    'Metro travel had lower estimated exposure than biking in the sample data.',
    'Choosing a lower-exposure departure window can help reduce your estimated exposure.',
  ],
}