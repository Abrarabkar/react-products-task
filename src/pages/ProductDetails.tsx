import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../api/products.api";
import type { Product } from "../api/products.api";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id || !/^\d+$/.test(id) || Number(id) < 1) {
      setError("Invalid product ID.");
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchProduct() {
      try {
        setLoading(true);
        setError("");

        const data = await getProductById(Number(id));

        if (!cancelled) {
          setProduct(data);
        }
      } catch {
        if (!cancelled) {
          setError(
            "Failed to load product details. Please try again."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchProduct();

    return () => {
      cancelled = true;
    };
  }, [id]);

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <main className="details-page">
        <div className="details-message">
          Loading product...
        </div>
      </main>
    );
  }

  /* =========================
     ERROR
  ========================= */

  if (error || !product) {
    return (
      <main className="details-page">
        <section className="details-error">

          <h1>
            Product not found
          </h1>

          <p>
            {error || "We couldn't find this product."}
          </p>

          <Link
            to="/products"
            className="back-button"
          >
            ← Back to Shop
          </Link>

        </section>
      </main>
    );
  }

  /* =========================
     PRODUCT
  ========================= */

  return (
    <main className="details-page">

      {/* Back button */}

      <div className="details-topbar">

        <Link
          to="/products"
          className="back-link"
        >
          ← Back to Shop
        </Link>

      </div>


      {/* Product section */}

      <section className="product-details-card">

        {/* =========================
            IMAGE
        ========================= */}

        <div className="details-image-section">

          <div className="details-image-wrapper">

            <img
              src={product.thumbnail}
              alt={product.title}
              className="details-image"
            />

          </div>

        </div>


        {/* =========================
            INFORMATION
        ========================= */}

        <div className="details-info">

          {/* Category */}

          <p className="details-category">
            {product.category.replace(
              /-/g,
              " "
            )}
          </p>


          {/* Title */}

          <h1 className="details-title">
            {product.title}
          </h1>


          {/* Rating */}

          <div className="details-rating">

            <span className="stars">
              ★★★★★
            </span>

            <span className="rating-number">
              {product.rating.toFixed(1)}
            </span>

          </div>


          {/* Price */}

          <p className="details-price">
            ${product.price.toFixed(2)}
          </p>


          {/* Description */}

          <div className="details-description">

            <h2>
              About this product
            </h2>

            <p>
              {product.description}
            </p>

          </div>


          {/* Divider */}

          <div className="details-divider" />


          {/* Product information */}

          <div className="details-meta">

            <div className="meta-item">

              <span className="meta-label">
                Category
              </span>

              <span className="meta-value">
                {product.category.replace(
                  /-/g,
                  " "
                )}
              </span>

            </div>


            <div className="meta-item">

              <span className="meta-label">
                Rating
              </span>

              <span className="meta-value">
                {product.rating.toFixed(1)} / 5
              </span>

            </div>


            <div className="meta-item">

              <span className="meta-label">
                Product ID
              </span>

              <span className="meta-value">
                #{product.id}
              </span>

            </div>

          </div>


          {/* Button */}

          <button
            type="button"
            className="add-cart-button"
          >
            Add to Cart
          </button>

        </div>

      </section>


      {/* Bottom decorative section */}

      <section className="details-bottom">

        <span className="details-bottom-star">
          ✦
        </span>

        <p>
          Discover more products from our collection.
        </p>

        <Link to="/products">
          Continue Shopping →
        </Link>

      </section>

    </main>
  );
}