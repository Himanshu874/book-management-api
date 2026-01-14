export const sendResponse = (
  res: any,
  status: number,
  message: string,
  notify: boolean,
  data: any = null
) => {
  return res.status(status).json({ message, status, notify, data });
};
