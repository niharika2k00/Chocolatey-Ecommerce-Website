import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Form } from "react-bootstrap";
import "../index.css";
import "../STYLES/Loginform.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  Detailsproducts,
  updateProductAction,
} from "../Actions/product_action.js";
import Loginform_Container from "../Components/Loginform_Container.js";
import Mess from "../Components/Message.js";
import Load from "../Components/Loading.js";
import { PRODUCT_UPDATE_RESET } from "../Constants/Product_constant.js";
import backend_URL from "../backend_URL.js";
import axios from "axios";

const UserEditScreen = ({ history, match }) => {
  // Id of the specific USER
  const urlProductID = match.params.id;
  console.log(urlProductID);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [topic, setTopic] = useState("");
  const [brand, setBrand] = useState("");
  const [catagory, setCatagory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [imgUploading, setImgUploading] = useState(false);

  const dispatch = useDispatch();

  const product_details = useSelector((state) => state.product_details); //product_details -> from the store
  const { loading, error, product } = product_details;
  console.log(product_details);

  const product_Update = useSelector((state) => state.product_Update); //product_Update -> from the store
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    product: updatedProduct,
    success: successUpdate,
  } = product_Update;

  useEffect(() => {
    // true
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productsList");
    } else {
      if (!product.name || urlProductID !== product._id)
        // if the user details is not set
        dispatch(Detailsproducts(urlProductID));
      else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setTopic(product.topic);
        setBrand(product.brand);
        setCatagory(product.catagory);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [product, dispatch, urlProductID, history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    // updated obj
    const prod = {
      _id: urlProductID,
      name,
      price,
      image,
      topic,
      brand,
      catagory,
      countInStock,
      description,
    };
    dispatch(updateProductAction(prod));
  };

  const fileUploadHandler = async (e) => {
    console.log("Image upload Success!");
    const file = e.target.files[0];
    console.log("File : ", file);
    const formData = new FormData();
    formData.append("image", file); //  add a form field with the given IMAGE and FILE,
    console.log("FormData : ", formData);
    setImgUploading(true);

    try {
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };

      const { data } = await axios.post(
        `${backend_URL}/api/upload`,
        formData,
        config
      );
      console.log("DATA : ", `${backend_URL}` + data);
      setImage(`${backend_URL}` + data);
      setImgUploading(false);
    } catch (e) {
      console.log(e);
      setImgUploading(false);
    }
  };

  return (
    <>
      <Link
        to="/admin/productsList"
        style={{ fontSize: "1.05rem", color: "white" }}
      >
        {" "}
        <i className="arrow left"></i> GO BACK{" "}
      </Link>

      <Loginform_Container>
        <h1 className="cartHead" style={{ paddingBottom: "2.1rem" }}>
          Edit Product
        </h1>

        {errorUpdate && <Mess variant="danger">{errorUpdate}</Mess>}
        {loadingUpdate && <Load />}

        {loading ? (
          <Load />
        ) : error ? (
          <Mess variant="danger">{error}</Mess>
        ) : (
          <Form onSubmit={submitHandler} id="login_form">
            <Form.Group controlId="name">
              <Form.Label>
                <b>Name</b>
              </Form.Label>
              <Form.Control
                className="form_box"
                type="name"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>
                <b>Price </b>
              </Form.Label>
              <Form.Control
                className="form_box"
                type="text"
                placeholder="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {imgUploading && <Load />}
            <Form.Group controlId="image">
              <Form.Label>
                <b>Image </b>
              </Form.Label>
              <Form.Control
                className="form_box"
                type="text"
                placeholder="enter image Url"
                value={image}
                // accept=".png, .jpg, .jpeg"
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={fileUploadHandler}
              ></Form.File>
            </Form.Group>

            <Form.Group controlId="topic">
              <Form.Label>
                <b>Topic </b>
              </Form.Label>
              <Form.Control
                className="form_box"
                type="text"
                placeholder="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>
                <b>Description </b>
              </Form.Label>
              <Form.Control
                className="form_box"
                type="text"
                placeholder="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>
                <b>Brand </b>
              </Form.Label>
              <Form.Control
                className="form_box"
                type="text"
                placeholder="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="catagory">
              <Form.Label>
                <b>Catagory </b>
              </Form.Label>
              <Form.Control
                className="form_box"
                type="text"
                placeholder="catagory"
                value={catagory}
                onChange={(e) => setCatagory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="CountInStock">
              <Form.Label>
                <b>CountInStock </b>
              </Form.Label>
              <Form.Control
                className="form_box"
                type="text"
                placeholder="CountInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="success">
              <b style={{ fontSize: "16px" }}>Edit</b>
            </Button>
          </Form>
        )}
      </Loginform_Container>
    </>
  );
};

export default UserEditScreen;
