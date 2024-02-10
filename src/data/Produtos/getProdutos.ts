import axios from '@/services/axios';
import { toast } from 'sonner';
import Produto from '@/@types/Produto';

interface filterParams {
	descricao: string | null,
	categoria: string | null,
}

export default async function getProdutos({descricao, categoria}: filterParams): Promise<Produto[] | null> {
	try {
		const response = await axios.get('/produto/list');

		let lista = response.data.data;

		if(descricao) {
			lista = lista.filter((produto: Produto) => produto.descricao.includes(descricao));
		}

		if(categoria) {
			lista = lista.filter((produto: Produto) => produto.categoria?.descricao.includes(categoria));
		}

		return lista;
	} catch(err: any) {
		console.log(err);
		toast.error('Não foi possível conectar com o banco de dados!');
		return(null);
	}
}