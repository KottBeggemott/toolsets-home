type NumberInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  step?: string;
  min?: string;
  max?: string;
  placeholder?: string;
};

export default function NumberInput({
  label,
  value,
  onChange,
  step = "1",
  min,
  max,
  placeholder,
}: NumberInputProps) {
  return (
    <label>
      {label}
      <input
        type="number"
        value={value}
        step={step}
        min={min}
        max={max}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}