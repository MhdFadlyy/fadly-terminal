// ── Edit everything below. This is the only file you normally touch. ──
// Placeholder content — replace with your real details, then commit + push.

window.CONTENT = {
  profile: {
    user: "pali",
    host: "web",
    name: "Pali",
    tagline: "blue team by trade, red team curious · SOC analyst",
    status: "cybersecurity student @ IIUM · open to opportunities worldwide",
  },

  // whoami output
  whoami: [
    "Pali",
    "SOC analyst — detection, triage, incident response.",
    "cybersecurity student @ International Islamic University Malaysia (IIUM).",
    "based in malaysia, open to opportunities worldwide.",
    "fun fact: breaks things to learn how to defend them better.",
  ],

  // `links` command. Order preserved. Use full URLs (or mailto:).
  links: [
    { label: "github", url: "https://github.com/MhdFadlyy" },
    { label: "linkedin", url: "https://www.linkedin.com/in/paliii" },
    { label: "email", url: "mailto:m.fadly020@gmail.com" },
    { label: "resume", url: "#" },
  ],

  // `now` command — what you're focused on lately.
  now: [
    "leveling up in penetration testing (OSCP path).",
    "threat hunting & log analysis.",
    "cloud security fundamentals.",
    "last updated: 2026-09",
  ],

  // `uses` command — your setup.
  uses: {
    os: ["kali linux", "linux"],
    languages: ["python"],
    tools: ["wireshark", "splunk", "burp suite", "nmap"],
  },

  // `ls posts` / `cat <slug>` — short writing. Newest first.
  posts: [
    {
      slug: "hello-world",
      title: "hello world",
      date: "2026-09-01",
      body: [
        "this is a placeholder post.",
        "",
        "edit content.js to add your own. each post is { slug, title, date, body }",
        "where body is an array of lines.",
      ],
    },
    {
      slug: "why-a-terminal",
      title: "why a terminal site",
      date: "2026-08-15",
      body: [
        "placeholder.",
        "",
        "explain here why you built your site as a terminal instead of a normal page.",
      ],
    },
  ],
};
