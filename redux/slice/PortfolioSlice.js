import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {getInterview} from "../../api/v1/interview";
import _ from "lodash";
import {getPortfolios} from "../../api/v1/portfolio";
import type {RootState} from "../RootReducer";

// User에서 관리해야하는 Slice
const initialState = {
    list : [],
};

export const getPortfoliosAsync = createAsyncThunk(
    // string action type value: 이 값에 따라 pending, fulfilled, rejected가 붙은 액션 타입이 생성된다.
    'portfolio/get_list',
    // payloadCreator callback: 비동기 로직의 결과를 포함하고 있는 프로미스를 반환하는 비동기 함수
    async (token, thunkAPI) => {
        const source = axios.CancelToken.source();
        return getPortfolios(token, null, {
            cancelToken: source.token,
        })
            .then(function (response) {
                const extractedData = response.data.data.map(item => ({
                    group_id: item.group_id,
                    member_id: item.member_id,
                    portfolio_id: item.portfolio_id,
                    title: item.title,
                    description: item.description,
                    reg_date: item.reg_date,
                    mod_date: item.mod_date,
                    kind: item.kind,
                    file_id: item.file_id,
                    ext: item.ext,
                    url: item.url,
                    del_yn: item.del_yn,
                }));
                const sortedAndGroupedData = _.chain(extractedData)
                    .sortBy('group_id, member_id')
                    .groupBy('member_id')
                    .values()
                    .value();

                const groups = Object.values(sortedAndGroupedData);
                const transformedData = groups.map(groupItems =>
                    groupItems.map(singleItem => ({
                        group_id: singleItem.group_id,
                        member_id: singleItem.member_id,
                        portfolio_id: singleItem.portfolio_id,
                        title: singleItem.title,
                        description: singleItem.description,
                        reg_date: singleItem.reg_date,
                        mod_date: singleItem.mod_date,
                        kind: singleItem.kind,
                        file_id: singleItem.file_id,
                        ext: singleItem.ext,
                        url: singleItem.url,
                        del_yn: singleItem.del_yn,
                    }))
                );
                return transformedData;
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    // 세 번째 파라미터로 추가 옵션을 설정할 수 있다.
    // condition(arg, { getState, extra } ): boolean (비동기 로직 실행 전에 취소하거나, 실행 도중에 취소할 수 있다.)
    // dispatchConditionRejection: boolean (true면, condition()이 false를 반환할 때 액션 자체를 디스패치하지 않도록 한다.)
    // idGenerator(): string (requestId를 만들어준다. 같은 requestId일 경우 요청하지 않는 등의 기능을 사용할 수 있게 된다.)
);

export const PortfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
        // 모든 사용자 정보를 상태에 저장합니다.
        setPortfolioList(state, action) {
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
        builder.addCase(getPortfoliosAsync.fulfilled, (state, action) => {
            // Add user to the state array
            state.list = action.payload;
        })
    },
});

// Action creators are generated for each case reducer function
export const { setPortfolioList, } = PortfolioSlice.actions
export const getPortfolioListSelector = (state: RootState) => state.portfolios.list;

export default PortfolioSlice.reducer
