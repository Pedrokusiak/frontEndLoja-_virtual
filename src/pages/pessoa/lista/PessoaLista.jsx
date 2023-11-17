import React, { useEffect, useState } from "react";
import './PessoaLista.css';
import { useNavigate } from "react-router-dom";
import { PessoaService } from "../../../services/PessoaService";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Paginator } from "primereact/paginator";

const PessoaLista = () => {
	const navigate = useNavigate();
	const [pessoas, setPessoas] = useState([]);
	const pessoaService = new PessoaService();
	const [idExcluir, setIdExcluir] = useState(null);
	const [dialogExcluir, setDialogExcluir] = useState(false);
	const [first, setFirst] = useState(0);
	const [rows, setRows] = useState(10);
	
	useEffect(() => {
		buscarPessoas();
	}, [rows, first]);

	const onPageChange = (event) => {
		setFirst(event.first);
		setRows(event.rows);
	}

	const buscarPessoas = () => {
		const page = first/rows;
		pessoaService.listar(page, rows).then(data => {
			setPessoas(data.data);
		})
	}

	const formulario = () => {
		navigate("/pessoa-formulario");
	}

	const alterar = (rowData) => {
		navigate("/pessoa-formulario", { state: { pessoaAlterar: rowData } })
	}

	const excluir = () => {
		pessoaService.excluir(idExcluir).then(data=>{
			buscarPessoas();
		});
	}

	const optionColumn = (rowData) => {
		return (
			<>
				<Button label="Alterar" severity="warning" onClick={() => alterar(rowData)} />

				<Button label="Excluir" severity="dander" onClick={() => { setIdExcluir(rowData.id); setDialogExcluir(true) }} />
			</>
		)
	}

	return (
		<div className="container">
			<h2>Lista de Pessoas</h2>
			<button onClick={formulario}>Nova Pessoa</button>
			<br /><br />
			<DataTable value={pessoas.content} tableStyle={{ minWidth: '50rem' }}>
				<Column field="id" header="Id"></Column>
				<Column field="nome" header="Nome"></Column>
				<Column field="email" header="Email"></Column>
				<Column header="Opções" body={optionColumn}></Column>
			</DataTable>
			<Paginator first={first} rows={rows} totalRecords={pessoas.totalElements} rowsPerPageOptions={[5, 10, 20, 30]} onPageChange={onPageChange} />
			<ConfirmDialog visible={dialogExcluir} onHide={() => setDialogExcluir(false)} message="Deseja excluir?"
				header="Confirmação" icon="pi pi-exclamation-triangle" accept={excluir} reject={() => setIdExcluir(null)} acceptLabel="Sim" rejectLabel="Não"/>
		</div>
	);
}

export default PessoaLista;