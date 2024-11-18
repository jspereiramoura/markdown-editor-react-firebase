import Input, { InputProps } from "../atoms/Input";

type LabeledInputProps = InputProps & {
  label: string;
};

const LabeledInput = ({ label, ...props }: LabeledInputProps) => {
  return (
    <label
      className="flex flex-col gap-2 group/label cursor-pointer"
      htmlFor={props.id}
    >
      <span className="group-hover/label:font-bold">{label}</span>
      <Input
        {...props}
        className="group-hover/label:opacity-90"
      />
    </label>
  );
};

export default LabeledInput;
