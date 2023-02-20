function Card({ children, className }) {
  return (
    <div className={`max-w-md rounded p-6 shadow-lg bg-white ${className}`}>
      {children}
    </div>
  );
}

export default Card;
