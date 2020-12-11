import React from "react";
import { Form, Button, Container } from "react-bootstrap";
const AddProductForm = (props) => {
	return (
		<div className='product-form'>
			<Container>
				<Form>
					<Form.Group controlId='exampleForm.ControlInput1'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							id='name'
							type='text'
							placeholder='name@example.com'
						/>
					</Form.Group>

					<Form.Group controlId='exampleForm.ControlTextarea1'>
						<Form.Label>Description</Form.Label>
						<Form.Control id='description' as='textarea' rows={2} />
					</Form.Group>

					<Form.Group controlId='exampleForm.ControlInput1'>
						<Form.Label>Brand</Form.Label>
						<Form.Control
							id='brand'
							type='text'
							placeholder='name@example.com'
						/>
					</Form.Group>

					<Form.Group controlId='exampleForm.ControlInput1'>
						<Form.Label>Price</Form.Label>
						<Form.Control
							id='price'
							type='number'
							placeholder='name@example.com'
						/>
					</Form.Group>

					<Form.Group controlId='exampleForm.ControlSelect1'>
						<Form.Label>Category</Form.Label>
						<Form.Control as='select'>
							<option>Tech</option>
							<option>Home </option>
							<option>Food</option>
							<option>Drink</option>
							<option>Other</option>
						</Form.Control>
					</Form.Group>

					<Button variant='primary' type='submit'>
						Submit
					</Button>
				</Form>
			</Container>
		</div>
	);
};

export default AddProductForm;
