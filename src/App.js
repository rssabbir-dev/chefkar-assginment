import data from './MOCK_DATA.csv';
import Papa from 'papaparse';
import './App.css';
import { useEffect, useState } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';

function App() {
	var commonConfig = { delimiter: ',' };
	const [CSVData, setCSVData] = useState([]);
	const [show, setShow] = useState(false);
	const [sort, setSort] = useState('');

useEffect(() => {
	if (sort === 'asc') {
		const newData = CSVData?.sort((a, b) =>
			a.first_name > b.first_name ? -1 : 1
		);
		setCSVData(newData);
	}
	if (sort === 'desc') {
		const newData = CSVData?.sort((a, b) =>
			a.first_name > b.first_name ? 1 : -1
		);
		console.log('desc');
		setCSVData(newData);
	}
}, [CSVData, sort]);
	// Parse remote CSV file
	function parseCSVData() {
		Papa.parse(data, {
			...commonConfig,
			header: true,
			download: true,
			complete: (result) => {
				// setCSVData(result.data);
				const data = result.data.filter(d => d.id !== '')
				setCSVData(data)
				console.log(data);
			},
		});
	}

	useEffect(() => {
		parseCSVData();
	}, []);
	useEffect(() => {
		const element = document.getElementById('table-menu');
		if (show) {
			element.style.display = 'block';
		} else {
			element.style.display = 'none';
		}
	}, [show]);
	
	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>
							<div className='table-sort'>
								<span>First Name</span>
								<BiDotsVerticalRounded
									onClick={() => setShow(!show)}
									className='sort-icon'
								/>
								<ul className='table-menu' id='table-menu'>
									<li onClick={() => setSort('asc')}>
										Sort Asc
									</li>
									<li onClick={() => setSort('desc')}>
										Sort Decs
									</li>
								</ul>
							</div>
						</th>
						<th>Last Name</th>
						<th>Mobile</th>
						<th>Full Name</th>
					</tr>
				</thead>
				<tbody>
					{CSVData.map((data) => (
						<tr onClick={(e)=>e.target.parentNode.style.backgroundColor = 'blue'} key={data.id} className={`${data.status === 'true' ? 'bg-green' : 'bg-red'} `}>
							<td>{data.first_name}</td>
							<td>{data.last_name}</td>
							<td>{data.mobile}</td>
							<td>{data.first_name + ' ' + data.last_name}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default App;
