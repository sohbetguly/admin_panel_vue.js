const myUsername = "sohbetguly";
const myPassword = "sohbet";

// const logKey = {
//   admin: {
//     token: 'admin-token'
//   }
// }

var deviceList = [];
// [JSON.parse(localStorage.getItem('deviceList'))]
const tokens = {
  admin: {
    token: "admin-token"
  },
  editor: {
    token: "editor-token"
  }
};

const users = {
  "admin-token": {
    roles: ["admin"],
    introduction: "I am a super administrator",
    avatar:
      "https://www.seekpng.com/png/detail/134-1344871_free-icons-png-settings-icon-png-green.png",
    name: "Super Admin"
  },
  "editor-token": {
    roles: ["editor"],
    introduction: "I am an editor",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "Normal Editor"
  }
};

module.exports = [
  // check signup

  {
    url: "/vue-element-admin/user/checkSignup",
    type: "post",
    response: config => {
      if (config) {
        return {
          message: config.body.deviceId + " ulanyjy adyňyz nädogry"
        };
      }
      return {
        code: 20000,
        data: "success"
      };
    }
  },

  // sign up
  {
    url: "/vue-element-admin/user/signup",
    type: "post",
    response: config => {
      // for (let i = 0; i < deviceList.length; i++) {
      //   const element = deviceList[i];
      //   if (element.enjamId === config.body.enjamId) {
      //     return {
      //       message: element.enjamId + " Enjam ID ozal girizilen"
      //     };
      //   }
      // }

      return {
        code: 20000,
        data: "success"
      };
    }
  },

  // user login
  {
    url: "/vue-element-admin/user/login",
    type: "get",
    response: config => {
      // const { username } = config.body;
      // const { password } = config.body;
      // // const token = tokens[username]
      // if (myPassword !== password || myUsername !== username) {
      //   return {
      //     code: 60204,
      //     message: "Ulanyjy adňyz ýa-da açar sözüňiz nädogry."
      //   };
      // }
      // mock error
      // if (!token) {
      //   return {
      //     code: 60204,
      //     message: 'Ulanyjy adňyz nädogry.'
      //   }
      // }

      return {
        code: 20000,
        data: tokens["admin"]
        // data: token
      };
    }
  },

  // get user info
  {
    url: "/vue-element-admin/user/info.*",
    type: "get",
    response: config => {
      const { token } = config.query;
      const info = users[token];

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: "Login failed, unable to get user details."
        };
      }

      return {
        code: 20000,
        data: info
      };
    }
  },

  // user logout
  {
    url: "/vue-element-admin/user/logout",
    type: "post",
    response: _ => {
      return {
        code: 20000,
        data: "success"
      };
    }
  }
];
