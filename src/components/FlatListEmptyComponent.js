import React from 'react';
import { View, Text } from 'react-native';
import * as colors from '../../assets/styles/colors';
//import localization from '../constants/localization';

export default FlatListEmptyComponent = (props) => {
  return (
    (props.loading) ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* <Loader /> */}
      </View>
    ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 12, color: colors.FONT_GRAY_COLOR }}>{/* localization.there_are_no_item */}There are no items {props.text}</Text>
          <Text style={{ fontSize: 11, color: colors.FONT_GRAY_COLOR }}>{/* localization.check_back_later */}Please check back later</Text>
        </View>
      )
  );
}