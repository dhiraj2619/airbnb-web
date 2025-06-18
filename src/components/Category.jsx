import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/actions/CategoryAction";

const Category = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="container d-flex flex-row align-items-center gap-5 py-3">
      {categories.length > 0 &&
        categories.map((category) => (
          <div className="property d-flex flex-column text-center px-2" key={category.id} style={{cursor: "pointer"}}>
            <div className="property-icon">
              <img
                src={category.thumbnail?.url}
                className="img-fluid"
                alt=""
              />
            </div>
            <span className="property-text fs-small">{category.name}</span>
          </div>
        ))}
    </div>
  );
};

export default Category;
