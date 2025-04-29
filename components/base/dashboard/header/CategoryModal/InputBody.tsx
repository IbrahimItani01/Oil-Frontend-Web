import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import React from "react";

interface InputBodyProps {
	formData: {
		name: string;
		description: string;
		for: "product" | "service";
	};
	handleInputChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	handleTypeChange: (value: "product" | "service") => void;
}

const InputBody = ({
	formData,
	handleInputChange,
	handleTypeChange,
}: InputBodyProps) => {
	return (
		<div className='space-y-4'>
			<div className='space-y-2'>
				<Label
					htmlFor='name'
					className='flex items-center'
				>
					Name <span className='text-red-500 ml-1'>*</span>
				</Label>
				<Input
					id='name'
					name='name'
					value={formData.name}
					onChange={handleInputChange}
					placeholder='Category Name'
					required
				/>
			</div>
			<div className='space-y-2'>
				<Label
					htmlFor='type'
					className='flex items-center'
				>
					Type <span className='text-red-500 ml-1'>*</span>
				</Label>
				<Select
					value={formData.for}
					onValueChange={handleTypeChange}
					required
				>
					<SelectTrigger>
						<SelectValue placeholder='Select one of the options' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='product'>Product</SelectItem>
						<SelectItem value='service'>Service</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className='space-y-2'>
				<Label htmlFor='description'>Description</Label>
				<Textarea
					id='description'
					name='description'
					value={formData.description}
					onChange={handleInputChange}
					placeholder='Add a description'
				/>
			</div>
		</div>
	);
};

export default InputBody;
