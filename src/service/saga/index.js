const { saveCourse, getCourses, deleteCourse, updateCourseSaga, getModuleDetailsSaga, saveModuleSaga, updateModuleSaga, deleteModuleSaga, getAdminQuestionSaga, saveAdminQuestionSaga, deleteAdminQuestionSaga, updateAdminQuestionSaga, saveAdminQuardinatorSaga, getAdminQuardinatorSaga, updateAdminQuardinatorSaga, deleteAdminQuardinatorSaga, saveAdminCentreSaga, deleteAdminCentreSaga, updateAdminCentreSaga } = require("./admin");
import { takeEvery } from "redux-saga/effects";
import * as types from "../action";
import { uploadImageSaga } from "./common";
function* mySaga() {
    yield takeEvery(types.SAVE_COURSE_ADMIN, saveCourse);
    yield takeEvery(types.GET_COURSE_ADMIN,getCourses);
    yield takeEvery(types.DELETE_COURSE,deleteCourse)
    yield takeEvery(types.UPDATE_COURSE_ADMIN,updateCourseSaga)
    yield takeEvery(types.GET_MODULE_DETAILS_ADMIN,getModuleDetailsSaga)
    yield takeEvery(types.SAVE_ADMIN_MODULE,saveModuleSaga)
    yield takeEvery(types.UPDATE_ADMIN_MODULE,updateModuleSaga)
    yield takeEvery(types.DELETE_ADMIN_MODULE,deleteModuleSaga)
    yield takeEvery(types.GET_ADMIN_QUESTION,getAdminQuestionSaga)
    yield takeEvery(types.SAVE_ADMIN_QUESTION,saveAdminQuestionSaga)
    yield takeEvery(types.DELETE_ADMIN_QUESTION,deleteAdminQuestionSaga)
    yield takeEvery(types.UPDATE_ADMIN_QUESTION,updateAdminQuestionSaga)
    yield takeEvery(types.UPLOAD_IMAGE,uploadImageSaga)
    yield takeEvery(types.SAVE_ADMIN_QUARDINATE,saveAdminQuardinatorSaga)
    yield takeEvery(types.GET_ADMIN_QUARDINATE,getAdminQuardinatorSaga)
    yield takeEvery(types.UPDATE_ADMIN_QUARDINATE,updateAdminQuardinatorSaga)
    yield takeEvery(types.DELETE_ADMIN_QUARDINATE,deleteAdminQuardinatorSaga)
    yield takeEvery(types.SAVE_ADMIN_CENTRE,saveAdminCentreSaga)
    yield takeEvery(types.DELETE_ADMIN_CENTRE,deleteAdminCentreSaga)
    yield takeEvery(types.UPDATE_ADMIN_CENTRE,updateAdminCentreSaga)
}
export default mySaga;