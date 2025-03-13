'use client';

export default function LoadingDots2({ message = '', dots = '•', ...props }) {
  return (
    <div {...props}>
      {message}
      <span className="dot">{dots}</span>
      <span className="dot">{dots}</span>
      <span className="dot">{dots}</span>
    </div>
  );
}
