import Header from '@/components/Header';
import { Toaster } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DeleteDialog from '@/components/Categorias/DeleteDialog';
import EditDialog from '@/components/Categorias/EditDialog';
import Filter from '@/components/Categorias/Filter';
import { useSearchParams } from 'react-router-dom';
import CreateDialog from '@/components/Categorias/CreateDialog';
import { useQuery } from '@tanstack/react-query';
import getCategorias from '@/data/Categorias/getCategorias';

export default function Categorias() {
	const [searchParams] = useSearchParams();

	const id = searchParams.get('id');
	const descricao = searchParams.get('descricao');

	const { data: categorias } = useQuery({
		queryKey: ['categorias', id, descricao],
		queryFn: () => getCategorias({ id, descricao })
	});

	return (
		<>
			<Header />
			<main className="bg-white p-6 w-2/4 rounded flex flex-col gap-5 mx-auto mt-5">
				<h1 className="text-bold">Categorias</h1>
				<div className="flex items-center justify-between">
					<Filter />
					<CreateDialog />
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
								categorias?.length ? (
									categorias.map((categoria, index) => {
										return (<TableRow key={index}>
											<TableCell>{categoria.id}</TableCell>
											<TableCell>{categoria.descricao}</TableCell>
											<TableCell><EditDialog id={categoria.id} descricao={categoria.descricao} /></TableCell>
											<TableCell><DeleteDialog id={categoria.id} /></TableCell>
										</TableRow>);
									})
								)
									:
									<TableRow>
										<TableCell>Nenhum resultado encontrado!</TableCell>
									</TableRow>
							}
						</TableBody>
					</Table>
				</div>
			</main>
			<Toaster />
		</>
	);
}