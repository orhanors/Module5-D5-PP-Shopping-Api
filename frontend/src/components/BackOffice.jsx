import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Container, Image, Spinner, Table } from "react-bootstrap";
import { getProducts } from "../api/productsApi";
import AddProductForm from "./AddProductForm";
import { postProduct, removeProduct } from "../api/productsApi";
const BackOffice = (props) => {
	const [products, setProducts] = useState([]);
	const [product, setProduct] = useState({
		name: "",
		description: "",
		brand: "",
		price: 1,
		category: "Tech",
	});

	const [submittedSize, setSubmittedSize] = useState(0);

	const [loading, setLoading] = useState(false);
	useEffect(() => {
		const mileStone = async () => {
			await fetchProducts();
		};

		mileStone();
	}, [submittedSize]);

	const fetchProducts = async () => {
		setLoading(true);
		const products = await getProducts();
		setProducts(products);
		setLoading(false);
	};

	const addProduct = async (e) => {
		e.preventDefault();
		let postedProduct = await postProduct(product);
		setSubmittedSize(submittedSize + 1);
		console.log(postedProduct);
	};
	const fillForm = (e) => {
		let currentId = e.currentTarget.id;
		let newProduct = { ...product };
		newProduct[currentId] = e.currentTarget.value;
		setProduct(newProduct);
	};

	const deleteProduct = async (e) => {
		let id = e.target.id;
		console.log(e.currentTarget);
		let deletedResponse = await removeProduct(id);
		setSubmittedSize(submittedSize + 1);
	};
	return (
		<div className='back-office'>
			<h1 className='back-office-title text-center my-3'>HOMEROS SHOP</h1>
			<h3 className='back-office-subtitle text-center mb-2'>
				Back Office
			</h3>

			<AddProductForm
				product={product}
				fillForm={fillForm}
				onHandleSubmit={addProduct}
			/>

			<div className='product-table mt-3'>
				<Container>
					<Table striped bordered hover variant='dark'>
						<thead>
							<tr>
								<th>No</th>
								<th>Image</th>
								<th>Name</th>
								<th>Description</th>
								<th>Brand</th>
								<th>Price</th>
								<th>Category</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{loading ? (
								<Spinner animation='border' role='status'>
									<span className='sr-only'>Loading...</span>
								</Spinner>
							) : (
								<>
									{products &&
										products.map((product, index) => {
											return (
												<tr>
													<td>{index + 1}</td>
													<td>
														<Image
															src={
																product.imageUrl
															}
														/>
													</td>
													<td>{product.name}</td>
													<td>
														{product.description}
													</td>
													<td>{product.brand}</td>
													<td>{product.price}</td>
													<td>{product.category}</td>
													<td>
														<Button className='mr-2'>
															Update
														</Button>
														<Button
															id={product._id}
															onClick={(e) =>
																deleteProduct(e)
															}
															variant='danger'>
															Remove
														</Button>
													</td>
												</tr>
											);
										})}
								</>
							)}
						</tbody>
					</Table>
				</Container>
			</div>
		</div>
	);
};

export default BackOffice;
