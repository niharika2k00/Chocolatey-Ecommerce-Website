import React from "react";
import { Button } from "react-bootstrap";

const CustomButton = ({
  children,
  type = "button",
  onClick,
  className = "customButton neonBtn",
  style = {},
  disabled = false,
  variant = "success",
  size,
  isTableButton = false,
  ...props
}) => {
  // Allow custom styles to override defaults
  const defaultStyle = isTableButton
    ? {
        borderRadius: ".4rem",
        margin: "0.1rem 0.2rem",
        ...style,
      }
    : {
        marginTop: "1.6rem",
        marginBottom: "3.0rem",
        borderRadius: ".4rem",
        ...style,
      };

  return (
    <Button
      type={type}
      onClick={onClick}
      className={className}
      style={defaultStyle}
      disabled={disabled}
      // variant={variant}
      size={size}
      {...props}
    >
      <div style={{ fontSize: "14px" }}>{children}</div>
    </Button>
  );
};

export default CustomButton;
