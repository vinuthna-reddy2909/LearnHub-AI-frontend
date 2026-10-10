import { Link } from 'react-router-dom';

export default function CourseDetailsPage() {
    return (
        <>
            {/* DETAILS HERO */}
            <div className="details-hero">
                <div className="details-hero-inner">
                    <div>
                        <span className="badge badge-primary" style={{ marginBottom: '16px', display: 'inline-block', fontSize: '12px' }}>Python · Beginner</span>
                        <h1>Python for Beginners</h1>
                        <div className="details-meta">
                            <span>★ 4.9 (12.4K students)</span>
                            <span>·</span>
                            <span>🕐 24 hours</span>
                            <span>·</span>
                            <span>5 modules · 32 lessons</span>
                        </div>
                        <p className="details-desc">
                            Master Python from the ground up — from variables and data types all the way to
                            object-oriented programming, file I/O and building real-world projects.
                        </p>
                    </div>
                    <div className="enroll-card animate-fadeup">
                        <div className="enroll-price">Free</div>
                        <Link to="/viewer/1" className="btn btn-primary btn-full" style={{ marginBottom: '14px' }}>
                            Start Learning →
                        </Link>
                        <Link to="/quiz/1" className="btn btn-outline btn-full">Take Practice Quiz</Link>
                        <ul className="enroll-includes" style={{ marginTop: '20px' }}>
                            <li>📹 24 hours on-demand video</li>
                            <li>📝 5 graded quizzes</li>
                            <li>🧠 Gemini AI personalised path</li>
                            <li>🏆 Certificate on completion</li>
                            <li>♾️ Full lifetime access</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* SYLLABUS */}
            <div className="section-container" style={{ paddingTop: '48px', paddingBottom: '60px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '40px' }}>
                    <div>
                        <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '24px' }}>Course Syllabus</h2>
                        {[
                            { module: 'Module 1: Getting Started', lessons: ['Installing Python', 'Hello World', 'Variables & Data Types'] },
                            { module: 'Module 2: Control Flow', lessons: ['If / Else Statements', 'For Loops', 'While Loops'] },
                            { module: 'Module 3: Functions', lessons: ['Defining Functions', 'Arguments & Return', 'Lambda Functions'] },
                            { module: 'Module 4: Data Structures', lessons: ['Lists', 'Dictionaries', 'Tuples & Sets'] },
                            { module: 'Module 5: OOP', lessons: ['Classes & Objects', 'Inheritance', 'Final Project'] },
                        ].map((m, i) => (
                            <details key={i} style={{ marginBottom: '12px', background: 'var(--white)', border: '1px solid var(--gray-light)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                                <summary style={{ padding: '16px 20px', fontWeight: 700, cursor: 'pointer', fontSize: '14px', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                                    {m.module} <span style={{ color: 'var(--gray)', fontWeight: 400 }}>{m.lessons.length} lessons</span>
                                </summary>
                                <ul style={{ padding: '12px 20px 16px 36px', listStyle: 'disc', fontSize: '14px', color: 'var(--gray)' }}>
                                    {m.lessons.map((l, j) => <li key={j} style={{ padding: '4px 0' }}>{l}</li>)}
                                </ul>
                            </details>
                        ))}
                    </div>

                    <aside>
                        <div className="card" style={{ padding: '22px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Instructor</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                <div className="avatar" style={{ width: '46px', height: '46px', fontSize: '18px' }}>J</div>
                                <div>
                                    <div style={{ fontWeight: 700 }}>Jane Smith</div>
                                    <div style={{ fontSize: '12px', color: 'var(--gray)' }}>Senior Python Developer</div>
                                </div>
                            </div>
                            <p style={{ fontSize: '13px', color: 'var(--gray)', lineHeight: 1.6 }}>
                                10+ years of industry experience. Passionate about making programming accessible to everyone.
                            </p>
                        </div>
                    </aside>
                </div>
            </div>

            <footer className="footer"><span>LearnHub AI</span> &copy; 2026</footer>
        </>
    );
}
