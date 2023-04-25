import { deleteAdminCentre, deleteAdminQuardinator, deleteAdminQuestion, deleteCourses, deleteModule, getAdminQuardinator, getAdminQuestion, getCourse, getModuleDetails, saveAdminCentre, saveAdminQuardinator, saveAdminQuestion, saveCourses, saveModule, updateAdminCentre, updateAdminQuardinator, updateAdminQuestion, updateCourses, updateModule } from "@/service/api";
import { toast } from "react-hot-toast";
import { call, put } from "redux-saga/effects";
import * as types from "../../action";

export function* saveCourse({ data, onClose }) {
  try {
    yield put({ type: types.SAVE_COURSE_ADMIN_START });
    const response = yield call(saveCourses, data);
    if (response?.data?.status == 200) {
      toast.success("Add Course Succesfully")
      yield put({
        type: types.SAVE_COURSE_ADMIN_SUCCESS,
        data: response?.data?.data,
      });
      onClose();
    } else {
      toast.error(response?.data?.message)
      yield put({
        type: types.SAVE_COURSE_ADMIN_FAIL,
        data: response?.data?.data,
      });
    }
  } catch (error) {
    yield put({ type: types.SAVE_COURSE_ADMIN_FAIL });
  }
}

export function* getCourses() {
  try {
    yield put({ type: types.GET_COURSE_ADMIN_START });

    const response = yield call(getCourse);
    if (response?.data?.status == 200) {
      yield put({
        type: types.GET_COURSE_ADMIN_SUCCESS,
        data: response?.data?.data,
      });

    } else {
      toast.error(response?.data?.message)
      yield put({
        type: types.GET_COURSE_ADMIN_FAIL,
        data: response?.data?.data,
      });
    }
  } catch (error) {
    yield put({ type: types.GET_COURSE_ADMIN_FAIL });
  }
}

export function* deleteCourse({ id }) {
  try {
    yield put({ type: types.DELETE_COURSE_START });
    const response = yield call(deleteCourses, id);
    if (response?.data?.status == 200) {
      yield put({
        type: types.DELETE_COURSE_SUCCESS,
        id
      });

    } else {
      toast.error(response?.data?.message)
      yield put({
        type: types.DELETE_COURSE_FAIL,
        data: response?.data?.data,
      });
    }
  } catch (error) {
    yield put({ type: types.DELETE_COURSE_FAIL });
  }
}

export function* updateCourseSaga({ id, data, onClose }) {
  try {
    yield put({ type: types.UPDATE_COURSE_ADMIN_START });
    const response = yield call(updateCourses, id, data);
    if (response?.data?.status == 200) {
      toast.success("Update data successfully")
      yield put({
        type: types.UPDATE_COURSE_ADMIN_SUCCESS,
        id,
        data
      });
      onClose();
    } else {
      toast.error(response?.data?.message)
      yield put({
        type: types.UPDATE_COURSE_ADMIN_FAIL,
        data: response?.data?.data,
      });
    }
  } catch (error) {
    yield put({ type: types.UPDATE_COURSE_ADMIN_FAIL });
  }
}

export function* getModuleDetailsSaga({ id }) {
  try {
    yield put({ type: types.GET_MODULE_DETAILS_ADMIN_START });
    const response = yield call(getModuleDetails, id);
    if (response?.data?.status == 200) {
      yield put({
        type: types.GET_MODULE_DETAILS_ADMIN_SUCCESS,
        data: response?.data?.data
      });

    } else {
      toast.error(response?.data?.message)
      yield put({
        type: types.GET_MODULE_DETAILS_ADMIN_FAIL,
        data: response?.data?.data,
      });
    }
  } catch (error) {
    yield put({ type: types.GET_MODULE_DETAILS_ADMIN_FAIL });
  }
}

export function* saveModuleSaga({ data, cancel }) {
  try {
    yield put({ type: types.SAVE_ADMIN_MODULE_START });
    const response = yield call(saveModule, data);
    if (response?.data?.status == 200) {
      toast.success("Add module successfully..")
      yield put({
        type: types.SAVE_ADMIN_MODULE_SUCCESS,
        data: response?.data?.data
      });
      cancel()
    } else {
      toast.error(response?.data?.message)
      yield put({
        type: types.SAVE_ADMIN_MODULE_FAIL,
        data: response?.data?.data,
      });
    }
  } catch (error) {
    yield put({ type: types.SAVE_ADMIN_MODULE_FAIL });
  }
}
export function* updateModuleSaga({ id, data, cancel }) {
  try {
    yield put({ type: types.UPDATE_ADMIN_MODULE_START });
    const response = yield call(updateModule, id, data);
    if (response?.data?.status == 200) {
      toast.success("Add module successfully..")
      yield put({
        type: types.UPDATE_ADMIN_MODULE_SUCCESS,
        data: response?.data?.data,
        id
      });
      cancel()
    } else {
      toast.error(response?.data?.message)
      yield put({
        type: types.UPDATE_ADMIN_MODULE_FAIL,
        data: response?.data?.data,
      });
    }
  } catch (error) {
    yield put({ type: types.UPDATE_ADMIN_MODULE_FAIL });
  }
}

