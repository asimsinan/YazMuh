import Venue from "./Venue";
import AdminButton from "./AdminButton";
import React from "react";
const VenueList = ({ venues, admin, onClick }) => {
  const performClick = (evt, id) => {
    onClick(evt, id);
  };
  return (
    <div>
      {venues.map((venue, index) => (
        <Venue key={index} venue={venue} admin={admin} onClick={performClick} />
      ))}

      {admin ? (
        <div className="col-xs-12 col-sm-12">
          <div className="row">
            <div className="column pull-right">
              <AdminButton
                name="Mekan Ekle"
                type="success"
                onClick={performClick}
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default VenueList;
