import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import './PessoaFormulario.css';
import { PessoaService } from "../../../services/PessoaService";

const PessoaFormulario = (props) => {
	//const navigate = useNavigate();
	//const location = useLocation();
	///const { id } = location.state || {};
	//const { ii } = useParams();
	const navigate = useNavigate();
	const pessoaNovo = { nome: '', cpf: '', email: '', senha: '', endereco: '', cep: ''};
	const location = useLocation();
	const { pessoaAlterar } = location.state || {};

	const [pessoa, setPessoa] = useState(pessoaNovo);
	const pessoaService = new PessoaService();

// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		if(pessoaAlterar){
			setPessoa(pessoaAlterar);
		}else{
			setPessoa(pessoaNovo);
		}		
	}, []);

	const listaPessoas = () =>{
		navigate("/pessoas")
	}

	const alterarValor = (event) => {
		setPessoa({ ...pessoa, [event.target.name]: event.target.value });
	}

	const salvar = () => {
		if (pessoa.id) {
			pessoaService.alterar(pessoa).then(data => {
				console.log(data);
				setPessoa(pessoaNovo);
			});
		} else {
			pessoaService.inserir(pessoa).then(data => {
				console.log(data);
				setPessoa(pessoaNovo);
			});
		}
		listaPessoas();
	}

	return (
		<div className="pessoa-form"> 
		  <h2>Inserir ou Alterar um Pessoa</h2>
		  <div className="input-group">
			<label htmlFor="nome" className="label-nome">Nome:</label>
			<input type="text" id="nome" name="nome" value={pessoa.nome} onChange={alterarValor} className="input-nome" />
		  </div>
		  <div className="input-group">
			<label htmlFor="cpf" className="label-sigla">CPF:</label>
			<input type="text" id="cpf" name="cpf" value={pessoa.cpf} onChange={alterarValor} className="input-nome" />
		  </div>
          <div className="input-group">
			<label htmlFor="email" className="label-sigla">Email:</label>
			<input type="text" id="email" name="email" value={pessoa.email} onChange={alterarValor} className="input-nome" />
		  </div>
          <div className="input-group">
			<label htmlFor="senha" className="label-sigla">Senha:</label>
			<input type="text" id="senha" name="senha" value={pessoa.senha} onChange={alterarValor} className="input-nome" />
		  </div>
          <div className="input-group">
			<label htmlFor="endereco" className="label-sigla">Endereço:</label>
			<input type="text" id="endereco" name="endereco" value={pessoa.endereco} onChange={alterarValor} className="input-nome" />
		  </div>
          <div className="input-group">
			<label htmlFor="cep" className="label-sigla">CEP:</label>
			<input type="text" id="cep" name="cep" value={pessoa.cep} onChange={alterarValor} className="input-nome" />
		  </div>
		  <div className="button-group">
			<button onClick={salvar} className="btn-salvar">Salvar</button>
			<button onClick={listaPessoas} className="btn-lista">Lista Pessoas</button>
		  </div>
		</div>
	  );
	}


export default PessoaFormulario;