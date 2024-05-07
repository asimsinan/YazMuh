const VenueReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_INIT":
      return {
        ...state,
        isLoggedIn: false,
        isError: false,
      };
    case "ADD_COMMENT_SUCCESS":
      return {
        ...state,
        isSuccess: true,
      };
      case "ADD_COMMENT_FAILURE":
        return {
          ...state,
          isSuccess: false,
          isError:true
        };
    case "ADD_UPDATE_VENUE_SUCCESS":
      return {
        ...state,
        isVenueAddedUpdated: true,
        isError:false
      };
    case "ADD_UPDATE_VENUE_FAILURE":
      return {
        ...state,
        isVenueAddedUpdated: false,
        isError:true
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        isError: false,
      };
      case "SIGNUP_SUCCESS":
        return {
          ...state,
          isSignedUp: true,
          user: action.payload,
          isError: false,
        };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isSignedUp: false,
        isError: true,
      };
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isDeleted:false
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isError: false,
        isLoading: false,
        isSuccess: true,
        data: action.payload,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
      };
    case "REMOVE_VENUE_SUCCESS":
      return {
        ...state,
        isDeleted:true
      };
      case "REMOVE_VENUE_FAILURE":
        return {
          ...state,
          isDeleted:false
        };
    default:
      throw new Error("Hata");
  }
};
export default VenueReducer;
