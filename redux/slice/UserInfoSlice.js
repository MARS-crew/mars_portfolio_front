import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../RootReducer";

// User에서 관리해야하는 Slice
const initialState = {
    isLogin : false,
    userToken : null,
    userId : null,
    userEmail : null,
    userName : null,
};

export const setUserInfoAsync = createAsyncThunk(
    // string action type value: 이 값에 따라 pending, fulfilled, rejected가 붙은 액션 타입이 생성된다.
    'userInfo/setData',
    // payloadCreator callback: 비동기 로직의 결과를 포함하고 있는 프로미스를 반환하는 비동기 함수
    async (data, thunkAPI) => {
        return data;
    },
    // 세 번째 파라미터로 추가 옵션을 설정할 수 있다.
    // condition(arg, { getState, extra } ): boolean (비동기 로직 실행 전에 취소하거나, 실행 도중에 취소할 수 있다.)
    // dispatchConditionRejection: boolean (true면, condition()이 false를 반환할 때 액션 자체를 디스패치하지 않도록 한다.)
    // idGenerator(): string (requestId를 만들어준다. 같은 requestId일 경우 요청하지 않는 등의 기능을 사용할 수 있게 된다.)
);

export const UserInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        // 모든 사용자 정보를 상태에 저장합니다.
        setUserInfo(state, action) {
            state.isLogin = true;
            state.userToken = action.payload.userToken;
            state.userId = action.payload.userId;
            state.userEmail = action.payload.userEmail;
            state.userName = action.payload.userName;
        },
        setLogout(state, action) {
            state.isLogin = false;
            state.userToken = null;
            state.userId = null;
            state.userEmail = null;
            state.userName = null;
            // state = initialState;
        },

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(setUserInfoAsync.fulfilled, (state, action) => {
            // Add user to the state array
            state.isLogin = true;
            state.userToken = action.payload.userToken;
            state.userId = action.payload.userId;
            state.userEmail = action.payload.userEmail;
            state.userName = action.payload.userName;
        })
    },
});

// Action creators are generated for each case reducer function
export const { setUserInfo,  setLogout } = UserInfoSlice.actions

export const userTokenSelector = (state: RootState) => state.userInfo.userToken;
export const userIdSelector = (state: RootState) => state.userInfo.userId;
export const isLoginSelector = (state: RootState) => state.userInfo.isLogin;


export default UserInfoSlice.reducer
