'use client';

import { motion } from 'framer-motion';

const StatCard = ({ label, value, description, icon }: { label: string; value: string; description?: string; icon?: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="blog-stat-card"
    >
        <div className="blog-stat-icon">
            <i className={`fas ${icon || 'fa-chart-line'}`}></i>
        </div>
        <div className="blog-stat-content">
            <span className="blog-stat-value">{value}</span>
            <span className="blog-stat-label">{label}</span>
            {description && <p className="blog-stat-desc">{description}</p>}
        </div>
    </motion.div>
);

export default StatCard;
