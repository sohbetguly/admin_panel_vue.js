
// const userList = [
//   {
//     userName: 'Fiat',
//     model: '500',
//     color: 'white'
//   }

// ]

module.exports = [
  // user login
  {
    url: '/vue-element-admin/Enjamlar/birikdir',
    type: 'post',
    response: config => {
    //   const { username } = config.body
    //   const { password } = config.body
      console.log(config.body)
    }
  }

  // get user info

  // user logout

]
