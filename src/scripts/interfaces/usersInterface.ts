enum Users {
  name = 'name',
  email = 'email',
  password = 'password',
}

enum Auth {
  message = 'message',
  token = 'token',
  refreshToken = 'refreshToken',
  userId = 'userId',
  name = 'name',
}

interface IAuth {
  message: string,
  token: string,
  refreshToken: string,
  userId: string,
  name: string,
}

interface IUserObjBody {
  email: string,
  password: string,
  name?: string,
}

enum StorageItems {
  id = 'rslangID',
  name = 'name',
  token = 'rslangToken',
  refreshToken = 'rslangRefreshToken',
}

export {
  IAuth, Auth, Users, IUserObjBody, StorageItems,
};
