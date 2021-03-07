module.exports = {
  it: (description, fn) => {
    try {
      fn();
      console.log("Test successfully ");
    } catch (err) {
      console.log(err);
      console.log("Something was wrong");
    }
  }
};
