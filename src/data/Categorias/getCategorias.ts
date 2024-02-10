import axios from '@/services/axios';
import { toast } from 'sonner';
import Categoria from '@/@types/Categoria';

export default async function getCategorias(): Promise<Categoria[] | null> {
	try {
		const response = await axios.get('/categoria/list');

		return response.data.data;
	} catch(err: any) {
		toast.error('Não foi possível conectar com o banco de dados!');
		return(null);
	}
}