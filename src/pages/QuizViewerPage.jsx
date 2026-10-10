import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const QUESTIONS = [
    { id: 1, text: 'What keyword is used to define a function in Python?', opts: ['function', 'def', 'define', 'func'], correct: 1 },
    { id: 2, text: 'Which data type is mutable in Python?', opts: ['Tuple', 'String', 'List', 'Integer'], correct: 2 },
    { id: 3, text: 'What does len() return for an empty list?', opts: ['null', 'undefined', '0', '1'], correct: 2 },
    { id: 4, text: 'Which operator is used for integer division?', opts: ['/', '//', '%', '**'], correct: 1 },
    { id: 5, text: 'How do you start a comment in Python?', opts: ['//', '#', '/*', '--'], correct: 1 },
];

export default function QuizViewerPage() {
    const { id } = useParams();
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(600);

    useEffect(() => {
        if (timeLeft <= 0) return;
        const t = setTimeout(() => setTimeLeft(t => t - 1), 1000);
        return () => clearTimeout(t);
    }, [timeLeft]);

    const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const secs = String(timeLeft % 60).padStart(2, '0');
    const progress = ((current + 1) / QUESTIONS.length) * 100;
    const q = QUESTIONS[current];

    const select = (idx) => setAnswers(a => ({ ...a, [current]: idx }));

    return (
        <div className="quiz-shell">
            {/* Q NAVIGATOR SIDEBAR */}
            <aside className="quiz-sidebar">
                <div className="quiz-sidebar-logo gradient-text">Quiz · Module 2</div>
                <div className="quiz-q-nav">
                    {QUESTIONS.map((_, i) => (
                        <button key={i} onClick={() => setCurrent(i)}
                            className={`quiz-q-btn ${i === current ? 'active' : ''} ${answers[i] !== undefined ? 'answered' : ''}`}>
                            Question {i + 1}
                        </button>
                    ))}
                </div>
            </aside>

            {/* QUIZ MAIN */}
            <main className="quiz-main">
                <div className="quiz-topbar">
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gray)' }}>Q {current + 1} / {QUESTIONS.length}</span>
                    <div className="quiz-progress-wrap">
                        <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="quiz-timer">⏱ {mins}:{secs}</div>
                </div>

                <div className="quiz-question">
                    <h2>{q.text}</h2>
                    {q.opts.map((opt, i) => (
                        <div key={i} className={`option ${answers[current] === i ? 'selected' : ''}`}
                            onClick={() => select(i)}>
                            <div className="option-letter">{['A', 'B', 'C', 'D'][i]}</div>
                            <span className="option-text">{opt}</span>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
                    <button className="btn btn-outline btn-sm" onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0}>
                        ← Previous
                    </button>
                    {current < QUESTIONS.length - 1
                        ? <button className="btn btn-primary btn-sm" onClick={() => setCurrent(c => c + 1)}>Next →</button>
                        : <Link to={`/quiz-result/1`} className="btn btn-primary btn-sm">Submit Quiz ✓</Link>
                    }
                </div>
            </main>
        </div>
    );
}
