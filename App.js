import React, {useState, useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions, FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LogBox } from 'react-native';
import Splash from './views/screens/splash';
import Login from './views/screens/Login';
import Resume from './views/screens/ResumeContents';
import Portfolio from './views/screens/Portfolio/Portfolio';
import Review from './views/screens/Review/Review';
import MyPage from './views/screens/MyPage/MyPage';
import Album from './views/screens/Album';
import Interview from './views/screens/Interview';
import 'react-native-gesture-handler';
import WhichGroup from './views/screens/WhichGroup';
import Help from './views/screens/Help';
import Share from './views/screens/Share';

import GroupVideo from './views/screens/GroupVideo';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import AppContext from './AppContext`';
import {MyProvider} from './MyContext';
import {IndexProvider, useIndexContext} from './IndexContext';
import {UserInfoProvider, useUserInfo} from './UserInfoContext';
import {LoadingProvider, useLoadingContext} from './LoadingContext';
import Logout from './views/screens/Logout';
import LoginGo from './views/screens/LoginGo';
import Loading from './views/screens/Loading';
import {Provider, useDispatch, useSelector} from "react-redux";
import {Store} from "./redux/Store";
import type {RootState} from "./redux/RootReducer";
import {
  getCurrentGroupIdSelector,
  getScreenTypeSelector,
  isSplashSelector,
  setCurrentGroupId, setCurrentGroupIdRx,
  setScreenType, setScreenTypeRx,
  setSplashOnOff, setSplashOnOffRx
} from "./redux/slice/UiRenderSlice";
import SwiperFlatList from "react-native-swiper-flatlist";
import {userTokenSelector} from "./redux/slice/UserInfoSlice";
import {getGroupImagesAsync} from "./redux/slice/GroupImgSlice";
import {SCREEN_1, SCREEN_2, SCREEN_3, SCREEN_4, SCREEN_5, SCREEN_6, SCREEN_7, SCREEN_TYPES} from "./AppConst";
import {getInterviewsAsync} from "./redux/slice/InterviewSlice";
import {getPortfoliosAsync} from "./redux/slice/PortfolioSlice";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const xOffset = new Animated.Value(0);



const Screen = props => {
  return (
    <View style={styles.scrollPage}>
      <Animated.View style={[styles.screen, transitionAnimation(props.index)]}>
        {props.children}
      </Animated.View>
    </View>
  );
};

const Stack = createStackNavigator();

const transitionAnimation = index => {
  return {
    transform: [
      {perspective: 800},
      {
        scale: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH,
          ],
          outputRange: [0.95, 1, 0.95],
        }),
      },
      {
        rotateX: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH,
          ],
          outputRange: ['0deg', '0deg', '0deg'], //x각도
        }),
      },
      {
        rotateY: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH,
          ],
          outputRange: ['35deg', '0deg', '-35deg'], //y각도
        }),
      },
    ],
  };
};

const App = () => {
  return (
      <Provider store={Store}>
    <IndexProvider>
      <UserInfoProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Help"
              component={Help}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Share"
              component={Share}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Album"
              component={Album}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Logout"
              component={Logout}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UserInfoProvider>
    </IndexProvider>
      </Provider>
  );
};





