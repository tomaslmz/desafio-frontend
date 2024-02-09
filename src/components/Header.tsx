import getCookie from "@/utils/getCookie"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"

export default function Header() {
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
          <Link to="/sair">
            <Button variant={'destructive'}>Sair</Button>
          </Link>
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
  )
}