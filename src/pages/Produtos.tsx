import Header from '@/components/Header';
import { Toaster } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DeleteDialog from '@/components/Produtos/DeleteDialog';
import EditDialog from '@/components/Produtos/EditDialog';
import Filter from '@/components/Produtos/Filter';
import CreateDialog from '@/components/Produtos/CreateDialog';
import getProdutos from '@/data/Produtos/getProdutos';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

export default function Produtos() {
	const [searchParams] = useSearchParams();

	const descricao = searchParams.get('descricao');
	const categoria = searchParams.get('categoria');

	const { data: produtos } = useQuery({
		queryKey: ['produtos', descricao, categoria],
		queryFn: () => getProdutos({descricao, categoria})
	});

	return (
		<>
			<Header />
			<main className="bg-white p-6 w-2/4 rounded flex flex-col gap-5 mx-auto mt-5">
				<h1 className="text-bold">Produtos</h1>
				<div className="flex items-center justify-between">
					<Filter />
					<CreateDialog />
				</div>
				<div className="border rounded">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>ID</TableHead>
								<TableHead>Código de barras</TableHead>
								<TableHead>Descrição</TableHead>
								<TableHead>Características</TableHead>
								<TableHead>Preço</TableHead>
								<TableHead>Unidade de medida</TableHead>
								<TableHead>Descrição da categoria</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{ produtos?.length && produtos.map((produto) => (
								<TableRow key={produto.id}>
									<TableCell>{produto.id}</TableCell>
									<TableCell>{produto.codigo_barras}</TableCell>
									<TableCell>{produto.descricao}</TableCell>
									<TableCell>{produto.caracteristicas}</TableCell>
									<TableCell>{produto.preco}</TableCell>
									<TableCell>{produto.unidade_medida}</TableCell>
									<TableCell>{produto.categoria ? produto.categoria.descricao : '-'}</TableCell>
									<TableCell><EditDialog 
										id={produto.id} codigo_barras={produto.codigo_barras} 
										descricao={produto.descricao} caracteristicas={produto.caracteristicas}
										preco={produto.preco} unidade_medida={produto.unidade_medida}
										categoria_id={produto.categoria ? produto.categoria.id : null}
									/></TableCell>
									<TableCell><DeleteDialog id={produto.id} /></TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</main>
			<Toaster />
		</>
	);
}