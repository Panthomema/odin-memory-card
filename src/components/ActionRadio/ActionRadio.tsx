type ActionRadioProps = {
  label: string;
  checked: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

function ActionRadio({
  label,
  checked,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: ActionRadioProps) {
  return (
    <label onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <input
        type="radio"
        className="nes-radio"
        name="action"
        checked={checked}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        readOnly
      />
      <span>{label}</span>
    </label>
  );
}

export default ActionRadio;
