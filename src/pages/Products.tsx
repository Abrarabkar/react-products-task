import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products.api";

const categories = [
  {
    label: "All Products",
    value: "all",
  },
  {
    label: "Skincare",
    value: "beauty",
  },
  {
    label: "Haircare",
    value: "haircare",
  },
  {
    label: "Makeup",
    value: "makeup",
  },
  {
    label: "Bath & Body",
    value: "bath",
  },
];

export default function Products() {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("q") || "";

  const [page, setPage] = useState(0);
  const [category, setCategory] = useState("all");

  const limit = 8;

  const { data, isPending, isError } = useQuery({
    queryKey: ["products", search, page],
    queryFn: () =>
      getProducts(
        limit,
        page * limit,
        search
      ),
    placeholderData: (previousData) => previousData,
  });

  function handleCategory(value: string) {
    setCategory(value);
    setPage(0);
  }

  /*
   * DummyJSON doesn't contain the exact categories
   * from the reference design.
   *
   * Therefore we use simple keyword filtering
   * for the extra beauty categories.
   */
  const filteredProducts =
    data?.products.filter((product) => {
      if (category === "all") {
        return true;
      }

      if (category === "beauty") {
        return product.category === "beauty";
      }

      if (category === "haircare") {
        return (
          product.title.toLowerCase().includes("hair") ||
          product.description.toLowerCase().includes("hair")
        );
      }

      if (category === "makeup") {
        const text =
          `${product.title} ${product.description}`.toLowerCase();

        return (
          text.includes("makeup") ||
          text.includes("lip") ||
          text.includes("mascara") ||
          text.includes("eyeshadow") ||
          text.includes("foundation")
        );
      }

      if (category === "bath") {
        const text =
          `${product.title} ${product.description}`.toLowerCase();

        return (
          text.includes("body") ||
          text.includes("bath") ||
          text.includes("soap")
        );
      }

      return true;
    }) || [];

  const totalPages = data
    ? Math.max(1, Math.ceil(data.total / limit))
    : 1;

  return (
    <main className="shop-page">

      {/* =========================
          HERO
      ========================= */}

      <section className="shop-hero">

        {/* Decorative stars */}
        <span className="decorative-star star-one">
          ✦
        </span>

        <span className="decorative-star star-two">
          ✦
        </span>

        <span className="decorative-star star-three">
          ✦
        </span>

        {/* Curved decorative lines */}
        <div className="hero-curve curve-one" />
        <div className="hero-curve curve-two" />

        <div className="hero-content">

          <h1>
            Explore Our Shop
          </h1>

          <p>
            From skincare to makeup, our platform features a
            wide range of products that cater to your beauty
            needs. We strive to provide our customers with a
            luxury shopping experience, from browsing through
            our carefully selected products to receiving them
            in our signature packaging. Shop with us for the
            ultimate in beauty luxury.
          </p>

        </div>

        {/* Simple decorative illustration */}
        <div className="hero-illustration">
          <div className="illustration-star">
            ✦
          </div>

          <div className="illustration-shape">
            ♡
          </div>
        </div>

      </section>


      {/* =========================
          PRODUCTS
      ========================= */}

      <section className="products-section">

        {/* Categories */}

        <div className="category-tabs">

          {categories.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() =>
                handleCategory(item.value)
              }
              className={
                category === item.value
                  ? "category-tab active"
                  : "category-tab"
              }
            >
              {item.label}
            </button>
          ))}

        </div>


        {/* Loading */}

        {isPending && (
          <div className="products-message">
            Loading products...
          </div>
        )}


        {/* Error */}

        {isError && (
          <div className="products-message error">
            Failed to load products.
          </div>
        )}


        {/* Products */}

        {!isPending &&
          !isError &&
          filteredProducts.length > 0 && (
            <>
              <div className="products-grid">

                {filteredProducts.map(
                  (product) => (
                    <Link
                      key={product.id}
                      to={`/products/${product.id}`}
                      className="product-card"
                    >

                      <div className="product-image-container">

                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          loading="lazy"
                          className="product-image"
                        />

                      </div>


                      <div className="product-details">

                        <h2>
                          {product.title}
                        </h2>

                        <p className="product-category">
                          {product.category.replace(
                            /-/g,
                            " "
                          )}
                        </p>

                        <p className="product-price">
                          ${product.price.toFixed(2)}
                        </p>

                      </div>

                    </Link>
                  )
                )}

              </div>


              {/* Pagination */}

              <div className="pagination">

                <button
                  type="button"
                  disabled={page === 0}
                  onClick={() =>
                    setPage(
                      (current) =>
                        current - 1
                    )
                  }
                >
                  ←
                </button>

                <span>
                  Page {page + 1} of{" "}
                  {totalPages}
                </span>

                <button
                  type="button"
                  disabled={
                    (page + 1) * limit >=
                    (data?.total ?? 0)
                  }
                  onClick={() =>
                    setPage(
                      (current) =>
                        current + 1
                    )
                  }
                >
                  →
                </button>

              </div>
            </>
          )}


        {/* No products */}

        {!isPending &&
          !isError &&
          filteredProducts.length === 0 && (
            <div className="products-message">
              No products found.
            </div>
          )}

      </section>

    </main>
  );
}