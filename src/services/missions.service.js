import { store } from '../store';
import { missionsUpdated } from '../actions/missions-updated.action';

class MissionsService {
  constructor(store) {
    this.store = store;
  }

  updateMission(allMissions, updatedMission) {
    let missions = allMissions.map((m) => {
      if (m.missionId === updatedMission.missionId) {
        return updatedMission;
      }

      return m;
    });

    this.store.dispatch(missionsUpdated(missions));
  }

  createMission(allMissions, newMission) {
    let missionId = 1;
    if (allMissions.length) {
      let missionIds = allMissions.map((m) => m.missionId);
      let maxMissionId = Math.max(...missionIds);
      missionId = maxMissionId + 1;
    }

    let missions = [...allMissions, { ...newMission, missionId }];
    this.store.dispatch(missionsUpdated(missions));
  }
}

export default new MissionsService(store);
