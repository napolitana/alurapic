export default class FotoService {
  constructor(resource) {
    this._resource = resource("v1/fotos/{/id}");
  }

  lista() {
    return this._resource.query().then(res => res.json());
  }

  apaga(id) {
    return this._resource.delete({ id: id });
  }

  cadastra(foto) {
    return this._resource.save(foto);
  }
}
