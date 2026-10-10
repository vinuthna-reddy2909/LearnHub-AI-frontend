import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const SidebarLink = ({ to, icon, label, active, onClick }) => (
    <Link to={to} className={`sidebar-link ${active ? 'active' : ''}`} onClick={onClick}>
        <span className="icon">{icon}</span> {label}
    </Link>
);

const BAR_DATA = [
    { label: 'Jan', pct: 25 }, { label: 'Feb', pct: 40 }, { label: 'Mar', pct: 65 },
    { label: 'Apr', pct: 80 }, { label: 'May', pct: 90 }, { label: 'Jun', pct: 100 },
];
const COMPLETION = [
    { name: 'Python for Beginners', pct: 85, color: 'var(--success)' },
    { name: 'React Advanced', pct: 62, color: 'var(--primary)' },
    { name: 'Machine Learning', pct: 45, color: 'var(--warning)' },
    { name: 'Algorithms & DS', pct: 70, color: 'var(--secondary)' },
];

export default function InstructorDashboard() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        navigate('/');
    };

    return (
        <div className="app-shell">
            <aside className="sidebar">
                <div className="sidebar-logo gradient-text">LearnHub AI</div>
                <nav className="sidebar-nav">
                    <div className="sidebar-section-label">Instructor</div>
                    <SidebarLink to="/instructor-dashboard" icon="🏠" label="Dashboard" active />
                    <SidebarLink to="#" icon="📚" label="My Courses" />
                    <SidebarLink to="#" icon="✏️" label="Create Course" />
                    <div className="sidebar-section-label">Students</div>
                    <SidebarLink to="#" icon="👥" label="Students" />
                    <SidebarLink to="#" icon="📊" label="Analytics" />
                    <div className="sidebar-section-label">Account</div>
                    <SidebarLink to="/login" icon="🚪" label="Log Out" onClick={handleLogout} />
                </nav>
                <div className="sidebar-footer">
                    <div className="sidebar-user">
                        <div className="sidebar-avatar">{user?.name ? user.name.charAt(0).toUpperCase() : 'I'}</div>
                        <div>
                            <span className="sidebar-user-name">{user?.name || "Instructor"}</span>
                            <span className="sidebar-user-role">Pro Account</span>
                        </div>
                    </div>
                </div>
            </aside>

            <main className="main-content">
                <div className="page-topbar">
                    <div><h2>Instructor Dashboard</h2><p>Manage your courses and track student performance.</p></div>
                    <a href="#" className="btn btn-primary btn-sm">+ Create Course</a>
                </div>

                <div className="stats-grid">
                    {[
                        { icon: '👥', bg: '#eff6ff', label: 'Total Students', value: '1,245' },
                        { icon: '📚', bg: '#ede9fe', label: 'Active Courses', value: '4' },
                        { icon: '💰', bg: '#f0fdf4', label: 'Total Revenue', value: '$4.2K' },
                        { icon: '⭐', bg: '#fef3c7', label: 'Avg. Rating', value: '4.8' },
                    ].map((s, i) => (
                        <div key={i} className="stat-card">
                            <div className="stat-icon" style={{ background: s.bg }}>{s.icon}</div>
                            <div><div className="stat-label">{s.label}</div><div className="stat-value">{s.value}</div></div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '22px', marginBottom: '24px' }}>
                    {/* BAR CHART */}
                    <div className="card">
                        <div className="card-header"><h3>Student Enrollment (2026)</h3></div>
                        <div className="card-body">
                            <div className="chart-bars">
                                {BAR_DATA.map((b, i) => (
                                    <div key={i} className="chart-bar-group">
                                        <div className="chart-bar-fill" style={{ height: `${b.pct}%` }} />
                                        <div className="chart-bar-label">{b.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* COMPLETION RATES */}
                    <div className="card">
                        <div className="card-header"><h3>Course Completion Rates</h3></div>
                        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                            {COMPLETION.map((c, i) => (
                                <div key={i}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                                        <span>{c.name}</span><span style={{ color: c.color }}>{c.pct}%</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{ width: `${c.pct}%`, background: c.color }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* STUDENT REVIEWS */}
                <div className="card">
                    <div className="card-header"><h3>Recent Student Reviews</h3></div>
                    <div className="table-wrapper">
                        <table>
                            <thead><tr><th>Student</th><th>Course</th><th>Rating</th><th>Comment</th><th>Date</th></tr></thead>
                            <tbody>
                                {[
                                    {
                                        initial: 'A', name: 'Alice', course: 'Python for Beginners', rating: '★★★★★', comment: '"Best course I\'ve taken!"', date: '2 days ago'
                                    },
                                    { initial: 'B', name: 'Bob', course: 'React Advanced', rating: '★★★★☆', comment: '"Very helpful content."', date: '5 days ago' },
                                ].map((r, i) => (
                                    <tr key={i}>
                                        <td><div className="user-cell"><div className="avatar">{r.initial}</div><div className="user-name">{r.name}</div></div></td>
                                        <td style={{ fontSize: '13px' }}>{r.course}</td>
                                        <td style={{ color: 'var(--warning)', fontWeight: 700 }}>{r.rating}</td>
                                        <td style={{ fontSize: '13px', color: 'var(--gray)' }}>{r.comment}</td>
                                        <td style={{ fontSize: '13px', color: 'var(--gray)' }}>{r.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
