import api from "./apiInstance";
export const saveCourses = (data) => api.post("/admin/course",data);
export const getCourse=()=>api.get("/admin/course");
export const deleteCourses=(id)=>api.delete(`/admin/course?id=${id}`);
export const updateCourses=(id,data)=>api.put(`/admin/course?id=${id}`,data);
export const getModuleDetails=(id)=>api.get(`/admin/module?id=${id}`);
export const saveModule=(data)=>api.post("/admin/module",data);
export const updateModule=(id,data)=>api.put(`/admin/module?id=${id}`,data);
export const deleteModule=(id)=>api.delete(`/admin/module?id=${id}`);
export const getAdminQuestion=(id)=>api.get(`/admin/questions?id=${id}`);
export const saveAdminQuestion=(id,data)=>api.post(`/admin/questions?id=${id}`,data);
export const updateAdminQuestion=(id,data)=>api.put(`/admin/questions?id=${id}`,data);
export const deleteAdminQuestion=(id,questionid)=>api.delete(`/admin/questions?id=${id}&questionid=${questionid}`);
export const uploadImage=(data)=>api.post(`/upload-image`,data);

export const getAdminQuardinator=()=>api.get(`/admin/centre/quardinator`);
export const saveAdminQuardinator=(data)=>api.post(`/admin/centre/quardinator`,data);
export const updateAdminQuardinator=(id,data)=>api.put(`/admin/centre/quardinator?id=${id}`,data);
export const deleteAdminQuardinator=(id)=>api.delete(`/admin/centre/quardinator?id=${id}`);

export const getAdminCentre=()=>api.get(`admin/centre`);
export const updateAdminCentre=(data)=>api.put(`admin/centre`,data);
export const saveAdminCentre=(id,data)=>api.post(`admin/centre?id=${id}`,data);
export const deleteAdminCentre=(id)=>api.delete(`admin/centre?id=${id}`);