export default {
  'POST /mock/login': {
    code: 0,
    msg: 'ok',
    data: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      account: '110110110',
      token: 'token',
    } as API.CurrentUser,
  },
  'GET /mock/login/currentUser': {
    code: 0,
    msg: 'ok',
    data: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      account: '110110110',
    } as API.CurrentUser,
  },
};
