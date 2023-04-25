import * as types from "../";
export const uploadImageAction = (data,slug,setObject=null,object=null) => ({
    type: types.UPLOAD_IMAGE,
    data,
    slug,
    setObject,
    object
  })