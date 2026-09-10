// ── Edit everything below. This is the only file you normally touch. ──
// Placeholder content — replace with your real details, then commit + push.

window.CONTENT = {
  profile: {
    user: "fadly",
    host: "web",
    name: "Muhammad Fadly",
    tagline: "systems engineer · backend · indonesia",
    status: "building things · open to interesting problems",
  },

  // whoami output
  whoami: [
    "Muhammad Fadly",
    "systems engineer — backend, infrastructure, distributed things.",
    "based in indonesia.",
  ],

  // `links` command. Order preserved. Use full URLs (or mailto:).
  links: [
    { label: "github", url: "https://github.com/MhdFadlyy" },
    { label: "linkedin", url: "#" },
    { label: "email", url: "mailto:m.fadly020@gmail.com" },
    { label: "resume", url: "#" },
  ],

  // `now` command — what you're focused on lately.
  now: [
    "shipping a small self-hosted service and writing about it.",
    "learning: rust, systems design, a bit of postgres internals.",
    "reading: placeholder book title.",
    "last updated: 2026-09",
  ],

  // `uses` command — your setup.
  uses: {
    editor: ["neovim", "vscode when pairing"],
    os: ["arch linux (omarchy) · hyprland"],
    languages: ["go", "typescript", "rust (learning)", "python"],
    hardware: ["placeholder laptop", "logitech g304 + g733"],
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
