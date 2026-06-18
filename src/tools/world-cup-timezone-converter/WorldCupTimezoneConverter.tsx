import { useEffect, useState } from "react";

const matches = [
    { name: "Czechia vs South Africa", date: "2026-06-18T18:00:00+02:00" },
    { name: "Switzerland vs Bosnia and Herzegovina", date: "2026-06-18T21:00:00+02:00" },
    { name: "Canada vs Qatar", date: "2026-06-19T00:00:00+02:00" },
    { name: "Mexico vs South Korea", date: "2026-06-19T03:00:00+02:00" },

    { name: "USA vs Australia", date: "2026-06-19T21:00:00+02:00" },
    { name: "Scotland vs Morocco", date: "2026-06-20T00:00:00+02:00" },
    { name: "Brazil vs Haiti", date: "2026-06-20T02:30:00+02:00" },
    { name: "Turkey vs Paraguay", date: "2026-06-20T05:00:00+02:00" },

    { name: "Netherlands vs Sweden", date: "2026-06-20T19:00:00+02:00" },
    { name: "Germany vs Ivory Coast", date: "2026-06-20T22:00:00+02:00" },
    { name: "Ecuador vs Curacao", date: "2026-06-21T02:00:00+02:00" },
    { name: "Tunisia vs Japan", date: "2026-06-21T06:00:00+02:00" },

    { name: "Spain vs Saudi Arabia", date: "2026-06-21T18:00:00+02:00" },
    { name: "Belgium vs Iran", date: "2026-06-21T21:00:00+02:00" },
    { name: "Uruguay vs Cape Verde", date: "2026-06-22T00:00:00+02:00" },
    { name: "New Zealand vs Egypt", date: "2026-06-22T03:00:00+02:00" },

    { name: "Argentina vs Austria", date: "2026-06-22T19:00:00+02:00" },
    { name: "France vs Iraq", date: "2026-06-22T23:00:00+02:00" },
    { name: "Norway vs Senegal", date: "2026-06-23T02:00:00+02:00" },
    { name: "Jordan vs Algeria", date: "2026-06-23T05:00:00+02:00" },
];

const timeZones = [
    { label: "UTC / Greenwich / London", zone: "Europe/London" },

    { label: "UTC+1 — Lisbon, London winter", zone: "Europe/Lisbon" },
    { label: "UTC+1 — Berlin, Paris, Rome, Madrid, Zurich", zone: "Europe/Berlin" },

    { label: "UTC+2 — Athens, Cairo, Johannesburg", zone: "Europe/Athens" },
    { label: "UTC+3 — Istanbul, Moscow, Doha, Riyadh", zone: "Europe/Istanbul" },
    { label: "UTC+3:30 — Tehran", zone: "Asia/Tehran" },
    { label: "UTC+4 — Dubai, Abu Dhabi, Baku", zone: "Asia/Dubai" },
    { label: "UTC+4:30 — Kabul", zone: "Asia/Kabul" },
    { label: "UTC+5 — Karachi, Tashkent", zone: "Asia/Karachi" },
    { label: "UTC+5:30 — Mumbai, New Delhi", zone: "Asia/Kolkata" },
    { label: "UTC+5:45 — Kathmandu", zone: "Asia/Kathmandu" },
    { label: "UTC+6 — Dhaka, Almaty", zone: "Asia/Dhaka" },
    { label: "UTC+6:30 — Yangon", zone: "Asia/Yangon" },
    { label: "UTC+7 — Bangkok, Hanoi, Jakarta", zone: "Asia/Bangkok" },
    { label: "UTC+8 — Beijing, Singapore, Hong Kong, Perth", zone: "Asia/Singapore" },
    { label: "UTC+9 — Tokyo, Seoul", zone: "Asia/Tokyo" },
    { label: "UTC+9:30 — Adelaide, Darwin", zone: "Australia/Adelaide" },
    { label: "UTC+10 — Sydney, Melbourne, Brisbane", zone: "Australia/Sydney" },
    { label: "UTC+11 — Noumea, Solomon Islands", zone: "Pacific/Noumea" },
    { label: "UTC+12 — Auckland, Fiji", zone: "Pacific/Auckland" },
    { label: "UTC+13 — Samoa, Tonga", zone: "Pacific/Apia" },

    { label: "UTC-10 — Honolulu", zone: "Pacific/Honolulu" },
    { label: "UTC-9 — Anchorage", zone: "America/Anchorage" },
    { label: "UTC-8 — Los Angeles, Vancouver", zone: "America/Los_Angeles" },
    { label: "UTC-7 — Denver, Phoenix", zone: "America/Denver" },
    { label: "UTC-6 — Mexico City, Chicago", zone: "America/Mexico_City" },
    { label: "UTC-5 — New York, Toronto, Lima", zone: "America/New_York" },
    { label: "UTC-4 — Santiago, Caracas, La Paz", zone: "America/Santiago" },
    { label: "UTC-3 — Buenos Aires, São Paulo", zone: "America/Sao_Paulo" },
    { label: "UTC-2 — South Georgia", zone: "Atlantic/South_Georgia" },
    { label: "UTC-1 — Azores, Cape Verde", zone: "Atlantic/Azores" },
];

