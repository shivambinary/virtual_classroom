import { handleSessionTimeout } from "../services/session.service.js";

export const startSessionMonitor = () => {

  setInterval(async () => {
    await handleSessionTimeout();
  }, 10000); 

};