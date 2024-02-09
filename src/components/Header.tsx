import getCookie from '@/utils/getCookie';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import axios from '@/services/axios';
import { useNavigate } from 'react-router-dom';

export default function Header() {
	const navigate = useNavigate();
	async function handleLogout() {
		try {
			await axios.delete('/token/logout');

			toast.success('Você saiu da sua conta com sucesso!');
			navigate('/entrar');
		} catch(err: any) {
			toast.error(err.response.data.message);
		}
	}

	return (
		<header className="w-full border-slate-300 bg-gray-900 border-b p-6 flex justify-between">
			{getCookie('auth') ? (<>
				<div>
					<nav>
						<ul className="flex gap-3">
							<li><Link to="/categorias"><Button variant={'secondary'}>Categorias</Button></Link></li>
							<li className="text-white"><Link to="/produtos"><Button variant={'secondary'}>Produtos</Button></Link></li>
						</ul>
					</nav>
				</div>
				<div className="buttons">
					<Button variant={'destructive'} onClick={handleLogout}>Sair</Button>
				</div>
			</>) : 
				(<div className="buttons">
					<Link to="/entrar">
						<Button>Entrar</Button>
					</Link>
					<Link to="/registrar">
						<Button variant="secondary">Registrar</Button>
					</Link>
				</div>)}
		</header>
	);
}