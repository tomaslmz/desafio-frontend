import { useSearchParams } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function Filter() {
	const [searchParams] = useSearchParams();
	const [id, setId] = useState<string>(searchParams.get('id') ?? '');
	const [descricao, setDescricao] = useState<string>(searchParams.get('descricao') ?? '');

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		switch(name) {
		case 'id':
			setId(value);
			break;
		case 'descricao':
			setDescricao(value);
			break;
		}
	};

	return (
		<form className='flex flex-row gap-5'>
			<Input
				name='id'
				placeholder='ID da categoria'
				className='w-auto'
				type='number'
				value={id}
				onChange={handleInputChange}
			/>
			<Input
				name='descricao'
				placeholder='Descrição da categoria'
				className='w-auto'
				value={descricao}
				onChange={handleInputChange}
			/>
			<Button variant={'link'} type="submit">
				<Search className='w-4 h-4 mr-2' />
                  Filtrar resultados
			</Button>
		</form>
	);
}
