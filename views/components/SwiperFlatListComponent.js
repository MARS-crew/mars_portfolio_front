import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";

const SwiperFlatListComponent = ({ data, renderItem }) => {
  const ITEM_HEIGHT = 100;
  const [pageIndex, setPageIndex] = useState(0);

  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const newIndex = Math.floor(offsetY / ITEM_HEIGHT);
    setPageIndex(newIndex);
  };

  return (
    <SafeAreaView style={StyleSheet.container}>
      <SwiperFlatList
        vertical={true}
        data={data}
        renderItem={renderItem}
        index={pageIndex}
        onIndexChange={setPageIndex}
        hideShadow={true}
        onScroll={handleScroll}
      />
    </SafeAreaView>
  );

}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});


export default SwiperFlatListComponent;
