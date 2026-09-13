
"use client";
import { useState, useEffect } from "react";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <>
            {isVisible && (
                <button
                    className="scroll-to-top"
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                >
                    <i className="fas fa-arrow-up"></i>
                </button>
            )}
            <style jsx>{`
                .scroll-to-top {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    width: 50px;
                    height: 50px;
                    background: var(--primary);
                    color: white;
                    border: none;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.25rem;
                    box-shadow: 0 4px 15px rgba(56, 189, 248, 0.4);
                    z-index: 999;
                    transition: all 0.3s ease;
                }
                .scroll-to-top:hover {
                    transform: translateY(-5px);
                    background: var(--primary-hover);
                    box-shadow: 0 6px 20px rgba(56, 189, 248, 0.6);
                }
                [dir="rtl"] .scroll-to-top {
                    right: auto;
                    left: 30px;
                }
                @media (max-width: 768px) {
                    .scroll-to-top {
                        bottom: 20px;
                        right: 20px;
                        width: 45px;
                        height: 45px;
                    }
                    [dir="rtl"] .scroll-to-top {
                        right: auto;
                        left: 20px;
                    }
                }
            `}</style>
        </>
    );
}
