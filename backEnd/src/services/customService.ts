import jwt from 'jsonwebtoken';

export const jwtExtract = (token: any) => {
  return jwt.verify(token, "furtive")
};

export const isAuthenticate = (token: any) => {
  let decoded = jwtExtract(token);
  console.log(decoded);
};

// isAdmin(){

// }

// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IiQyYiQxMiRGRHp2OEljREhVci9RREZGazd4WG0uS3lsbHVmVUhIbGFKRVo5VmJOTklNd3k2Q3ZNSXhraSIsImlkIjoiJDJiJDEyJDE4VFNGQ29oWTBPS0dxc25CeXlkSXVuUXMvdjNhMC9BZTJzaXlsWS5iUlVxOEZRVm9wbUlHIiwiaWF0IjoxNjY4NDgyNjY5LCJleHAiOjE2Njg1NjkwNjl9.azVJxFZJrG16ZtEjvz5Z3_3IfO4TDk-QQkK0Z9AtZM4"