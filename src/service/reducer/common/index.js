import * as types from "../../action";

const initialState = {
    quardinatorImage: "",
    modules: [],
    centreInnerImage: "",
    centreOuterImage: ""
};

export const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.UPLOAD_IMAGE_START:
            return { ...state };
        case types.UPLOAD_IMAGE_SUCCESS:
            if (action?.slug == "quardinator") {
                return { ...state, devListLoading: false, quardinatorImage: action?.data };
            } else if (action?.slug == "centreOuterImage") {
                return { ...state, devListLoading: false, centreOuterImage: action?.data };
            } else if (action?.slug == "centreInnerImage") {
                return { ...state, devListLoading: false, centreInnerImage: action?.data };
            }
            return { ...state };
        case types.UPLOAD_IMAGE_FAIL:
            return { ...state, quardinatorImage: "", centreInnerImage: "", centreOuterImage: "" };
    }
    return { ...state }
}