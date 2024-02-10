import axios from '@/services/axios';
import getCookie from '@/utils/getCookie';
import { toast } from 'sonner';

interface ProdutoRequest {
	codigo_barras: string;
	descricao: string;
	caracteristicas: string;
	preco: number;
	unidade_medida: string;
	categoria_id: number | null;	
}

export default async function createProduto(data: ProdutoRequest) {
	try {
		const response = await axios.post('/produto/create', data, {
			headers: {
				'Authorization': `Bearer ${getCookie('auth')}`
			}
		});

		toast.success(response.data.message);
	} catch(err: any) {
		console.log(err);
		toast.error(err.response.data.message);
	}
}