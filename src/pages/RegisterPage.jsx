import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function RegisterPage() {
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'Student' });
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(form.name, form.email, form.password);
            // Ignore role for now since API doesn't support setting it currently unless implemented later
            navigate('/student-dashboard');
        } catch (error) {
            console.error("Registration failed", error);
            alert("Failed to register. Please try again.");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-left">
                <div className="auth-left-inner">
                    <Link to="/" className="nav-logo" style={{ color: '#fff', display: 'block', marginBottom: '40px' }}>LearnHub AI</Link>
                    <h2>Start your AI-powered learning journey today</h2>
                    <p>Create your account and get a personalised Gemini AI study plan after your first quiz.</p>
                    {[
                        { icon: '🆓', bg: '#eff6ff', title: 'Free to Start', sub: 'No credit card required' },
                        { icon: '🤖', bg: '#f5f3ff', title: 'Instant AI Analysis', sub: 'After your very first quiz' },
                        { icon: '📚', bg: '#fef3c7', title: '100+ Courses', sub: 'Across multiple domains' },
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

            <div className="auth-right">
                <div className="auth-form-wrap animate-fadeup">
                    <h1>Create Account</h1>
                    <p>Join thousands of learners on LearnHub AI.</p>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="name">Full Name</label>
                            <input id="name" type="text" className="form-control" placeholder="John Doe"
                                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="email">Email Address</label>
                            <input id="email" type="email" className="form-control" placeholder="you@example.com"
                                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input id="password" type="password" className="form-control" placeholder="At least 6 characters"
                                value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
                            <div className="form-hint">Use a mix of letters, numbers and symbols.</div>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="role">I am a...</label>
                            <select id="role" className="form-control" value={form.role}
                                onChange={e => setForm({ ...form, role: e.target.value })}>
                                <option value="Student">Student — I want to learn</option>
                                <option value="Instructor">Instructor — I want to teach</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary btn-full">Create My Account →</button>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--gray)' }}>
                        Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 700 }}>Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
