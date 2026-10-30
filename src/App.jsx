import { useEffect, useState } from "react";

const matches = [
  { id: 7, matchNo: "7th Match", teams: "Lumbini Lions vs Chitwan Rhinos", date: "2026-10-31", timeNPT: "12:30", venue: "Kirtipur" },
  { id: 8, matchNo: "8th Match", teams: "Sudurpaschim Royals vs Biratnagar Kings", date: "2026-10-31", timeNPT: "17:00", venue: "Kirtipur" },
  { id: 9, matchNo: "9th Match", teams: "Janakpur Bolts vs Pokhara Avengers", date: "2026-11-01", timeNPT: "17:00", venue: "Kirtipur" },
  { id: 10, matchNo: "10th Match", teams: "Kathmandu Gorkhas vs Karnali Yaks", date: "2026-11-02", timeNPT: "12:30", venue: "Kirtipur" },
  { id: 11, matchNo: "11th Match", teams: "Sudurpaschim Royals vs Chitwan Rhinos", date: "2026-11-02", timeNPT: "17:00", venue: "Kirtipur" },
  { id: 12, matchNo: "12th Match", teams: "Biratnagar Kings vs Janakpur Bolts", date: "2026-11-03", timeNPT: "12:30", venue: "Kirtipur" },
  { id: 13, matchNo: "13th Match", teams: "Lumbini Lions vs Pokhara Avengers", date: "2026-11-03", timeNPT: "17:00", venue: "Kirtipur" },
  { id: 14, matchNo: "14th Match", teams: "Lumbini Lions vs Janakpur Bolts", date: "2026-11-05", timeNPT: "12:30", venue: "Kirtipur" },
  { id: 15, matchNo: "15th Match", teams: "Kathmandu Gorkhas vs Biratnagar Kings", date: "2026-11-05", timeNPT: "17:00", venue: "Kirtipur" },
  { id: 16, matchNo: "16th Match", teams: "Sudurpaschim Royals vs Karnali Yaks", date: "2026-11-06", timeNPT: "12:30", venue: "Kirtipur" },
  { id: 17, matchNo: "17th Match", teams: "Chitwan Rhinos vs Pokhara Avengers", date: "2026-11-06", timeNPT: "17:00", venue: "Kirtipur" },
  { id: 18, matchNo: "18th Match", teams: "Kathmandu Gorkhas vs Lumbini Lions", date: "2026-11-07", timeNPT: "17:00", venue: "Kirtipur" },
  { id: 19, matchNo: "19th Match", teams: "Pokhara Avengers vs Karnali Yaks", date: "2026-11-09", timeNPT: "12:30", venue: "Kirtipur" },
  { id: 20, matchNo: "20th Match", teams: "Chitwan Rhinos vs Kathmandu Gorkhas", date: "2026-11-09", timeNPT: "17:00", venue: "Kirtipur" },
  { id: 21, matchNo: "21st Match", teams: "Sudurpaschim Royals vs Janakpur Bolts", date: "2026-11-10", timeNPT: "17:00", venue: "Kirtipur" },
  { id: 22, matchNo: "22nd Match", teams: "Biratnagar Kings vs Pokhara Avengers", date: "2026-11-12", timeNPT: "12:30", venue: "Kirtipur" },
  { id: 23, matchNo: "23rd Match", teams: "Karnali Yaks vs Lumbini Lions", date: "2026-11-12", timeNPT: "17:00", venue: "Kirtipur" },
  { id: 24, matchNo: "24th Match", teams: "Kathmandu Gorkhas vs Sudurpaschim Royals", date: "2026-11-13", timeNPT: "12:30", venue: "Kirtipur" },
  { id: 25, matchNo: "25th Match", teams: "Chitwan Rhinos vs Janakpur Bolts", date: "2026-11-13", timeNPT: "17:00", venue: "Kirtipur" },
  { id: 26, matchNo: "26th Match", teams: "Biratnagar Kings vs Lumbini Lions", date: "2026-11-14", timeNPT: "17:00", venue: "Kirtipur" },
  { id: 27, matchNo: "27th Match", teams: "Chitwan Rhinos vs Karnali Yaks", date: "2026-11-15", timeNPT: "12:30", venue: "Kirtipur" },
  { id: 28, matchNo: "28th Match", teams: "Kathmandu Gorkhas vs Pokhara Avengers", date: "2026-11-15", timeNPT: "17:00", venue: "Kirtipur" },
  { id: 29, matchNo: "Qualifier 1", teams: "1st Seed vs 2nd Seed", date: "2026-11-17", timeNPT: "17:00", venue: "Kirtipur" },
  { id: 30, matchNo: "Eliminator", teams: "3rd Seed vs 4th Seed", date: "2026-11-18", timeNPT: "17:00", venue: "Kirtipur" },
  { id: 31, matchNo: "Qualifier 2", teams: "Loser Q1 vs Winner Eliminator", date: "2026-11-19", timeNPT: "17:00", venue: "Kirtipur" },
  { id: 32, matchNo: "Grand Final", teams: "Winner Q1 vs Winner Q2", date: "2026-11-21", timeNPT: "17:00", venue: "Kirtipur" },
];

