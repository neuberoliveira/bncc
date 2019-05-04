import React, { useState } from 'react';
import "../styles.scss";
import codesSource from "../codes.json";

/* 
"title": "O EU, O OUTRO E O NÓS",
"itens": [
	{
		"code": "EI01EO01",
		"range": "Bebês (zero a 1 ano e 6 meses)",
		"description": "Perceber que suas ações têm efeitos nas outras crianças e nos adultos."
	},
*/
type CodeSource = Array<Group>
type SearchResult = Array<ItemFlat>
interface Group {
	title: string
	itens: Array<Item>
}
interface Item {
	code: string
	range: string
	description: string
}
interface ItemFlat extends Item{
	groupIndex: number
}


const codes:CodeSource = codesSource
const codesFlat:SearchResult = []

codes.map((grp:Group, i:number)=>{
	grp.itens.map((item:Item)=>{
		codesFlat.push({
			groupIndex: i,
			...item,
		})
	})
})

function App() {
	const defaultResult:SearchResult = codesFlat // []
	const [results, setResults] = useState(defaultResult);
	// const [searching, setSearching] = useState(false);
	
	const doSearch = (term?:string) => {
		const regex:RegExp = new RegExp(term+"", 'i')
		setResults(codesFlat.filter((item:ItemFlat)=>regex.test(item.code)))
	}
	
	return (
		<div className="container">
			<div className="row">
				<div className="col-sm-12">
					<input type="text" className="form-control" placeholder="Ex: EI01EO01" onKeyUp={(evt)=>doSearch(evt.target.value)} />
				</div>
			</div>
			<br />
			<div className="row">
				{results.map((item:ItemFlat, i:number)=>(
					<div className="col-sm-12 col-md-6 col-lg-3 mb-4">
						<div key={i} className="card h-100 d-inline-block">
							<div className="card-body">
								<h5 className="card-title">{item.code}</h5>
								<h6 className="card-subtitle mb-2 text-muted">{codes[item.groupIndex].title}</h6>
								<p className="font-italic border-bottom pb-3" style={{fontSize:'13px'}}>{item.range}</p>
								<p className="card-text">{item.description}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
  
export default App