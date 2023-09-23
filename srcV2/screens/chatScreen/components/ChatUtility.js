import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {useTraceUpdate} from '../../../utils/utility';

export function ChatSenderName(senderId) {
  const userInfoState = useSelector(state => state.userInfoReducer);
  const orgState = useSelector(state => state.orgsReducer);

  const senderName = useMemo(() => {
    if (senderId === userInfoState?.user?.id) {
      return 'You';
    } else if (orgState?.userIdAndDisplayNameMapping[senderId]) {
      return orgState?.userIdAndDisplayNameMapping[senderId];
    } else {
      return orgState?.userIdAndNameMapping[senderId];
    }
  }, [senderId, orgState]);
  return senderName;
}
