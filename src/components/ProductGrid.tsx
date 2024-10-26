import React from "react";
import "./ProductGrid.css"; // Create this CSS file for styling
import { products } from "../data/Products";
import { shuffleArray } from "../utils";
import { Button } from "@mui/material";

type Props = {
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
  setProductID: (productID: number) => void;
};

const ProductGrid: React.FC<Props> = (props) => {
  const items = shuffleArray([...products]);

  return (
    <div className="product-grid">
      {items.map((product) => (
        <Button>
          <div
            key={product.id}
            className="product-card"
            onClick={() => {
              props.setProductID(product.id);
              props.setPageNumber(props.pageNumber + 1);
            }}
          >
            <img
              src={product.imageUrl}
              alt={product.title}
              className="product-image"
            />
            <h3 className="product-title">{product.title}</h3>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default ProductGrid;
