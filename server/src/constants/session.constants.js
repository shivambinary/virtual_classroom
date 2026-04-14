export const SessionState = Object.freeze({
  SCHEDULED: "scheduled",
  LIVE: "live",
  UNSTABLE: "unstable",
  ENDED: "ended"
});


export const AllowedTransitions = {
  [SessionState.SCHEDULED]: [SessionState.LIVE],
  [SessionState.LIVE]: [SessionState.UNSTABLE, SessionState.ENDED],
  [SessionState.UNSTABLE]: [SessionState.LIVE, SessionState.ENDED],
  [SessionState.ENDED]: []
};


export const SESSION_TIMEOUT = 5 * 60 * 1000;