// * retorna un arregló con las consultas like
function ConditionsOr(cond, search, Op) {
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
