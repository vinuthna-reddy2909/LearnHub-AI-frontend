import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function LoginPage() {
    const [form, setForm] = useState({ email: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(form.email, form.password);
            navigate('/student-dashboard');
        } catch (err) {
            console.error("Login failed", err);
            alert("Login failed. Check your credentials.");
        }
    };

    return (
        <div className="auth-page">
            {/* LEFT PANEL */}
            <div className="auth-left">
                <div className="auth-left-inner">
                    <Link to="/" className="nav-logo" style={{ color: '#fff', display: 'block', marginBottom: '40px' }}>LearnHub AI</Link>
                    <h2>Welcome back to your learning journey</h2>
                    <p>Pick up right where you left off. Your AI study path is waiting.</p>
                    {[
                        { icon: '🎯', bg: '#eff6ff', title: 'Personalised Learning Paths', sub: 'AI-generated based on your quiz results' },
                        { icon: '📊', bg: '#f5f3ff', title: 'Track Your Progress', sub: 'Visual dashboards across all courses' },
                        { icon: '🏆', bg: '#f0fdf4', title: 'Earn Certificates', sub: 'Verified on course completion' },
                    ].map((f, i) => (
                        <div key={i} className="auth-feature">
                            <div className="auth-feature-icon" style={{ background: f.bg }}>{f.icon}</div>
                            <div className="auth-feature-text">
                                <strong>{f.title}</strong>
                                <span>{f.sub}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="auth-right">
                <div className="auth-form-wrap animate-fadeup">
                    <h1>Sign In</h1>
                    <p>Enter your credentials to access your dashboard.</p>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="email">Email Address</label>
                            <input id="email" type="email" className="form-control" placeholder="you@example.com"
                                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                        </div>
                        <div className="form-group">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <label className="form-label" htmlFor="password" style={{ marginBottom: 0 }}>Password</label>
                                <a href="#" style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 600 }}>Forgot password?</a>
                            </div>
                            <input id="password" type="password" className="form-control" placeholder="••••••••"
                                value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
                        </div>
                        <button type="submit" className="btn btn-primary btn-full">Sign In →</button>
                    </form>

                    <div className="form-divider"><span>or</span></div>
                    <button className="btn btn-outline btn-full" style={{ borderColor: 'var(--gray-light)', color: 'var(--dark)' }}>
                        Continue with Google
                    </button>

                    <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--gray)' }}>
                        Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 700 }}>Create one free</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
