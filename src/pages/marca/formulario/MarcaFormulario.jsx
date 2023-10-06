import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import './MarcaFormulario.css';
import { MarcaService } from "../../../services/MarcaService";

const MarcaFormulario = (props) => {
	//const navigate = useNavigate();
	//const location = useLocation();
	///const { id } = location.state || {};
	//const { ii } = useParams();
	const navigate = useNavigate();
	const marcaNovo = { nome: ''};
	const location = useLocation();
	const { marcaAlterar } = location.state || {};

	const [marca, setMarca] = useState(marcaNovo);
	const marcaService = new MarcaService();

	useEffect(() => {
		if(marcaAlterar){
			setMarca(marcaAlterar);
		}else{
			setMarca(marcaNovo);
		}		
	}, []);

	const listaMarcas = () =>{
		navigate("/marcas")
	}

	const alterarValor = (event) => {
		setMarca({ ...marca, [event.target.name]: event.target.value });
	}

	const salvar = () => {
		if (marca.id) {
			marcaService.alterar(marca).then(data => {
				console.log(data);
				setMarca(marcaNovo);
			});
		} else {
			marcaService.inserir(marca).then(data => {
				console.log(data);
				setMarca(marcaNovo);
			});
		}
	}

	return (
		<div style={{ padding: '10px' }}>
			<h2>Inserir ou Alterar uma Marca</h2>
			<input type="text" name="nome" value={marca.descricao} onChange={alterarValor} /><br /><br />
			<button onClick={salvar}>Salvar</button>
			<button onClick={listaMarcas}>Lista Marcas</button>
		</div>
	);
}

export default MarcaFormulario;