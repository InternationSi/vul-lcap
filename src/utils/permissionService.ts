const permissionService = {
  get: function() {
    return JSON.parse(localStorage.getItem("permission")||'{}');
  },
  set: function(data:any) {
    localStorage.setItem("permission", JSON.stringify(data));
  },
  check: function(needPermissions :any) {
    if (needPermissions && needPermissions.length > 0) {
      const data = this.get();
      if (!data) {
        return false;
      }

      const isSuperAdmin = data.isSuperAdmin;
      if (isSuperAdmin) {
        return true;
      }

      if (!data.permissions) {
        return false;
      }

      const permissions:any[] = data.permissions;
      const hasPermission = permissions.some(s => {
        return needPermissions.indexOf(s.authority) > -1;
      });

      return hasPermission;
    }
    return true;
  }
};

export { permissionService };
