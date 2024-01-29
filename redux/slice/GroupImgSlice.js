import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getGroupImage} from "../../api/v1/img";
import type {RootState} from "../RootReducer";

// User에서 관리해야하는 Slice
const initialState = {
    list : [],
};

export const getGroupImagesAsync = createAsyncThunk(
    // string action type value: 이 값에 따라 pending, fulfilled, rejected가 붙은 액션 타입이 생성된다.
    'groupImg/get_imgs',
    // payloadCreator callback: 비동기 로직의 결과를 포함하고 있는 프로미스를 반환하는 비동기 함수
    async (token, thunkAPI) => {

        return getGroupImage(token)
            .then(function (response) {
                console.log('데이터:', response.data);
                return response.data.data;
            })
            .catch(function (error){
                console.error('에러:', error);
                return [];
            });
    },
    // 세 번째 파라미터로 추가 옵션을 설정할 수 있다.
    // condition(arg, { getState, extra } ): boolean (비동기 로직 실행 전에 취소하거나, 실행 도중에 취소할 수 있다.)
    // dispatchConditionRejection: boolean (true면, condition()이 false를 반환할 때 액션 자체를 디스패치하지 않도록 한다.)
    // idGenerator(): string (requestId를 만들어준다. 같은 requestId일 경우 요청하지 않는 등의 기능을 사용할 수 있게 된다.)
);

export const GroupImgSlice = createSlice({
    name: 'groupImg',
    initialState,
    reducers: {
        // 모든 사용자 정보를 상태에 저장합니다.
        setGroupImgList(state, action) {
            // let tmpList = state.list;
            // if(state.list == null) {
            //     tmpList = [];
            // }
            //
            // if(typeof(action.payload) === Array) {
            //     action.payload.map(function (item) {
            //         tmpList.append(item);
            //     });
            // }

            state.list = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(getGroupImagesAsync.fulfilled, (state, action) => {
            state.list = action.payload;
        })
    },
});

// Action creators are generated for each case reducer function
export const { setGroupImgList, } = GroupImgSlice.actions

export const getGroupImgSelector = (state: RootState) => state.groupImg.list;


export default GroupImgSlice.reducer
