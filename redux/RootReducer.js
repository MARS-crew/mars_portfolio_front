import { combineReducers } from "@reduxjs/toolkit";
import userInfoSlice from "./slice/UserInfoSlice";
import InterviewSlice from "./slice/InterviewSlice";
import UiRenderSlice from "./slice/UiRenderSlice";
import GroupImgSlice from "./slice/GroupImgSlice";
import PortfolioSlice from "./slice/PortfolioSlice";

/**
 * 애플리케이션에서 목적에 따라 리듀서를 분리하여 관리 합니다.
 */
const RootReducer = combineReducers({
    userInfo: userInfoSlice,
    interviews: InterviewSlice,
    portfolios: PortfolioSlice,
    groupImg: GroupImgSlice,
    uiRender: UiRenderSlice,
});

export type RootState = ReturnType<typeof RootReducer>;

export default RootReducer;

// {
//     userInfo: {
//         isLogin: false
//         userToken: ''
//         userId: ''
//         userEmail: ''
//         userName: ''
//     }
//     cube: {
//         isSplashVisible: true
//         currentGrade: 1
//
//         main:{
//             type: ''
//             data: {}
//         }
//         prev:{
//             type: ''
//             data: {}
//         }
//         next: {
//             type: ''
//             data: {}
//         }
//         top:{
//             type: ''
//             data: {}
//         }
//         bottom:{
//             type: ''
//             data: {}
//         }
//     }
//
//     groupImage: [
//
//     ]
//     interviews: [
//
//     ]
//     portfolios: [
//
//     ]
//     resumes: [
//
//     ]
//
//     reviews:{
//         'idaaa': []
//         'idbbb': []
//     }
//
//
// }
