const userService = {
  getUserInfo: function() {
    return JSON.parse(localStorage.getItem("userInfo") || '{}');
  },
  setUserInfo: function(userInfo:object) {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }
};

export { userService };
