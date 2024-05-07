import { NavLink } from "react-router-dom";
import Rating from "./Rating";
import FoodAndDrinkList from "./FoodAndDrinkList";
import AdminButton from "./AdminButton";
import { formatDistance } from "../services/Utils";
import React from "react";
const Venue = ({ venue, admin, onClick }) => {
  const performClick = (evt) => {
    onClick(evt, venue._id);
  };
  return (
    <div className="list-group">
      <div className="col-xs-12 col-sm-12">
        <div className="col-xs-12 list-group-item">
          <h4>
            <NavLink to={`/venue/${venue._id}`}>{venue.name} </NavLink>
            <Rating rating={venue.rating} />
          </h4>
          <span className="span badge pull-right badge-default">
            {!admin ? formatDistance(venue.distance) : ""}
          </span>
          {admin ? (
            <AdminButton type="primary" name="Sil" onClick={performClick} />
          ) : (
            ""
          )}
          {admin ? (
            <AdminButton type="info" name="Güncelle" onClick={performClick} />
          ) : (
            ""
          )}
          <p className="address"> {venue.address}</p>
          
            <FoodAndDrinkList foodAndDrinkList={venue.foodanddrink} />
         
        </div>
      </div>
    </div>
  );
};
export default Venue;
