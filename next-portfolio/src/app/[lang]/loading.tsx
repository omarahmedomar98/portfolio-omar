"use client";

export default function Loading() {
    return (
        <div className="loading-screen">
            <div className="loader">
                <div className="spinner"></div>
                <div className="loading-text">Omar Ahmed</div>
            </div>
            <style jsx>{`
                .loading-screen {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background: var(--bg-body, #0f172a);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                }
                .loader {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 20px;
                }
                .spinner {
                    width: 50px;
                    height: 50px;
                    border: 3px solid rgba(56, 189, 248, 0.1);
                    border-top-color: var(--primary, #38bdf8);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                .loading-text {
                    font-size: 1.2rem;
                    font-weight: 700;
                    color: var(--text-main, #f8fafc);
                    letter-spacing: 2px;
                    text-transform: uppercase;
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
