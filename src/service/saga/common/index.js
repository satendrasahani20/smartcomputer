import { uploadImage } from "@/service/api";
import { toast } from "react-hot-toast";
import { call, put } from "redux-saga/effects";
import * as types from "../../action/index"

export function* uploadImageSaga({ data, slug, setObject, object }) {
  try {
    yield put({ type: types.UPLOAD_IMAGE_START });

    const response = yield call(uploadImage, data);
    if (response?.status == 200) {
      yield put({
        type: types.UPLOAD_IMAGE_SUCCESS,
        data: response?.data?.url,
        slug
      });
      if (slug == "quardinator") {
        console.log("working")
        setObject({ ...object, image: response?.data?.url })
      } else if (slug == "centreOuterImage") {
        setObject({
          ...object,
          centrePhoto: {
            inner:object?.centrePhoto?.inner,
            outer: response?.data?.url
          }
        })
      } else if (slug == "centreInnerImage") {
        setObject({
          ...object,
          centrePhoto: {
            outer:object?.centrePhoto?.outer,
            inner: response?.data?.url
          }
        })
      }

    } else {
      toast.error(response?.data?.message)

      yield put({
        type: types.UPLOAD_IMAGE_FAIL,
        data: response?.data?.data,
      });
    }
  } catch (error) {
    yield put({ type: types.UPLOAD_IMAGE_FAIL });
    console.log(error.message)
  }
}