import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import './CategoriaFormulario.css';
import { CategoriaService } from "../../../services/CategoriaService";

const CategoriaFormulario = (props) => {
	//const navigate = useNavigate();
	//const location = useLocation();
	///const { id } = location.state || {};
	//const { ii } = useParams();
	const navigate = useNavigate();
	const categoriaNovo = { descricao: '', valor: 0, valorPromocional: 0 };
	const location = useLocation();
	const { categoriaAlterar } = location.state || {};

	const [categoria, setCategoria] = useState(categoriaNovo);
	const categoriaService = new CategoriaService();

	useEffect(() => {
		if(categoriaAlterar){
			setCategoria(categoriaAlterar);
		}else{
			setCategoria(categoriaNovo);
		}		
	}, []);

	const listaCategoria = () =>{
		navigate("/categoria")
	}

	const alterarValor = (event) => {
		setCategoria({ ...categoria, [event.target.name]: event.target.value });
	}

	const salvar = () => {
		if (categoria.id) {
			categoriaService.alterar(categoria).then(data => {
				console.log(data);
				setCategoria(categoriaNovo);
			});
		} else {
			categoriaService.inserir(categoria).then(data => {
				console.log(data);
				setCategoria(categoriaNovo);
			});
		}
	}

	return (
		<div style={{ padding: '10px' }}>
			<h2>Inserir ou Alterar um Categoria</h2>
			<input type="text" name="nome" value={categoria.nome} onChange={alterarValor} /><br /><br />
			<button onClick={salvar}>Salvar</button>
			<button onClick={listaCategoria}>Lista Categorias</button>
		</div>
	);
}

export default CategoriaFormulario;