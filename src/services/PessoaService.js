import axios from 'axios';

export class PessoaService{
	URL = "http://localhost:8080/pessoa";

	inserir(pessoa){
		return axios.post(this.URL, pessoa);
	}

	alterar(pessoa){
		return axios.put(this.URL, pessoa);
	}

	excluir(id){
		return axios.delete(this.URL+"/"+id);
	}

	listar(page,size){
		return axios.get(this.URL + "?page=" + page + "&size=" + size);
	}
}