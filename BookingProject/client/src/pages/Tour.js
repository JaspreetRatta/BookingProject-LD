import { Col, message, Row, Card, Pagination } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import TourCard from "../components/TourCard";
const { Meta } = Card;

function Home() {
  const { user } = useSelector((state) => state.users);
  const [filters = {}, setFilters] = useState({});
  const dispatch = useDispatch();
  const [buses, setBuses] = useState([]);
  const getBuses = async () => {
    const tempFilters = {};
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        tempFilters[key] = filters[key];
      }
    });

    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/tour/list", tempFilters);
      dispatch(HideLoading());
      setBuses(response.data);
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const style = {
    padding: "40px 40px",
  };

  useEffect(() => {
    getBuses();
  }, []);


  const [currentPage, setCurrentPage] = useState(1);

  const cardsPerPage = 6;

  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;

  const currentCards = buses.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="my-3 py-1">
        <Row gutter={10} align="center">
          <Col lg={6} sm={24}>
            <select
              value={filters.from}
              onChange={(e) => setFilters({ ...filters, from: e.target.value })}
            >
              <option value="">From</option>
              {[...new Set(buses.map((bus) => bus.from))].map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </Col>
          <Col lg={6} sm={24}>
            <select
              value={filters.to}
              onChange={(e) => setFilters({ ...filters, to: e.target.value })}
            >
              <option value="">To</option>
              {[...new Set(buses.map((bus) => bus.to))].map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </Col>
          <Col lg={6} sm={24}>
            <input
              type="date"
              placeholder="Date"
              value={filters.journeyDate}
              onChange={(e) =>
                setFilters({ ...filters, journeyDate: e.target.value })
              }
            />
          </Col>
          <Col lg={6} sm={24}>
            <div className="d-flex gap-2">
              <button className="primary-btn" onClick={() => getBuses()}>
                Filter
              </button>
              <button
                className="outlined px-3"
                onClick={() =>
                  setFilters({
                    from: "",
                    to: "",
                    journeyDate: "",
                  })
                }
              >
                Clear
              </button>
            </div>
          </Col>
        </Row>
      </div>

      <div>
        
        <Row style={{display:"flex"}}>
          {currentCards.map((card) => (
              <Col style={style} lg={8} >
               <TourCard tour={card} id={card.id} />
               </Col>
          ))}
        </Row>

        <Pagination style={{display:"flex",justifyContent:"end",marginBottom:"20px"}}
          current={currentPage}
          total={buses.length}
          pageSize={cardsPerPage}
          onChange={handlePageChange}
        />
      </div>

    </div>
  );
}

export default Home;
