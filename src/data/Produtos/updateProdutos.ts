import axios from '@/services/axios';
import getCookie from '@/utils/getCookie';
import { toast } from 'sonner';

interface ProdutoRequest {
	id: number;
	codigo_barras: string;
	descricao: string;
	caracteristicas: string;
	preco: number;
	unidade_medida: string;
	categoria_id: number | null;	
}

export default async function updateProdutos(data: ProdutoRequest) {
	try {
		const response = await axios.patch(`/produto/update/${data.id}`, {
			codigo_barras: data.codigo_barras,
			descricao: data.descricao,
			caracteristicas: data.caracteristicas,
			preco: data.preco,
			unidade_medida: data.unidade_medida,
			categoria_id: data.categoria_id,	
		}, {
			headers: {
				'Authorization': `Bearer ${getCookie('auth')}`
			}
		});

		toast.success(response.data.message);
	} catch(err: any) {
		toast.error(err.response.data.message);
	}
}