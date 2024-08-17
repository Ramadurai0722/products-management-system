const users = [
    { username: 'admin', role: 'admin', password: '123' },
    { username: 'biller1', role: 'biller', password: '098' }
  ];
  
  function findUserByUsernameAndPassword(username, password) {
    return users.find(user => user.username === username && user.password === password);
  }
  
  module.exports = {
    findUserByUsernameAndPassword
  };
  