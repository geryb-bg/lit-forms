export const MISSIONS_UPDATED = 'MISSIONS_UPDATED';

export const missionsUpdated = (missions) => {
  return {
    type: MISSIONS_UPDATED,
    missions
  };
};
