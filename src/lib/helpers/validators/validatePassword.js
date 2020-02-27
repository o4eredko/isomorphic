const passwordMatch = new RegExp(
  "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
);

const validatePassword = (rule, value, callback) => {
  if (value && !passwordMatch.test(value))
    callback('Password is too simple');
  else
    callback();
};

export default validatePassword;