export function* deleteModuleSaga({ id, cancel }) {
  try {
    yield put({ type: types.DELETE_ADMIN_MODULE_START });
    const response = yield call(deleteModule, id);
    if (response?.data?.status == 200) {
      toast.success("Delete Data Successfully..")
      yield put({
        type: types.DELETE_ADMIN_MODULE_SUCCESS,
        id
      });
      cancel()
    } else {
      toast.error(response?.data?.message)
      yield put({
        type: types.DELETE_ADMIN_MODULE_FAIL,
        data: response?.data?.data,
      });
    }
  } catch (error) {
    yield put({ type: types.DELETE_ADMIN_MODULE_FAIL });
  }
}

export function* getAdminQuestionSaga({ id }) {
  try {
    yield put({ type: types.GET_ADMIN_QUESTION_START });
    const response = yield call(getAdminQuestion, id);
    if (response?.data?.status == 200) {
      yield put({
        type: types.GET_ADMIN_QUESTION_SUCCESS,
        data: response?.data?.data.questions
      });

    } else {
      toast.error(response?.data?.message)
      yield put({
        type: types.GET_ADMIN_QUESTION_FAIL,
        data: response?.data?.data,
      });
    }
  } catch (error) {
    yield put({ type: types.GET_ADMIN_QUESTION_FAIL });
  }
}


export function* saveAdminQuestionSaga({ id, data, cancel }) {
  try {
    yield put({ type: types.SAVE_ADMIN_QUESTION_START });
    const response = yield call(saveAdminQuestion, id, data);
    if (response?.data?.status == 200) {
      toast.success("Add module successfully..")
      yield put({
        type: types.SAVE_ADMIN_QUESTION_SUCCESS,
        data: response?.data?.data
      });
      cancel()
    } else {
      toast.error(response?.data?.message)
      yield put({
        type: types.SAVE_ADMIN_QUESTION_FAIL,
        data: response?.data?.data,
      });
    }
  } catch (error) {
    yield put({ type: types.SAVE_ADMIN_QUESTION_FAIL });
  }
}


export function* deleteAdminQuestionSaga({ id, questionid }) {
  try {
    yield put({ type: types.DELETE_ADMIN_QUESTION_START });
    const response = yield call(deleteAdminQuestion, id, questionid);
    if (response?.data?.status == 200) {
      toast.success("Delete Data Successfully..")
      yield put({
        type: types.DELETE_ADMIN_QUESTION_SUCCESS,
        id: questionid
      });
      cancel()
    } else {
      toast.error(response?.data?.message)
      yield put({
        type: types.DELETE_ADMIN_QUESTION_FAIL,
        data: response?.data?.data,
      });
    }
  } catch (error) {
    yield put({ type: types.DELETE_ADMIN_QUESTION_FAIL });
  }
}

export function* updateAdminQuestionSaga({ id, data }) {
  try {
    yield put({ type: types.UPDATE_ADMIN_QUESTION_START });
    const response = yield call(updateAdminQuestion, id, data);
    if (response?.data?.status == 200) {
      toast.success("Update Data Successfully..")
      yield put({
        type: types.UPDATE_ADMIN_QUESTION_SUCCESS,
        id,
        data
      });
    } else {
      toast.error(response?.data?.message)
      yield put({
        type: types.UPDATE_ADMIN_QUESTION_FAIL,
        data: response?.data?.data,
      });
    }
  } catch (error) {
    yield put({ type: types.UPDATE_ADMIN_QUESTION_FAIL });
  }
}

export function* saveAdminQuardinatorSaga({ data, cancel }) {
  try {
    yield put({ type: types.SAVE_ADMIN_QUARDINATE_START });
    const response = yield call(saveAdminQuardinator, data);
    if (response?.data?.status == 200) {
      toast.success("Add Quardinator successfully..")
      yield put({
        type: types.SAVE_ADMIN_QUARDINATE_SUCCESS,
        data: response?.data?.data
      });
      yield put({ type: types?.UPLOAD_IMAGE_FAIL })
      cancel()
    } else {
      toast.error(response?.data?.message)
      yield put({
        type: types.SAVE_ADMIN_QUARDINATE_FAIL,
        data: response?.data?.data,
      });
    }
  } catch (error) {
    yield put({ type: types.SAVE_ADMIN_QUESTION_FAIL });
  }
}


