const users = [];

function registerUser({ email, password }) {
  const existing = users.find((user) => user.email === email);
  if (existing) {
    const error = new Error("Email already registered");
    error.statusCode = 409;
    throw error;
  }

  const user = {
    id: users.length + 1,
    email,
    password
  };
  users.push(user);

  return { id: user.id, email: user.email };
}

function loginUser({ email, password }) {
  const user = users.find((item) => item.email === email && item.password === password);
  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  return {
    token: `mock-jwt-token-${user.id}`,
    user: { id: user.id, email: user.email }
  };
}

module.exports = {
  registerUser,
  loginUser
};
