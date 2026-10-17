
import type { CSSProperties } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
}

const buttonColors: Record<ButtonVariant, string> = {
  primary: "#2563eb",
  secondary: "#64748b",
  danger: "#dc2626",
};

export default function Button({
  text,
  onClick,
  variant = "primary",
  disabled = false,
}: ButtonProps) {
  const style: CSSProperties = {
    backgroundColor: buttonColors[variant],
  };

  return (
    <button
      type="button"
      className="reusable-button"
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
