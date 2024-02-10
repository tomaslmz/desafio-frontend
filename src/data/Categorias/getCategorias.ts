import axios from '@/services/axios';
import { toast } from 'sonner';
import Produto from '@/@types/Produto';
import Categoria from '@/@types/Categoria';

interface filterParams {
	id: string | null,
	descricao: string | null,
}

export default async function getCategorias({id, descricao}: filterParams): Promise<Produto[] | null> {
	try {
		const response = await axios.get('/categoria/list');

		let lista = response.data.data;

		if(id) {
			lista = lista.filter((categoria: Categoria) => categoria.id.toString() === id);
		}

		if(descricao) {
			lista = lista.filter((categoria: Categoria) => categoria.descricao.includes(descricao));
		}

		return lista;
	} catch(err: any) {
		toast.error('Não foi possível conectar com o banco de dados!');
		return(null);
	}
}