'use client';

import { motion } from 'framer-motion';

interface SilhouetteCoupleProps {
  className?: string;
}

export default function SilhouetteCouple({ className = '' }: SilhouetteCoupleProps) {
  const drawVariant = (delay: number, duration = 2.5) => ({
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration, delay, ease: 'easeInOut' as const },
    },
  });

  const fillVariant = (delay: number) => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.15,
      transition: { duration: 1.2, delay, ease: 'easeOut' as const },
    },
  });

  return (
    <motion.svg
      viewBox="0 0 420 280"
      className={className}
      initial="hidden"
      animate="visible"
    >
      <defs>
        <filter id="silhouette-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="gold-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ——— GUY (left, with glasses) ——— */}
      {/* Body fill */}
      <motion.path
        d="M 95 260 L 95 175 Q 95 165 105 160 L 125 155 Q 135 150 135 140 L 135 120 Q 135 95 120 85 Q 105 75 100 75 Q 80 75 72 90 Q 65 105 68 125 L 68 140 Q 68 152 80 157 L 100 163 Q 110 167 110 177 L 110 260 Z"
        fill="#d4a017"
        variants={fillVariant(0.2)}
        filter="url(#silhouette-glow)"
      />
      {/* Body outline */}
      <motion.path
        d="M 95 260 L 95 175 Q 95 165 105 160 L 125 155 Q 135 150 135 140 L 135 120 Q 135 95 120 85 Q 105 75 100 75 Q 80 75 72 90 Q 65 105 68 125 L 68 140 Q 68 152 80 157 L 100 163 Q 110 167 110 177 L 110 260"
        fill="none"
        stroke="#d4a017"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariant(0)}
        filter="url(#gold-glow)"
      />
      {/* Head */}
      <motion.ellipse
        cx="100"
        cy="66"
        rx="18"
        ry="20"
        fill="none"
        stroke="#d4a017"
        strokeWidth="2"
        variants={drawVariant(0.5)}
        filter="url(#gold-glow)"
      />
      {/* Hair (wavy on guy – shorter) */}
      <motion.path
        d="M 83 58 Q 88 48 100 46 Q 112 48 118 58"
        fill="none"
        stroke="#d4a017"
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariant(0.8)}
      />
      {/* Glasses */}
      <motion.path
        d="M 90 64 Q 90 59 95 59 Q 100 59 100 64 Q 100 69 95 69 Q 90 69 90 64 Z M 100 64 Q 100 59 105 59 Q 110 59 110 64 Q 110 69 105 69 Q 100 69 100 64 Z M 100 62 L 100 62 M 88 63 L 85 63 M 110 63 L 113 63"
        fill="none"
        stroke="#e8b84b"
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={drawVariant(1.1)}
        filter="url(#gold-glow)"
      />
      {/* Arm reaching toward girl */}
      <motion.path
        d="M 128 148 Q 155 155 175 165"
        fill="none"
        stroke="#d4a017"
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariant(1.4)}
        filter="url(#gold-glow)"
      />

      {/* ——— GIRL (right, wavy hair) ——— */}
      {/* Body fill */}
      <motion.path
        d="M 210 260 L 210 178 Q 210 168 220 163 L 240 157 Q 252 152 252 142 L 252 120 Q 252 93 237 82 Q 225 73 218 73 Q 200 73 192 88 Q 185 103 188 122 L 188 142 Q 188 154 198 158 L 218 163 Q 228 168 228 178 L 228 260 Z"
        fill="#3a6bc8"
        variants={fillVariant(0.4)}
        filter="url(#silhouette-glow)"
      />
      {/* Body outline */}
      <motion.path
        d="M 210 260 L 210 178 Q 210 168 220 163 L 240 157 Q 252 152 252 142 L 252 120 Q 252 93 237 82 Q 225 73 218 73 Q 200 73 192 88 Q 185 103 188 122 L 188 142 Q 188 154 198 158 L 218 163 Q 228 168 228 178 L 228 260"
        fill="none"
        stroke="#6b9ee8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariant(0.2)}
        filter="url(#silhouette-glow)"
      />
      {/* Head */}
      <motion.ellipse
        cx="218"
        cy="63"
        rx="19"
        ry="21"
        fill="none"
        stroke="#6b9ee8"
        strokeWidth="2"
        variants={drawVariant(0.7)}
        filter="url(#silhouette-glow)"
      />
      {/* Wavy hair */}
      <motion.path
        d="M 200 56 Q 205 42 212 40 Q 220 38 226 44 Q 232 50 238 48 Q 242 46 240 55"
        fill="none"
        stroke="#6b9ee8"
        strokeWidth="2.5"
        strokeLinecap="round"
        variants={drawVariant(1.0)}
        filter="url(#silhouette-glow)"
      />
      <motion.path
        d="M 198 63 Q 196 72 198 78"
        fill="none"
        stroke="#6b9ee8"
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariant(1.2)}
      />
      <motion.path
        d="M 237 62 Q 240 72 238 78"
        fill="none"
        stroke="#6b9ee8"
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariant(1.2)}
      />
      {/* Arm reaching toward guy */}
      <motion.path
        d="M 192 152 Q 175 158 162 165"
        fill="none"
        stroke="#6b9ee8"
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariant(1.5)}
        filter="url(#silhouette-glow)"
      />
      {/* Joined hands */}
      <motion.path
        d="M 162 165 Q 170 168 175 165 Q 178 162 175 160 Q 172 158 162 165"
        fill="none"
        stroke="#e8b84b"
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariant(1.8)}
        filter="url(#gold-glow)"
      />

      {/* ——— HUSKY (far left) ——— */}
      <motion.path
        d="M 22 245 L 22 215 Q 22 205 28 200 L 48 192 Q 55 190 55 183 L 55 175 Q 55 165 48 160 Q 40 157 35 162 Q 28 168 30 178 L 30 184 Q 30 192 36 195 L 48 198 Q 56 200 56 210 L 56 245"
        fill="none"
        stroke="#8ab4d4"
        strokeWidth="1.8"
        strokeLinecap="round"
        variants={drawVariant(1.8, 2)}
      />
      {/* Husky head */}
      <motion.ellipse
        cx="40"
        cy="153"
        rx="13"
        ry="11"
        fill="none"
        stroke="#8ab4d4"
        strokeWidth="1.8"
        variants={drawVariant(2, 1.5)}
      />
      {/* Husky ears */}
      <motion.path
        d="M 30 148 L 28 140 L 36 145 M 50 148 L 52 140 L 44 145"
        fill="none"
        stroke="#8ab4d4"
        strokeWidth="1.8"
        strokeLinecap="round"
        variants={drawVariant(2.2, 1)}
      />
      {/* Husky tail */}
      <motion.path
        d="M 22 210 Q 12 200 8 185 Q 6 175 12 178 Q 18 182 22 195"
        fill="none"
        stroke="#8ab4d4"
        strokeWidth="1.8"
        strokeLinecap="round"
        variants={drawVariant(2.3, 1.2)}
      />

      {/* ——— SHIH TZU (far right) ——— */}
      <motion.path
        d="M 340 245 L 340 218 Q 340 208 346 204 L 360 198 Q 366 196 366 190 L 366 182 Q 366 174 360 170 Q 353 166 349 172 Q 344 178 346 186 L 346 191 Q 346 198 352 200 L 362 202 Q 368 204 368 213 L 368 245"
        fill="none"
        stroke="#e8b84b"
        strokeWidth="1.8"
        strokeLinecap="round"
        variants={drawVariant(2.0, 2)}
      />
      {/* Shih Tzu head – fluffy/round */}
      <motion.circle
        cx="356"
        cy="162"
        r="13"
        fill="none"
        stroke="#e8b84b"
        strokeWidth="1.8"
        variants={drawVariant(2.1, 1.5)}
      />
      {/* Fluffy hair on head */}
      <motion.path
        d="M 345 158 Q 342 150 348 150 Q 354 150 356 148 Q 360 146 365 150 Q 370 154 368 160"
        fill="none"
        stroke="#e8b84b"
        strokeWidth="1.8"
        strokeLinecap="round"
        variants={drawVariant(2.3, 1)}
      />
      {/* Shih Tzu tail (fluffy, curled) */}
      <motion.path
        d="M 340 215 Q 330 208 326 196 Q 322 184 330 185 Q 336 186 338 200"
        fill="none"
        stroke="#e8b84b"
        strokeWidth="1.8"
        strokeLinecap="round"
        variants={drawVariant(2.4, 1)}
      />

      {/* Ground line */}
      <motion.path
        d="M 5 260 L 415 260"
        fill="none"
        stroke="#d4a017"
        strokeWidth="1"
        opacity={0.3}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
    </motion.svg>
  );
}
