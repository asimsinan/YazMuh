import Header from "./Header";
import VenueList from "./VenueList";
import VenueReducer from "../services/VenueReducer";
import { useReducer, useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import useIdle from "./UseIdleTimer";
//Kullanıcı menüsü
//Şifremi unuttum, mail, şifre yenile
import VenueDataService from "../services/VenueDataService";

function Admin() {
  var navigate = useNavigate();
  let token = sessionStorage.getItem("token");
  const [remaining, setRemaining] = useState(100);
  const [venues, dispatchVenues] = useReducer(VenueReducer, {
    data: [],
    user: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    isDeleted: false,
  });
  const { getRemainingTime }=useIdle({ idleTime: 10 });
  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime() / 1000))
    },1000)

    return () => {
      clearInterval(interval)
    }
  })

  function handleClick(evt, id) {
    evt.preventDefault();
    if (evt.target.name === "Sil") {
      VenueDataService.removeVenue(id, token)
        .then(() => {
          dispatchVenues({ type: "REMOVE_VENUE_SUCCESS" });
        })
        .catch(() => dispatchVenues({ type: "REMOVE_VENUE_FAILURE" }));
    } else if (evt.target.name === "Mekan Ekle") {
      return navigate("/admin/addupdate/venue/new");
    } else if (evt.target.name === "Güncelle") {
      return navigate(`/admin/addupdate/venue/${id}`);
    }
  }
  useEffect(() => {

      dispatchVenues({ type: "FETCH_INIT" });
      VenueDataService.listAllVenues(token)
        .then((result) => {
          dispatchVenues({
            type: "FETCH_SUCCESS",
            payload: result.data,
          });
        })
        .catch(() => {
          dispatchVenues({ type: "FETCH_FAILURE" });
        });
  }, [venues.isDeleted]);

  return (
    <>
      <Header headerText="Yönetici" motto={"Mekanlarınızı Yönetin! ( "+remaining+" sn)" }/>
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
            <VenueList
              venues={venues.data}
              admin={true}
              onClick={handleClick}
            />
          </div>
        )
      )}
    </>
  );
}

export default Admin;