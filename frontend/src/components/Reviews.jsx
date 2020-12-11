import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import AddReviews from "./AddReviews";

import { getAllReviews, postReview } from "../api/productsApi";
import ShowReviews from "./ShowReviews";
const Reviews = (props) => {
  //productId

  const [review, setReview] = useState({
    comment: "",
    rate: 1,
    elementId: props.productId,
  });
  const [submittedSize, setSubmittedSize] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [productId, setProductId] = useState(null);
  const addReview = async (e) => {
    e.preventDefault();
    const postedRev = await postReview(props.productId, review);
    alert(postedRev);
  };

  useEffect(() => {
    if (props.productId) {
      setProductId(props.productId);
      const fetchReview = async () => {
        await getReviews(productId);
      };
      fetchReview();
    }
  }, [submittedSize, props.productId]);

  const getReviews = async (id) => {
    const data = await getAllReviews(id);
    setReviews(data);
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
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Review
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ShowReviews />
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
