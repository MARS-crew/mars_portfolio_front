import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../RootReducer";
import {SCREEN_1} from "../../AppConst";

// User에서 관리해야하는 Slice
const initialState = {
    isSplashVisible: true,
    currentGroupId: 0,
    screenType: SCREEN_1,
    main : {
        type: null,
        data: null
    },
    prev : {
        type: null,
        data: null
    },
    next : {
        type: null,
        data: null
    },
    top : {
        type: null,
        data: null
    },
    bottom : {
        type: null,
        data: null
    },
};

export const UiRenderSlice = createSlice({
    name: 'uiRender',
    initialState,
    reducers: {
        // 모든 사용자 정보를 상태에 저장합니다.
        setCurrentGroupIdRx(state, action) {
            state.currentGroupId = action.payload;
        },
        setScreenTypeRx(state, action) {
            state.screenType = action.payload;
        },
        setSplashOnOffRx(state, action) {
            state.isSplashVisible = action.payload;
        },
        setMainScreenRx(state, action) {
            state.main = action.payload;
        },
        setPrevScreenRx(state, action) {
            state.prev = action.payload;
        },
        setNextScreenRx(state, action) {
            state.next = action.payload;
        },
        setTopScreenRx(state, action) {
            state.top = action.payload;
        },
        setBottomScreenRx(state, action) {
            state.bottom = action.payload;
        },


    },
});

// Action creators are generated for each case reducer function
export const {
    setSplashOnOffRx,
    setCurrentGroupIdRx,
    setScreenTypeRx,
    setTopScreenRx,
    setBottomScreenRx,
    setPrevScreenRx,
    setNextScreenRx,
    setMainScreenRx
} = UiRenderSlice.actions

export const isSplashSelector = (state: RootState) => state.uiRender.isSplashVisible;
export const getScreenTypeSelector = (state: RootState) => state.uiRender.screenType;
export const getCurrentGroupIdSelector = (state: RootState) => state.uiRender.currentGroupId;

export default UiRenderSlice.reducer
