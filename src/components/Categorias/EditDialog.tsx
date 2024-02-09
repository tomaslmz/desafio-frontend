import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
	DialogClose
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Label } from '@radix-ui/react-label';
import { Textarea } from '../ui/textarea';
import { useState } from 'react';

interface EditDialogProps {
  onConfirm: (novaDescricao: string) => void;
  descricao: string;
}

export default function EditDialog({ onConfirm, descricao }: EditDialogProps) {
	const [novaDescricao, setDescricao] = useState(descricao);

	function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
		setDescricao(e.target.value);
	}
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={'outline'}>Editar</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Editar categoria</DialogTitle>
					<DialogDescription>
					</DialogDescription>
					<div className="w-full p-5">
						<Label htmlFor="descricao">Descrição</Label>
						<Textarea value={novaDescricao} onChange={handleInput}></Textarea>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button onClick={() => onConfirm(novaDescricao)}>Editar</Button>
						</DialogClose>
						<DialogClose asChild>
							<Button type="button" variant={'outline'}>
                Cancelar
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}