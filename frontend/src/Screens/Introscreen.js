import React, { useEffect, useState } from "react";
import { Row, Col, Container, Carousel } from "react-bootstrap";
import "../STYLES/intro_style.css";

// Import css files for Carousal
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

// Images
import carousel1 from "../images/carousel1.avif";
import carousel2 from "../images/carousel2.jfif";
// import carousel3 from "../images/carousel3.jpg";
// import carousel4 from "../images/carousel4.jpg";
// import carousel5 from "../images/carousel5.jpg";

import gifts from "../images/gifts.jfif";
import party from "../images/party.jfif";

import choco1 from "../images/choco1.png";
import choco2 from "../images/choco2.png";
import choco3 from "../images/choco3.png";
import choco4 from "../images/choco4.png";
import choco5 from "../images/choco5.png";
import bg1 from "../images/bg1.png";
import heart from "../images/heart.png";

const Introscreen = () => {
  var settings;
  const [slider, setslider] = useState(
    (settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
    })
  );

  var width = window.innerWidth;

  useEffect(() => {
    console.log(width);
    if (width < 780) {
      // <----- Responsive for VIEWPORT
      console.log("if cond working");
      setslider(
        (settings = {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 2,
          slidesToScroll: 1,
        })
      );
    }
  }, [width]);

  return (
    <div className="main-cls">
      {/* -----------  CAROUSEL  --------- */}
      <Carousel interval={2000}>
        <Carousel.Item className="mycarou">
          <div className="overlay-image">
            {" "}
            {/* hazy in the background using OPACITY */}
            <img
              className="d-block w-100 image"
              src={carousel1}
              alt="Third slide"
            />
          </div>
          <Carousel.Caption className="carou_center">
            <h3 className="title">Chocolatey</h3>
            <p className="subtitle">
              <i
                className="fas fa-quote-left"
                style={{ paddingRight: ".4rem" }}
              ></i>{" "}
              A day without chocolate is a day without sunshine.{" "}
              <i
                className="fas fa-quote-right"
                style={{ paddingleft: ".4rem" }}
              ></i>
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className="mycarou">
          <div className="overlay-image">
            <img
              className="d-block w-100 image"
              src={carousel2}
              alt="Second slide"
            />
          </div>
          <Carousel.Caption className="carou_center">
            <h3 className="subtitle">DARK CHOCOLATES</h3>
            <p className="subtitle">
              ------- A healthy alternatives for Chocolate Lovers -------{" "}
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className="mycarou">
          <div className="overlay-image">
            {" "}
            <img
              className="d-block w-100 image "
              src="https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt="First slide"
            />
          </div>

          <Carousel.Caption className="carou_center"></Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Container className="container_self" style={{ paddingTop: "3rem" }}>
        <div className="minihead">
          <h1 id="trendSize">
            {" "}
            <img src={choco5} alt="aa" id="png1" /> Trending Chocolates
          </h1>
        </div>

        <Row className="HOVER">
          <Col md={3} sm={6} xs={6} lg={3} className="choco">
            <img className="choco_img" src={choco4} alt="lost" />
            <div className="choco_name">
              {" "}
              <h4>Choco Vanilla Truffle</h4>
            </div>
          </Col>

          <Col md={3} sm={6} xs={6} className="choco">
            <img className="choco_img" src={choco3} alt="lost" />
            <div className="choco_name">
              {" "}
              <h4>Ferrero Rocher Gold</h4>
            </div>
          </Col>

          <Col md={3} sm={6} xs={6} className="choco">
            <img className="choco_img" src={choco2} alt="lost" />
            <div className="choco_name">
              {" "}
              <h4>Almond Dark Chocolate</h4>
            </div>
          </Col>

          <Col md={3} sm={6} xs={6} className="choco">
            <img className="choco_img" src={choco1} alt="lost" />
            <div className="choco_name">
              {" "}
              <h4>Dark Chocolate</h4>
            </div>
          </Col>
        </Row>

        {/* <Row>
                    <section className="my-3 Button" style={{ marginLeft: "3rem" }}>
                        <a className="Button-btn" href="/home"> SHOP NOW </a>
                    </section>
                </Row> */}
      </Container>

      <section id="parallax" className="parallax">
        <div className="container" data-aos="zoom-in">
          <div className="text-center">
            <h2>
              <img src={heart} alt="aa" id="png" /> Valentines Day{" "}
              <img src={heart} alt="aa" id="png" />{" "}
            </h2>
            <p>A brand new Valentines Day's Collection on your way ....</p>
            <a className="parallax-btn" href="/home">
              SHOP NOW
            </a>
          </div>
        </div>
      </section>

      <Container>
        {/* <div class="d-flex justify-content-around"> */}
        <Row>
          <Col md={8} sm={12} lg={8} xs={12}>
            <img src={bg1} alt="First slide" id="intoImg" />
          </Col>

          <Col md={4} sm={12} lg={4} xs={12}>
            <div id="item">
              <h5 className="itemhead">
                <i class="fab fa-pagelines icoo"></i> Natural Organic Products
              </h5>
              <p className="item_subhead">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>

            <div id="item">
              <h5 className="itemhead">
                {" "}
                <i class="fas fa-gift icoo"></i>Designing
              </h5>
              <p className="item_subhead">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>

            <div id="item">
              <h5 className="itemhead">
                <i class="fas fa-candy-cane icoo"></i>Best Quality Cocoa
              </h5>
              <p className="item_subhead">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.Duis
                aute irure dolor in reprehenderit
              </p>
            </div>
          </Col>
        </Row>
        {/* </div> */}
      </Container>

      {/* ----------  SLIDER PART DONE WITH REACT SLIDER  ----------- */}
      {/* <Container className="container_self">
                <div className="minihead">
                    <h2 className="subheading">
                        {" "}
                        <span> Free Shipping</span>{" "}
                    </h2>
                </div>

               <div>
                    <Slider {...slider}>
                        <div className="minislider">
                            <img
                                className="d-block w-100 htset "
                                src="http://design.dev.drcsystems.ooo:8084/themeforest/chocolate/assets/images/offer-img/img10.jpg"
                                alt="First slide"
                            />
                            <div className="minisli_box">
                                <h4>Birthday Day</h4>
                            </div>
                        </div>

                        <div className="minislider">
                            <img className="d-block w-100 htset" src={pic} alt="First slide" />
                            <div className="minisli_box">
                                <h4>Valentine's Day</h4>
                            </div>
                        </div>

                        <div className="minislider">
                            <img
                                className="d-block w-100 htset"
                                src={gifts}
                                alt="First slide"
                            />
                            <div className="minisli_box">
                                <h4>Gifts</h4>
                            </div>
                        </div>

                        <div className="minislider">
                            <img className="d-block w-100 htset" src={party} alt="First slide" />
                            <div className="minisli_box">
                                <h4>Party</h4>
                            </div>
                        </div>

                        <div className="minislider">
                            <img
                                className="d-block w-100 htset"
                                src="https://images.unsplash.com/photo-1548741487-18d363dc4469?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mjd8fGNob2NvbGF0ZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
                                alt="First slide"
                            />
                            <div className="minisli_box">
                                <h4>chocolatey</h4>
                            </div>
                        </div>
                    </Slider>
                </div>
            </Container> */}
    </div>
  );
};

export default Introscreen;
