export default class FotoService {
  constructor(resource) {
    this._resource = resource("v1/fotos{/id}");
  }

  lista() {
    return this._resource.query().then(res => res.json());
  }

  apaga(id) {
    return this._resource.delete({ id: id });
  }

  cadastra(foto) {
    if(foto._id){
      return this._resource.update({id: foto._id}, foto)
    }else{
      return this._resource.save(foto);
    }

    
  }

  busca(id) {

    return this._resource
        .get({ id: id })
        .then(res => res.json());
  }
}