import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Image, Spinner, Table } from "react-bootstrap";
import { getProducts } from "../api/productsApi";
import AddProductForm from "./AddProductForm";
const BackOffice = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const products = await getProducts();
    setProducts(products);
    setLoading(false);
  };

  return (
    <div className="back-office">
      <h1 className="back-office-title text-center my-3">HOMEROS SHOP</h1>
      <h3 className="back-office-subtitle text-center mb-2">Back Office</h3>

      <AddProductForm />

      <div className="product-table">
        <Table striped bordered hover variant="dark">
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
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            ) : (
              <>
                {products &&
                  products.map((product, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          <Image src={product.imageUrl} />
                        </td>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.brand}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>
                          <Button>Update</Button>
                          <Button>Remove</Button>
                        </td>
                      </tr>
                    );
                  })}
              </>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default BackOffice;
