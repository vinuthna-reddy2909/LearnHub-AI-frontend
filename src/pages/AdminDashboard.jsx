import { Link } from 'react-router-dom';

const SidebarLink = ({ to, icon, label, active }) => (
    <Link to={to} className={`sidebar-link ${active ? 'active' : ''}`}>
        <span className="icon">{icon}</span> {label}
    </Link>
);

const PENDING = [
    { title: 'Advanced Node.js Patterns', cat: 'Backend', instructor: 'John Doe', initial: 'J', submitted: '1 day ago' },
    { title: 'Deep Learning with PyTorch', cat: 'AI/ML', instructor: 'Sara Kim', initial: 'S', submitted: '3 days ago' },
];
const USERS = [
    { initial: 'V', name: 'Vinuthna Reddy', email: 'vinuthna@example.com', role: 'Student', badge: 'badge-primary', courses: '4' },
    { initial: 'J', name: 'John Doe', email: 'john@example.com', role: 'Instructor', badge: 'badge-purple', courses: '2 created' },
    { initial: 'S', name: 'Sara Kim', email: 'sara@example.com', role: 'Instructor', badge: 'badge-purple', courses: '3 created' },
];

export default function AdminDashboard() {
    return (
        <div className="app-shell">
            <aside className="sidebar">
                <div className="sidebar-logo gradient-text">LearnHub AI</div>
                <nav className="sidebar-nav">
                    <div className="sidebar-section-label">Admin</div>
                    <SidebarLink to="/admin-dashboard" icon="🏠" label="Control Center" active />
                    <SidebarLink to="#" icon="👥" label="Users" />
                    <SidebarLink to="#" icon="📚" label="All Courses" />
                    <SidebarLink to="#" icon="🔍" label="Course Reviews" />
                    <SidebarLink to="#" icon="📊" label="Analytics" />
                    <SidebarLink to="#" icon="⚙️" label="Settings" />
                    <div className="sidebar-section-label">Account</div>
                    <SidebarLink to="/login" icon="🚪" label="Log Out" />
                </nav>
                <div className="sidebar-footer">
                    <div className="sidebar-user">
                        <div className="sidebar-avatar">A</div>
                        <div>
                            <span className="sidebar-user-name">Admin</span>
                            <span className="sidebar-user-role">Super Admin</span>
                        </div>
                    </div>
                </div>
            </aside>

            <main className="main-content">
                <div className="page-topbar">
                    <div><h2>Admin Control Center</h2><p>Platform-wide overview and system management.</p></div>
                </div>

                <div className="stats-grid">
                    {[
                        { icon: '👥', bg: '#eff6ff', label: 'Total Users', value: '5,632' },
                        { icon: '📚', bg: '#ede9fe', label: 'Total Courses', value: '128' },
                        { icon: '🔍', bg: '#fee2e2', label: 'Pending Reviews', value: '14', vc: 'var(--danger)' },
                        { icon: '🖥️', bg: '#f0fdf4', label: 'Server Status', value: 'Stable ✓', vc: 'var(--success)', small: true },
                    ].map((s, i) => (
                        <div key={i} className="stat-card">
                            <div className="stat-icon" style={{ background: s.bg }}>{s.icon}</div>
                            <div><div className="stat-label">{s.label}</div><div className="stat-value" style={{ color: s.vc, fontSize: s.small ? '16px' : undefined }}>{s.value}</div></div>
                        </div>
                    ))}
                </div>

                {/* PENDING REVIEWS */}
                <div className="card" style={{ marginBottom: '22px' }}>
                    <div className="card-header">
                        <h3>Courses Pending Review</h3>
                        <span className="badge badge-danger">14 pending</span>
                    </div>
                    <div className="table-wrapper">
                        <table>
                            <thead><tr><th>Course</th><th>Instructor</th><th>Submitted</th><th>Status</th><th>Actions</th></tr></thead>
                            <tbody>
                                {PENDING.map((p, i) => (
                                    <tr key={i}>
                                        <td>
                                            <div style={{ fontWeight: 600, fontSize: '14px' }}>{p.title}</div>
                                            <div style={{ fontSize: '12px', color: 'var(--gray)' }}>{p.cat}</div>
                                        </td>
                                        <td><div className="user-cell"><div className="avatar">{p.initial}</div><div className="user-name">{p.instructor}</div></div></td>
                                        <td style={{ fontSize: '13px', color: 'var(--gray)' }}>{p.submitted}</td>
                                        <td><span className="badge badge-warning">Pending Review</span></td>
                                        <td style={{ display: 'flex', gap: '6px' }}>
                                            <button className="btn btn-sm" style={{ background: '#d1fae5', color: 'var(--success)', borderRadius: '8px', fontSize: '12px' }}
                                                onClick={e => e.currentTarget.closest('tr').style.opacity = '.4'}>✓ Approve</button>
                                            <button className="btn btn-sm" style={{ background: '#fee2e2', color: 'var(--danger)', borderRadius: '8px', fontSize: '12px' }}
                                                onClick={e => e.currentTarget.closest('tr').style.opacity = '.4'}>✗ Reject</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* USERS TABLE */}
                <div className="card">
                    <div className="card-header"><h3>Recent Users</h3><a href="#" style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 600 }}>View all</a></div>
                    <div className="table-wrapper">
                        <table>
                            <thead><tr><th>User</th><th>Role</th><th>Courses</th><th>Joined</th><th>Actions</th></tr></thead>
                            <tbody>
                                {USERS.map((u, i) => (
                                    <tr key={i}>
                                        <td><div className="user-cell"><div className="avatar">{u.initial}</div><div><div className="user-name">{u.name}</div><div className="user-email">{u.email}</div></div></div></td>
                                        <td><span className={`badge ${u.badge}`}>{u.role}</span></td>
                                        <td style={{ fontSize: '13px' }}>{u.courses}</td>
                                        <td style={{ fontSize: '13px', color: 'var(--gray)' }}>2 days ago</td>
                                        <td><button className="btn btn-sm btn-outline" style={{ borderRadius: '8px', fontSize: '12px' }}>Edit</button></td>
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
