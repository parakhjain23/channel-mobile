import React, {useMemo} from 'react';
import {FlatList, TouchableOpacity, View, Text, Image} from 'react-native';
import {ACTIVITIES} from '../../../../constants/Constants';
import {useTheme} from '@react-navigation/native';
import {makeStyles} from './ActivityList-Style';

interface Activity {
  name: string;
  desc: string;
}

interface ActivityListProps {
  setaction: (action: string) => void;
  onChangeMessage: (prevMessage: any) => string;
  setActivities: (activities: boolean) => void;
}

const ActivityList: React.FC<ActivityListProps> = ({
  setaction,
  onChangeMessage,
  setActivities,
}) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  const handleActionSelect = (action: string) => {
    setaction(action);
    onChangeMessage((prevMessage: any) => {
      const regex = new RegExp(`/\\w*\\s?$`);
      const replacement = `/${action} `;
      return prevMessage.replace(regex, replacement);
    });
    setActivities(false);
  };

  const renderActions = useMemo(
    () =>
      ({item, index}: {item: Activity; index: number}) =>
        (
          <TouchableOpacity
            onPress={() => handleActionSelect(item?.name)}
            key={index}
            activeOpacity={0.9}>
            <View style={styles.container}>
              <Image
                source={require('../../../assests/images/appIcon/icon48size.png')}
                style={styles.appIcon}
              />
              <View>
                <Text style={styles.title}>{item?.name}</Text>
                <Text style={styles.description}>{item?.desc}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ),
    [handleActionSelect, styles],
  );

  return (
    <FlatList
      data={ACTIVITIES}
      renderItem={renderActions}
      style={styles.mentionsList}
      keyboardShouldPersistTaps="always"
    />
  );
};

export default ActivityList;
