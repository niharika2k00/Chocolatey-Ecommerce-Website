import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Form, InputGroup, Button } from "react-bootstrap";
import "../index.css";
import "../STYLES/Loginform.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  Detailsproducts,
  updateProductAction,
} from "../Actions/Product_action.js";
import FormContainer from "../Components/FormContainer.js";
import Mess from "../Components/Message.js";
import Loader from "../Components/Loading.js";
import { PRODUCT_UPDATE_RESET } from "../Constants/Product_constant.js";
import CustomButton from "../Components/CustomButton.js";
import { getImageUrl } from "../utils.js";
import API_URL from "../config.js";
import axios from "axios";

const ProductEditScreen = ({ history, match }) => {
  // Id of the specific product
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
  const fileInputRef = useRef(null);

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

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const fileUploadHandler = async (e) => {
    console.log("Image upload Success!");
    const file = e.target.files[0]; // as selecting single file
    if (!file) return;

    console.log("File : ", file);
    const formData = new FormData();
    formData.append("image", file); // add a form field with the given image and file
    setImgUploading(true);

    try {
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };

      const { data } = await axios.post(
        `${API_URL}/api/upload`,
        formData,
        config
      );
      console.log("Data: ", data);
      setImage(data); // Store only filename
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
        <i className="arrow left"></i> Go Back
      </Link>

      <FormContainer pageType="singlePage">
        <h1
          className="cartHead"
          style={{ paddingBottom: "1.5rem", marginBottom: "0.5rem" }}
        >
          Edit Product
        </h1>

        {errorUpdate && <Mess variant="danger">{errorUpdate}</Mess>}
        {loadingUpdate && <Loader />}

        {loading ? (
          <Loader />
        ) : error ? (
          <Mess variant="danger">{error}</Mess>
        ) : (
          <Form onSubmit={submitHandler} id="login_form">
            <Form.Group controlId="name" style={{ marginBottom: "1.2rem" }}>
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

            <Form.Group controlId="price" style={{ marginBottom: "1.2rem" }}>
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

            <Form.Group controlId="image" style={{ marginBottom: "1.2rem" }}>
              <Form.Label>
                <b>Image</b>
              </Form.Label>
              <InputGroup>
                <Form.Control
                  className="form_box"
                  type="text"
                  placeholder="Enter image url or click upload to select file"
                  value={getImageUrl(image)}
                  // Extract filename from full URL if user pastes a full URL
                  onChange={(e) => {
                    const url = e.target.value;
                    if (url.includes(API_URL)) {
                      setImage(url.replace(`${API_URL}/`, ""));
                    } else {
                      setImage(url);
                    }
                  }}
                />
                <Button
                  variant="outline-secondary"
                  onClick={handleFileButtonClick}
                  disabled={imgUploading}
                  style={{
                    borderColor: "#6c757d",
                    color: "#6c757d",
                    backgroundColor: "transparent",
                  }}
                >
                  {imgUploading ? (
                    <span style={{ color: "white" }}>
                      <i className="fas fa-spinner fa-spin" /> Uploading...
                    </span>
                  ) : (
                    <span style={{ color: "white" }}>
                      <i className="fas fa-upload" /> Upload
                    </span>
                  )}
                </Button>
              </InputGroup>
              <Form.Text className="text-muted">
                Enter a direct image URL or click upload to select a file
              </Form.Text>
              <input
                type="file"
                ref={fileInputRef}
                onChange={fileUploadHandler}
                accept="image/*"
                style={{ display: "none" }}
              />
            </Form.Group>

            <Form.Group controlId="topic" style={{ marginBottom: "1.2rem" }}>
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

            <Form.Group
              controlId="description"
              style={{ marginBottom: "1.2rem" }}
            >
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

            <Form.Group controlId="brand" style={{ marginBottom: "1.2rem" }}>
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

            <Form.Group controlId="catagory" style={{ marginBottom: "1.2rem" }}>
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

            <Form.Group
              controlId="CountInStock"
              style={{ marginBottom: "1.2rem" }}
            >
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

            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <CustomButton type="submit" style={{ width: "40%" }}>
                <span style={{ fontSize: "16px" }}> Update </span>
              </CustomButton>
            </div>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
