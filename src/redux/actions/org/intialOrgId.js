import * as Actions from '../../Enums';
export function setCurrentOrgId(accessToken, orgId, userId, userName, text) {
  return {
    type: Actions.SELECT_CURRENT_ORG_ID,
    accessToken: accessToken,
    orgId: orgId,
    userId,
    userName,
  };
}
