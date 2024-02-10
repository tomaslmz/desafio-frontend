import Categoria from './Categoria';

export default interface Produto {
  id: number;
  codigo_barras: string;
  descricao: string;
  caracteristicas: string;
  preco: number;
  unidade_medida: string;
  categoria: Categoria;
};
