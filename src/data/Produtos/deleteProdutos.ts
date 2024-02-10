import axios from '@/services/axios';
import getCookie from '@/utils/getCookie';
import { toast } from 'sonner';

interface DeleteParams {
	id: number
}

export default async function deleteProdutos({ id }: DeleteParams) {
	try {
		const response = await axios.delete(`/produto/delete/${id}`, {
			headers: {
				'Authorization': `Bearer ${getCookie('auth')}`
			}
		});

		toast.success(response.data.message);
	} catch(err: any) {
		toast.error(err.response.data.message);
	}
}