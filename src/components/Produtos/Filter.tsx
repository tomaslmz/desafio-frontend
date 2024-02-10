import { useSearchParams } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface FilterForm {
	filtroDescricao: string;
	filtroCategoria: string;
}

export default function Filter() {
	const [_, setSearchParams] = useSearchParams();
	const { register, handleSubmit } = useForm<FilterForm>();

	async function onSubmit({ filtroDescricao, filtroCategoria }: FilterForm) {
		setSearchParams({
			descricao: filtroDescricao,
			categoria: filtroCategoria
		});
	}
	return (
		<form className='flex flex-row gap-5 flex-wrap' onSubmit={handleSubmit(onSubmit)}>
			<Input
				placeholder='Descrição do Produto'
				className='w-auto'
				type='text'
				{... register('filtroDescricao')}
			/>
			<Input
				placeholder='Descrição da Categoria'
				className='w-auto'
				type='text'
				{... register('filtroCategoria')}
			/>
			<Button variant={'link'} type="submit">
				<Search className='w-4 h-4 mr-2' />
                  Filtrar resultados
			</Button>
		</form>
	);
}
