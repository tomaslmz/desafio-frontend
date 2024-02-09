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
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';

interface CreateDialogProps {
  onConfirm: (novaDescricao: string) => void;
}

export default function CreateDialog({ onConfirm }: CreateDialogProps) {
	const [descricao, setDescricao] = useState('');

	function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
		setDescricao(e.target.value);
	}

	function handleConfirm(descricao: string) {
		onConfirm(descricao);
		setDescricao('');
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>
					<PlusCircle className='w-4 h-4 mr-2' />
					Criar
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Criar categoria</DialogTitle>
					<DialogDescription>
					</DialogDescription>
					<div className="w-full p-5">
						<Label htmlFor="descricao">Descrição</Label>
						<Textarea onChange={handleInput}></Textarea>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button onClick={() => handleConfirm(descricao)}>Criar</Button>
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