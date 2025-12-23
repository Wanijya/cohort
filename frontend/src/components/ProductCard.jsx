import React from "react";
import "./ProductCard.css";

export default function ProductCard({ product, onBuy }) {
  const { description, image, price } = product || {};
  const amount = price?.amount / 100 ?? 0;
  const currency = price?.currency ?? "USD";

  return (
    <div className="pcard">
      <div
        className="pcard-image"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="pcard-body">
        <h3 className="pcard-title">{description}</h3>
        <p className="pcard-price">
          {currency} {amount.toLocaleString()}
        </p>
        <div className="pcard-actions">
          <button
            className="pcard-btn pcard-buy"
            onClick={() => onBuy && onBuy(product)}
          >
            Buy Now
          </button>
          <button className="pcard-btn pcard-add">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
