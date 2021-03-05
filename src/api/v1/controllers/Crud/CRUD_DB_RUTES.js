function CRUD_DB_RUTES(router, index, Controller) {
  const {
    GetAll,
    GetViewAll,
    SearchPk,
    SearchOne,
    SearchMany,
    Create,
    Update,
    Delete
  } = Controller;

  // * get
  router.get(`/${index}/GetAll`, GetAll);
  router.get(`/${index}/:id`, SearchPk);
  router.get(`/${index}/:dato`, SearchOne);
  router.get(`/${index}/:dato`, SearchMany);
  router.get(`/${index}/GetViewAll`, GetViewAll);
  // * post
  router.post(`/${index}/Create`, Create);
  // * put
  router.put(`/${index}/Update`, Update);
  // * delete
  router.delete(`/${index}/Delete/:id`, Delete);
}

module.exports = CRUD_DB_RUTES;
