export function randomString(length = 8) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join('');
  }
  
  export function randomEmail() {
    return `test_${randomString(6)}@mail.com`;
  }
  
  export function randomUsername() {
    return `user_${randomString(6)}_${Date.now()}`;
  }  