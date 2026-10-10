import { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import api from '../services/api';

const MOCK_TOPICS = [
    { topic: 'Variables & Data Types', score: 90, status: 'strong', color: 'var(--success)', icon: '✅' },
    { topic: 'Control Flow (Loops)', score: 85, status: 'strong', color: 'var(--success)', icon: '✅' },
    { topic: 'Functions', score: 55, status: 'moderate', color: 'var(--warning)', icon: '⚠️' },
    { topic: 'Lists & Collections', score: 40, status: 'weak', color: 'var(--danger)', icon: '❌' },
];
const MOCK_PATH = [
    'Revise Lists & Collections module in depth',
    'Complete Practice Exercises for Functions',
    'Take targeted mini quiz on weak topics',
    'Move on to the next module once score ≥ 80%',
];

const getStatusDetails = (status) => {
    if (status === 'strong') return { color: 'var(--success)', icon: '✅' };
    if (status === 'moderate') return { color: 'var(--warning)', icon: '⚠️' };
    return { color: 'var(--danger)', icon: '❌' };
};

export default function QuizResultPage() {
    const { id } = useParams();
    const location = useLocation();

    const score = location.state?.score || 64;
    const passed = location.state?.passed ?? (score >= 70);

    const [loading, setLoading] = useState(true);
    const [aiData, setAiData] = useState({ topics: [], path: [] });

    useEffect(() => {
        const fetchAiInsights = async () => {
            try {
                if (id.startsWith('mock')) throw new Error("Mock attempt triggered");
                const { data } = await api.get(`/api/ai/recommendations/${id}`);

                // Map the structured AI response to UI props
                const topics = data.topicBreakdown.map(t => ({
                    ...t,
                    ...getStatusDetails(t.status)
                }));

                setAiData({ topics, path: data.recommendedPath });
            } catch (error) {
                console.warn("Using mock AI insights. Local MongoDB might not be running or attempt was mocked.");
                // Fallback to static mock to preserve UI preview
                setTimeout(() => {
                    setAiData({ topics: MOCK_TOPICS, path: MOCK_PATH });
                    setLoading(false);
                }, 1800);
                return;
            }
            setLoading(false);
        };
        fetchAiInsights();
    }, [id]);

    return (
        <main className="result-page">
            <div className="result-container">

                {/* SCORE CARD */}
                <div className="score-card animate-fadeup">
                    <div className="score-ring" style={{ background: passed ? 'linear-gradient(135deg,#10b981,#059669)' : 'linear-gradient(135deg,#ef4444,#dc2626)' }}>
                        <span>{score.toFixed(0)}%</span>
                    </div>
                    <h1>{passed ? '🎉 Congratulations, you passed!' : '😔 You did not pass this time.'}</h1>
                    <p>You need at least 70% to pass. Use the AI analysis below to focus your revision.</p>
                    <div className="result-actions">
                        <button className="btn btn-outline" onClick={() => window.history.back()}>Retake Quiz</button>
                        <Link to="/courses" className="btn btn-dark">Continue Learning →</Link>
                    </div>
                </div>

                {/* AI ANALYSIS CARD */}
                <div className="ai-card animate-fadeup delay-1">
                    <div className="ai-card-title">
                        <span style={{ fontSize: '22px' }}>🧠</span>
                        <h3>Gemini AI Analysis {loading && <span style={{ fontSize: '14px', color: 'var(--primary)' }}>· Generating...</span>}</h3>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--gray)', marginBottom: '20px' }}>
                        Personalised insights based on your answer patterns
                    </p>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '28px' }}>
                            <div style={{ fontSize: '32px', marginBottom: '12px', animation: 'float 1.5s ease-in-out infinite' }}>🧠</div>
                            <p style={{ fontSize: '14px', color: 'var(--gray)' }}>Gemini is building your personalised study path…</p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            {/* TOPIC BREAKDOWN */}
                            <div style={{ background: 'rgba(255,255,255,.75)', borderRadius: 'var(--radius)', padding: '18px', border: '1px solid rgba(255,255,255,.9)' }}>
                                <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '14px', borderBottom: '1px solid var(--gray-light)', paddingBottom: '10px' }}>Topic Breakdown</h4>
                                {aiData.topics.map((t, i) => (
                                    <div key={i} className="topic-row">
                                        <span style={{ fontSize: '13px' }}>{t.topic}</span>
                                        <span className="topic-score" style={{ color: t.color, fontSize: '13px' }}>{t.icon} {t.score}%</span>
                                    </div>
                                ))}
                            </div>
                            {/* LEARNING PATH */}
                            <div style={{ background: 'rgba(255,255,255,.75)', borderRadius: 'var(--radius)', padding: '18px', border: '1px solid rgba(255,255,255,.9)' }}>
                                <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '14px', borderBottom: '1px solid var(--gray-light)', paddingBottom: '10px' }}>Recommended Path</h4>
                                <ol style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {aiData.path.map((step, i) => (
                                        <li key={i} style={{ fontSize: '13px', color: 'var(--dark-2)', lineHeight: 1.5 }}>{step}</li>
                                    ))}
                                </ol>
                                <button className="btn btn-primary btn-full" style={{ marginTop: '16px' }}>
                                    🧠 Start Personalised Path
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </main>
    );
}
