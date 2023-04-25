import * as types from "../../action";

const initialState = {
    assessment: [],
    modules: []
};

export const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_COURSE_ADMIN_START:
            return { ...state };
        case types.GET_COURSE_ADMIN_SUCCESS:
            return { ...state, devListLoading: false, assessment: action?.data };
        case types.GET_COURSE_ADMIN_FAIL:
            return { ...state, devListLoading: false };

        case types.SAVE_COURSE_ADMIN_START:
            return { ...state, };
        case types.SAVE_COURSE_ADMIN_SUCCESS:
            let tempAss = [...state.assessment]
            tempAss?.unshift(action?.data)
            return { ...state, devListLoading: false, assessment: tempAss };
        case types.SAVE_COURSE_ADMIN_FAIL:
            return { ...state, devListLoading: false };

        case types.DELETE_COURSE_START:
            return { ...state, };
        case types.DELETE_COURSE_SUCCESS:
            let tempAsss = [...state.assessment]
            tempAsss = tempAsss?.filter((item) => item?._id !== action?.id)
            return { ...state, devListLoading: false, assessment: tempAsss };
        case types.DELETE_COURSE_FAIL:
            return { ...state, devListLoading: false  };

        case types.UPDATE_COURSE_ADMIN_START:
            return { ...state, };
        case types.UPDATE_COURSE_ADMIN_SUCCESS:
            let tempAs2 = [...state.assessment]
            let index = tempAs2?.findIndex((item) => item?._id == action?.id)
            tempAs2[index] = action?.data
            return { ...state, devListLoading: false, assessment: tempAs2 };
        case types.UPDATE_COURSE_ADMIN_FAIL:
            return { ...state, devListLoading: false };

        case types.GET_MODULE_DETAILS_ADMIN_START:
            return { ...state, };
        case types.GET_MODULE_DETAILS_ADMIN_SUCCESS:
            return { ...state, devListLoading: false, modules: action?.data };
        case types.GET_MODULE_DETAILS_ADMIN_FAIL:
            return { ...state, devListLoading: false };

        case types.SAVE_ADMIN_MODULE_START:
            return { ...state, };
        case types.SAVE_ADMIN_MODULE_SUCCESS:
            let tempModule = [...state.modules]
            tempModule?.push(action?.data)
            return { ...state, devListLoading: false, modules: tempModule };
        case types.SAVE_ADMIN_MODULE_FAIL:
            return { ...state, devListLoading: false };

        case types.UPDATE_ADMIN_MODULE_START:
            return { ...state, };
        case types.UPDATE_ADMIN_MODULE_SUCCESS:
            let tempModule2 = [...state.modules]
            let index2 = tempModule2?.findIndex((item) => item?._id == action?.id)
            tempModule2[index2] = action?.data
            return { ...state, devListLoading: false, modules: tempModule2 };
        case types.UPDATE_ADMIN_MODULE_FAIL:
            return { ...state, devListLoading: false };

        case types.DELETE_ADMIN_MODULE_START:
            return { ...state, };
        case types.DELETE_ADMIN_MODULE_SUCCESS:
            let tempmodule3 = [...state.modules]
            tempmodule3 = tempmodule3?.filter((item) => item?._id !== action?.id)
            return { ...state, devListLoading: false, modules: tempmodule3 };
        case types.DELETE_ADMIN_MODULE_FAIL:
            return { ...state, devListLoading: false };

        case types.GET_ADMIN_QUESTION_START:
            return { ...state, };
        case types.GET_ADMIN_QUESTION_SUCCESS:
            return { ...state, questions: action?.data };
        case types.GET_ADMIN_QUESTION_FAIL:
            return { ...state };

        case types.SAVE_ADMIN_QUESTION_START:
            return { ...state, };
        case types.SAVE_ADMIN_QUESTION_SUCCESS:
            let tempQuestion = [...state.questions]
            tempQuestion?.push(action?.data)
            return { ...state, devListLoading: false, questions: tempQuestion };
        case types.SAVE_ADMIN_QUESTION_FAIL:
            return { ...state, devListLoading: false };

        case types.DELETE_ADMIN_QUESTION_START:
            return { ...state };
        case types.DELETE_ADMIN_QUESTION_SUCCESS:
            let tempQuestion1 = [...state.questions]
            tempQuestion1 = tempQuestion1?.filter((item) => item?._id !== action?.id)
            return { ...state, devListLoading: false, questions: tempQuestion1 };
        case types.DELETE_ADMIN_QUESTION_FAIL:
            return { ...state, devListLoading: false };

        case types.UPDATE_ADMIN_QUESTION_START:
            return { ...state, };
        case types.UPDATE_ADMIN_QUESTION_SUCCESS:
            let tempQuestion3 = [...state.questions]
            let index4 = tempQuestion3?.findIndex((item) => item?._id == action?.data?._id)
            tempQuestion3[index4] = action?.data
            return { ...state, devListLoading: false, questions: tempQuestion3 };
        case types.UPDATE_ADMIN_QUESTION_FAIL:
            return { ...state, devListLoading: false };

        case types.GET_ADMIN_QUARDINATE_START:
            return { ...state };
        case types.GET_ADMIN_QUARDINATE_SUCCESS:
            return { ...state, quardinates: action?.data };
        case types.GET_ADMIN_QUARDINATE_FAIL:
            return { ...state };

        case types.UPDATE_ADMIN_QUARDINATE_START:
            return { ...state, };
        case types.UPDATE_ADMIN_QUARDINATE_SUCCESS:
            let tempQrdnt = [...state.quardinates]
            let index5 = tempQrdnt?.findIndex((item) => item?._id == action?.data?._id)
            tempQrdnt[index5] = action?.data
            return { ...state, devListLoading: false, quardinates: tempQrdnt };
        case types.UPDATE_ADMIN_QUARDINATE_FAIL:
            return { ...state, devListLoading: false };

        case types.SAVE_ADMIN_QUARDINATE_START:
            return { ...state, };
        case types.SAVE_ADMIN_QUARDINATE_SUCCESS:
            let tempQrdnt2 = [...state.quardinates]
            tempQrdnt2?.push(action?.data)
            return { ...state, devListLoading: false, quardinates: tempQrdnt2 };
        case types.SAVE_ADMIN_QUARDINATE_FAIL:
            return { ...state, devListLoading: false };

        case types.DELETE_ADMIN_QUARDINATE_SUCCESS:
            let tempQrdnt3 = [...state.quardinates]
            tempQrdnt3 = tempQrdnt3?.filter((item) => item?._id !== action?.id)
            return { ...state, devListLoading: false, quardinates: tempQrdnt3 };
        case types.DELETE_ADMIN_QUARDINATE_FAIL:
            return { ...state, devListLoading: false };



        case types.UPDATE_ADMIN_CENTRE_START:
            return { ...state, };
        case types.UPDATE_ADMIN_CENTRE_SUCCESS:
            let tempQrdnt6 = [...state.quardinates]
            let index6 = tempQrdnt6?.findIndex((item) => item?._id == action?.data?._id)
            tempQrdnt6[index6] = action?.data
            return { ...state, devListLoading: false, quardinates: tempQrdnt6 };
        case types.UPDATE_ADMIN_CENTRE_FAIL:
            return { ...state, devListLoading: false };


        default:
            return { ...state };
    }
};
