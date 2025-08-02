import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Mess from "../Components/Message.js";
import Load from "../Components/Loading.js";
import "../STYLES/admin_style.css";
import {
  Listproducts,
  deleteProductAction,
  createProductAction,
} from "../Actions/product_action.js";
import { PRODUCT_CREATE_RESET } from "../Constants/Product_constant.js";

const ProductsListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const product_list = useSelector((state) => state.product_list);
  const { loading, error, products } = product_list;

  const user_Login = useSelector((state) => state.user_Login); //user_Login -> from the store
  const { UserInfo } = user_Login;

  const product_Delete = useSelector((state) => state.product_Delete);
  const {
    success: seccessDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = product_Delete;

  const product_Create = useSelector((state) => state.product_Create);
  const {
    success: successCreate,
    loading: loadingCreate,
    product: createdProduct,
    error: errorCreate,
  } = product_Create;

  // Add seccessDelete in the dependency array of useEffect bcz on deletion the useEffect will run once
  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (UserInfo && !UserInfo.isAdmin) history.push("/login");

    if (successCreate)
      history.push(`/admin/product/${createdProduct._id}/edit`);
    else dispatch(Listproducts()); // calling
  }, [
    dispatch,
    history,
    UserInfo,
    successCreate,
    seccessDelete,
    createdProduct,
  ]);

  //  DELETE A PRODUCT
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this Product?")) {
      dispatch(deleteProductAction(id));
    }
  };

  // CREATE NEW PRODUCT
  const createNewProduct = () => {
    console.log("Product created");
    dispatch(createProductAction());
  };

  return (
    <div>
      <Row>
        <Col>
          <h1
            className="cartHead text-center"
            style={{ paddingBottom: "2rem" }}
          >
            Products
          </h1>
        </Col>

        <Col className="text-right">
          <button className="custom-btn btn-6" onClick={createNewProduct}>
            <span>
              {" "}
              <i className="fas fa-plus"></i>
              Create Product
            </span>
          </button>
        </Col>
      </Row>

      {loadingDelete && <Load />}
      {errorDelete && <Mess variant="danger">{errorDelete}</Mess>}

      {loadingCreate && <Load />}
      {errorCreate && <Mess variant="danger">{errorCreate}</Mess>}

      {loading ? (
        <Load />
      ) : error ? (
        <Mess variant="danger">{error}</Mess>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>SL. NO.</th>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>BRAND</th>
              <th>TOPIC</th>
              <th>CATAGORY</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {products.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td> ₹ {item.price} </td>
                <td> {item.brand} </td>
                <td> {item.topic} </td>
                <td> {item.catagory} </td>
                <td>
                  <LinkContainer to={`/admin/product/${item._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(item._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ProductsListScreen;
