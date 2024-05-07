import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import AdminButton from "./AdminButton";
import Header from "./Header";
import VenueReducer from "../services/VenueReducer";
import VenueDataService from "../services/VenueDataService";
import useIdle from "./UseIdleTimer";
import { jwtDecode } from "jwt-decode";
//jwt war mı yok mu dışında jwt doğru bir jwt mi
function AddUpdateVenue() {
  const { id } = useParams();
  let navigate = useNavigate();
  let token=sessionStorage.getItem("token");
  const [venue, dispatchVenues] = React.useReducer(VenueReducer, {
    data: [],
    isLoading: false,
    isSuccess: false,
    isVenueAddedUpdated: false,
    isError: false,
  });
  useIdle({idleTime: 1 });
  React.useEffect(() => {
    if (id) {
      dispatchVenues({ type: "FETCH_INIT" });
    try {
       VenueDataService.getVenue(id).then((result) => {
          dispatchVenues({
            type: "FETCH_SUCCESS",
            payload: result.data,
          });
        });
      } catch {
        dispatchVenues({ type: "FETCH_FAILURE" });
      }
    }
  }, []);
  const performClick = (evt) => {
    evt.preventDefault();
    var [open1, close1] = evt.target.elements.openclose1.value.split(",");
    var [open2, close2] = evt.target.elements.openclose2.value.split(",");
    var [lat, long] = evt.target.elements.coordinates.value.split(",");
    var incomingVenue = {
      name: evt.target.elements.name.value,
      address: evt.target.elements.address.value,
      foodanddrink: evt.target.elements.foodanddrink.value,
      lat: lat,
      long: long,
      day1: evt.target.elements.day1.value,
      open1: open1,
      close1: close1,
      isClosed1: true,
      day2: evt.target.elements.day2.value,
      open2: open2,
      close2: close2,
      isClosed2: true,
    };
    let isValid = true;
    Array.from(evt.target.elements).every((input) => {
      if (input.value == "" && input.type == "text") {
        isValid = false;
        dispatchVenues({ type: "ADD_UPDATE_VENUE_FAILURE" });
        return false;
      }
    });
    if (isValid) {
      if (!id) {
        VenueDataService.addVenue(incomingVenue,token)
          .then(() => {
            dispatchVenues({ type: "ADD_UPDATE_VENUE_SUCCESS" });
            return navigate("/admin",{ replace: true });
          })
          .catch(() => {
            dispatchVenues({ type: "ADD_UPDATE_VENUE_FAILURE" });
          });
      } else {
        VenueDataService.updateVenue(id, incomingVenue,token)
          .then(() => {
            dispatchVenues({ type: "ADD_UPDATE_VENUE_SUCCESS" });
            return navigate("/admin");
          })
          .catch(() => dispatchVenues({ type: "ADD_UPDATE_VENUE_FAILURE" }));
      }
    }
  };
  return (
    <>
      {!id ? (
        <Header headerText="Yönetici" motto="Yeni mekan ekleyin!" />
      ) : venue.isSuccess ? (
        <Header
          headerText="Yönetici"
          motto={venue.data.name + " mekanını güncelleyin!"}
        />
      ) : (
        <Header headerText="Yönetici" />
      )}
      {venue.isError && (
        <>
          <div className="error-header">
            {" "}
            <b>TÜM ALANLAR ZORUNLUDUR!</b>
          </div>
        </>
      )}
      <div className="col-xs-12 col-md-6">
        <form className="form-horizontal" id="addVenue" onSubmit={performClick}>
          <div className="form-group">
            <label className="col-xs-10 col-sm-2 control-label">Ad:</label>
            <div className="col-xs-12 col-sm-10">
              <input
                className="form-control"
                name="name"
                defaultValue={venue.data.name ? venue.data.name : ""}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-xs-10 col-sm-2 control-label">Adres:</label>
            <div className="col-xs-12 col-sm-10">
              <input
                className="form-control"
                name="address"
                defaultValue={venue.data.address ? venue.data.address : ""}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-xs-10 col-sm-2 control-label">
              İmkanlar:
            </label>
            <div className="col-xs-12 col-sm-10">
              <input
                className="form-control"
                name="foodanddrink"
                defaultValue={
                  venue.data.foodanddrink ? venue.data.foodanddrink : ""
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-xs-10 col-sm-2 control-label">
              Enlem & Boylam:
            </label>
            <div className="col-xs-12 col-sm-10">
              <input
                className="form-control"
                name="coordinates"
                defaultValue={
                  venue.data.coordinates
                    ? venue.data.coordinates[0] +
                      "," +
                      venue.data.coordinates[1]
                    : ""
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-xs-10 col-sm-2 control-label">
              Günler-1:
            </label>
            <div className="col-xs-12 col-sm-10">
              <input
                className="form-control"
                name="day1"
                defaultValue={venue.data.hours ? venue.data.hours[0].days : ""}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-xs-10 col-sm-2 control-label">
              Açılış & Kapanış-1:
            </label>
            <div className="col-xs-12 col-sm-10">
              <input
                className="form-control"
                name="openclose1"
                defaultValue={
                  venue.data.hours
                    ? venue.data.hours[0].open + "," + venue.data.hours[0].close
                    : ""
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-xs-10 col-sm-2 control-label">
              Günler-2:
            </label>
            <div className="col-xs-12 col-sm-10">
              <input
                className="form-control"
                name="day2"
                defaultValue={venue.data.hours ? venue.data.hours[1].days : ""}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-xs-10 col-sm-2 control-label">
              Açılış & Kapanış-2:
            </label>
            <div className="col-xs-12 col-sm-10">
              <input
                className="form-control"
                name="openclose2"
                defaultValue={
                  venue.data.hours
                    ? venue.data.hours[1].open + "," + venue.data.hours[1].close
                    : ""
                }
              />
            </div>
          </div>
          {venue.data.name ? (
            <AdminButton name="Güncelle" type="primary" />
          ) : (
            <AdminButton name="Ekle" type="primary" />
          )}
        </form>
      </div>
    </>
  );
}

export default AddUpdateVenue;
