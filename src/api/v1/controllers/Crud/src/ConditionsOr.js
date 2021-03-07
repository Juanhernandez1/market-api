// * retorna un arregló con las consultas like
function ConditionsOr(cond, search, Op) {
  console.log(cond);
  const or = [];
  let condicionLike;
  cond.forEach(element => {
    condicionLike = {
      [element]: {
        [Op.like]: `%${search}%`
      }
    };
    or.push(condicionLike);
  });
  return or;
}

module.exports = ConditionsOr;
