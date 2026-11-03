import React from 'react'

const Rating = ({ value = 0, reviews, size = 14, showValue = false }) => {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex" aria-label={`Rated ${value} out of 5`}>
        {[1, 2, 3, 4, 5].map((i) => {
          const fill = Math.max(0, Math.min(1, value - (i - 1)));
          return (
            <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
              <svg viewBox="0 0 20 20" width={size} height={size} className="absolute inset-0 text-slate-200" fill="currentColor">
                <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.8 4.8 17.6l1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
              </svg>
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <svg viewBox="0 0 20 20" width={size} height={size} className="text-amber-400" fill="currentColor">
                  <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.8 4.8 17.6l1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
                </svg>
              </span>
            </span>
          );
        })}
      </div>
      {showValue && <span className="text-xs font-semibold text-slate-700">{value.toFixed(1)}</span>}
      {reviews !== undefined && (
        <span className="text-xs text-slate-500">({reviews.toLocaleString()})</span>
      )}
    </div>
  )
}

export default Rating;