const timezones = [
  { label: "Local Device Time (Auto)", value: "auto" },
  { label: "Nepal Time (NPT - Kathmandu)", value: "Asia/Kathmandu" },
  { label: "India Time (IST - New Delhi)", value: "Asia/Kolkata" },
  { label: "United Kingdom (GMT/BST - London)", value: "Europe/London" },
  { label: "United States (EST - New York)", value: "America/New_York" },
  { label: "United States (PST - Los Angeles)", value: "America/Los_Angeles" },
  { label: "United Arab Emirates (GST - Dubai)", value: "Asia/Dubai" },
  { label: "Australia (AEST - Sydney)", value: "Australia/Sydney" },
  { label: "Qatar (AST - Doha)", value: "Asia/Qatar" },
  { label: "Malaysia (MYT - Kuala Lumpur)", value: "Asia/Kuala_Lumpur" },
  { label: "UTC (Coordinated Universal Time)", value: "UTC" },
];

function getSavedTimezone() {
  try {
    return localStorage.getItem("npl_selected_timezone") || "auto";
  } catch {
    return "auto";
  }
}

function getSavedView() {
  try {
    const savedView = localStorage.getItem("npl_schedule_view");
    return savedView === "calendar" ? "calendar" : "list";
  } catch {
    return "list";
  }
}

