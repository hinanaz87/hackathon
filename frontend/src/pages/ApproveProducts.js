import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";

const ApproveProducts = () => {
  const [id, setId] = useState("");
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  // const {id} = useParams();

  function fetchProducts() {
    axios({
      method: "GET",
      url: "https://odd-gold-squid-robe.cyclic.app/searchproducts",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log("this-----------" + res.data);
      setProducts(res.data);
    });
  }

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("details"));
    // const isUser = JSON.parse(localStorage.getItem("isUser"));

    if (
      userDetails.role == "seller" ||
      userDetails.role == "buyer" ||
      userDetails.role == null ||
      userDetails.role == undefined
    ) {
      navigate("/");
      alert("You are not authorized to visit this page");
    }

    setId(userDetails.userId);

    fetchProducts();
  }, []);

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-2">
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => navigate("/adminpage")}
            >
              Visit Home
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row ">
          <table className="table table-striped table-hover table-responsive mt-5">
            <thead>
              <tr
                style={{
                  backgroundColor: "lightgray",
                  color: "#016EB3",
                  fontSize: "18px",
                  fontWeight: "500",
                  height: "50px",
                  textAlign: "center",
                }}
              >
                <th scope="col">Sr#</th>
                <th scope="col">Product Image</th>
                <th scope="col">Product Name</th>
                <th scope="col">Product Description</th>
                <th scope="col">Currency Code</th>
                <th scope="col">Product Price</th>
                <th scope="col">isApproved</th>
                <th scope="col">Shop Name</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>

            {products.map((product, ind) => {
              return (
                <>
                  <tr
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      height: "50px",
                      textAlign: "center",
                    }}
                  >
                    <td>{ind + 1}</td>
                    <td>
                      <img
                        src={product.productImage}
                        style={{ width: "150px" }}
                      />{" "}
                    </td>
                    <td>{product.productName}</td>
                    <td>{product.productDescription}</td>
                    <td>{product.currencyCode}</td>
                    <td>{product.productPrice}</td>
                    <td>{product.isApproved == true ? "True" : "False"}</td>
                    <td>{product.shopName}</td>

                    <td>
                      <Link
                        to={`/product/${product._id}`}
                        class="btn btn-outline-primary"
                      >
                        Change Status
                      </Link>
                    </td>
                    <td>
                      <BsFillTrashFill
                        style={{ color: "red", fontSize: "40" }}
                      />
                    </td>
                  </tr>
                </>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
};

export default ApproveProducts;
