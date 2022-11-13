const tokenService = {
  getTokenInfo: function() {
    return localStorage.getItem("token") || '';
  },
  setTokenInfo: function(token:string) {
    localStorage.setItem("token", token);
  }
};

export { tokenService };
