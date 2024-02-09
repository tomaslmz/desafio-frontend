import Header from '@/components/Header';
import { Toaster, toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useEffect, useState } from 'react';
import DeleteDialog from '@/components/Categorias/DeleteDialog';
import EditDialog from '@/components/Categorias/EditDialog';
import Filter from '@/components/Categorias/Filter';
import axios from '@/services/axios';
import getCookie from '@/utils/getCookie';
import CreateDialog from '@/components/Categorias/CreateDialog';
import { useSearchParams } from 'react-router-dom';

interface Categoria {
  id: number;
  descricao: string;
}

export default function Categorias() {
	const [categorias, setCategorias] = useState<Categoria[]>([]);

	const [searchParams] = useSearchParams();

	async function getCategorias() {
		try {
			const id = searchParams.get('id');
			const descricao = searchParams.get('descricao');

			const response = await axios.get('/categoria/list');

			let listaCategorias = response.data.data;

			if(id) {
				listaCategorias = listaCategorias.filter((categoria: Categoria) => categoria.id === parseInt(id));
			}

			if(descricao) {
				listaCategorias = listaCategorias.filter((categoria: Categoria) => categoria.descricao.includes(descricao));
			}

			setCategorias(listaCategorias);
		} catch(err: any) {
			toast.error(err.response.data.message);
		}
	}

	useEffect(() => {
		getCategorias();
	}, []);

	async function handleDelete(index: number, id: number) {
		try {
			const response = await axios.delete(`/categoria/delete/${id}`, {
				headers: {
					'Authorization': `Bearer ${getCookie('auth')}`
				}
			});

			const newCategorias = [...categorias];
			newCategorias.splice(index, 1);
			setCategorias(newCategorias);

			toast.success(response.data.message);
		} catch(err: any) {
			toast.error(err.response.data.message);
		}
	}

	async function handleEdit(index: number, id: number, descricao: string) {
		try {
			const response = await axios.patch(`/categoria/update/${id}`, {
				descricao
			}, {
				headers: {
					'Authorization': `Bearer ${getCookie('auth')}`
				}
			});

			const newCategorias = [... categorias];
			newCategorias[index].descricao = descricao;
			setCategorias(newCategorias);

			toast.success(response.data.message);
		} catch(err: any) {
			toast.error(err.response.data.message);
		}
	}

	async function handleCreate(descricao: string) {
		try {
			const response = await axios.post('/categoria/create', {
				descricao
			}, {
				headers: {
					'Authorization': `Bearer ${getCookie('auth')}`
				}
			});

			toast.success(response.data.message);

			getCategorias();
		} catch(err: any) {
			toast.error(err.response.data.message);
		}
	}


	return (
		<>
			<Header />
			<main className="bg-white p-6 w-2/4 rounded flex flex-col gap-5 mx-auto mt-5">
				<h1 className="text-bold">Categorias</h1>
				<div className="flex items-center justify-between">
					<Filter />
					<CreateDialog onConfirm={(descricao) => handleCreate(descricao)} />
				</div>
				<div className="border rounded">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>ID</TableHead>
								<TableHead>Descrição</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{
								categorias.length > 0 && (
									categorias.map((categoria, index) => {
										return (<TableRow key={index}>
											<TableCell>{categoria.id}</TableCell>
											<TableCell>{categoria.descricao}</TableCell>
											<TableCell><EditDialog onConfirm={(novaDescricao) => handleEdit(index, categoria.id, novaDescricao)} descricao={categoria.descricao}/></TableCell>
											<TableCell><DeleteDialog onConfirm={() => handleDelete(index, categoria.id)} /></TableCell>
										</TableRow>);
									})
								)
							}
						</TableBody>
					</Table>
				</div>
			</main>
			<Toaster />
		</>
	);
}