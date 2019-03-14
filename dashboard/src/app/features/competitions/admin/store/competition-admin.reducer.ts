import { CompetitionAdminActions, CompetitionsAdminActionTypes } from "./competition-admin.actions";

export interface State {

}

export const initialState: State = {

};

export function reducer(state = initialState, action: CompetitionAdminActions): State {
  switch (action.type) {
    case CompetitionsAdminActionTypes.LoadCompetitionsAdmin:
      return state;

    default:
      return state;
  }
}
