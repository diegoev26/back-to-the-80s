const Badge = ({
  children,
  variant = "primary",
}: {
  children: React.ReactNode;
  variant?: string;
}) => {
  const styles: any = {
    primary: "bg-primary/10 text-primary border-primary/20",
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    danger: "bg-danger/10 text-danger border-danger/20",
    secondary: "bg-secondary/10 text-secondary border-secondary/20",
  };

  return (
    <span
      className={`px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider ${styles[variant]}`}
    >
      {children}
    </span>
  );
};
export default Badge;
