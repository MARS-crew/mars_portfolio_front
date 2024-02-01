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
import { CubeNavigationHorizontal } from 'react-native-3dcube-navigation'

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

const { width, height } = Dimensions.get("window");


import {Provider, useDispatch, useSelector} from "react-redux";
import {Store} from "./redux/Store";
import {
  getCurrentGroupIdSelector,
  getScreenTypeSelector, IsNoChangeGroupIdSelector,
  IsReloadViewDataSelector,
  isSplashSelector,
  setCurrentGroupIdRx,
  setCurrentMemberIdRx,
  setIsReloadViewDataRx,
  setScreenTypeRx,
  setSplashOnOffRx
} from "./redux/slice/UiRenderSlice";
import SwiperFlatList from "react-native-swiper-flatlist";
import {userTokenSelector} from "./redux/slice/UserInfoSlice";
import {SCREEN_1, SCREEN_2, SCREEN_3, SCREEN_4, SCREEN_5, SCREEN_6, SCREEN_7, SCREEN_TYPES} from "./AppConst";
import PagerView from "react-native-pager-view";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const xOffset = new Animated.Value(0);
let verticalViewpager = null;
let verticalViewpager2 = null;

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


const HomeScreen = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const {
    horizontalIndex,
  } = useIndexContext();

  const [oldIndex, setOldIndex] = useState(horizontalIndex);
  const horizontalScrollRef = useRef(null);

  const {loading, changeLoading} = useLoadingContext();

  const dispatch = useDispatch()
  const isSplash = useSelector(isSplashSelector);
  const _token = useSelector(userTokenSelector);
  const _screenType = useSelector(getScreenTypeSelector);
  const _currentGroupId = useSelector(getCurrentGroupIdSelector);
  const _isReloadVIewData = useSelector(IsReloadViewDataSelector);

  const [isSplashVisible, setIsSplashVisible] = useState(isSplash);
  const [token, setToken] = useState(_token);
  const [topView, setTopView] = useState(null);
  const [bottomView, setBottomView] = useState(null);
  const [prevView, setPrevView] = useState(null);
  const [nextView, setNextView] = useState(null);
  const [mainView, setMainView] = useState(null);

  const [currentGroupId, setCurrentGroupId] = useState(_currentGroupId);
  const [currentTypeId, setCurrentTypeId] = useState(0);
  const [screenType, setScreenType] = useState(_screenType);
  const [isApplyView, setIsApplyView] = useState(false);

  const swiperRef = useRef(null);


  useEffect(() => {
    setIsSplashVisible(isSplash)
  }, [isSplash]);

  useEffect(() => {
    setToken(_token)
  }, [_token]);

  useEffect(() => {


  }, [isApplyView]);

  useEffect(() => {
    // setCurrentGroupId(_currentGroupId)
    // setScreenType(_screenType)
    // reloadViewData(_currentGroupId, _screenType)
  }, [_currentGroupId, _screenType]);

  useEffect(() => {
    if(verticalViewpager != null){
      console.log('screenType effect')
      if(_screenType == 'GROUP_IMG'){
         dispatch(setCurrentMemberIdRx(-1))
        // verticalViewpager.setPageWithoutAnimation(0)
      }else if(_screenType == 'GROUP_VIDEO'){
        dispatch(setCurrentMemberIdRx(-1))
        verticalViewpager.setPageWithoutAnimation(1)
      }else if(_screenType == 'INTERVIEW'){
        verticalViewpager.setPageWithoutAnimation(2)
      }else if(_screenType == SCREEN_4){
        // verticalViewpager.setPageWithoutAnimation(3)
      }else if(_screenType == SCREEN_5){
        // verticalViewpager.setPageWithoutAnimation(4)
      }else if(_screenType == SCREEN_6){
        // verticalViewpager.setPageWithoutAnimation(5)
      }
    }


  }, [_screenType]);

  useEffect(() => {
    let timer = setTimeout(() => {
      dispatch(setSplashOnOffRx(false));
    }, 5000);
    return () => clearTimeout(timer);
  }, []);





  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications

  const verticalViewRenderer = function({ item, index}){

    // console.log(`IDX=${index}, VIEW_TYPE : ${item.type}, POS: ${item.pos}`);
    if(item.type === SCREEN_1){
      return (<WhichGroup token={item.token} idx={item.index} />);
    }else if(item.type === SCREEN_2){
      return (<GroupVideo token={item.token} idx={item.index} />);
    }else if(item.type === SCREEN_3){
      return (<Interview token={item.token} idx={item.index} id={item.id}/>);
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


  const handleScroll = event => {
    console.log(`event : ${event.nativeEvent.position}`)
    const newIndex = event.nativeEvent.position;

    if (_screenType != SCREEN_TYPES[newIndex]) {
      console.log(`currentType=${_screenType}, newType=${SCREEN_TYPES[newIndex]}`)
      setCurrentTypeId(newIndex)
      if(currentTypeId > 1 && currentTypeId > newIndex){
        // verticalViewpager.setPageWithoutAnimation(1);
        dispatch(setScreenTypeRx(SCREEN_2))
      }else{
        dispatch(setScreenTypeRx(SCREEN_TYPES[newIndex]))
      }
    }
  };

  const verticalScrollEndHandle = function (event) {
    const newIndex = event.nativeEvent.position;
    if(_currentGroupId != newIndex){
      console.log(`curIdx=${_currentGroupId}, newIdx=${newIndex}`)
        dispatch(setCurrentGroupIdRx(newIndex))
    }
  }

  const verticalView =  (<PagerView
      ref={(viewpager) => {verticalViewpager = viewpager}}
      orientation={'horizontal'}
      // requestAnimationFrame={()=> verticalViewpager.setPage(index)}
      style={styles.pagerView}
      initialPage={0}
      scrollEnabled={true}
      onPageSelected={handleScroll}>
    <View key="1">

    <PagerView key="p1"
               ref={(viewpager) => {verticalViewpager2 = viewpager}}
    style={styles.pagerView2}
               initialPage={_currentGroupId}
               orientation='vertical'
               onPageSelected={verticalScrollEndHandle}>
      <View key="v1">
        {verticalViewRenderer({
          item: {
            type: SCREEN_1,
            token: token,
            pos: 'MAIN',
            index: 0
          },
          index: 0
        })}
      </View>
      <View key="v2">
        {verticalViewRenderer({
          item: {
            type: SCREEN_1,
            token: token,
            pos: 'MAIN',
            index: 1
          },
          index: 1
        })}
      </View>
      <View key="v3">
        {verticalViewRenderer({
          item: {
            type: SCREEN_1,
            token: token,
            pos: 'MAIN',
            index: 2
          },
          index: 2
        })}
      </View>
    </PagerView>
    </View>
    {/*<View key="2">*/}
    {/*<PagerView key="2" style={styles.pagerView} initialPage={_currentGroupId} orientation={"vertical"}*/}
    {/*           onPageSelected={verticalScrollEndHandle}>*/}
    {/*  <View key="1">*/}
    {/*    {verticalViewRenderer({*/}
    {/*      item: {*/}
    {/*        type: SCREEN_2,*/}
    {/*        token: token,*/}
    {/*        pos: 'MAIN',*/}
    {/*        index: _currentGroupId*/}
    {/*      },*/}
    {/*      index: _currentGroupId*/}
    {/*    })}*/}
    {/*  </View>*/}
    {/*  <View key="2">*/}
    {/*    {verticalViewRenderer({*/}
    {/*      item: {*/}
    {/*        type: SCREEN_2,*/}
    {/*        token: token,*/}
    {/*        pos: 'MAIN',*/}
    {/*        index: _currentGroupId*/}
    {/*      },*/}
    {/*      index: _currentGroupId*/}
    {/*    })}*/}
    {/*  </View>*/}
    {/*  <View key="3">*/}
    {/*    {verticalViewRenderer({*/}
    {/*      item: {*/}
    {/*        type: SCREEN_2,*/}
    {/*        token: token,*/}
    {/*        pos: 'MAIN',*/}
    {/*        index: _currentGroupId*/}
    {/*      },*/}
    {/*      index: _currentGroupId*/}
    {/*    })}*/}
    {/*  </View>*/}
    {/*</PagerView>*/}
    <View key="2">
      {verticalViewRenderer({
        item: {
          type: SCREEN_2,
          token: token,
          pos: 'MAIN',
          index: _currentGroupId
        },
        index: _currentGroupId
      })}
    </View>
    {/*</View>*/}
    <View key="3">
      {verticalViewRenderer({
        item: {
          type: SCREEN_3,
          token: token,
          pos: 'NEXT',
          index: currentGroupId,
          id: -1
        },
        index: currentGroupId
      })}
    </View>
    <View key="4">
      {verticalViewRenderer({
        item: {
          type: SCREEN_4,
          token: token,
          pos: 'NEXT',
          index: currentGroupId
        },
        index: currentGroupId
      })}
    </View>
    <View key="5">
      {verticalViewRenderer({
        item: {
          type: SCREEN_5,
          token: token,
          pos: 'NEXT',
          index: 0
        },
        index: 0
      })}
    </View>
    <View key="6">
      {verticalViewRenderer({
        item: {
          type: SCREEN_6,
          token: token,
          pos: 'NEXT',
          index: 0
        },
        index: 0
      })}
    </View>
    <View key="7">
      {verticalViewRenderer({
        item: {
          type: SCREEN_7,
          token: token,
          pos: 'NEXT',
          index: 0
        },
        index: 0
      })}
    </View>
  </PagerView>);




  return (
      <UserInfoProvider>
        <MyProvider>
          <LoadingProvider>
            {(token ?
                (verticalView)
                : (<>
                    {isSplashVisible == false ?
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
  pagerView: {
    flex: 1
  },
  pagerView2: {
    width: '100%', height: '100%'
  },
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
