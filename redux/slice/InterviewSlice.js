import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getGroupImage} from "../../api/v1/img";
import {getInterview} from "../../api/v1/interview";
import _ from "lodash";
import axios from "axios";
import type {RootState} from "../RootReducer";

// User에서 관리해야하는 Slice
const initialState = {
    list : [],
};

export const getInterviewsAsync = createAsyncThunk(
    // string action type value: 이 값에 따라 pending, fulfilled, rejected가 붙은 액션 타입이 생성된다.
    'interview/get_list',
    // payloadCreator callback: 비동기 로직의 결과를 포함하고 있는 프로미스를 반환하는 비동기 함수
    async (token, thunkAPI) => {
            const source = axios.CancelToken.source();
            return getInterview( token,{
                cancelToken: source.token,
            })
            .then(async function (response) {
                // console.log('interview resp');
                const extractedData = response.data.data.map(item => ({
                    interviewId: item.interview_id,
                    groupId: item.group_id,
                    memberId: item.member_id, //사용자 아이디
                    url: item.url, //인터뷰 url
                    heart: item.heart, //찜하기 여부
                }));
                // setData(extractedData);
                const sortedAndGroupedData = _.chain(extractedData)
                    .sortBy('groupId', 'memberId')
                    .uniqBy('memberId')
                    .value();

                // setData(Object.values(sortedAndGroupedData));
                // // console.log('interview : ' + JSON.stringify(sortedAndGroupedData));
                //
                // dispatch(setInterviewList(Object.values(sortedAndGroupedData)));

                // if (loading) { changeLoading(); }

                return Object.values(sortedAndGroupedData);

            }).catch(function (error) {
            console.log(error);
        })
    },
    // 세 번째 파라미터로 추가 옵션을 설정할 수 있다.
    // condition(arg, { getState, extra } ): boolean (비동기 로직 실행 전에 취소하거나, 실행 도중에 취소할 수 있다.)
    // dispatchConditionRejection: boolean (true면, condition()이 false를 반환할 때 액션 자체를 디스패치하지 않도록 한다.)
    // idGenerator(): string (requestId를 만들어준다. 같은 requestId일 경우 요청하지 않는 등의 기능을 사용할 수 있게 된다.)
);

export const InterviewSlice = createSlice({
    name: 'interview',
    initialState,
    reducers: {
        // 모든 사용자 정보를 상태에 저장합니다.
        setInterviewList(state, action) {
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
        builder.addCase(getInterviewsAsync.fulfilled, (state, action) => {
            // Add user to the state array
            state.list = action.payload;
        })
    },
});

// Action creators are generated for each case reducer function
export const { setInterviewList, } = InterviewSlice.actions;
export const getInterviewListSelector = (state: RootState) => state.interviews.list;

export default InterviewSlice.reducer
