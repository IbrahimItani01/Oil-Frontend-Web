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
import { useAppDispatch, useAppSelector } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

interface InputBodyProps {
	formData: {
		name: string;
		type: string;
		description: string;
	};
	handleInputChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	handleTypeChange: (value: string) => void;
}

const InputBody = ({
	formData,
	handleInputChange,
	handleTypeChange,
}: InputBodyProps) => {
	const categories = useAppSelector(
		(state) => state.categories.queriedCategories
	);
	const serviceCategories = categories.filter((cat) => cat.for === "service");

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
					placeholder='Oil Name'
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
					value={formData.type}
					onValueChange={handleTypeChange}
					required
				>
					<SelectTrigger>
						<SelectValue placeholder='Select one of the options' />
					</SelectTrigger>
					<SelectContent>
						{serviceCategories.map((category) => (
							<SelectItem
								key={category.id}
								value={category.name}
							>
								{category.name}
							</SelectItem>
						))}
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
