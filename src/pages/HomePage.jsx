import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function HomePage() {
    const { user } = useContext(AuthContext);

    return (
        <>
            {/* NAVBAR */}
            <nav className="navbar">
                <div className="navbar-inner">
                    <Link to="/" className="nav-logo gradient-text">LearnHub AI</Link>
                    <ul className="nav-links">
                        <li><Link to="/courses">Courses</Link></li>
                        <li><a href="#">For Instructors</a></li>
                        <li><a href="#">About</a></li>
                    </ul>
                    <div className="nav-actions">
                        {user ? (
                            <Link to={user.role === 'Instructor' ? '/instructor-dashboard' : '/student-dashboard'} className="btn btn-primary btn-sm">
                                Dashboard &rarr;
                            </Link>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-outline btn-sm">Log In</Link>
                                <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* HERO */}
            <section className="hero">
                <div className="hero-inner">
                    <div className="animate-fadeup">
                        <div className="hero-tag">✨ Powered by Google Gemini AI</div>
                        <h1>Learn Smarter,<br /><span className="gradient-text">Not Harder</span></h1>
                        <p className="hero-desc">
                            LearnHub AI analyses your quiz results and creates a custom revision plan targeting
                            exactly your weak topics — turning every failure into a roadmap to success.
                        </p>
                        <div className="hero-actions">
                            <Link to="/register" className="btn btn-primary">Start for Free →</Link>
                            <Link to="/courses" className="btn btn-outline">Browse Courses</Link>
                        </div>
                    </div>

                    <div className="hero-visual animate-fadeup delay-2">
                        <div className="ai-preview-card">
                            <h4>🧠 Gemini AI Analysis</h4>
                            <p>Python Quiz · Module 2</p>
                            <div className="topic-bar">
                                <div className="topic-bar-header"><span>Variables</span><span style={{ color: 'var(--success)' }}>90%</span></div>
                                <div className="progress-bar"><div className="progress-fill" style={{ width: '90%', background: 'var(--success)' }} /></div>
                            </div>
                            <div className="topic-bar">
                                <div className="topic-bar-header"><span>Functions</span><span style={{ color: 'var(--warning)' }}>55%</span></div>
                                <div className="progress-bar"><div className="progress-fill" style={{ width: '55%', background: 'var(--warning)' }} /></div>
                            </div>
                            <div className="topic-bar">
                                <div className="topic-bar-header"><span>Lists</span><span style={{ color: 'var(--danger)' }}>40%</span></div>
                                <div className="progress-bar"><div className="progress-fill" style={{ width: '40%', background: 'var(--danger)' }} /></div>
                            </div>
                            <div className="ai-path-box">
                                <strong>📚 Recommended Path</strong>
                                1. Revise Lists → 2. Practice Functions → 3. Re-assessment
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="features">
                <div className="section-container">
                    <div className="section-header">
                        <h2>Everything you need to <span className="gradient-text">master any skill</span></h2>
                        <p>A complete learning ecosystem built around your individual needs and performance.</p>
                    </div>
                    <div className="features-grid">
                        {[
                            { icon: '📖', bg: '#eff6ff', title: 'Structured Courses', desc: 'Organised modules and bite-sized lessons for progressive mastery.' },
                            { icon: '🎯', bg: '#f5f3ff', title: 'Adaptive Quizzes', desc: 'Assessments that measure understanding at a topic level, not just your score.' },
                            { icon: '🤖', bg: '#f0fdf4', title: 'Gemini AI Recommendations', desc: 'After each quiz, Gemini builds a targeted revision plan just for you.' },
                            { icon: '📊', bg: '#fff7ed', title: 'Progress Tracking', desc: 'Visual dashboards showing your improvement across all courses.' },
                            { icon: '👥', bg: '#fdf2f8', title: 'Expert Instructors', desc: 'Courses created by vetted domain experts, reviewed before publishing.' },
                            { icon: '🏆', bg: '#f0f9ff', title: 'Certificates', desc: 'Earn verified completion certificates once you pass the final assessment.' },
                        ].map((f, i) => (
                            <article key={i} className={`feature-card animate-fadeup delay-${(i % 3) + 1}`}>
                                <div className="feature-icon" style={{ background: f.bg }}>{f.icon}</div>
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-section">
                <div className="section-container">
                    <h2>Ready to learn smarter?</h2>
                    <p>Join thousands of learners getting personalised AI recommendations.</p>
                    <Link to="/register" className="btn btn-primary" style={{ fontSize: '16px', padding: '14px 40px' }}>
                        Create Free Account →
                    </Link>
                </div>
            </section>

            <footer className="footer">
                <span>LearnHub AI</span> &copy; 2026 · Powered by Google Gemini
            </footer>
        </>
    );
}
