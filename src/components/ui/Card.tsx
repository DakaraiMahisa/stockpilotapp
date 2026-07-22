type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div
      className={`
        bg-surface
        rounded-xl
        border
        border-border
        shadow-sm
        p-6
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
