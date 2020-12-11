import React, { useState } from "react";
import AddProductForm from "./AddProductForm";
const BackOffice = (props) => {
	const [products, setProducts] = useState([]);

	return (
		<div className='back-office'>
			<h1 className='back-office-title text-center my-3'>HOMEROS SHOP</h1>
			<h3 className='back-office-subtitle text-center mb-2'>
				Back Office
			</h3>

			<AddProductForm />

			<div className='product-table'>
				<Table striped bordered hover variant='dark'>
					<thead>
						<tr>
							<th>No</th>
							<th>Name</th>
							<th>Description</th>
							<th>Brand</th>
							<th>Price</th>
							<th>Category</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1</td>
							<td>na</td>
							<td>desc</td>
							<td>br</td>
							<td>pr</td>
							<td>cat</td>
							<td>acts</td>
						</tr>
					</tbody>
				</Table>
			</div>
		</div>
	);
};

export default BackOffice;
