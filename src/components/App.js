import React, { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { jsonData } from "./constants";
import {
  AppBar,
  Card,
  CardContent,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
} from "@mui/material";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { Button } from "@mui/base";

const imageStyle = {
  border: "1px solid #000", // Border style
  padding: "4px", // Padding
};

const secondCellStyle = {
  width: "500px", // Set the width
  height: "300px", // Set the height
  display: "flex",
  justifyContent: "center", // Center horizontally
  alignItems: "center", // Center vertically
  border: "1px solid #000",
};

const descriptionStyle = {
  backgroundColor: "#E5E4E2",
  padding: "10px",
};

function ShoppingApp() {
  const [cartCount, setCartCount] = useState(0);
  const [animateCount, setAnimateCount] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    jsonData.article.images[0]
  );
  const [isButtonSticky, setIsButtonSticky] = useState(false);
  const topSectionRef = useRef(null);
  console.log({ selectedImage });
  const cartCountStyle = {
    color: "red",
    fontSize: "20px",
    transform: "scale(1)",
    transform: animateCount ? "scale(1.2)" : "scale(1)",
    display: "inline-block",
    position: "relative",
    top: "-10px", // Adjust the value to position it above the icon
  };

  console.log({ cartCount });
  const handleAddToCart = () => {
    // Add the product to the cart (implement your logic here)
    // Update the cart count
    setCartCount(cartCount + 1);
    setAnimateCount(true);

    // Remove the animation class after the animation duration (adjust as needed)
    setTimeout(() => {
      setAnimateCount(false);
    }, 500); // 500ms duration
  };

  const handleImageClick = (image) => {
    // Update the selected image when an image in the first cell is clicked
    setSelectedImage(image);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (topSectionRef.current) {
        const topSectionBounding =
          topSectionRef.current.getBoundingClientRect();
        setIsButtonSticky(topSectionBounding.bottom > 0);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <AppBar position="fixed" style={{ background: "#E5E4E2" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            style={{ flexGrow: 1, color: "red" }}
          >
            {jsonData.article.title}
          </Typography>
          {isButtonSticky && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
              style={{ position: "sticky", top: "0", color: "red" }}
            >
              Add to cart
            </Button>
          )}
          <IconButton color="inherit">
            <ShoppingCartOutlined style={{ color: "red" }} />
            <span style={cartCountStyle}>{cartCount}</span>
          </IconButton>
        </Toolbar>
      </AppBar>
      <div style={{ paddingTop: "77px" }} ref={topSectionRef}>
        <Table>
          <TableBody>
            <TableRow style={{ paddingTop: "77px" }}>
              <TableCell>
                {/* First Cell: Display Images */}
                {jsonData.article.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Image ${index}`}
                    style={{
                      ...imageStyle,
                      borderColor: image === selectedImage ? "blue" : "#000",
                    }}
                    onClick={() => handleImageClick(image)} // Handle click on image
                  />
                ))}
              </TableCell>

              <TableCell style={secondCellStyle}>
                {/* Second Cell: Display Single Image and Form */}
                <img src={selectedImage} alt={selectedImage} />
              </TableCell>

              <TableCell>
                {/* Third Cell: Display Product Description */}
                <Typography variant="h5">{jsonData.article.title}</Typography>
                <Typography variant="body1">
                  <div>By {jsonData.article.supplier_name}</div>
                  <div>Stars</div>
                  <div>
                    {jsonData.article.price} {jsonData.article.currency} +{" "}
                    {jsonData.cart.total_costs} shipping{" "}
                  </div>
                  <div>
                    all price including {jsonData.cart.vat_percent}% taxes
                  </div>
                  <div>{jsonData.article.description_long}</div>
                </Typography>
                <div>
                  {/* Display the count of items */}
                  <p>Count: {jsonData.cart.items}</p>
                  {/* Add to Cart button */}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div style={descriptionStyle}>
        <h2>Product Description</h2>
        <p>{jsonData.article.description_long}</p>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <h3>Details</h3>
                <p>Features</p>
                <ul>
                  <li>Features xyz: feature</li>
                  <li>Features xyz: feature</li>
                </ul>

                <p>Features</p>
                <ul>
                  <li>Features xyz: feature</li>
                  <li>Features xyz: feature</li>
                </ul>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <h3>Pricing & Shipping</h3>
                <ul>
                  <li>Minimum Order: 10 pcs</li>
                  <li>
                    Shipping: {jsonData.article.price}{" "}
                    {jsonData.article.currency}
                  </li>
                  <li>Delivery Days: {jsonData.article.delivery_time}</li>
                </ul>
                <List component="nav" aria-label="mailbox folders">
                  <div>Price Breaks</div>
                  <ListItem>
                    <ListItemText
                      primary={`EX ${Object.entries(
                        jsonData.article.price_breaks
                      )}`}
                    />
                  </ListItem>
                  <Divider />

                  <ListItem>
                    <ListItemText
                      primary={`EX ${Object.entries(
                        jsonData.article.price_breaks
                      )}`}
                    />
                  </ListItem>
                  <Divider light />
                  <ListItem>
                    <ListItemText
                      primary={`EX ${Object.entries(
                        jsonData.article.price_breaks
                      )}`}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default ShoppingApp;
