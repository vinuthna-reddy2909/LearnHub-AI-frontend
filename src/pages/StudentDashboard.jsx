import { Link } from 'react-router-dom';

const SidebarLink = ({ to, icon, label, active }) => (
    <Link to={to} className={`sidebar-link ${active ? 'active' : ''}`}>
        <span className="icon">{icon}</span> {label}
    </Link>
);

export default function StudentDashboard() {
    return (
        <div className="app-shell">
            {/* SIDEBAR */}
            <aside className="sidebar">
                <div className="sidebar-logo gradient-text">LearnHub AI</div>
                <nav className="sidebar-nav">
                    <div className="sidebar-section-label">Main</div>
                    <SidebarLink to="/student-dashboard" icon="🏠" label="Dashboard" active />
                    <SidebarLink to="/courses" icon="📚" label="My Courses" />
                    <SidebarLink to="/courses" icon="🔍" label="Browse Courses" />
                    <div className="sidebar-section-label">Learning</div>
                    <SidebarLink to="/quiz/1" icon="✏️" label="Quizzes" />
                    <SidebarLink to="/quiz-result/1" icon="🧠" label="AI Recommendations" />
                    <SidebarLink to="#" icon="🏆" label="Certificates" />
                    <div className="sidebar-section-label">Account</div>
                    <SidebarLink to="/login" icon="🚪" label="Log Out" />
                </nav>
                <div className="sidebar-footer">
                    <div className="sidebar-user">
                        <div className="sidebar-avatar">V</div>
                        <div>
                            <span className="sidebar-user-name">Vinuthna</span>
                            <span className="sidebar-user-role">Student</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* MAIN */}
            <main className="main-content">
                <div className="page-topbar">
                    <div>
                        <h2>Good morning, Vinuthna 👋</h2>
                        <p>You have 2 quizzes due this week.</p>
                    </div>
                    <div className="topbar-right">
                        <Link to="/courses" className="btn btn-primary btn-sm">+ Enrol in Course</Link>
                    </div>
                </div>

                {/* STATS */}
                <div className="stats-grid">
                    {[
                        { icon: '📖', bg: '#eff6ff', label: 'Enrolled Courses', value: '4' },
                        { icon: '✅', bg: '#f0fdf4', label: 'Quizzes Passed', value: '11' },
                        { icon: '⚡', bg: '#ede9fe', label: 'Day Streak', value: '7' },
                        { icon: '🏆', bg: '#fef3c7', label: 'Certificates', value: '2' },
                    ].map((s, i) => (
                        <div key={i} className="stat-card">
                            <div className="stat-icon" style={{ background: s.bg }}>{s.icon}</div>
                            <div>
                                <div className="stat-label">{s.label}</div>
                                <div className="stat-value">{s.value}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '22px' }}>
                    {/* ACTIVE COURSES */}
                    <div className="card">
                        <div className="card-header">
                            <h3>Active Courses</h3>
                            <Link to="/courses" style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 600 }}>View all</Link>
                        </div>
                        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            {[
                                { title: 'Python for Beginners', pct: 72, badge: 'In Progress', bc: '#dbeafe', tc: 'var(--primary)' },
                                { title: 'Web Dev with React', pct: 15, badge: 'Just Started', bc: '#fef3c7', tc: 'var(--warning)' },
                                { title: 'Machine Learning Basics', pct: 90, badge: 'Almost Done', bc: '#d1fae5', tc: 'var(--success)' },
                            ].map((c, i) => (
                                <Link key={i} to="/viewer/1" style={{ display: 'block', padding: '15px', borderRadius: 'var(--radius)', border: '2px solid var(--gray-light)', textDecoration: 'none', color: 'inherit', transition: 'var(--transition)' }}
                                    onMouseOver={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                                    onMouseOut={e => e.currentTarget.style.borderColor = 'var(--gray-light)'}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                                        <span style={{ fontWeight: 700, fontSize: '14px' }}>{c.title}</span>
                                        <span className="badge" style={{ background: c.bc, color: c.tc }}>{c.badge}</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{ width: `${c.pct}%` }} />
                                    </div>
                                    <div style={{ fontSize: '12px', color: 'var(--gray)', marginTop: '6px' }}>{c.pct}% complete</div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* AI RECOMMENDATIONS */}
                    <div className="ai-card">
                        <div className="ai-card-title">
                            <span style={{ fontSize: '22px' }}>🧠</span>
                            <h3>Gemini AI Analysis</h3>
                        </div>
                        <p style={{ fontSize: '13px', color: 'var(--gray)', marginBottom: '18px' }}>Based on your last Python quiz (Score: 64%)</p>
                        {[
                            { topic: 'Variables & Data Types', score: '90%', color: 'var(--success)', icon: '✅' },
                            { topic: 'Control Flow (Loops)', score: '85%', color: 'var(--success)', icon: '✅' },
                            { topic: 'Functions', score: '55%', color: 'var(--warning)', icon: '⚠️' },
                            { topic: 'Lists & Collections', score: '40%', color: 'var(--danger)', icon: '❌' },
                        ].map((t, i) => (
                            <div key={i} className="topic-row">
                                <span>{t.topic}</span>
                                <span className="topic-score" style={{ color: t.color }}>{t.icon} {t.score}</span>
                            </div>
                        ))}
                        <div style={{ marginTop: '18px', padding: '14px', background: 'rgba(255,255,255,.7)', borderRadius: 'var(--radius)', border: '1px solid rgba(59,130,246,.15)' }}>
                            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)', marginBottom: '8px' }}>🗺️ YOUR STUDY PATH</div>
                            <ol style={{ paddingLeft: '18px', fontSize: '13px', color: 'var(--dark-2)', lineHeight: 2 }}>
                                <li>Revise Lists &amp; Collections module</li>
                                <li>Complete Practice Exercises for Functions</li>
                                <li>Take targeted mini quiz on weak topics</li>
                            </ol>
                        </div>
                        <Link to="/quiz-result/1" className="btn btn-primary btn-full" style={{ marginTop: '16px' }}>
                            View Full AI Analysis →
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
