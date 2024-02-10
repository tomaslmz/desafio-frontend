import axios from '@/services/axios';
import getCookie from '@/utils/getCookie';
import { toast } from 'sonner';

interface CategoriaRequest {
  id: number;
	descricao: string;
}

export default async function updateCategorias(data: CategoriaRequest) {
	try {
		const response = await axios.patch(`/categoria/update/${data.id}`, {
			descricao: data.descricao,
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