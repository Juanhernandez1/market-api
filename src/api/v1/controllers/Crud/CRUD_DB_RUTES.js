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
  router.get(`/${index}/GetAll/:visibility`, GetAll);
  router.get(`/${index}/SearchPk/:id`, SearchPk);
  router.get(`/${index}/SearchOne/:dato`, SearchOne);
  router.get(`/${index}/SearchMany/:dato`, SearchMany);
  router.get(`/${index}/GetView`, GetViewAll);
  // * post
  router.post(`/${index}/Create`, Create);
  // * put
  router.put(`/${index}/Update`, Update);
  // * delete
  router.delete(`/${index}/Delete/:id`, Delete);
}

module.exports = CRUD_DB_RUTES;