function formatMatchTime(dateString: string, zone: string) {
    return new Intl.DateTimeFormat("en-GB", {
        timeZone: zone,
        weekday: "short",
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).format(new Date(dateString));
}

export default function WorldCupTimezoneConverter() {
    const [selectedMatch, setSelectedMatch] = useState(matches[0]);
    const [search, setSearch] = useState("");
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const filteredTimeZones = timeZones.filter((tz) =>
        tz.label.toLowerCase().includes(search.toLowerCase())
    );

    const timeLeft = new Date(selectedMatch.date).getTime() - now.getTime();

    const days = Math.max(0, Math.floor(timeLeft / (1000 * 60 * 60 * 24)));
    const hours = Math.max(
        0,
        Math.floor((timeLeft / (1000 * 60 * 60)) % 24)
    );
    const minutes = Math.max(
        0,
        Math.floor((timeLeft / (1000 * 60)) % 60)
    );
    const seconds = Math.max(
        0,
        Math.floor((timeLeft / 1000) % 60)
    );

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#020617",
                color: "#e5e7eb",
                padding: "32px 16px",
                fontFamily: "system-ui, sans-serif",
            }}
        >
            <div
                style={{
                    maxWidth: "900px",
                    margin: "0 auto",
                }}
            >
                <h1
                    style={{
                        fontSize: "36px",
                        marginBottom: "12px",
                        textAlign: "center",
                    }}
                >
                    World Cup Time Zone Converter
                </h1>

                <p
                    style={{
                        color: "#9ca3af",
                        textAlign: "center",
                        marginBottom: "28px",
                        fontSize: "16px",
                    }}
                >
                    Convert World Cup match times instantly for Switzerland, UK, USA,
                    Canada, Japan, Australia and more.
                </p>

                <div
                    style={{
                        background: "#111827",
                        border: "1px solid #374151",
                        borderRadius: "18px",
                        padding: "22px",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
                    }}
                >
                    <label
                        style={{
                            display: "block",
                            marginBottom: "10px",
                            color: "#d1d5db",
                            fontWeight: 600,
                        }}
                    >
                        SELECT MATCH
                    </label>

                    <select
                        value={selectedMatch.name}
                        onChange={(e) => {
                            const match = matches.find((m) => m.name === e.target.value);
                            if (match) setSelectedMatch(match);
                        }}
                        style={{
                            width: "100%",
                            background: "#020617",
                            color: "#f9fafb",
                            border: "1px solid #374151",
                            borderRadius: "12px",
                            padding: "14px",
                            fontSize: "16px",
                            marginBottom: "22px",
                        }}
                    >
                        {matches.map((match) => (
                            <option key={match.name} value={match.name}>
                                {match.name}
                            </option>
                        ))}
                    </select>

                    <div
                        style={{
                            textAlign: "center",
                            marginBottom: "18px",
                        }}
                    >
                        <div
                            style={{
                                textAlign: "center",
                                marginBottom: "18px",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "28px",
                                    fontWeight: 800,
                                    color: "#ffffff",
                                    letterSpacing: "1px",
                                }}
                            >
                                {days}d{" "}
                                {String(hours).padStart(2, "0")}h{" "}
                                {String(minutes).padStart(2, "0")}m{" "}
                                {String(seconds).padStart(2, "0")}s
                            </div>

                            <div
                                style={{
                                    fontSize: "20px",
                                    color: "#9ca3af",
                                    marginTop: "4px",
                                    letterSpacing: "1px",
                                }}
                            >
                                UNTIL KICKOFF
                            </div>
                        </div>

                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search timezone, city or UTC..."
                            style={{
                                width: "100%",
                                background: "#020617",
                                color: "#f9fafb",
                                border: "1px solid #374151",
                                borderRadius: "12px",
                                padding: "12px",
                                fontSize: "15px",
                                marginBottom: "18px",
                            }}
                        />
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                                gap: "14px",
                            }}
                        >
                            {filteredTimeZones.map((tz) => (
                                <div
                                    key={tz.zone}
                                    style={{
                                        background: "#020617",
                                        border: "1px solid #374151",
                                        borderRadius: "14px",
                                        padding: "10px",
                                        fontSize: "16px",
                                    }}
                                >
                                    <div
                                        style={{
                                            color: "#9ca3af",
                                            fontSize: "14px",
                                            marginBottom: "8px",
                                        }}
                                    >
                                        {tz.label}
                                    </div>

                                    <div
                                        style={{
                                            color: "#ffffff",
                                            fontSize: "20px",
                                            fontWeight: 700,
                                        }}
                                    >
                                        {formatMatchTime(selectedMatch.date, tz.zone)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <p
                        style={{
                            color: "#6b7280",
                            textAlign: "center",
                            marginTop: "22px",
                            fontSize: "14px",
                        }}
                    >
                        Times are automatically converted based on the selected match kickoff.
                    </p>
                </div>
            </div>
        </div>
    );
}
