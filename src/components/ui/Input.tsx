type InputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function Input({ value, onChange, placeholder }: InputProps) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
    />
  );
}
