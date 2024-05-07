import http from "./http-common";

class VenueDataService {
  listAllVenues(token) {
    return http.get("/admin", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  nearbyVenues(lat, long) {
    return http.get(`/venues?lat=${lat}&long=${long}`);
  }

  getVenue(id) {
    return http.get(`venues/${id}`);
  }

  addVenue(data,token) {
    return http.post("/venues", data,{
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  updateVenue(id, data,token) {
    return http.put(`/venues/${id}`, data,{
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  removeVenue(id,token) {
    return http.delete(`/venues/${id}`,{
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  login(data) {
    return http.post("/login", data);
  }

  signup(data) {
    return http.post("/signup", data);
  }
  deleteAllVenues(token) {
    return http.delete("/venues",{
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  getComment(venueID, commentID) {
    return http.get(`/venues/${venueID}/comments/${commentID}`);
  }
  updateComment(venueID, commentID, data,token) {
    return http.put(`/venues/${venueID}/comments/${commentID}`, data,{
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  addComment(venueID, data, token) {
    return http.post(`/venues/${venueID}/comments`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  removeComment(venueID, commentID,token) {
    return http.delete(`/venues/${venueID}/comments/${commentID}`,{
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default new VenueDataService();
