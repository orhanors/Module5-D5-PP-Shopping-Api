import React, { useEffect, useState } from "react";
import { getAllReviews } from "../api/productsApi";

import { ListGroup } from "react-bootstrap";
const ShowReviews = (props) => {
	const [reviews, setReviews] = useState([]);

	const getReviews = async () => {
		const data = await getAllReviews(props.productId);
		console.log("reviews: ", data);
		setReviews(data);
	};

	useEffect(() => {
		getReviews();
	}, []);
	return (
		<div>
			<h1 className='text-center mt-3'></h1>
			<ListGroup>
				{reviews &&
					reviews.map((rev) => {
						return (
							<div>
								<ListGroup.Item>
									<strong>comment: </strong> {rev.comment}
								</ListGroup.Item>
								<ListGroup.Item>
									<strong>rate: </strong> {rev.rate}
								</ListGroup.Item>
							</div>
						);
					})}
			</ListGroup>
		</div>
	);
};

export default ShowReviews;