export function* getAdminQuardinatorSaga() {
  try {
    yield put({ type: types.GET_ADMIN_QUARDINATE_START });
    const response = yield call(getAdminQuardinator);
    if (response?.data?.status == 200) {
      yield put({
        type: types.GET_ADMIN_QUARDINATE_SUCCESS,
        data: response?.data?.data
      });
    } else {
      toast.error(response?.data?.message)
      yield put({
        type: types.GET_ADMIN_QUARDINATE_SUCCESS,
        data: response?.data?.data,
      });
    }
  } catch (error) {
    yield put({ type: types.GET_ADMIN_QUARDINATE_FAIL });
  }
}

export function* updateAdminQuardinatorSaga({ id, data, cancel }) {
  try {
    yield put({ type: types.UPDATE_ADMIN_QUARDINATE_START });
    const response = yield call(updateAdminQuardinator, id, data);
    if (response?.data?.status == 200) {
      toast.success("Update Data Successfully..")
      yield put({
        type: types.UPDATE_ADMIN_QUARDINATE_SUCCESS,
        data: response?.data?.data
      });
      yield put({ type: types?.UPLOAD_IMAGE_FAIL })
      cancel()
    } else {
      toast.error(response?.data?.message)
      yield put({
        type: types.UPDATE_ADMIN_QUARDINATE_FAIL,
        data: response?.data?.data,
      });
    }
  } catch (error) {
    yield put({ type: types.UPDATE_ADMIN_QUARDINATE_FAIL });
  }
}

export function* deleteAdminQuardinatorSaga({ id }) {
  try {
    yield put({ type: types.DELETE_ADMIN_QUARDINATE_START });
    const response = yield call(deleteAdminQuardinator, id);
    if (response?.data?.status == 200) {
      toast.success("Delete Data Successfully..")
      yield put({
        type: types.DELETE_ADMIN_QUARDINATE_SUCCESS,
        id
      });
      cancel()
    } else {
      toast.error(response?.data?.message)
      yield put({
        type: types.DELETE_ADMIN_QUARDINATE_FAIL,
        data: response?.data?.data,
      });
    }
  } catch (error) {
    yield put({ type: types.DELETE_ADMIN_QUARDINATE_FAIL });
  }
}

export function* updateAdminCentreSaga({ data,cancel }) {
  try {
    yield put({ type: types.UPDATE_ADMIN_CENTRE_START });
    const response = yield call(updateAdminCentre, data);
    console.log("response update",response)

    if (response?.data?.status == 200) {
      
      toast.success("Update Data Successfully..")
      cancel({
        modal:false,
        edit:false,
        id:""
      })
      yield put({
        type: types.UPDATE_ADMIN_CENTRE_SUCCESS,
        data:response?.data?.data
      });
      
    } else {
      toast.error(response?.data?.message)
      yield put({
        type: types.UPDATE_ADMIN_CENTRE_FAIL,
        data: response?.data?.data,
      });
    }
  } catch (error) {
    yield put({ type: types.UPDATE_ADMIN_CENTRE_FAIL });
  }
}


export function* saveAdminCentreSaga({ data,id,cancel }) {
  try {
    yield put({ type: types.SAVE_ADMIN_CENTRE_START });
    const response = yield call(saveAdminCentre,id, data);
    console.log("save update",response)
    if (response?.data?.status == 200) {
      toast.success("Save Data Successfully..")
      yield put({
        type: types.SAVE_ADMIN_CENTRE_SUCCESS,
        id,
        data:response?.data?.data
      });
      cancel()
    } else {
      toast.error(response?.data?.message)
      yield put({
        type: types.SAVE_ADMIN_CENTRE_FAIL,
        data: response?.data?.data,
      });
    }
  } catch (error) {
    yield put({ type: types.SAVE_ADMIN_CENTRE_FAIL });
  }
}


export function* deleteAdminCentreSaga({ data,id,cancel }) {
  try {
    yield put({ type: types.DELETE_ADMIN_CENTRE_START });
    const response = yield call(deleteAdminCentre,id, data);
    console.log("deleteAdminCentre rrrrr",response)
    if (response?.data?.status == 200) {
      toast.success("Save Data Successfully..")
      yield put({
        type: types.DELETE_ADMIN_CENTRE_SUCCESS,
        id,
        data:response?.data?.data
      });
      cancel()
    } else {
      toast.error(response?.data?.message)
      yield put({
        type: types.DELETE_ADMIN_CENTRE_FAIL,
        data: response?.data?.data,
      });
    }
  } catch (error) {
    yield put({ type: types.DELETE_ADMIN_CENTRE_FAIL });
  }
}