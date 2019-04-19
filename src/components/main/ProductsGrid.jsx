import React, { Component } from "react";
import styled from "styled-components";
import Header from "../secondary/Header";
import NavBar from "../secondary/NavBar";
import Footer from "../secondary/Footer";
import { Link } from "react-router-dom";
import UpButton from "../secondary/UpButton";
import Product from "../secondary/Product";
import Paginate from "../secondary/Paginate";

const url = "http://rmit.chickenkiller.com:8080/products";
export default class ProductsGrid extends Component {
  constructor() {
    super();
    this.state = {
      product: [],
      productTypes: [],
      pageOfItems: [],
      query: ""
    };
    this.onChangePage = this.onChangePage.bind(this);
    this.onOptionChange = this.onOptionChange.bind(this);
  }
  onOptionChange(e) {
    this.setState({
      query: e.target.value
    });
    if (e.target.value === "All") {
      fetch(url)
        .then(res => res.json())
        .then(json => {
          let data = json.filter(d => d._id !== "");
          this.setState({ product: data });
        });
    } else {
      fetch(
        `http://rmit.chickenkiller.com:8080/products/byType/${e.target.value}`
      )
        .then(res => res.json())
        .then(json => {
          let data = json.filter(d => d._id !== "");
          this.setState({ product: data });
        });
    }
  }
  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems, state: this.state });
  }
  fetchProduct() {
    fetch(url)
      .then(res => res.json())
      .then(json => {
        let data = json.filter(d => d._id !== "" && d.productType !=='' && d.price!=='');
        this.setState({ product: data });
      });
  }
  fetchProductType() {
    fetch("http://rmit.chickenkiller.com:8080/productTypes")
      .then(res => res.json())
      .then(json => {
        let data = json.filter(d => d._id !== "" &&d.name);
        this.setState({ productTypes: data })});
  }
  componentDidMount() {
    this.fetchProduct();
    this.fetchProductType();
  }
  render() {
    return (
      <ProductsGridWrapper>
        <Header />
        <NavBar />
        <div className="row bg-light">
          <div className="col-lg-4 text-muted">
            <p> ALL PRODUCTS </p>
          </div>
          <div className="col-lg-8 text-right">
            <Link to="/">
              <a className="text-muted">HOME</a>
            </Link>
            /
            <Link to="/productGridView">
              <a className="text-muted">ALL PRODUCTS</a>
            </Link>
          </div>
        </div>
        <div>
          <hr className="line-top" />
          <div className="row">
            <div class="form-group">
              <select
                class="form-control custom-select"
                onChange={this.onOptionChange}
              >
                <option selected value>
                  {" "}
                  -- Select an Option --{" "}
                </option>
                <option value="All"> All </option>
                {this.state.productTypes.map(item => (
                  <option value={item.name}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="views">
              <Link to="/productGridView">
                <button
                  className="btn text-muted grid-btn"
                  type="button"
                  data-toggle="tooltip"
                  title="Grid View"
                >
                  <i className="fas fa-th" />
                </button>
              </Link>
              <Link to="/productListView">
                <button
                  className="btn text-muted list-btn"
                  type="button"
                  data-toggle="tooltip"
                  title="List View"
                >
                  <i className="fas fa-list" />
                </button>
              </Link>
            </div>
          </div>
          <hr />
        </div>
        <div>
          <div className="row items">
            {this.state.pageOfItems.map(item => (
              <div key={item.id}>
                <Product
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  brand={item.brand}
                  imageUrl={item.imageUrl}
                  description={item.description}
                />
              </div>
            ))}
          </div>
          <div className="paginate">
            <Paginate
              items={this.state.product}
              onChangePage={this.onChangePage}
              query={this.state.query}
            />
          </div>
        </div>
        <UpButton />
        <Footer />
      </ProductsGridWrapper>
    );
  }
}
const ProductsGridWrapper = styled.div`
  .form-group select {
    width: 100%;
  }
  .form-group {
    margin-left: 50rem;
  }
  .items div {
    margin-top: 2rem;
    margin-left: 1.5rem;
  }
  .paginate {
    margin-top: 7rem;
  }
  .price-slider {
    margin-top: 0.6rem;
    padding-bottom: 1rem;
  }
  .grid-btn {
    color: #ff4c3b !important;
    background: transparent;
  }
  .list-btn {
    background: transparent;
  }
  .line-top {
    margin-top: 0;
  }
  .views {
    margin-left: 105rem;
    margin-top: -2.2rem;
  }
  .col-lg-4 {
    padding-top: 2rem;
    padding-bottom: 1rem;
    padding-left: 4rem;
  }
  .col-lg-8 {
    padding-top: 2rem;
    padding-bottom: 1rem;
    padding-right: 4rem;
  }
  .col-lg-8 a {
    margin-left: 0.2rem;
    margin-right: 0.2rem;
  }
  .items {
    min-height: 35rem;
  }
  .row {
    padding-left: 4rem;
    padding-right: 4rem;
  }
  select:focus {
    border-color: #ff4c3b !important;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px #ff4c3b !important;
    outline: 0 none;
  }
`;
