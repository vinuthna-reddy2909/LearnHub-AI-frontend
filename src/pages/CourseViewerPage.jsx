import { useState } from 'react';
import { Link } from 'react-router-dom';

const LESSONS = [
    { module: 'Module 1: Getting Started', items: ['Installing Python', 'Hello World', 'Variables & Data Types'], done: [0, 1] },
    { module: 'Module 2: Control Flow', items: ['If / Else Statements', 'For Loops', 'While Loops'], done: [0] },
    { module: 'Module 3: Functions', items: ['Defining Functions', 'Arguments & Return', 'Lambda'], done: [] },
];

export default function CourseViewerPage() {
    const [active, setActive] = useState({ mod: 0, lesson: 2 });

    return (
        <div className="viewer-shell">
            {/* SIDEBAR */}
            <aside className="viewer-sidebar">
                <div className="viewer-sidebar-header">
                    <Link to="/courses" style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 600 }}>← Course List</Link>
                    <h3 style={{ marginTop: '6px' }}>Python for Beginners</h3>
                </div>
                {LESSONS.map((m, mi) => (
                    <div key={mi}>
                        <div className="module-label">{m.module}</div>
                        {m.items.map((l, li) => {
                            const isDone = m.done.includes(li);
                            const isActive = active.mod === mi && active.lesson === li;
                            return (
                                <div key={li} className={`lesson-item ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}`}
                                    onClick={() => setActive({ mod: mi, lesson: li })}>
                                    <div className="lesson-dot">{isDone ? '✓' : li + 1}</div>
                                    <span>{l}</span>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </aside>

            {/* MAIN VIDEO AREA */}
            <main className="viewer-main">
                <div className="viewer-topbar">
                    <h2>🐍 Python for Beginners</h2>
                    <Link to="/quiz/1" className="btn btn-primary btn-sm">Take Quiz →</Link>
                </div>
                <div className="video-area">
                    <div className="play-btn">▶</div>
                </div>
                <div className="viewer-content-area">
                    <h3>Variables &amp; Data Types</h3>
                    <p>
                        In Python, a variable is a name that refers to a value. Unlike many other languages,
                        you don't need to declare a variable before using it. Python figures out the type
                        from the value you assign. In this lesson we explore <code>int</code>, <code>float</code>,
                        <code>str</code> and <code>bool</code> types with hands-on examples.
                    </p>
                </div>
                <div className="viewer-footer">
                    <button className="btn btn-outline btn-sm" style={{ borderColor: 'rgba(255,255,255,.2)', color: 'rgba(255,255,255,.7)' }}>← Previous</button>
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,.45)' }}>Lesson 3 of 9</span>
                    <button className="btn btn-primary btn-sm">Next Lesson →</button>
                </div>
            </main>
        </div>
    );
}
