import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import './CidadeFormulario.css';
import { CidadeService } from "../../../services/CidadeService";

const CidadeFormulario = (props) => {
	const navigate = useNavigate();
	const cidadeNova = { nome: '', sigla: ''};
	const location = useLocation();
	const { cidadeAlterar } = location.state || {};

	const [cidade, setCidade] = useState(cidadeNova);
	const cidadeService = new CidadeService();

	useEffect(() => {
		if(cidadeAlterar){
			setCidade(cidadeAlterar);
		}else{
			setCidade(cidadeNova);
		}		
	}, []);

	const listaCidades = () =>{
		navigate("/cidade")
	}

	const alterarValor = (event) => {
		setCidade({ ...cidade, [event.target.name]: event.target.value });
	}

	const salvar = () => {
		if (cidade.id) {
			cidadeService.alterar(cidade).then(data => {
				console.log(data);
				setCidade(cidadeNova);
			});
		} else {
			cidadeService.inserir(cidade).then(data => {
				console.log(data);
				setCidade(cidadeNova);
			});
		}
		listaCidades();
	}

	return (
		<div className="cidade-form">
		  <h2>Inserir ou Alterar uma Cidade</h2>
		  <div className="input-group">
			<label htmlFor="nome" className="label-nome">Nome:</label>
			<input type="text" id="nome" name="nome" value={cidade.nome} onChange={alterarValor} className="input-nome" />
		  </div>
		  <div className="button-group">
			<button onClick={salvar} className="btn-salvar">Salvar</button>
			<button onClick={listaCidades} className="btn-lista">Lista Cidades</button>
		  </div>
		</div>
	  );
	  
	  
}

export default CidadeFormulario;