import { ProjectVisualType } from '../data/portfolioData';

interface ProjectSchematicProps {
  visualType: ProjectVisualType;
  className?: string;
}

export function ProjectSchematic({ visualType, className = '' }: ProjectSchematicProps) {
  return (
    <div
      className={`relative w-full h-full bg-[#0C0F15] overflow-hidden flex items-center justify-center ${className}`}
    >
      <div aria-hidden="true" className="absolute inset-0 obsidian-grid-bg" />

      {/* 01. ALUMNI MANAGEMENT SYSTEM: Frontend -> Express REST API -> MySQL Database */}
      {visualType === 'alumni' && (
        <svg
          viewBox="0 0 640 360"
          className="relative z-10 w-full h-full p-5"
          aria-label="Alumni Management System architecture: Frontend to Express REST API to MySQL Database"
        >
          {/* Connection Conduits */}
          <line x1="176" y1="180" x2="245" y2="180" stroke="#00D9FF" strokeWidth="2" />
          <line x1="395" y1="180" x2="464" y2="180" stroke="#00D9FF" strokeWidth="2" />
          <path d="M 320 236 L 320 278 L 532 278 L 532 238" fill="none" stroke="#475569" strokeWidth="1.4" strokeDasharray="4 4" />

          {/* Node 1: Frontend */}
          <rect x="36" y="114" width="140" height="132" fill="#11151E" stroke="#94A3B8" strokeWidth="1.5" />
          <text x="106" y="142" textAnchor="middle" fill="#00D9FF" fontFamily="JetBrains Mono, monospace" fontSize="10">
            CLIENT LAYER
          </text>
          <text x="106" y="168" textAnchor="middle" fill="#FFFFFF" fontFamily="Oxanium, sans-serif" fontWeight="700" fontSize="16">
            HTML · CSS · JS
          </text>
          <rect x="52" y="184" width="108" height="22" fill="#0C0F15" stroke="#475569" strokeWidth="1" />
          <text x="106" y="199" textAnchor="middle" fill="#CBD5E1" fontFamily="JetBrains Mono, monospace" fontSize="9">
            Base64 Avatar
          </text>
          <rect x="52" y="212" width="108" height="22" fill="#0C0F15" stroke="#475569" strokeWidth="1" />
          <text x="106" y="227" textAnchor="middle" fill="#CBD5E1" fontFamily="JetBrains Mono, monospace" fontSize="9">
            Async Fetch
          </text>

          {/* Arrow Labels */}
          <text x="210" y="168" textAnchor="middle" fill="#94A3B8" fontFamily="JetBrains Mono, monospace" fontSize="9">
            REST
          </text>
          <text x="430" y="168" textAnchor="middle" fill="#94A3B8" fontFamily="JetBrains Mono, monospace" fontSize="9">
            SQL
          </text>

          {/* Node 2: Express REST API */}
          <rect x="245" y="102" width="150" height="156" fill="#0D1922" stroke="#00D9FF" strokeWidth="1.8" />
          <text x="320" y="130" textAnchor="middle" fill="#00D9FF" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="600">
            NODE.JS + EXPRESS
          </text>
          <text x="320" y="156" textAnchor="middle" fill="#FFFFFF" fontFamily="Oxanium, sans-serif" fontWeight="800" fontSize="17">
            REST API
          </text>
          <text x="320" y="182" textAnchor="middle" fill="#CBD5E1" fontFamily="JetBrains Mono, monospace" fontSize="9.5">
            Admin Sessions
          </text>
          <text x="320" y="200" textAnchor="middle" fill="#CBD5E1" fontFamily="JetBrains Mono, monospace" fontSize="9.5">
            Rate Limiting
          </text>
          <text x="320" y="218" textAnchor="middle" fill="#CBD5E1" fontFamily="JetBrains Mono, monospace" fontSize="9.5">
            Approval Workflow
          </text>
          <text x="320" y="236" textAnchor="middle" fill="#94A3B8" fontFamily="JetBrains Mono, monospace" fontSize="9.5">
            Static Asset Host
          </text>

          {/* Node 3: MySQL Database */}
          <rect x="464" y="114" width="140" height="132" fill="#11151E" stroke="#CBD5E1" strokeWidth="1.5" />
          <text x="534" y="142" textAnchor="middle" fill="#94A3B8" fontFamily="JetBrains Mono, monospace" fontSize="10">
            DATA LAYER
          </text>
          <text x="534" y="168" textAnchor="middle" fill="#FFFFFF" fontFamily="Oxanium, sans-serif" fontWeight="800" fontSize="18">
            MySQL
          </text>
          <rect x="480" y="184" width="108" height="22" fill="#0C0F15" stroke="#00D9FF" strokeOpacity="0.6" strokeWidth="1" />
          <text x="534" y="199" textAnchor="middle" fill="#00D9FF" fontFamily="JetBrains Mono, monospace" fontSize="9">
            Alumni Records
          </text>
          <rect x="480" y="212" width="108" height="22" fill="#0C0F15" stroke="#475569" strokeWidth="1" />
          <text x="534" y="227" textAnchor="middle" fill="#CBD5E1" fontFamily="JetBrains Mono, monospace" fontSize="9">
            Audit Logs &amp; Config
          </text>

          <text x="320" y="308" textAnchor="middle" fill="#94A3B8" fontFamily="JetBrains Mono, monospace" fontSize="10">
            FLOW: FRONTEND → EXPRESS REST API → MYSQL DATABASE
          </text>
        </svg>
      )}

      {/* 02. STUDENT MODULE: 42 Relational Tables & 13 Sequential Migrations */}
      {visualType === 'student' && (
        <svg
          viewBox="0 0 640 360"
          className="relative z-10 w-full h-full p-5"
          aria-label="Student Module relational MySQL InnoDB database architecture with 42 tables and 13 SQL migrations"
        >
          {/* Relational Connectors from Central InnoDB Hub */}
          <line x1="320" y1="150" x2="112" y2="74" stroke="#94A3B8" strokeWidth="1.4" />
          <line x1="320" y1="150" x2="528" y2="74" stroke="#94A3B8" strokeWidth="1.4" />
          <line x1="320" y1="180" x2="112" y2="180" stroke="#00D9FF" strokeWidth="1.8" />
          <line x1="320" y1="180" x2="528" y2="180" stroke="#00D9FF" strokeWidth="1.8" />
          <line x1="320" y1="210" x2="112" y2="286" stroke="#94A3B8" strokeWidth="1.4" />
          <line x1="320" y1="210" x2="528" y2="286" stroke="#94A3B8" strokeWidth="1.4" />

          {/* Surrounding Table Clusters */}
          <rect x="34" y="42" width="156" height="58" fill="#11151E" stroke="#475569" strokeWidth="1.4" />
          <text x="112" y="66" textAnchor="middle" fill="#FFFFFF" fontFamily="JetBrains Mono, monospace" fontSize="10.5">
            Identity &amp; RBAC
          </text>
          <text x="112" y="84" textAnchor="middle" fill="#94A3B8" fontFamily="JetBrains Mono, monospace" fontSize="9">
            Auth · Permissions
          </text>

          <rect x="450" y="42" width="156" height="58" fill="#11151E" stroke="#475569" strokeWidth="1.4" />
          <text x="528" y="66" textAnchor="middle" fill="#FFFFFF" fontFamily="JetBrains Mono, monospace" fontSize="10.5">
            Academic Org
          </text>
          <text x="528" y="84" textAnchor="middle" fill="#94A3B8" fontFamily="JetBrains Mono, monospace" fontSize="9">
            Dept · Batch · Faculty
          </text>

          <rect x="34" y="151" width="156" height="58" fill="#11151E" stroke="#00D9FF" strokeOpacity="0.6" strokeWidth="1.4" />
          <text x="112" y="175" textAnchor="middle" fill="#00D9FF" fontFamily="JetBrains Mono, monospace" fontSize="10.5">
            Student Ops
          </text>
          <text x="112" y="193" textAnchor="middle" fill="#CBD5E1" fontFamily="JetBrains Mono, monospace" fontSize="9">
            Enroll · Attendance · Exams
          </text>

          <rect x="450" y="151" width="156" height="58" fill="#11151E" stroke="#00D9FF" strokeOpacity="0.6" strokeWidth="1.4" />
          <text x="528" y="175" textAnchor="middle" fill="#00D9FF" fontFamily="JetBrains Mono, monospace" fontSize="10.5">
            Services &amp; Fees
          </text>
          <text x="528" y="193" textAnchor="middle" fill="#CBD5E1" fontFamily="JetBrains Mono, monospace" fontSize="9">
            Fees · Library · Docs
          </text>

          <rect x="34" y="260" width="156" height="58" fill="#11151E" stroke="#475569" strokeWidth="1.4" />
          <text x="112" y="284" textAnchor="middle" fill="#FFFFFF" fontFamily="JetBrains Mono, monospace" fontSize="10.5">
            Timetable &amp; Tasks
          </text>
          <text x="112" y="302" textAnchor="middle" fill="#94A3B8" fontFamily="JetBrains Mono, monospace" fontSize="9">
            Curriculum · Submissions
          </text>

          <rect x="450" y="260" width="156" height="58" fill="#11151E" stroke="#00D9FF" strokeOpacity="0.7" strokeWidth="1.4" />
          <text x="528" y="284" textAnchor="middle" fill="#FFFFFF" fontFamily="JetBrains Mono, monospace" fontSize="10.5">
            AI Support Layer
          </text>
          <text x="528" y="302" textAnchor="middle" fill="#00D9FF" fontFamily="JetBrains Mono, monospace" fontSize="9">
            Mentorship · Study Plans
          </text>

          {/* Central Relational Hub */}
          <rect x="226" y="114" width="188" height="132" fill="#0D1922" stroke="#00D9FF" strokeWidth="2" />
          <text x="320" y="142" textAnchor="middle" fill="#00D9FF" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="600">
            MYSQL · INNODB · UTF8MB4
          </text>
          <text x="320" y="178" textAnchor="middle" fill="#FFFFFF" fontFamily="Oxanium, sans-serif" fontWeight="800" fontSize="26">
            42 TABLES
          </text>
          <text x="320" y="204" textAnchor="middle" fill="#CBD5E1" fontFamily="JetBrains Mono, monospace" fontSize="10.5">
            13 SQL Migrations
          </text>
          <text x="320" y="226" textAnchor="middle" fill="#94A3B8" fontFamily="JetBrains Mono, monospace" fontSize="9.5">
            Node.js MySQL2 Driver
          </text>
        </svg>
      )}

      {/* 03. AETHERROUTINE: AI Study Calendar, Timeline & Gemini Optimization */}
      {visualType === 'routine' && (
        <svg
          viewBox="0 0 640 360"
          className="relative z-10 w-full h-full p-5"
          aria-label="AetherRoutine AI study planner architecture: React 18, FastAPI, SQLite/MySQL, and Google Gemini AI"
        >
          {/* Top Architecture Conduit */}
          <line x1="168" y1="78" x2="245" y2="78" stroke="#00D9FF" strokeWidth="2" />
          <line x1="395" y1="78" x2="472" y2="78" stroke="#00D9FF" strokeWidth="2" />
          <line x1="320" y1="112" x2="320" y2="152" stroke="#00D9FF" strokeWidth="1.6" strokeDasharray="3 3" />

          <rect x="36" y="46" width="132" height="64" fill="#11151E" stroke="#94A3B8" strokeWidth="1.5" />
          <text x="102" y="74" textAnchor="middle" fill="#FFFFFF" fontFamily="Oxanium, sans-serif" fontWeight="700" fontSize="15">
            React 18
          </text>
          <text x="102" y="94" textAnchor="middle" fill="#94A3B8" fontFamily="JetBrains Mono, monospace" fontSize="9.5">
            Vite · Chart.js
          </text>

          <rect x="245" y="46" width="150" height="64" fill="#0D1922" stroke="#00D9FF" strokeWidth="1.8" />
          <text x="320" y="74" textAnchor="middle" fill="#00D9FF" fontFamily="Oxanium, sans-serif" fontWeight="700" fontSize="15">
            FastAPI + JWT
          </text>
          <text x="320" y="94" textAnchor="middle" fill="#CBD5E1" fontFamily="JetBrains Mono, monospace" fontSize="9.5">
            Python · Uvicorn
          </text>

          <rect x="472" y="46" width="132" height="64" fill="#11151E" stroke="#94A3B8" strokeWidth="1.5" />
          <text x="538" y="74" textAnchor="middle" fill="#FFFFFF" fontFamily="Oxanium, sans-serif" fontWeight="700" fontSize="15">
            SQLite / MySQL
          </text>
          <text x="538" y="94" textAnchor="middle" fill="#94A3B8" fontFamily="JetBrains Mono, monospace" fontSize="9.5">
            Pandas · OpenPyXL
          </text>

          {/* Study Calendar & Routine Matrix */}
          <rect x="36" y="152" width="568" height="162" fill="#0D1118" stroke="#334155" strokeWidth="1.4" />
          <text x="56" y="176" textAnchor="middle" fill="#00D9FF" fontFamily="JetBrains Mono, monospace" fontSize="9.5" style={{ textAnchor: 'start' }}>
            GEMINI AI ROUTINE SCHEDULE · SPACED REPETITION &amp; BREAK TIMELINE
          </text>

          {/* Day Timeline Rows */}
          {['MON', 'TUE', 'WED', 'THU', 'FRI'].map((day, i) => {
            const y = 194 + i * 23;
            const blockX = 110 + (i % 3) * 58;
            return (
              <g key={day}>
                <text x="56" y={y + 12} fill="#94A3B8" fontFamily="JetBrains Mono, monospace" fontSize="10">
                  {day}
                </text>
                <rect x="106" y={y} width="474" height="16" fill="#111621" />
                <rect x={blockX} y={y} width="128" height="16" fill="#0D2632" stroke="#00D9FF" strokeWidth="1" />
                <text x={blockX + 64} y={y + 11.5} textAnchor="middle" fill="#00D9FF" fontFamily="JetBrains Mono, monospace" fontSize="8.5">
                  FOCUS BLOCK
                </text>
                <rect x={blockX + 136} y={y} width="64" height="16" fill="#1E293B" stroke="#94A3B8" strokeWidth="0.9" />
                <text x={blockX + 168} y={y + 11.5} textAnchor="middle" fill="#CBD5E1" fontFamily="JetBrains Mono, monospace" fontSize="8">
                  BREAK
                </text>
                <rect x={blockX + 208} y={y} width="96" height="16" fill="#16202C" stroke="#CBD5E1" strokeOpacity="0.5" strokeWidth="0.9" />
                <text x={blockX + 256} y={y + 11.5} textAnchor="middle" fill="#FFFFFF" fontFamily="JetBrains Mono, monospace" fontSize="8">
                  REVIEW
                </text>
              </g>
            );
          })}
        </svg>
      )}

      {/* 04. PREDICTIVE TRAFFIC ENGINEERING USING SEGMENT ROUTING */}
      {visualType === 'traffic-te' && (
        <svg
          viewBox="0 0 640 360"
          className="relative z-10 w-full h-full p-5"
          aria-label="Predictive Traffic Engineering using Segment Routing topology and ML congestion pipeline"
        >
          {/* Multi-Router Mesh Links */}
          <line x1="112" y1="145" x2="245" y2="75" stroke="#475569" strokeWidth="2" />
          <line x1="112" y1="145" x2="245" y2="215" stroke="#00D9FF" strokeWidth="2.4" />
          <line x1="245" y1="75" x2="405" y2="75" stroke="#475569" strokeWidth="2" strokeDasharray="5 4" />
          <line x1="245" y1="215" x2="405" y2="215" stroke="#00D9FF" strokeWidth="2.4" />
          <line x1="245" y1="75" x2="405" y2="215" stroke="#64748B" strokeWidth="1.5" />
          <line x1="405" y1="75" x2="532" y2="145" stroke="#475569" strokeWidth="2" />
          <line x1="405" y1="215" x2="532" y2="145" stroke="#00D9FF" strokeWidth="2.4" />

          {/* Moving Packet Markers Along Optimized SR Path */}
          <circle cx="178" cy="180" r="4.5" fill="#00D9FF" />
          <circle cx="325" cy="215" r="4.5" fill="#FFFFFF" />
          <circle cx="468" cy="180" r="4.5" fill="#00D9FF" />

          {/* Router Nodes (FRR / IS-IS) */}
          {[
            { x: 112, y: 145, label: 'R1', sub: 'Ingress', active: true },
            { x: 245, y: 75, label: 'R2', sub: 'Congested', active: false },
            { x: 405, y: 75, label: 'R3', sub: 'Core', active: false },
            { x: 245, y: 215, label: 'R4', sub: 'SR Hop 1', active: true },
            { x: 405, y: 215, label: 'R5', sub: 'SR Hop 2', active: true },
            { x: 532, y: 145, label: 'R6', sub: 'Egress', active: true },
          ].map((node) => (
            <g key={node.label}>
              <circle
                cx={node.x}
                cy={node.y}
                r="24"
                fill={node.active ? '#0D1922' : '#11151E'}
                stroke={node.active ? '#00D9FF' : '#64748B'}
                strokeWidth="1.8"
              />
              <text
                x={node.x}
                y={node.y + 4}
                textAnchor="middle"
                fill="#FFFFFF"
                fontFamily="Oxanium, sans-serif"
                fontWeight="800"
                fontSize="13"
              >
                {node.label}
              </text>
              <text
                x={node.x}
                y={node.y + 38}
                textAnchor="middle"
                fill={node.active ? '#00D9FF' : '#94A3B8'}
                fontFamily="JetBrains Mono, monospace"
                fontSize="9"
              >
                {node.sub}
              </text>
            </g>
          ))}

          {/* Bottom Proposed Workflow Strip */}
          <rect x="34" y="278" width="572" height="50" fill="#10131A" stroke="#334155" strokeWidth="1.3" />
          <text x="320" y="298" textAnchor="middle" fill="#00D9FF" fontFamily="JetBrains Mono, monospace" fontSize="9.5" fontWeight="600">
            CONTAINERLAB · FRR (IS-IS) · XGBOOST · REPETITA DATASETS
          </text>
          <text x="320" y="317" textAnchor="middle" fill="#E2E8F0" fontFamily="JetBrains Mono, monospace" fontSize="9">
            Topology → Traffic Gen → Telemetry → Congestion Prediction → Path Opt → SR Forwarding
          </text>
        </svg>
      )}
    </div>
  );
}
