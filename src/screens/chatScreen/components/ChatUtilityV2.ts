import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {$ReduxCoreType} from '../../../types/reduxCoreType';
import {useCustomSelector} from '../../../utils/deepCheckSelector';

export function ChatSenderNameV2(senderId: string) {
  const {currentUser, userInfo} = useCustomSelector(
    (state: $ReduxCoreType) => ({
      currentUser: state.allUsers.currentUser,
      userInfo: state.allUsers.userIdAndDataMapping[senderId],
    }),
  );

  const senderName = useMemo(() => {
    if (senderId === currentUser?.id) {
      return 'You';
    } else if (userInfo?.displayName) {
      return userInfo?.displayName;
    } else {
      return userInfo?.firstName;
    }
  }, [senderId]);
  return senderName;
}
