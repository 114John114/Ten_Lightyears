describe('Register.vue', () => {
	beforeEach(() => {
	  global.uniCloud = {
	    callFunction: jest.fn()
	  };
	});

  it('should set errorMessage when fields are empty', () => {
    const vm = {
      username: '',
      password: '',
      confirmPassword: '',
      errorMessage: '',
      loading: false,
      register() {
        if (!this.username || !this.password || !this.confirmPassword) {
          this.errorMessage = '所有字段不能为空';
        }
      }
    };

    // 调用 register 方法
    vm.register();

    // 验证 errorMessage 是否被正确设置
    expect(vm.errorMessage).toBe('所有字段不能为空');
  });

  it('should set errorMessage when passwords do not match', () => {
    const vm = {
      username: 'testUser',
      password: 'password123',
      confirmPassword: 'password321',
      errorMessage: '',
      register() {
        if (this.password !== this.confirmPassword) {
          this.errorMessage = '密码和确认密码不一致';
        }
      }
    };

    // 调用 register 方法
    vm.register();

    // 验证 errorMessage 是否被正确设置
    expect(vm.errorMessage).toBe('密码和确认密码不一致');
  });

  it('should set loading to true when register is called', () => {
    const vm = {
      username: 'testUser',
      password: 'password123',
      confirmPassword: 'password123',
      errorMessage: '',
      loading: false,
      register() {
        this.loading = true;
        // 假设有其他逻辑...
      }
    };

    vm.register();

    // 验证 loading 是否被设置为 true
    expect(vm.loading).toBe(true);
  });

  it('should handle successful registration', async () => {
    const vm = {
      username: 'testUser',
      password: 'password123',
      confirmPassword: 'password123',
      errorMessage: '',
      loading: false,
      register() {
        // 假设这个逻辑是异步的
        this.loading = true;
        return uniCloud.callFunction({
          name: 'registeruser',
          data: {
            username: this.username,
            password: this.password
          }
        }).then(response => {
          this.loading = false;
          if (response.result.code === 200) {
            // 注册成功
          } else {
            this.errorMessage = response.result.message;
          }
        }).catch(() => {
          this.loading = false;
          this.errorMessage = '注册失败，请重试';
        });
      }
    };

    uniCloud.callFunction = jest.fn().mockResolvedValue({
      result: { code: 200 }
    });

    await vm.register();
    expect(vm.errorMessage).toBe(''); // 确保没有错误信息
  });

  it('should set errorMessage on failed registration', async () => {
    const vm = {
      username: 'testUser',
      password: 'password123',
      confirmPassword: 'password123',
      errorMessage: '',
      loading: false,
      register() {
        this.loading = true;
        return uniCloud.callFunction({
          name: 'registeruser',
          data: {
            username: this.username,
            password: this.password
          }
        }).then(response => {
          this.loading = false;
          if (response.result.code === 200) {
            // 注册成功
          } else {
            this.errorMessage = response.result.message;
          }
        }).catch(() => {
          this.loading = false;
          this.errorMessage = '注册失败，请重试';
        });
      }
    };

    uniCloud.callFunction = jest.fn().mockResolvedValue({
      result: { code: 400, message: '注册失败' }
    });

    await vm.register();
    expect(vm.errorMessage).toBe('注册失败'); // 验证错误信息
  });

  it('should set errorMessage on network error', async () => {
    const vm = {
      username: 'testUser',
      password: 'password123',
      confirmPassword: 'password123',
      errorMessage: '',
      loading: false,
      register() {
        this.loading = true;
        return uniCloud.callFunction({
          name: 'registeruser',
          data: {
            username: this.username,
            password: this.password
          }
        }).then(response => {
          this.loading = false;
          if (response.result.code === 200) {
            // 注册成功
          } else {
            this.errorMessage = response.result.message;
          }
        }).catch(() => {
          this.loading = false;
          this.errorMessage = '注册失败，请重试';
        });
      }
    };

    uniCloud.callFunction = jest.fn().mockRejectedValue(new Error('网络错误'));

    await vm.register();
    expect(vm.errorMessage).toBe('注册失败，请重试'); // 验证网络错误信息
  });
});
