export const QUEST_UPDATED = 'QUEST_UPDATED';

export const questUpdated = (quest) => {
  return {
    type: QUEST_UPDATED,
    quest
  };
};
