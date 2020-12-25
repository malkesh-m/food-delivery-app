import React from 'react';
import {useNavigation} from '@react-navigation/native';
import unescape from 'lodash/unescape';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Image, Text, ThemedView} from 'src/components';
import InfoViewer from './InfoViewer';

import {padding, margin, borderRadius} from 'src/components/config/spacing';
import {timeAgo} from 'src/utils/time';
import {mainStack} from 'src/config/navigator';

const ItemBlogRow = ({item, width, height, style, tz}) => {
  const navigation = useNavigation();
  if (!item || typeof item !== 'object') {
    return null;
  }
  return (
    <TouchableOpacity
      style={[{width}, style && style]}
      onPress={() => navigation.navigate(mainStack.blog_detail, {blog: item})}>
      <ThemedView colorSecondary style={styles.content}>
        <Image
          source={
            item.rnlab_featured_media_url
              ? {uri: item.rnlab_featured_media_url}
              : require('src/assets/images/pDefault.png')
          }
          style={{width, height}}
          resizeMode="cover"
        />
        <View style={styles.viewInfo}>
          <Text h4 medium style={styles.name} numberOfLines={2}>
            {unescape(item.title.rendered)}
          </Text>
          <View>
            <Text h6 colorThird style={styles.time}>
              {timeAgo(item.date, tz)}
            </Text>
            <InfoViewer
              categories={item._categories}
              urlUser={item.author_url}
            />
          </View>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
  content: {
    flex: 1,
    borderRadius: borderRadius.base,
    overflow: 'hidden',
  },
  viewInfo: {
    padding: padding.large,
    justifyContent: 'space-between',
  },
  name: {
    marginBottom: margin.small - 2,
  },
  time: {
    marginBottom: margin.small,
  },
});
ItemBlogRow.defaultProps = {
  width: 223,
  height: 183,
};

export default ItemBlogRow;
