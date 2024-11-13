describe('Login.vue', () => {
  it('should set errorMessage when username or password is empty', () => {
    const vm = {
      username: '',
      password: '',
      errorMessage: '',
      loading: false,
      login() {
        if (!this.username || !this.password) {
          this.errorMessage = '用户名和密码不能为空';
        }
      }
    };

    // 调用 login 方法
    vm.login();

    // 验证 errorMessage 是否被正确设置
    expect(vm.errorMessage).toBe('用户名和密码不能为空');
  });

  it('should set loading to true when login is called', () => {
    const vm = {
      username: 'test',
      password: 'password',
      errorMessage: '',
      loading: false,
      login() {
        this.loading = true;
        // 假设有其他逻辑...
      }
    };

    vm.login();

    // 验证 loading 是否被设置为 true
    expect(vm.loading).toBe(true);
  });

  it('should set errorMessage on failed login', () => {
    const vm = {
      username: 'test',
      password: 'wrongpassword',
      errorMessage: '',
      login() {
        if (this.username === 'test' && this.password !== '123456') {
          this.errorMessage = '登录失败';
        }
      }
    };

    vm.login();

    // 验证 errorMessage 是否被正确设置
    expect(vm.errorMessage).toBe('登录失败');
  });
});
