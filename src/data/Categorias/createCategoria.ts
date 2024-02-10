import axios from '@/services/axios';
import getCookie from '@/utils/getCookie';
import { toast } from 'sonner';

interface CategoriaRequest {
	descricao: string;
}

export default async function createCategoria(data: CategoriaRequest) {
	try {
		const response = await axios.post('/categoria/create', data, {
			headers: {
				'Authorization': `Bearer ${getCookie('auth')}`
			}
		});

		toast.success(response.data.message);
	} catch(err: any) {
		toast.error(err.response.data.message);
	}
}