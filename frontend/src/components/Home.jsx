import InputWithLabel from "./InputWithLabel";
import VenueList from "./VenueList";
import VenueReducer from "../services/VenueReducer";
import Header from "./Header";
import React from "react";
import VenueDataService from "../services/VenueDataService";
const useCookies = (key, defaultValue) => {
  const [cookie, setCookie] = React.useState(
    localStorage.getItem(key) || defaultValue
  );
  React.useEffect(() => {
    localStorage.setItem(key, cookie);
  }, [cookie, key]);
  return [cookie, setCookie];
};

const Home = () => {
  const [searchVenue, setSearchVenue] = useCookies("searchVenue", "");
  const [coordinate, setCoordinate] = React.useState({ lat: 1, long: 1 });
  const [venues, dispatchVenues] = React.useReducer(VenueReducer, {
    data: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
  });
  const search = (event) => {
    setSearchVenue(event.target.value);
  };
  React.useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setCoordinate({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      });
    }
  }, []);
  React.useEffect(() => {
    dispatchVenues({ type: "FETCH_INIT" });
    try {
      VenueDataService.nearbyVenues(coordinate.lat, coordinate.long).then(
        (result) => {
          dispatchVenues({
            type: "FETCH_SUCCESS",
            payload: result.data,
          });
        }
      );
    } catch {
      dispatchVenues({ type: "FETCH_FAILURE" });
    }
  }, [coordinate.lat, coordinate.long]);
  const filteredVenues = venues.data.filter(
    (venue) =>
      venue.name.toLowerCase().includes(searchVenue.toLowerCase()) ||
      venue.address.toLowerCase().includes(searchVenue.toLowerCase())
  );
  return (
    <div>
      <Header
        headerText="Mekanbul"
        motto="Civarınızdaki Mekanlarınızı Keşfedin!"
      />
      <InputWithLabel
        id="arama"
        label="Mekan Ara:"
        typ="text"
        isFocused
        onInputChange={search}
        value={searchVenue}
      />
      <hr />
      {venues.isError ? (
        <p>
          <strong>Birşeyler ters gitti! ...</strong>
        </p>
      ) : venues.isLoading ? (
        <p>
          <strong>Mekanlar Yükleniyor ...</strong>
        </p>
      ) : (
        venues.isSuccess && (
          <div className="row">
            <VenueList venues={filteredVenues} admin={false} />
          </div>
        )
      )}
    </div>
  );
};

export default Home;
