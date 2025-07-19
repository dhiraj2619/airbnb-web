import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/actions/CategoryAction";
import HostingSteps from "../HostingSteps";
import { BeatLoader } from "react-spinners";

const Category = ({ onNext, onBack, currentStep }) => {
  const { categories } = useSelector((state) => state.categories);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingBack, setLoadingBack] = useState(false);

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
        dispatch(fetchCategories());

    const storedSpecialityId = localStorage.getItem("categoryId");
    if (storedSpecialityId) {
      setSelectedCategoryId(storedSpecialityId);
    }
  }, [dispatch]);

  const handleSelect = (id) => {
    setSelectedCategoryId(id);
    localStorage.setItem("categoryId", id);
  };

  const handleClickNext = () => {
    if (!selectedCategoryId || loading) return;
    setLoading(true);

    setTimeout(() => {
      onNext();
      setLoading(false);
    }, 2000);
  };

  const handleClickBack = () => {
    if (loading) return;
    setLoadingBack(true);

    setTimeout(() => {
      onBack();
      setLoadingBack(false);
    }, 1200);
  };

  return (
    <section className="" style={{ height: "520px" }}>
      <div className="container-fluid h-100">
        <div className="row justify-content-center  h-100">
          <span className="fw-semibold text-center text-dark fs-2">
            Select Speciality of Place
          </span>
          <div className="col-lg-7">
            <div className="row g-3">
              {categories.map((cat) => (
                <div className="col-lg-3" key={cat._id}>
                  <div
                    className={`card rounded-4 ${
                      selectedCategoryId === cat._id ? "border-tight" : ""
                    }`}
                    onClick={() => handleSelect(cat._id)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card-body d-flex flex-column align-items-center justify-content-center">
                      <img
                        src={cat.thumbnail?.url}
                        className="img-fluid"
                        width={60}
                        alt=""
                      />

                      <div className="property-text">
                        <h6 className="card-title mt-3">{cat.name}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <HostingSteps currentStep={currentStep} />
      <div className="d-flex justify-content-between pt-3 px-4 ">
        <button
          className="btn text-dark fs-xlg btn-link px-5 py-2"
          onClick={handleClickBack}
          disabled={loadingBack}
          style={{ backgroundColor: loadingBack ? "#e2dbdbff" : "" }}
        >
          {loadingBack ? <BeatLoader size={8} color="#010101" /> : "Back"}
        </button>
        <button
          className="btn btn-dark fs-xlg px-4 py-2"
          disabled={!selectedCategoryId || loading}
          onClick={handleClickNext}
          style={{ backgroundColor: loading ? "#313131c4" : "" }}
        >
          {loading ? <BeatLoader size={8} color="#ffffff" /> : "Next"}
        </button>
      </div>
    </section>
  );
};

export default Category;
