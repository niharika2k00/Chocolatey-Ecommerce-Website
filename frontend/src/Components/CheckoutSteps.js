
import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'



const CheckoutSteps = ({ step1, step2, step3, step4 }) => {


    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item >
                {step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link id="checkout">Sign In</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link id="checkoutDisabled" disabled>Sign In</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/shipping'>
                        <Nav.Link id="checkout">Shipping</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled id="checkoutDisabled">Shipping</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/payment'>
                        <Nav.Link id="checkout">Payment</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled id="checkoutDisabled">Payment</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step4 ? (
                    <LinkContainer to='/placeorder'>
                        <Nav.Link id="checkout">Place Order</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled id="checkoutDisabled">Place Order</Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps;