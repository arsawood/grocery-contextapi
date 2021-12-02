import React, { useContext } from "react";
import { CartContext } from "../global/CartContext";
// import useProducts from "../hooks/useProducts";
import { AddShoppingCart } from "@material-ui/icons";
import useStyles from "./Styles";
import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  Card,
  Grid,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";

const Products = () => {
  const classes = useStyles();

  const { dispatch } = useContext(CartContext);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts([]);
    const unsubscribe = db.collection("myproducts").onSnapshot((snapshot) => {
      let items = [];
      snapshot.forEach((doc) => {
        items.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setProducts(items);
    });
    return unsubscribe;
  }, []);

  return (
    <>
      {products.length !== 0 && <h3 className="text-center">Products</h3>}
      <div className="products-container">
        {products.length < 0 && <div>check your internet connection!!</div>}
        <Grid container justifyContent="center" spacing={4}>
          {products &&
            products.map((product) => (
              <Grid item key={product.id} xs={12} md={4} lg={3}>
                <Card className={classes.root}>
                  <CardMedia
                    className={classes.media}
                    image={product.ProductImage}
                    title={product.ProductName}
                  />
                  <CardContent>
                    <div className={classes.cardContent}>
                      <Typography varient="h5" gutterBottom>
                        {product.ProductName}
                      </Typography>
                      <Typography varient="h5">
                      ₹{product.ProductPrice}
                      </Typography>
                    </div>
                    <Typography varient="body2" color="textSecondary">
                      {product.ProductDescription}
                    </Typography>
                    <IconButton
                      onClick={() => {
                        dispatch({
                          type: "ADD_TO_CART",
                          id: product.id,
                          product,
                        });
                      }}
                    >
                      <Button variant="contained">
                        Add
                        <AddShoppingCart />
                      </Button>
                    </IconButton>
                  </CardContent>
                  <CardActions
                    disableSpacing
                    className={classes.CardActions}
                  ></CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </div>
    </>
  );
};

export default Products;

{
  /* <>
      {products.length !== 0 && <h3 className="text-center">Products</h3>}
      <div className="products-container">
        {products.length < 0 && <div>check your internet connection!!</div>}
        {products &&
          products.map((product) => (
            <Col className="m-1" xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={product.ProductImage} />
                <Card.Body>
                  <Card.Title>{product.ProductName}</Card.Title>

                  <Card.Text>
                    Price :
                    <span className="font-weight-bolder">
                      {product.ProductPrice} Rs.
                    </span>
                  </Card.Text>
                  <Card.Text className="text-danger bold">
                    <span>{product.ProductDescription}</span>
                  </Card.Text>

                  <Button
                    variant="info"
                    onClick={() => {
                      dispatch({
                        type: "ADD_TO_CART",
                        id: product.id,
                        product,
                      });
                    }}
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </div>
    </> */
}
