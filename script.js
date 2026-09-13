(function () {
  "use strict";

  var C = window.CONTENT;
  var term = document.getElementById("term");
  var P = C.profile;
  var PROMPT = P.user + "@" + P.host + " ~ $ ";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ── storage (may be empty or throw) ──────────────────────────────
  function getTheme() {
    try { return localStorage.getItem("theme"); } catch (e) { return null; }
  }
  function saveTheme(t) {
    try { localStorage.setItem("theme", t); } catch (e) { /* ignore */ }
  }
  var THEMES = ["amber", "green", "mono"];
  function applyTheme(t) {
    if (THEMES.indexOf(t) < 0) return false;
    document.documentElement.setAttribute("data-theme", t);
    saveTheme(t);
    return true;
  }
  applyTheme(getTheme() || "green");

  // ── rendering ────────────────────────────────────────────────────
  var inputRow, input;

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function printLine(line) {
    // line: string | {text, cls} | {html}
    var n = el("span", "line");
    if (typeof line === "string") {
      n.textContent = line;
    } else if (line.html != null) {
      n.innerHTML = line.html;
      if (line.cls) n.className += " " + line.cls;
    } else {
      n.textContent = line.text || "";
      if (line.cls) n.className += " " + line.cls;
    }
    term.insertBefore(n, inputRow);
  }

  function printLines(lines) {
    for (var i = 0; i < lines.length; i++) printLine(lines[i]);
  }

  function echoCommand(str) {
    printLine({ html: '<span class="dim">' + esc(PROMPT) + "</span>" + esc(str) });
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function scrollDown() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  // ── link helpers (external target only for http/https) ───────────
  function anchor(label, url) {
    var ext = /^https?:/i.test(url);
    var attr = ext ? ' target="_blank" rel="noreferrer"' : "";
    return '<a href="' + esc(url) + '"' + attr + ">" + esc(label) + "</a>";
  }

  // clickable text that runs a command without typing, e.g. `cmdBtn("now")` runs `now`.
  // wired via a plain onclick attribute (not a delegated listener) so it works even if
  // the button ends up inside HTML inserted through innerHTML.
  function cmdLink(label, cmd) {
    var safeCmd = cmd.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
    return '<button class="cmd" type="button" onclick="window.__cmd(\'' + safeCmd + '\')">' + esc(label) + "</button>";
  }
  function cmdBtn(name) {
    return cmdLink(name, name);
  }

  // theme picker used in `help` and the bare `theme` command: current theme is plain
  // text (not clickable, nothing to click there), the other two are buttons.
  function themeOptionsHtml() {
    var current = getTheme() || "green";
    return THEMES.map(function (t) {
      if (t === current) return '<span class="accent">[' + esc(t) + "]</span>";
      return cmdLink(t, "theme " + t);
    }).join(" | ");
  }

  // ── commands ─────────────────────────────────────────────────────
  // each returns: array of lines, or {lines, action}
  var COMMANDS = {
    help: function () {
      return [
        "available commands:",
        "",
        { html: "  " + cmdBtn("about") + ", " + cmdBtn("whoami") + "   who i am" },
        { html: "  " + cmdBtn("links") + "           where to find me" },
        { html: "  " + cmdBtn("now") + "             what i'm doing lately" },
        { html: "  " + cmdBtn("uses") + "            my setup" },
        { html: "  " + cmdBtn("resume") + "          open my resume" },
        { html: "  " + cmdBtn("contact") + "         how to reach me" },
        { html: "  theme               " + themeOptionsHtml() },
        { html: "  " + cmdBtn("clear") + "           clear the screen" },
        { html: "  " + cmdBtn("help") + "            this" },
        "",
        { text: "tip: click a command name to run it, no typing needed.", cls: "dim" },
      ];
    },

    about: function () { return C.whoami.slice(); },
    whoami: function () { return C.whoami.slice(); },

    links: function () {
      return C.links.map(function (l) {
        return { html: "  " + l.label.padEnd(10) + anchor(l.url.replace(/^mailto:/, ""), l.url) };
      });
    },

    now: function () {
      return ["# now"].concat(C.now.map(function (l) { return "  " + l; }));
    },

    uses: function () {
      var out = ["# uses", ""];
      Object.keys(C.uses).forEach(function (k) {
        out.push("  " + k.padEnd(11) + C.uses[k].join(", "));
      });
      return out;
    },

    resume: function () {
      var r = C.links.filter(function (l) { return l.label === "resume"; })[0];
      if (r && r.url && r.url !== "#") return [{ html: "resume: " + anchor(r.url, r.url) }];
      return [{ text: "resume: not linked yet (edit content.js)", cls: "err" }];
    },

    contact: function () {
      return C.links.filter(function (l) { return l.label === "email" || l.label === "linkedin"; })
        .map(function (l) { return { html: "  " + l.label.padEnd(10) + anchor(l.url.replace(/^mailto:/, ""), l.url) }; });
    },

    banner: function () {
      var name = P.name.toUpperCase();
      var bar = "+" + "-".repeat(name.length + 2) + "+";
      return [bar, "| " + name + " |", bar, { text: P.tagline, cls: "dim" }];
    },

    theme: function (args) {
      if (!args[0]) return [{ html: "theme: " + themeOptionsHtml() }];
      if (applyTheme(args[0])) return [{ text: "theme set to " + args[0], cls: "dim" }];
      return [{ text: "theme: unknown theme '" + args[0] + "' (options: " + THEMES.join(", ") + ")", cls: "err" }];
    },

    date: function () { return [new Date().toString()]; },

    echo: function (args) { return [args.join(" ")]; },

    clear: function () { return { lines: [], action: "clear" }; },
  };

  var COMMAND_NAMES = Object.keys(COMMANDS);

  // core: parse + dispatch. returns {lines, action}
  function execute(cmdline) {
    var trimmed = (cmdline || "").trim();
    if (!trimmed) return { lines: [] };
    var parts = trimmed.split(/\s+/);
    var name = parts[0].toLowerCase();
    var args = parts.slice(1);
    var fn = COMMANDS[name];
    if (!fn) {
      return { lines: [{ text: "command not found: " + name + " (try `help`)", cls: "err" }] };
    }
    var res = fn(args);
    return Array.isArray(res) ? { lines: res } : res;
  }

  function runCommand(cmdline) {
    echoCommand(cmdline);
    var res = execute(cmdline);
    if (res.action === "clear") {
      var lines = term.querySelectorAll(".line");
      for (var i = 0; i < lines.length; i++) term.removeChild(lines[i]);
    }
    printLines(res.lines);
    scrollDown();
    return res;
  }

  // ── input row + history ──────────────────────────────────────────
  var history = [];
  var histIdx = -1;

  function buildInputRow() {
    inputRow = el("div", "row");
    var pr = el("span", "prompt", PROMPT);
    input = el("input", "input");
    input.setAttribute("autocomplete", "off");
    input.setAttribute("autocapitalize", "off");
    input.setAttribute("spellcheck", "false");
    input.setAttribute("aria-label", "command input");
    inputRow.appendChild(pr);
    inputRow.appendChild(input);
    term.appendChild(inputRow);
  }

  // run a command as if typed + submitted: used by Enter and by clicking a .cmd button
  function submit(v) {
    input.value = "";
    if (v.trim()) { history.push(v); }
    histIdx = history.length;
    runCommand(v);
    input.focus();
  }
  window.__cmd = submit; // called directly from onclick="" on generated .cmd buttons

  function onKey(e) {
    if (e.key === "Enter") {
      submit(input.value);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (histIdx > 0) { histIdx--; input.value = history[histIdx]; moveCaretEnd(); }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx < history.length - 1) { histIdx++; input.value = history[histIdx]; }
      else { histIdx = history.length; input.value = ""; }
      moveCaretEnd();
    } else if (e.key === "Tab") {
      e.preventDefault();
      var cur = input.value.trim();
      if (cur && cur.indexOf(" ") < 0) {
        var m = COMMAND_NAMES.filter(function (n) { return n.indexOf(cur) === 0; });
        if (m.length === 1) input.value = m[0] + " ";
        else if (m.length > 1) { printLine(m.join("  ")); scrollDown(); }
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      runCommand("clear");
    }
  }

  function moveCaretEnd() {
    var v = input.value;
    input.value = "";
    input.value = v;
  }

  // ── boot ─────────────────────────────────────────────────────────
  // order: boot lines, then current date, then the banner, then status + hint.
  var BOOT = [
    { text: "booting " + P.host, cls: "dim" },
    { text: "[  ok  ] mounted /home/" + P.user, cls: "dim" },
    { text: "[  ok  ] started identity.service", cls: "dim" },
    { text: "[  ok  ] reached target interactive", cls: "dim" },
    "",
  ];

  function finishBoot() {
    var lines = [
      { text: new Date().toString(), cls: "dim" },
      "",
    ]
      .concat(COMMANDS.banner())
      .concat([
        { text: P.status, cls: "dim" },
        "",
        { html: '<span class="dim">type or click </span>' + cmdBtn("help") + '<span class="dim"> to get started.</span>' },
        "",
      ]);
    printLines(lines);
    input.focus();
    scrollDown();
  }

  function boot() {
    buildInputRow();

    if (reducedMotion) {
      printLines(BOOT);
      finishBoot();
      return;
    }

    var i = 0;
    var done = false;
    function step() {
      if (done) return;
      if (i >= BOOT.length) { done = true; finishBoot(); return; }
      printLine(BOOT[i++]);
      scrollDown();
      timer = setTimeout(step, 90);
    }
    var timer = setTimeout(step, 90);

    function skip() {
      if (done) return;
      done = true;
      clearTimeout(timer);
      while (i < BOOT.length) printLine(BOOT[i++]);
      finishBoot();
    }
    function onSkipInput() {
      window.removeEventListener("keydown", onSkipInput);
      window.removeEventListener("touchstart", onSkipInput);
      skip();
    }
    window.addEventListener("keydown", onSkipInput);
    window.addEventListener("touchstart", onSkipInput);
  }

  // any click that isn't on a .cmd button (those run via their own onclick=) just
  // refocuses the input, so typing keeps working right after tapping around.
  document.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest(".cmd")) return;
    if (window.getSelection().toString()) return; // let text selection work
    if (input) input.focus();
  });

  document.addEventListener("keydown", function (e) {
    if (input && document.activeElement !== input && !e.ctrlKey && !e.metaKey && e.key.length === 1) {
      input.focus();
    }
    if (input && document.activeElement === input) onKey(e);
  });

  boot();

  // ── self-check (run demo() in the browser console) ───────────────
  window.demo = function () {
    console.assert(execute("help").lines.length > 5, "help lists commands");
    console.assert(execute("resume").lines.length > 0, "resume command works");
    console.assert(execute("frobnicate").lines[0].text.indexOf("command not found") === 0, "unknown cmd");
    console.assert(execute("clear").action === "clear", "clear signals action");
    console.assert(execute("").lines.length === 0, "empty input is a no-op");
    console.assert(execute("theme amber").lines[0].text.indexOf("amber") > -1, "theme switch");
    applyTheme("green");
    console.log("demo: all assertions passed");
  };

  window.__term = { execute: execute, runCommand: runCommand };
})();