function getLocalDateKey(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    year: "numeric", month: "2-digit", day: "2-digit", timeZone,
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function CalendarView({ timeZone }) {
  const [month, setMonth] = useState(() => {
    const firstMatch = new Date(`${matches[0].date}T${matches[0].timeNPT}:00+05:45`);
    const [year, monthNumber] = getLocalDateKey(firstMatch, timeZone).split("-").map(Number);
    return { year, month: monthNumber - 1 };
  });
  const monthStart = new Date(Date.UTC(month.year, month.month, 1));
  const daysInMonth = new Date(Date.UTC(month.year, month.month + 1, 0)).getUTCDate();
  const leadingDays = monthStart.getUTCDay();
  const monthLabel = new Intl.DateTimeFormat("en-US", {
    month: "long", year: "numeric", timeZone: "UTC",
  }).format(monthStart);
  const matchesByDate = new Map();

  matches.forEach((match) => {
    const instant = new Date(`${match.date}T${match.timeNPT}:00+05:45`);
    const dateKey = getLocalDateKey(instant, timeZone);
    (matchesByDate.get(dateKey) ?? matchesByDate.set(dateKey, []).get(dateKey)).push({ match, instant });
  });

  const cells = Array.from({ length: leadingDays + daysInMonth }, (_, index) => {
    if (index < leadingDays) return null;
    return index - leadingDays + 1;
  });
  while (cells.length % 7 !== 0) cells.push(null);

  function shiftMonth(amount) {
    const nextMonth = new Date(Date.UTC(month.year, month.month + amount, 1));
    setMonth({ year: nextMonth.getUTCFullYear(), month: nextMonth.getUTCMonth() });
  }

  return (
    <section aria-label="Match calendar" className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800 shadow-md">
      <div className="flex items-center justify-between border-b border-slate-700 p-4">
        <button type="button" onClick={() => shiftMonth(-1)} aria-label="Previous month" className="rounded-lg border border-slate-600 px-3 py-2 text-slate-200 transition hover:border-amber-500 hover:text-amber-400">←</button>
        <h3 className="text-lg font-bold text-slate-100">{monthLabel}</h3>
        <button type="button" onClick={() => shiftMonth(1)} aria-label="Next month" className="rounded-lg border border-slate-600 px-3 py-2 text-slate-200 transition hover:border-amber-500 hover:text-amber-400">→</button>
      </div>
      <div className="grid grid-cols-7 border-b border-slate-700 bg-slate-900/60">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="px-1 py-2 text-center text-xs font-semibold text-slate-400 sm:py-3">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((day, index) => {
          const dateKey = day ? `${month.year}-${String(month.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}` : `empty-${index}`;
          const dayMatches = day ? matchesByDate.get(dateKey) ?? [] : [];
          return (
            <div key={dateKey} className={`min-h-24 border-b border-r border-slate-700/70 p-1 sm:min-h-32 sm:p-2 ${day ? "bg-slate-800/70" : "bg-slate-900/30"}`}>
              {day && <div className="mb-1 text-right text-xs text-slate-400 sm:text-sm">{day}</div>}
              <div className="space-y-1">
                {dayMatches.map(({ match, instant }) => (
                  <div key={match.id} title={`${match.matchNo}: ${match.teams}`} className="rounded-md border border-amber-500/20 bg-amber-500/10 p-1 text-[10px] leading-tight text-amber-100 sm:p-1.5 sm:text-xs">
                    <div className="font-bold text-amber-400">{new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone }).format(instant)}</div>
                    <div className="mt-0.5 hidden sm:block">{match.matchNo}</div>
                    <div className="mt-0.5 line-clamp-2 hidden text-slate-300 sm:block">{match.teams}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function App() {
  const [selectedTimezone, setSelectedTimezone] = useState(getSavedTimezone);
  const [view, setView] = useState(getSavedView);
  const targetTimezone = selectedTimezone === "auto"
    ? Intl.DateTimeFormat().resolvedOptions().timeZone
    : selectedTimezone;

  useEffect(() => {
    try {
      localStorage.setItem("npl_selected_timezone", selectedTimezone);
    } catch {
      // The schedule still works when browser storage is unavailable.
    }
  }, [selectedTimezone]);

  useEffect(() => {
    try {
      localStorage.setItem("npl_schedule_view", view);
    } catch {
      // The view toggle still works when browser storage is unavailable.
    }
  }, [view]);

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6">
      <header className="mb-8 rounded-2xl border border-slate-700 bg-slate-800/60 p-6 text-center shadow-xl backdrop-blur-md">
        <h1 className="mb-2 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
          🇳🇵 Nepal Premier League 2026
        </h1>
        <p className="text-sm text-slate-400 sm:text-base">
          View match schedules converted automatically to your local timezone. Preference is saved automatically!
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <label htmlFor="timezoneSelect" className="text-sm font-semibold text-slate-300">
            Select Your Timezone:
          </label>
          <select
            id="timezoneSelect"
            value={selectedTimezone}
            onChange={(event) => setSelectedTimezone(event.target.value)}
            className="block rounded-lg border border-slate-600 bg-slate-900 p-2.5 text-sm text-slate-100 shadow-inner outline-none transition focus:border-amber-500 focus:ring-amber-500"
          >
            {timezones.map((timezone) => (
              <option key={timezone.value} value={timezone.value}>{timezone.label}</option>
            ))}
          </select>
        </div>
      </header>

      <main>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="border-l-4 border-amber-500 pl-3 text-xl font-bold text-slate-200">
            Tournament Fixtures
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400">
              Timezone: {targetTimezone}
            </span>
            <div className="flex rounded-lg border border-slate-700 bg-slate-800 p-1" aria-label="Fixture view">
              {[{ id: "list", label: "List" }, { id: "calendar", label: "Calendar" }].map((option) => (
                <button key={option.id} type="button" onClick={() => setView(option.id)} aria-pressed={view === option.id} className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${view === option.id ? "bg-amber-500 text-slate-950" : "text-slate-300 hover:text-white"}`}>
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {view === "calendar" ? <CalendarView timeZone={targetTimezone} /> : <div className="grid gap-4">
          {matches.map((match) => {
            const matchDate = new Date(`${match.date}T${match.timeNPT}:00+05:45`);
            const formattedDate = new Intl.DateTimeFormat("en-US", {
              weekday: "short", month: "short", day: "numeric", timeZone: targetTimezone,
            }).format(matchDate);
            const formattedTime = new Intl.DateTimeFormat("en-US", {
              hour: "numeric", minute: "2-digit", hour12: true, timeZone: targetTimezone,
            }).format(matchDate);

            return (
              <article
                key={match.id}
                className="flex flex-col items-start justify-between gap-4 rounded-xl border border-slate-700/80 bg-slate-800 p-4 shadow-md transition hover:border-amber-500/50 sm:flex-row sm:items-center sm:p-5"
              >
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="rounded bg-amber-500/20 px-2.5 py-0.5 text-xs font-bold text-amber-400">{match.matchNo}</span>
                    <span className="text-xs text-slate-400">📍 {match.venue} Stadium</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-100 sm:text-lg">{match.teams}</h3>
                  <p className="mt-1 text-xs text-slate-400">Nepal Time: {match.date} at {match.timeNPT} NPT</p>
                </div>
                <div className="w-full min-w-[170px] rounded-lg border border-slate-700/60 bg-slate-900/80 p-3 text-right sm:w-auto">
                  <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">Your Local Time</div>
                  <div className="mt-0.5 text-base font-extrabold text-slate-100 sm:text-lg">{formattedTime}</div>
                  <div className="text-xs text-slate-400">{formattedDate}</div>
                </div>
              </article>
            );
          })}
        </div>}
      </main>
    </div>
  );
}

export default App;
