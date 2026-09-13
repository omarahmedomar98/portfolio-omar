
"use client";
import { useRef, useState } from "react";
import AnimatedSection from "./AnimatedSection";

function Toast({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) {
    return (
        <div className={`toast toast-${type}`}>
            <i className={`fas ${type === "success" ? "fa-check-circle" : "fa-exclamation-circle"}`}></i>
            <span>{message}</span>
            <button onClick={onClose} className="toast-close" title="Close">
                <i className="fas fa-times"></i>
            </button>
            <style jsx>{`
                .toast {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    padding: 16px 24px;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-weight: 600;
                    font-size: 0.95rem;
                    z-index: 9999;
                    animation: slideIn 0.4s ease-out, fadeOut 0.4s ease-in 4s forwards;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
                    max-width: 400px;
                }
                .toast-success {
                    background: linear-gradient(135deg, #059669, #10b981);
                    color: white;
                }
                .toast-error {
                    background: linear-gradient(135deg, #dc2626, #ef4444);
                    color: white;
                }
                .toast-close {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    opacity: 0.7;
                    transition: opacity 0.2s;
                    font-size: 1rem;
                }
                .toast-close:hover { opacity: 1; }
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes fadeOut {
                    to { opacity: 0; transform: translateY(20px); }
                }
                [dir="rtl"] .toast {
                    right: auto;
                    left: 30px;
                }
                @media (max-width: 768px) {
                    .toast {
                        right: 15px;
                        left: 15px;
                        max-width: unset;
                    }
                }
            `}</style>
        </div>
    );
}

export default function Contact({ content, lang }: { content: any, lang: string }) {
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const isEn = lang === "en";

    const showToast = (message: string, type: "success" | "error") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 5000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(formRef.current!);
        const name = formData.get('user_name') as string;
        const email = formData.get('user_email') as string;
        const message = formData.get('message') as string;

        try {
            // Use EmailJS to send email (free tier: 200 emails/month)
            const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    service_id: "service_portfolio",
                    template_id: "template_contact",
                    user_id: "YOUR_EMAILJS_PUBLIC_KEY",
                    template_params: {
                        from_name: name,
                        from_email: email,
                        message: message,
                        to_name: "Omar",
                    },
                }),
            });

            if (response.ok) {
                showToast(
                    isEn ? "✅ Message sent successfully!" : "✅ تم إرسال الرسالة بنجاح!",
                    "success"
                );
                formRef.current?.reset();
            } else {
                throw new Error("Failed");
            }
        } catch {
            // Fallback to mailto if EmailJS fails
            const subject = `Portfolio Contact from ${name}`;
            const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
            const mailtoLink = `mailto:meroking1998@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoLink;

            showToast(
                isEn
                    ? "📧 Opening your email client..."
                    : "📧 جاري فتح تطبيق البريد...",
                "success"
            );
            formRef.current?.reset();
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="section contact">
            <div className="container">
                <AnimatedSection>
                    <div className="section-header">
                        <h2 className="section-title">{content.title}</h2>
                        <div className="title-bar"></div>
                    </div>
                </AnimatedSection>

                <div className="contact-wrapper">
                    <AnimatedSection delay={0.1}>
                        <div className="contact-info">
                            <h3>{content.subtitle}</h3>
                            <p>{content.description}</p>

                            <div className="info-item">
                                <i className="fab fa-linkedin"></i>
                                <div>
                                    <span className="info-label">LinkedIn</span>
                                    <a href="https://www.linkedin.com/in/omar-a-71a363103" target="_blank" rel="noopener">Omar Hussein</a>
                                </div>
                            </div>
                            <div className="info-item">
                                <i className="fab fa-facebook"></i>
                                <div>
                                    <span className="info-label">Facebook</span>
                                    <a href="https://www.facebook.com/share/1BiXfGxzW7/" target="_blank" rel="noopener">Omar Hussein</a>
                                </div>
                            </div>
                            <div className="info-item">
                                <i className="fas fa-envelope"></i>
                                <div>
                                    <span className="info-label">Email</span>
                                    <a href="mailto:meroking1998@gmail.com">meroking1998@gmail.com</a>
                                </div>
                            </div>
                            <div className="info-item">
                                <i className="fas fa-phone"></i>
                                <div>
                                    <span className="info-label">{isEn ? 'Phone' : 'الهاتف'}</span>
                                    <div className="phone-row">
                                        <a href={`tel:${content.phone1.replace(/\D/g, '')}`}>{content.phone1}</a>
                                        <a href="https://wa.me/201113113479" target="_blank" rel="noopener" title="WhatsApp" className="whatsapp-link">
                                            <i className="fab fa-whatsapp"></i>
                                        </a>
                                    </div>
                                    <a href={`tel:${content.phone2.replace(/\D/g, '')}`} className="phone-second">{content.phone2}</a>
                                </div>
                            </div>

                            {/* Calendly CTA */}
                            <div className="calendly-cta">
                                <i className="fas fa-calendar-check"></i>
                                <div>
                                    <span className="info-label">{isEn ? 'Schedule a Meeting' : 'حجز موعد'}</span>
                                    <a href="https://calendly.com" target="_blank" rel="noopener" className="calendly-link">
                                        {isEn ? 'Book a time slot →' : 'احجز موعدك الآن ←'}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.2}>
                        <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">{content.labels.name}</label>
                                <input type="text" id="name" name="user_name" placeholder={content.placeholders.name} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">{content.labels.email}</label>
                                <input type="email" id="email" name="user_email" placeholder={content.placeholders.email} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">{content.labels.message}</label>
                                <textarea id="message" name="message" rows={5} placeholder={content.placeholders.message} required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin" style={{ marginInlineEnd: '8px' }}></i>
                                        {isEn ? 'Sending...' : 'جاري الإرسال...'}
                                    </>
                                ) : (
                                    content.labels.submit
                                )}
                            </button>
                        </form>
                    </AnimatedSection>
                </div>
            </div>

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            <style jsx>{`
                .calendly-cta {
                    display: flex;
                    align-items: flex-start;
                    gap: 15px;
                    margin-top: 20px;
                    padding: 18px 20px;
                    background: rgba(56, 189, 248, 0.06);
                    border: 1px dashed rgba(56, 189, 248, 0.3);
                    border-radius: 14px;
                    transition: all 0.3s ease;
                }
                .calendly-cta:hover {
                    background: rgba(56, 189, 248, 0.12);
                    border-color: var(--primary);
                }
                .calendly-cta > i {
                    color: var(--primary);
                    font-size: 1.3rem;
                    margin-top: 3px;
                }
                .calendly-link {
                    color: var(--primary) !important;
                    font-weight: 700;
                    font-size: 0.95rem;
                    transition: all 0.3s;
                }
                .calendly-link:hover {
                    text-decoration: underline;
                }
                button:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }
            `}</style>
        </section>
    );
}
