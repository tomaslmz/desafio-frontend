import { useSearchParams } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface FilterForm {
	filtroId: string;
	filtroDescricao: string;
}

export default function Filter() {
	const [_, setSearchParams] = useSearchParams();
	const { register, handleSubmit } = useForm<FilterForm>();

	async function onSubmit({ filtroId, filtroDescricao }: FilterForm) {
		setSearchParams({
			id: filtroId,
			descricao: filtroDescricao,
		});
	}

	return (
		<form className='flex flex-row gap-5 flex-wrap' onSubmit={handleSubmit(onSubmit)}>
			<Input
				placeholder='ID da categoria'
				className='w-auto'
				type='number'
				{... register('filtroId')}
			/>
			<Input
				placeholder='Descrição da categoria'
				className='w-auto'
				{... register('filtroDescricao')}
			/>
			<Button variant={'link'} type="submit">
				<Search className='w-4 h-4 mr-2' />
                  Filtrar resultados
			</Button>
		</form>
	);
}
