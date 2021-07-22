import http from "../http-common";

class PersonDataService {
  getAll(page, size, clan) {
    return http.get(`/person?page=${page}&size=${size}&clan=${clan}`);
  }

  get(id) {
    return http.get(`/person/${id}`);
  }

  create(data) {
    return http.post("/person", data);
  }

  update(id, data) {
    return http.put(`/person/${id}`, data);
  }

  delete(id) {
    return http.delete(`/person/${id}`);
  }

  deleteAll() {
    return http.delete(`/person`);
  }

  findByTitle(title) {
    return http.get(`/person?title=${title}`);
  }
}

export default new PersonDataService();