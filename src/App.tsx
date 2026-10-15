
import { useState } from "react";
import Button from "./components/ui/Button";
import Card from "./components/common/Card";
import Table from "./components/common/Table";
import "./App.css";

const products = [
  { Name: "Wireless Mouse", Price: 15, Stock: 24 },
  { Name: "Mechanical Keyboard", Price: 45, Stock: 12 },
  { Name: "USB-C Hub", Price: 25, Stock: 8 },
  { Name: "Laptop Stand", Price: 30, Stock: 16 },
];

const columns = ["Name", "Price", "Stock"];

export default function App() {
  const [message, setMessage] = useState("Welcome to our store!");
  const [selectedProduct, setSelectedProduct] = useState("");

  return (
    <main className="app-container">
      <header className="app-header">
        <p className="eyebrow">REACT COURSE · ASSIGNMENT 2</p>
        <h1>Reusable Components</h1>
        <p>
          this is Abrar Abkar's Assignment.
        </p>
      </header>

      {/* 1. Button Component */}
      <section className="section">
        <h2>1. Button Component</h2>
        <p className="section-description">
          Different button variants, using the same component.
        </p>

        <div className="button-group">
          <Button
            text="Primary Action"
            variant="primary"
            onClick={() => setMessage("Primary button clicked!")}
          />

          <Button
            text="Secondary Action"
            variant="secondary"
            onClick={() => setMessage("Secondary button clicked!")}
          />

          <Button
            text="Delete Item"
            variant="danger"
            onClick={() => setMessage("Delete action selected!")}
          />

          <Button
            text="Disabled Button"
            variant="primary"
            disabled
            onClick={() => setMessage("This will not run.")}
          />
        </div>

        <p className="feedback" role="status">
          {message}
        </p>
      </section>

      {/* 2. Card Component */}
      <section className="section">
        <h2>2. Card Component</h2>
        <p className="section-description">
          Two reusable cards with different products.
        </p>

        <div className="card-grid">
          <Card
            title="Wireless Mouse"
            description="A comfortable wireless mouse for everyday productivity."
            image="https://images.unsplash.com/photo-1527814050087-3793815479db?w=600"
          >
            <p className="product-price">$15.00</p>

            <Button
              text="View Product"
              variant="primary"
              onClick={() => {
                setSelectedProduct("Wireless Mouse");
              }}
            />
          </Card>

          <Card
            title="Mechanical Keyboard"
            description="A durable keyboard designed for typing and productivity."
            image="https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600"
          >
            <p className="product-price">$45.00</p>

            <Button
              text="View Product"
              variant="secondary"
              onClick={() => {
                setSelectedProduct("Mechanical Keyboard");
              }}
            />
          </Card>
        </div>

        {/* Product selection notification */}
        {selectedProduct && (
          <div className="product-notification" role="status">
            <h3>Product Selected!</h3>

            <p>
              You selected: <strong>{selectedProduct}</strong>
            </p>

            <Button
              text="Close"
              variant="secondary"
              onClick={() => setSelectedProduct("")}
            />
          </div>
        )}
      </section>

      {/* 3. Table Component */}
      <section className="section">
        <h2>3. Table Component</h2>
        <p className="section-description">
          Product information displayed in a reusable, striped table.
        </p>

        <Table
          columns={columns}
          data={products}
          striped={true}
        />
      </section>

      <footer className="app-footer">
        <p>React Course — Assignment 2 | Reusable Components</p>
      </footer>
    </main>
  );
}
