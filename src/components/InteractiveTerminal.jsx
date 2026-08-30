import React, { useState, useRef, useEffect } from "react";

const INITIAL_WELCOME = [
  { type: "sys", text: "⚡ DISHANT TALWEKAR INTERACTIVE SHELL v2.4.0 [x86_64-apple-darwin]" },
  { type: "sys", text: "Type 'help' or click any quick command button below to execute." },
  { type: "blank", text: "" },
];

const COMMAND_HELP = [
  { type: "info", text: "AVAILABLE SYSTEM COMMANDS:" },
  { type: "cmd-list", cmd: "about", desc: "View software engineering background & bio" },
  { type: "cmd-list", cmd: "skills", desc: "Display core tech stack & proficiency breakdown" },
  { type: "cmd-list", cmd: "projects", desc: "List featured live production web applications" },
  { type: "cmd-list", cmd: "contact", desc: "Get direct email & transmission channels" },
  { type: "cmd-list", cmd: "sudo hire", desc: "Initiate priority recruitment sequence 🚀" },
  { type: "cmd-list", cmd: "clear", desc: "Clear terminal screen buffer" },
];

export default function InteractiveTerminal({ onNavigate, onOpenContact }) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState(INITIAL_WELCOME);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new history is appended
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmdStr) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    // Add user prompt to terminal log
    const userLine = { type: "user-prompt", text: `dishant@portfolio ~ % ${cmdStr}` };

    let outputLines = [];

    switch (trimmed) {
      case "help":
      case "commands":
      case "ls":
        outputLines = COMMAND_HELP;
        break;

      case "about":
      case "bio":
      case "whoami":
        outputLines = [
          { type: "accent", text: "DISHANT TALWEKAR // SOFTWARE DEVELOPMENT INTERN & CS UNDERGRAD" },
          { type: "text", text: "• Education: B.Tech in Computer Science & Engineering (Final Year)" },
          { type: "text", text: "• Experience: Software Development Intern @ Tinywork Infotech" },
          { type: "text", text: "• Problem Solving: 70+ Algorithmic Problems Solved on LeetCode" },
          { type: "text", text: "• Focus: React.js, Node.js, REST APIs, Microservices, SaaS & UI/UX" },
        ];
        break;

      case "skills":
      case "stack":
      case "tech":
        outputLines = [
          { type: "accent", text: "CORE TECHNICAL STACK & COMPETENCIES:" },
          { type: "text", text: "• Frontend : React.js, JavaScript (ES6+), HTML5/CSS3, TailwindCSS, State Management" },
          { type: "text", text: "• Backend  : Node.js, Express.js, RESTful APIs, WebSockets, Role Auth" },
          { type: "text", text: "• Database : MongoDB, PostgreSQL, Database Schema Design" },
          { type: "text", text: "• CS Core  : Data Structures & Algorithms, OOP, System Design, Git/GitHub" },
        ];
        break;

      case "projects":
      case "portfolio":
      case "work":
        outputLines = [
          { type: "accent", text: "FEATURED PRODUCTION SYSTEMS:" },
          { type: "text", text: "1. Smart Café — QR Ordering SaaS Application [LIVE]" },
          { type: "text", text: "   └ Multi-tenant QR dining POS with live WebSockets queue management." },
          { type: "text", text: "2. AI Resume Builder [LIVE]" },
          { type: "text", text: "   └ ATS-optimized resume platform with AI summary generation." },
          { type: "text", text: "3. Wander Lusht [LIVE]" },
          { type: "text", text: "   └ Modern hospitality booking engine with real-time reservation workflow." },
          { type: "text", text: "4. Hospital ERP System [IN DEVELOPMENT]" },
          { type: "text", text: "   └ Healthcare platform for records, scheduling, & billing." },
        ];
        if (onNavigate) {
          setTimeout(() => onNavigate("projects"), 800);
        }
        break;

      case "contact":
      case "email":
        outputLines = [
          { type: "accent", text: "TRANSMISSION CHANNELS:" },
          { type: "text", text: "• Direct Email: dishanttalwekar97@gmail.com" },
          { type: "text", text: "• Open to: Full-time roles, software engineering internships, & freelance projects." },
          { type: "success", text: "Opening direct contact modal sequence..." },
        ];
        if (onOpenContact) {
          setTimeout(() => onOpenContact(), 600);
        }
        break;

      case "sudo hire":
      case "hire":
      case "sudo hire dishant":
        outputLines = [
          { type: "highlight-green", text: "✔ [PERMISSION GRANTED] Sudo authorization validated!" },
          { type: "highlight-green", text: "Initiating priority hire transmission sequence..." },
          { type: "text", text: "Dishant Talwekar is ready to build exceptional software for your team." },
        ];
        if (onOpenContact) {
          setTimeout(() => onOpenContact(), 500);
        }
        break;

      case "clear":
      case "cls":
        setHistory([]);
        setInputVal("");
        return;

      case "matrix":
        outputLines = [
          { type: "highlight-green", text: "Wake up, Neo..." },
          { type: "highlight-green", text: "The Matrix has you..." },
          { type: "highlight-green", text: "Follow the white rabbit. 🐇" },
        ];
        break;

      default:
        outputLines = [
          { type: "error", text: `zsh: command not found: ${cmdStr}` },
          { type: "sys", text: "Type 'help' to view available system commands." },
        ];
    }

    setHistory((prev) => [...prev, userLine, ...outputLines, { type: "blank", text: "" }]);
    setCommandHistory((prev) => [cmdStr, ...prev]);
    setHistoryIndex(-1);
    setInputVal("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const prevIdx = historyIndex - 1;
        setHistoryIndex(prevIdx);
        setInputVal(commandHistory[prevIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal("");
      }
    }
  };

  const quickChips = ["help", "skills", "projects", "contact", "sudo hire", "clear"];

  return (
    <div className="interactive-terminal-card reveal-on-scroll">
      {/* Terminal Header */}
      <div className="terminal-header">
        <div className="terminal-controls">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>
        <div className="terminal-title">dishant.cli // v2.4.0 — zsh 80x24</div>
        <div className="terminal-status-badge">
          <span className="status-live-dot" />
          <span>SHELL READY</span>
        </div>
      </div>

      {/* Quick Command Chips */}
      <div className="terminal-chips-bar">
        <span className="chips-label">QUICK COMMANDS:</span>
        {quickChips.map((chip) => (
          <button
            key={chip}
            type="button"
            className={`terminal-chip-btn ${chip === "sudo hire" ? "chip-sudo" : ""}`}
            onClick={() => executeCommand(chip)}
          >
            <span>$ {chip}</span>
          </button>
        ))}
      </div>

      {/* Terminal Body Log */}
      <div
        ref={terminalBodyRef}
        className="terminal-body"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line, idx) => {
          if (line.type === "user-prompt") {
            return (
              <div key={idx} className="terminal-line line-user-prompt">
                {line.text}
              </div>
            );
          }
          if (line.type === "accent") {
            return (
              <div key={idx} className="terminal-line line-accent">
                {line.text}
              </div>
            );
          }
          if (line.type === "highlight-green") {
            return (
              <div key={idx} className="terminal-line line-green">
                {line.text}
              </div>
            );
          }
          if (line.type === "error") {
            return (
              <div key={idx} className="terminal-line line-error">
                {line.text}
              </div>
            );
          }
          if (line.type === "cmd-list") {
            return (
              <div key={idx} className="terminal-line line-cmd-list">
                <span className="cmd-name">$ {line.cmd}</span>
                <span className="cmd-desc">— {line.desc}</span>
              </div>
            );
          }
          if (line.type === "blank") {
            return <div key={idx} className="terminal-blank-line" />;
          }
          return (
            <div key={idx} className="terminal-line line-default">
              {line.text}
            </div>
          );
        })}

        {/* Input Prompt Row */}
        <div className="terminal-input-row">
          <span className="terminal-prompt-text">dishant@portfolio ~ %</span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-input-field"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or click any command..."
            spellCheck="false"
            autoCapitalize="none"
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
}
