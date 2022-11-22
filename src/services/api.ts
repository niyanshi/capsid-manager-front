import http from './http';
const prefix = '/api';

type IParams = Record<string, unknown>;
type IResponseDto = {
  code: number;
  msg: string;
  data: any;
};

/** 登录接口 */
export const httpLogin = async (data: IParams): Promise<IResponseDto> => {
  const formData = new FormData();
  formData.append('phone', data.phone as string);
  formData.append('password', data.password as string);

  const res = await http.post(`${prefix}/v1/password_login`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

/** 获取当前用户接口 */
export const httpGetCurrentUser = async (): Promise<IResponseDto> => {
  const res = await http.get(`${prefix}/v1/login/info`);
  return res.data;
};

/** 获取wear列表 */
export const httpWearList = async (data: IParams): Promise<IResponseDto> => {
  const res = await http.get(`${prefix}/wear`, {
    params: { ...data },
  });
  return res.data;
};

/**下载接口 */
export const httpDownloadZip = async (data: IParams) => {
  const res = await http.get(`${prefix}/wear/downloadZip`, {
    params: { ...data },
    responseType: 'blob',
  });
  const blob = new Blob([res.data]);
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = objectUrl;
  link.download = `assets.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(objectUrl);
};

/** 上传图片接口 */
export const httpUpload = async (id: string, data: FormData) => {
  const res = await http.post(`${prefix}/wear/upload`, data, {
    params: { id },
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};
