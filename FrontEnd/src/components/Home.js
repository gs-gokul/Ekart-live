import React from "react";
import { Fragment, useEffect, useState } from "react";
import MetaData from "./layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./layouts/loader";
import Product from "./product/Productss";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import { getProducts } from "../actions/productActions";
//import { useState } from "react";

export default function Home() {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState
  );

  const [currentPage, setCurrentPage] = useState(1);
  //const lastIndex = currentPage * resPerPage;
  //const firstIndex = lastIndex - resPerPage;
  //console.log(pageno);
  const setCurrentPageNo = (pageNo) => {
    console.log(pageNo);
    setCurrentPage(pageNo);
  };

  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
    dispatch(getProducts(null, null, null, null, currentPage));
  }, [error, dispatch, currentPage]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Buy Productss"} />
          <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <Product col={3} key={product._id} product={product} />
                ))}
            </div>
          </section>

          
          {productsCount > 0 && productsCount > resPerPage ? (
            <div className="d-flex justify-content-center empty mt-5">
              <Pagination
                activePage={currentPage}
                onChange={setCurrentPageNo}
                totalItemsCount={productsCount}
                itemsCountPerPage={resPerPage}
                nextPageText={"Next"}
                firstPageText={"First"}
                lastPageText={"Last"}
                linkClass={"page-link"}
                itemClass={"page-item"}
              ></Pagination>
            </div>
          ) : null}
        </Fragment>
      )}
    </Fragment>
  );
}
