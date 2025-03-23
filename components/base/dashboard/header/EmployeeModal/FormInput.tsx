import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface FormInputProps {
	id: string;
	name: string;
	type?: string;
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
	required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
	id,
	name,
	type = "text",
	value,
	onChange,
	placeholder,
	required,
}) => {
	return (
		<div className="flex flex-col gap-2">
			<Label
				htmlFor={id}
				className='flex items-center'
			>
				{name} {required && <span className='text-red-500'>*</span>}
			</Label>
			<Input
				id={id}
				name={id}
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				required={required}
			/>
		</div>
	);
};

export default FormInput;
