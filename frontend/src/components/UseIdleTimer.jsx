import { useIdleTimer } from "react-idle-timer";
import { useNavigate } from "react-router-dom";
export default function useIdle({idleTime }) {
  var navigate = useNavigate();
  const handleOnIdle = () => {
    sessionStorage.clear();
    return navigate("/login");
  };
  const {getRemainingTime, getLastActiveTime} = useIdleTimer({
    timeout: 1000 * 10 * idleTime,
    onIdle: handleOnIdle,
    debounce: 500
})

return {
    getRemainingTime,
    getLastActiveTime
}
}
  
