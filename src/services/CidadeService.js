import axios from 'axios';

export class CidadeService{
	URL = "http://localhost:8080/api/cidade";

	inserir(cidade){
		return axios.post(this.URL, cidade);
	}

	alterar(cidade){
		return axios.put(this.URL, cidade);
	}

	excluir(id){
		return axios.delete(this.URL+"/"+id);
	}

	listar(page, size){
		return axios.get(this.URL+"?page="+page+"&size="+size);
	}
}