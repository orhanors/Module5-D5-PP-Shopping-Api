import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import AddReviews from "./AddReviews";

import { postReview } from "../api/productsApi";
const Reviews = (props) => {
	//productId

	const [review, setReview] = useState({
		comment: "",
		rate: 1,
		elementId: props.productId,
	});

	const addReview = async (e) => {
		e.preventDefault();
		const postedRev = await postReview(props.productId, review);
		alert(postedRev);
	};

	const fillForm = (e) => {
		let currentId = e.currentTarget.id;
		let newReview = { ...review };
		let result = currentId.localeCompare("rate");
		if (result === 0) {
			newReview[currentId] = Number(e.currentTarget.value);
		} else {
			newReview[currentId] = e.currentTarget.value;
		}

		setReview(newReview);
	};
	return (
		<Modal
			{...props}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					Add New Review
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<AddReviews
					fillForm={fillForm}
					onHandleSubmit={addReview}
					review={review}
				/>
			</Modal.Body>
		</Modal>
	);
};

export default Reviews;
