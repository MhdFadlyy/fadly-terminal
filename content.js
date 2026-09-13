// ── Edit everything below. This is the only file you normally touch. ──

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
    { label: "resume", url: "resume.pdf" },
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
      slug: "soc-wazuh-homelab",
      title: "wazuh, real soc work, and a homelab",
      date: "2026-09-05",
      body: [
        "when i first got handed wazuh at diskominfo sumutprov, i was nervous. it's a real",
        "SIEM watching real infrastructure, not a lab exercise.",
        "",
        "the more i dug into it though, the more i realized how flexible it is, especially",
        "writing custom detection rules. that got me hooked.",
        "",
        "since then i've been running wazuh in a homelab alongside the SOC work, and the two",
        "feed each other. monitoring at kominfo shows me how real attacks actually look in",
        "production. the homelab is where i break things on purpose to see exactly what",
        "rule fires, what message it generates, and how to wire up the detection",
        "infrastructure behind it.",
        "",
        "one teaches me the attacker's side, the other teaches me the defender's tooling.",
        "doing both at once is teaching me faster than either alone would.",
      ],
    },
    {
      slug: "why-i-started-learning-red-team",
      title: "blue team first, red team next",
      date: "2026-07-10",
      body: [
        "i started out fully blue team. defending against attackers felt exciting —",
        "protecting systems, catching the bad guys, all of it.",
        "",
        "but at some point it clicked: to defend well, i need to understand how an attacker",
        "actually thinks. detection rules mean more when you know what you're detecting for.",
        "",
        "that's why i started learning red team / pentesting alongside SOC work. it's not a",
        "switch away from blue team, it's filling in the other half of the picture.",
      ],
    },
    {
      slug: "why-a-terminal",
      title: "why a terminal site",
      date: "2026-06-20",
      body: [
        "i didn't want another static portfolio site.",
        "",
        "most personal sites look the same: a hero section, a grid of skills, a contact form",
        "nobody uses. you scroll once and leave.",
        "",
        "i think a resume website should be interactive — something a visitor actually plays",
        "with, not just scrolls past. that's why this is a terminal you type into instead of",
        "a page you skim.",
      ],
    },
  ],
};
