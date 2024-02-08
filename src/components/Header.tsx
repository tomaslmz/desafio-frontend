import { Button } from "./ui/button"
import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header className="w-screen border-slate-300 bg-gray-900 border-b p-6 flex justify-between">
      <div>
        <nav>
          <ul className="flex gap-3">
            <li><Link to="/categoria"><Button variant={"destructive"}>Categoria</Button></Link></li>
            <li className="text-white"><Link to="/produto"><Button variant={"destructive"}>Produto</Button></Link></li>
          </ul>
        </nav>
      </div>
      <div className="buttons">
        <Link to="/login">
          <Button>Entrar</Button>
        </Link>
        <Link to="/">
          <Button variant="secondary">Registrar</Button>
        </Link>
      </div>
    </header>
  )
}