const HomeScreenOld = () => {
  const {token, id, name, email} = useUserInfo();
  const [modalOpen, setModalOpen] = useState(false);
  const {
    currentIndex,
    changeIndex,
    horizontalIndex,
    changeHorizontalIndex,
    dataIndex,
    changeDataIndex,
    selectedMemId,
    changeSelectedMemId,
    selectedGroupId,
  } = useIndexContext();

  const [oldIndex, setOldIndex] = useState(horizontalIndex);
  const horizontalScrollRef = useRef(null);

  const {loading, changeLoading} = useLoadingContext();

  const dispatch = useDispatch()
  const isSplash = useSelector(isSplashSelector);
  const [isSplashVisible, setIsSplashVisible] = useState(isSplash);

  useEffect(() => {
    setIsSplashVisible(isSplash)
  }, [isSplash]);

  useEffect(() => {
    let timer = setTimeout(() => {
      dispatch(setSplashOnOff(false));
      // setIsSplashVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);


  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications

  useEffect(() => {
    if (horizontalScrollRef.current) {
      horizontalScrollRef.current.scrollTo({
        x: horizontalIndex * SCREEN_WIDTH,
        animated: true,
      });
    }
  }, [horizontalIndex, horizontalScrollRef]);

  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;

    const newIndex = Math.round(offsetX / SCREEN_WIDTH);
    // 변경된 인덱스를 처리하는 함수 호출
    if (oldIndex !== newIndex) {
      changeHorizontalIndex(newIndex);
      setOldIndex(newIndex);
      console.log("newIndex: ", newIndex, ", oldIndex: ", oldIndex, ", horizontalIndex: ", horizontalIndex);
    }
  };
  return (
    <UserInfoProvider>
      <MyProvider>
        <LoadingProvider>
          <AnimatedScrollView
            ref={horizontalScrollRef}
            // scrollEventThrottle={300}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: xOffset}}}],
              {
                useNativeDriver: true,
                listener: handleScroll,
              },
            )}
            horizontal
            pagingEnabled
            style={styles.scrollView}>
            {token ? ( // 로그인 전이면 그룹 페이지만, 로그인 후면 전체 페이지
              <>
                {isSplashVisible === false ? (
                  <Screen text="Screen 1" index={0}>
                    <WhichGroup token={token} />
                  </Screen>
                ) : <Splash isSplashVisible={isSplashVisible}></Splash>}
                <Screen text="Screen 2" index={1}>
                  <GroupVideo token={token} />
                </Screen>
                <Screen text="Screen 3" index={2}>
                  <Interview token={token} />
                </Screen>
                <Screen text="Screen 4" index={3}>
                  <Portfolio token={token} options={{headerShown: false}} />
                </Screen>
                <Screen text="Screen 5" index={4}>
                  <Resume token={token} />
                </Screen>
                <Screen text="Screen 6" index={5}>
                  <Review token={token} currentUserId={id} />
                </Screen>
                <Screen text="Screen 7" index={6}>
                  <MyPage token={token} options={{headerShown: false}} />
                </Screen>
              </>
            ) : (
              <>
                {isSplashVisible === false ? (
                  <Screen text="Screen 0" index={0}>
                    <LoginGo token={token} />
                  </Screen>
                ) : <Splash isSplashVisible={isSplashVisible}></Splash>}
              </>
            )}
            {loading ? (
              <Modal
                transparent={true}
                visible={loading}
                onRequestClose={() => hideLoading()}>
                <View style={styles.loading}>
                  <Loading />
                </View>
              </Modal>
            ) : null}
          </AnimatedScrollView>
        </LoadingProvider>
      </MyProvider>
    </UserInfoProvider>
  );
};




const HomeScreen = () => {
  // const {token, id, name, email} = useUserInfo();
  const [modalOpen, setModalOpen] = useState(false);
  const {
    currentIndex,
    changeIndex,
    horizontalIndex,
    changeHorizontalIndex,
    dataIndex,
    changeDataIndex,
    selectedMemId,
    changeSelectedMemId,
    selectedGroupId,
  } = useIndexContext();

  const [oldIndex, setOldIndex] = useState(horizontalIndex);
  const horizontalScrollRef = useRef(null);

  const {loading, changeLoading} = useLoadingContext();

  const dispatch = useDispatch()
  const isSplash = useSelector(isSplashSelector);
  const _token = useSelector(userTokenSelector);
  const _screenType = useSelector(getScreenTypeSelector);
  const _currentGroupId = useSelector(getCurrentGroupIdSelector);

  const [isSplashVisible, setIsSplashVisible] = useState(isSplash);
  const [token, setToken] = useState(_token);
  const [topView, setTopView] = useState(null);
  const [bottomView, setBottomView] = useState(null);
  const [prevView, setPrevView] = useState(null);
  const [nextView, setNextView] = useState(null);
  const [mainView, setMainView] = useState(null);

  const [currentGroupId, setCurrentGroupId] = useState(_currentGroupId);
  const [screenType, setScreenType] = useState(_screenType);


  const swiperRef = useRef(null);


  useEffect(() => {
    setIsSplashVisible(isSplash)
  }, [isSplash]);

  useEffect(() => {
    setToken(_token)
  }, [_token]);

  useEffect(() => {
    setCurrentGroupId(_currentGroupId)
    setScreenType(_screenType)
    reloadViewData(_currentGroupId, _screenType)
        .then(res=>{

        })
  }, [_currentGroupId, _screenType]);

  // useEffect(() => {
  //   setScreenType(_screenType)
  //   reloadViewData(_currentGroupId, _screenType)
  // }, [_screenType]);

  useEffect(() => {
    let timer = setTimeout(() => {
      dispatch(setSplashOnOffRx(false));
    }, 5000);
    return () => clearTimeout(timer);
  }, []);


  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications

  useEffect(() => {
    if (horizontalScrollRef.current) {
      horizontalScrollRef.current.scrollTo({
        x: horizontalIndex * SCREEN_WIDTH,
        animated: true,
      });
    }
  }, [horizontalIndex, horizontalScrollRef]);

  useEffect(() => {
    dispatch(getGroupImagesAsync(token));
    dispatch(getInterviewsAsync(token));
    dispatch(getPortfoliosAsync(token));
  }, [token]);


  const verticalViewRenderer = function({ item, index }){

    console.log(`IDX=${index}, VIEW_TYPE : ${item.type}, POS: ${item.pos}`);
    if(item.type === SCREEN_1){
      return (<WhichGroup token={item.token} idx={item.index} />);
    }else if(item.type === SCREEN_2){
      return (<GroupVideo token={item.token} idx={item.index} />);
    }else if(item.type === SCREEN_3){
      return (<Interview token={item.token} idx={item.index} />);
    }else if(item.type === SCREEN_4){
      return (<Portfolio token={item.token} idx={item.index} />);
    }else if(item.type === SCREEN_5){
      return (<Resume token={item.token} idx={item.index} />);
    }else if(item.type === SCREEN_6){
      return (<Review token={item.token} idx={item.index} />);
    }else if(item.type === SCREEN_7){
      return (<MyPage token={item.token} idx={item.index} />);
    }
  };


  const reloadViewData = async function (idx, type) {
    console.log(`reloadView ${idx} : ${type}`);
    let main = (<></>)
    if(type === SCREEN_1) {
      setPrevView(null)

      let mainDataList = []
      if(idx === 0){
        mainDataList.push({
          token: token,
          type: SCREEN_1,
          index: idx,
          pos: 'MAIN'
        });
        mainDataList.push({
          token: token,
          type: SCREEN_1,
          pos: 'BOTTOM',
          index: idx+1 > 2 ? 2 : idx+1,
        });
      }else if(idx > 0 && idx <2) {
        mainDataList.push({
          token: token,
          type: SCREEN_1,
          pos: 'TOP',
          index: idx-1 < 0 ? 0 : idx-1,
        });
        mainDataList.push({
          token: token,
          type: SCREEN_1,
          pos: 'MAIN',
          index: idx,
        });
        mainDataList.push({
          token: token,
          type: SCREEN_1,
          pos: 'BOTTOM',
          index: idx+1 > 2 ? 2 : idx+1,
        });
      }else{
        /** START - idx 맞추기 위한 더미 */
        mainDataList.push({
          token: token,
          type: SCREEN_1,
          pos: 'TOP',
          index: 0,
        });

        mainDataList.push({
          token: token,
          type: SCREEN_1,
          pos: 'TOP',
          index: idx-1,
        });
        mainDataList.push({
          token: token,
          type: SCREEN_1,
          pos: 'MAIN',
          index: idx,
        });
      }

      main = (<SwiperFlatList
          ref={swiperRef}
          vertical={true}
          data={mainDataList}
          renderItem={verticalViewRenderer}
          renderAll={true}

          // keyExtractor={keyExtractor}
          index={idx}
          onScroll={handleVerticalScroll}
          listKey={(item, index) => `swiperFlatList_${item.type}_${item.index}`}
      />)
      setMainView(main)
      setNextView(verticalViewRenderer({
        item: {
          type: SCREEN_2,
          token: token,
          index: idx,
          pos: 'NEXT'
        },
        index: idx,
      }))
    }
    else if(type === SCREEN_2) {
      setPrevView(verticalViewRenderer({
        item: {
          type: SCREEN_1,
          token: token,
          index: idx,
          pos: 'PREV'
        },
        index: idx,
      }))

      let mainDataList = []
      if(idx === 0){
        mainDataList.push({
          token: token,
          type: SCREEN_2,
          index: idx,
          pos: 'MAIN'
        });
        mainDataList.push({
          token: token,
          type: SCREEN_2,
          pos: 'BOTTOM',
          index: idx+1 > 2 ? 2 : idx+1,
        });
      }else if(idx > 0 && idx <2) {
        mainDataList.push({
          token: token,
          type: SCREEN_2,
          pos: 'TOP',
          index: idx-1 < 0 ? 0 : idx-1,
        });
        mainDataList.push({
          token: token,
          type: SCREEN_2,
          pos: 'MAIN',
          index: idx,
        });
        mainDataList.push({
          token: token,
          type: SCREEN_2,
          pos: 'BOTTOM',
          index: idx+1 > 2 ? 2 : idx+1,
        });
      }else{
        /** START - idx 맞추기 위한 더미 */
        mainDataList.push({
          token: token,
          type: SCREEN_2,
          pos: 'TOP',
          index: 0,
        });

        mainDataList.push({
          token: token,
          type: SCREEN_2,
          pos: 'TOP',
          index: idx-1,
        });
        mainDataList.push({
          token: token,
          type: SCREEN_2,
          pos: 'MAIN',
          index: idx,
        });
      }

      main = (<SwiperFlatList
          ref={swiperRef}
          vertical={true}
          data={mainDataList}
          renderItem={verticalViewRenderer}
          // keyExtractor={keyExtractor}
          index={idx}
          onScroll={handleVerticalScroll}
          listKey={(item, index) => `swiperFlatList_${item.type}_${item.index}`}
      />)
      setMainView(main)
      setNextView(verticalViewRenderer({
        item: {
          type: SCREEN_3,
          token: token,
          pos: 'NEXT',
          index: 0
        },
        index: idx
      }))
      // setNextView(null)
    }
    else if(type === SCREEN_3) {
      setPrevView(verticalViewRenderer({
        item: {
          type: SCREEN_2,
          token: token,
          pos: 'PREV',
          index: idx
        },
        index: idx
      }))


      let mainDataList = []
      if(idx === 0){
        mainDataList.push({
          token: token,
          type: SCREEN_3,
          index: idx,
          pos: 'MAIN'
        });
        mainDataList.push({
          token: token,
          type: SCREEN_3,
          pos: 'BOTTOM',
          index: idx+1 > 2 ? 2 : idx+1,
        });
      }else if(idx > 0 && idx <2) {
        mainDataList.push({
          token: token,
          type: SCREEN_3,
          pos: 'TOP',
          index: idx-1 < 0 ? 0 : idx-1,
        });
        mainDataList.push({
          token: token,
          type: SCREEN_3,
          pos: 'MAIN',
          index: idx,
        });
        mainDataList.push({
          token: token,
          type: SCREEN_3,
          pos: 'BOTTOM',
          index: idx+1 > 2 ? 2 : idx+1,
        });
      }else{
        /** START - idx 맞추기 위한 더미 */
        mainDataList.push({
          token: token,
          type: SCREEN_3,
          pos: 'TOP',
          index: 0,
        });

        mainDataList.push({
          token: token,
          type: SCREEN_3,
          pos: 'TOP',
          index: idx-1,
        });
        mainDataList.push({
          token: token,
          type: SCREEN_3,
          pos: 'MAIN',
          index: idx,
        });
      }


      main = (<SwiperFlatList
          // ref={swiperRef}
          vertical={true}
          data={mainDataList}
          renderItem={verticalViewRenderer}
          // keyExtractor={(item, index) => index.toString()}
          index={idx}
          onScroll={handleVerticalScroll}
          listKey={(item, index) => `swiperFlatList_${item.type}_${item.index}`}
      />)
      setMainView(main)
      setNextView(verticalViewRenderer({
        item: {
          type: SCREEN_4,
          token: token,
          pos: 'NEXT',
          index: 1
        },
        index: idx
      }))
    }
    else if(type === SCREEN_4) {
      setPrevView(verticalViewRenderer({
        item: {
          type: SCREEN_3,
          token: token,
          pos: 'PREV',
          index: idx
        },
        index: idx
      }))
      main = (<SwiperFlatList
          // ref={swiperRef}
          vertical={true}
          data={[{
            type: SCREEN_4,
            index: 0,
            pos: 'TOP',
          },
            {
              type: SCREEN_4,
              index: 1,
              pos: 'MAIN',
            },
            {
              type: SCREEN_4,
              index: 2,
              pos: 'BOTTOM',
            },
          ]}
          renderItem={verticalViewRenderer}
          // keyExtractor={keyExtractor}
          index={1}
          onScroll={handleVerticalScroll}
          listKey={(item, index) => `swiperFlatList_${item.type}_${item.index}`}
      />)
      setMainView(main)
      setNextView(verticalViewRenderer({
        item: {
          type: SCREEN_5,
          token: token,
          pos: 'NEXT',
          index: idx
        },
        index: idx
      }))
    }
    else if(type === SCREEN_5) {
      setPrevView(verticalViewRenderer({
        item: {
          type: SCREEN_4,
          token: token,
          pos: 'PREV',
          index: idx
        },
        index: idx
      }))
      main = (<SwiperFlatList
          // ref={swiperRef}
          vertical={true}
          data={[{
            type: SCREEN_5,
            index: idx-1,
            pos: 'TOP',
          },
            {
              type: SCREEN_5,
              index: idx,
              pos: 'MAIN',
            },
            {
              type: SCREEN_5,
              index: idx+1,
              pos: 'BOTTOM',
            },
          ]}
          renderItem={verticalViewRenderer}
          // keyExtractor={keyExtractor}
          index={1}
          onScroll={handleVerticalScroll}
          listKey={(item, index) => `swiperFlatList_${item.type}_${index}`}
      />)
      setMainView(main)
      setNextView(verticalViewRenderer({
        item: {
          type: SCREEN_6,
          token: token,
          pos: 'NEXT',
          index: idx
        },
        index: idx
      }))
    }
    else if(type === SCREEN_6) {
      setPrevView(verticalViewRenderer({
        item: {
          type: SCREEN_5,
          token: token,
          pos: 'PREV',
          index: idx
        },
        index: idx
      }))
      main = (<SwiperFlatList
          // ref={swiperRef}
          vertical={true}
          data={[{
            type: SCREEN_6,
            index: idx-1,
            pos: 'TOP',
          },
            {
              type: SCREEN_6,
              index: idx,
              pos: 'MAIN',
            },
            {
              type: SCREEN_6,
              index: idx+1,
              pos: 'BOTTOM',
            },
          ]}
          renderItem={verticalViewRenderer}
          // keyExtractor={keyExtractor}
          index={1}
          onScroll={handleVerticalScroll}
          listKey={(item, index) => `swiperFlatList_${item.type}_${index}`}
      />)
      setMainView(main)
      setNextView(verticalViewRenderer({
        item: {
          type: SCREEN_7,
          token: token,
          pos: 'NEXT',
          index: idx
        },
        index: idx
      }))
    }
    else if(type === SCREEN_7) {
      setPrevView(verticalViewRenderer({
        item: {
          type: SCREEN_6,
          token: token,
          pos: 'PREV',
          index: idx
        },
        index: idx
      }))
      main = (<SwiperFlatList
          // ref={swiperRef}
          vertical={true}
          data={[{
            type: SCREEN_7,
            index: idx-1,
            pos: 'TOP',
          },
            {
              type: SCREEN_7,
              index: idx,
              pos: 'MAIN',
            },
            {
              type: SCREEN_7,
              index: idx+1,
              pos: 'BOTTOM',
            },
          ]}
          renderItem={verticalViewRenderer}
          // keyExtractor={keyExtractor}
          index={1}
          onScroll={handleVerticalScroll}
          listKey={(item, index) => `swiperFlatList_${item.type}_${index}`}
      />)
      setMainView(main)
      setNextView(null)
    }
  }

  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;

    const newIndex = Math.round(offsetX / SCREEN_WIDTH);


    // 변경된 인덱스를 처리하는 함수 호출
    if (screenType != SCREEN_TYPES[newIndex]) {
      // changeHorizontalIndex(newIndex);
      // setOldIndex(newIndex);
      dispatch(setScreenTypeRx(SCREEN_TYPES[newIndex]))
    }
  };
  const handleVerticalScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const newIndex = Math.round(offsetY / SCREEN_HEIGHT);
    console.log(`curIdx=${currentGroupId}, newIdx=${newIndex}`)
    if(currentGroupId != newIndex){
      dispatch(setCurrentGroupIdRx(newIndex))
      //return false;
    }else{
      //return false;
    }

  };






  return (
      <UserInfoProvider>
        <MyProvider>
          <LoadingProvider>
            {(token ?
                <AnimatedScrollView
                    ref={horizontalScrollRef}
                    scrollEventThrottle={300}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {x: xOffset}}}],
                        {
                          useNativeDriver: true,
                          listener: handleScroll,
                        },
                    )}
                    horizontal
                    pagingEnabled
                    style={styles.scrollView}>
                  {prevView != null ? (<Screen text="Prev Screen" index={0}>{prevView}</Screen>) : null}
                  {mainView}
                  {nextView != null ? (<Screen text="Next Screen" index={2}>{nextView}</Screen>) : null}
                </AnimatedScrollView>
                : (<>
                    {isSplashVisible === false ?
                      (<Screen text="Screen 0" index={0}><LoginGo token={token} /></Screen>)
                      : <Splash isSplashVisible={isSplashVisible}></Splash>}
                </>)
            )}
      </LoadingProvider>
    </MyProvider>
  </UserInfoProvider>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // 투명도가 있는 검은색 배경0
  },
  scrollView: {
    flexDirection: 'row',
    backgroundColor: 'black',
  },
  scrollPage: {
    width: SCREEN_WIDTH,
  },
  screen: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 45,
    fontWeight: 'bold',
  },
});

export default App;
