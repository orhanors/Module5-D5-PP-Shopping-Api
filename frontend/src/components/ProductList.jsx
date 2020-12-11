import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getProducts } from "../api/productsApi";
const ProductList = (props) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const callMeNow = async () => {
			await fetchProducts();
		};

		callMeNow();
	}, []);

	const fetchProducts = async () => {
		setLoading(true);
		const allProducts = await getProducts();
		setProducts(allProducts);
		setLoading(false);
	};
	return (
		<div className='product-list'>
			<Container>
				<Row>
					{products.map((product) => {
						return (
							<Col md={3} key={product._id}>
								<Card style={{ width: "12rem" }}>
									<Card.Img
										variant='top'
										src='holder.js/100px180'
									/>
									<Card.Body>
										<Card.Title>Card Title</Card.Title>
										<Card.Text>
											Some quick example text to build on
											the card title and make up the bulk
											of the card's content.
										</Card.Text>
										<Button variant='primary'>
											Go somewhere
										</Button>
									</Card.Body>
								</Card>
							</Col>
						);
					})}
				</Row>
			</Container>
		</div>
	);
};

export default ProductList;
