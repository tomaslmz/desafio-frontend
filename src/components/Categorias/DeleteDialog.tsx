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

interface DeleteDialogProps {
  onConfirm: () => void;
}

export default function DeleteDialog({ onConfirm }: DeleteDialogProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={'destructive'}>
          Apagar
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Você tem certeza que quer apagar esta categoria?</DialogTitle>
					<DialogDescription className="pb-3">
            Após confirmar, não será possível reverter
					</DialogDescription>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant={'destructive'} onClick={onConfirm}>Apagar</Button>
						</DialogClose>
						<DialogClose asChild>
							<Button type="button">
                Cancelar
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}