import { useState } from 'react';
import { Link } from 'react-router-dom';

const COURSES = [
    { id: 1, emoji: '🐍', cat: 'Python', title: 'Python for Beginners', desc: 'Master Python from zero — variables, loops, functions, OOP and real-world projects.', rating: 4.9, students: '12.4K', duration: '24 hrs', level: 'Beginner', levelColor: 'var(--success)' },
    { id: 2, emoji: '⚛️', cat: 'Web', title: 'React.js Advanced Patterns', desc: 'Deep dive into hooks, context, performance optimisation and large-scale architecture.', rating: 4.8, students: '8.1K', duration: '18 hrs', level: 'Advanced', levelColor: 'var(--danger)' },
    { id: 3, emoji: '🤖', cat: 'AI', title: 'Machine Learning Fundamentals', desc: 'Build supervised, unsupervised and reinforcement learning models from scratch.', rating: 4.9, students: '15.2K', duration: '32 hrs', level: 'Intermediate', levelColor: 'var(--primary)' },
    { id: 4, emoji: '🎨', cat: 'Design', title: 'UI/UX Design Mastery', desc: 'Learn Figma, design systems, prototyping and accessibility best practices.', rating: 4.7, students: '6.3K', duration: '20 hrs', level: 'Beginner', levelColor: 'var(--success)' },
    { id: 5, emoji: '📊', cat: 'Data', title: 'Data Science with Python', desc: 'Pandas, NumPy, Matplotlib and building end-to-end data pipelines.', rating: 4.8, students: '9.7K', duration: '28 hrs', level: 'Intermediate', levelColor: 'var(--primary)' },
    { id: 6, emoji: '🔐', cat: 'Web', title: 'Full-Stack with Node.js', desc: 'Build and deploy production-grade REST APIs with Express, MongoDB and JWT.', rating: 4.9, students: '7.5K', duration: '22 hrs', level: 'Intermediate', levelColor: 'var(--primary)' },
];
const FILTERS = ['All', 'Python', 'Web', 'AI', 'Design', 'Data'];

export default function CoursesPage() {
    const [activeFilter, setActiveFilter] = useState('All');
    const [search, setSearch] = useState('');

    const visible = COURSES.filter(c => {
        const matchCat = activeFilter === 'All' || c.cat === activeFilter;
        const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    return (
        <>
            <nav className="navbar">
                <div className="navbar-inner">
                    <Link to="/" className="nav-logo gradient-text">LearnHub AI</Link>
                    <ul className="nav-links">
                        <li><Link to="/courses" style={{ color: 'var(--dark)', fontWeight: 700 }}>Courses</Link></li>
                    </ul>
                    <div className="nav-actions">
                        <Link to="/student-dashboard" className="btn btn-outline btn-sm">Dashboard</Link>
                    </div>
                </div>
            </nav>

            <div className="courses-hero">
                <div className="courses-hero-inner">
                    <h1>Explore Our Courses</h1>
                    <p>Discover 100+ expert-led courses across technology, design, and business.</p>
                    <div className="search-bar">
                        <input type="text" placeholder="Search by topic or instructor..."
                            value={search} onChange={e => setSearch(e.target.value)} />
                        <button className="btn btn-primary btn-sm">Search</button>
                    </div>
                </div>
            </div>

            <div className="courses-container">
                <div className="filter-chips">
                    {FILTERS.map(f => (
                        <button key={f} onClick={() => setActiveFilter(f)}
                            className={`btn btn-sm ${activeFilter === f ? 'btn-primary' : 'btn-outline'}`}>
                            {f}
                        </button>
                    ))}
                </div>

                <div className="courses-grid">
                    {visible.map(c => (
                        <Link key={c.id} to={`/courses/${c.id}`} className="course-card">
                            <div className="course-thumb">
                                <span>{c.emoji}</span>
                                <span className="course-cat">{c.cat}</span>
                            </div>
                            <div className="course-body">
                                <div className="course-rating">★ {c.rating} <span style={{ color: 'var(--gray)', fontWeight: 400 }}>({c.students} students)</span></div>
                                <h3 className="course-title">{c.title}</h3>
                                <p className="course-desc">{c.desc}</p>
                                <div className="course-footer">
                                    <span>🕐 {c.duration}</span>
                                    <span className="badge" style={{ background: 'rgba(0,0,0,.05)', color: c.levelColor }}>{c.level}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <footer className="footer"><span>LearnHub AI</span> &copy; 2026</footer>
        </>
    );
}
