import React, { useState, useEffect } from "react";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function Data() {
  const [fetch, setFetch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Search, setSearch] = useState("");
  const [Sort, setSort] = useState("");
  const [RatingVal, setRatingVal] = useState(0);

  async function fetchData() {
    const res = await axios.get("https://fakestoreapi.com/products");
    setFetch(res.data);
    setLoading(false);
    console.log(res.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const Filter = fetch.filter((item) => {
    return (
      item.title?.toLowerCase().includes(Search?.toLowerCase() || "") ||
      item.description?.toLowerCase().includes(Search?.toLowerCase() || "") ||
      item.category?.toLowerCase().includes(Search?.toLowerCase() || "")
    );
  });

  const Sorttest = () => {
    if (Sort == "a") {
      return [...Filter].sort((a, b) => a.price - b.price);
    }
    if (Sort == "b") {
      return [...Filter].sort((a, b) => b.price - a.price);
    }
    return Filter;
  };

  const Rating = ()=>{
    if(RatingVal == 1){
      return 
    }
  }

  return (
    <div className="main">
      <input type="search" onInput={(e) => setSearch(e.target.value)} />
      <button onClick={() => setSort("a")}>Low to high</button>
      <button onClick={() => setSort("b")}>High to low</button>
      <label for="Rating">Rating:</label>
      <select name="Rating" id="Rating">
        <option value="1">1.0 and above</option>
        <option value="2">2.0 and above</option>
        <option value="3">3.0 and above</option>
        <option value="4">4.0 and above</option>
        <option value="5">5.0 and above</option>
      </select>
      <div className="row">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          Sorttest() &&
          Sorttest().map((item, i) => (
            <div className="card" key={i} style={{ width: "20rem" }}>
              <LazyLoadImage
                src={item.image}
                effect="blur"
                className="card-img-top"
                alt="..."
                height={300}
                // width={200}
              />

              {/* <img src={item.image} className="card-img-top" alt="..." height={300} width={200} /> */}

              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <h3>$ {item.price}</h3>
                <h6>Rating: {item.rating.rate}</h6>
                <p className="card-text">{item.description}</p>
                {/* <a href="#" className="btn btn-primary">
                Go somewhere
                </a> */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Data;
