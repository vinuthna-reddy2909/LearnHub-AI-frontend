import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

const QUESTIONS = [
    { _id: 'q1', text: 'What keyword is used to define a function in Python?', opts: ['function', 'def', 'define', 'func'], correct: 1 },
    { _id: 'q2', text: 'Which data type is mutable in Python?', opts: ['Tuple', 'String', 'List', 'Integer'], correct: 2 },
    { _id: 'q3', text: 'What does len() return for an empty list?', opts: ['null', 'undefined', '0', '1'], correct: 2 },
    { _id: 'q4', text: 'Which operator is used for integer division?', opts: ['/', '//', '%', '**'], correct: 1 },
    { _id: 'q5', text: 'How do you start a comment in Python?', opts: ['//', '#', '/*', '--'], correct: 1 },
];

export default function QuizViewerPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(600);
    const [submitting, setSubmitting] = useState(false);

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

    const handleSubmit = async () => {
        setSubmitting(true);
        // Format answers for API: [{ questionId, selectedOptionIndex }]
        const formattedAnswers = Object.entries(answers).map(([qIdx, optIdx]) => ({
            questionId: QUESTIONS[qIdx]._id,
            selectedOptionIndex: optIdx
        }));

        try {
            const { data } = await api.post(`/api/quizzes/${id}/submit`, { answers: formattedAnswers });
            navigate(`/quiz-result/${data.attemptId}`, { state: { score: data.score, passed: data.passed } });
        } catch (error) {
            console.warn("Backend submit failed, falling back to mock result handling.");
            // Calculate mock score
            let correct = 0;
            Object.entries(answers).forEach(([qIdx, optIdx]) => {
                if (QUESTIONS[qIdx].correct === optIdx) correct++;
            });
            const score = (correct / QUESTIONS.length) * 100;
            navigate(`/quiz-result/mock_attempt_${id}`, { state: { score, passed: score >= 70 } });
        }
    };

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
                        : <button className="btn btn-primary btn-sm" onClick={handleSubmit} disabled={submitting}>
                            {submitting ? 'Submitting...' : 'Submit Quiz ✓'}
                        </button>
                    }
                </div>
            </main>
        </div>
    );
}
