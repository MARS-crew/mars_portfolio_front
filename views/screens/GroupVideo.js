import {React, useState, useEffect} from 'react';
import {StyleSheet, View, FlatList, SafeAreaView} from 'react-native';
import axios from 'axios';

import GroupVideoItem from '../components/GroupVideoItem';
import FAB from '../components/FloatingMenu';

const VideoItem = ({id, src, medal}) => (
  <View>
    <GroupVideoItem id={id} src={src} medal={medal} />
  </View>
);

const GroupVideo = () => {
  const [data, setData] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: 'https://f771-121-133-53-56.ngrok-free.app/api/v1/interview/',
        headers: {
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InNuc19pZCI6MjEsIm1lbWJlcl9pZCI6NDcsInR5cGUiOiJnb29nbGUiLCJuYW1lIjoi7J207IS47KeEIiwiYWNjZXNzX3Rva2VuIjoieWEyOS5hMEFmQl9ieUQxTDZkWGhwNEtIbXNEcHRERGxDN2tScXN2bGh1akhuSnhXSWNsTjUtMEJ1VlpJTWpNSk1ILWZIWnZLQlNKMmpDZktZek04enJFQTNpbFZlT0s2VGN2d01qdTg3MHYwX1hOeUF4aUdqaTJzV0huSlZRX1pITTc2UE9xdHNSNGtHcGwzcWhDNFdvY1NGNTNURGF6bVZ2R2p5ZEgzQlIzYUNnWUtBYUFTQVJNU0ZRSEdYMk1pZU5RT2pUemxGdGJTa2d5RHlxX2lIZzAxNzEiLCJyZWZyZXNoX3Rva2VuIjpudWxsLCJhdXRoX2NvZGUiOm51bGwsImNvbm5lY3RfZGF0ZSI6IjIwMjMtMTEtMDhUMjI6MTU6MjMuMDAwWiJ9LCJpYXQiOjE3MDA2MzIyNDgsImV4cCI6MTcwMDYzNTg0OH0.KSWbbuuYS0TslpRWx8KIrL7zmcg42zzKWfGVWBCaups',
        },
      });

      console.log(response.data);
      const extractedData = response.data.data.map(item => ({
        id: item.member_id, //멤버 아이디
        url: item.url, //인터뷰
      }));
      setData(extractedData);

      console.log(extractedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(data);
    fetchData();
  }, [data]);
  return (
    <SafeAreaView style={styles.containbox}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <VideoItem id={item.id} src={item.url} medal={item.medal} />
        )}
        numColumns={2}
      />
      <FAB />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containbox: {
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    width: 40,
    height: 20,
    position: 'absolute',
  },
  container: {
    backgroundColor: 'white',
  },
  manyRow: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default GroupVideo;
