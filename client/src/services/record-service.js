import http from "../http-common";
import { Subject } from 'rxjs';
export default class RecordDataService {
  subjectAllRecord = new Subject();
  subjectCreate = new Subject();
  subjectDelete = new Subject();

  getAll() {
    return http.get("/tutorials")
    .then((res) =>{
      this.subjectAllRecord.next(res['data'])
    })
    .catch((error) => {
      console.log(error)
    })
  }
  // get(id) {
  //   return http.get(`/tutorials/${id}`);
  // }
  create(data) {
    return http.post("/tutorials", data)
    .then((res)=>{
      this.subjectCreate.next(res['status'])
    })
    .catch((error)=>{
      console.log(error)
    });
  }
  // update(id, data) {
  //   return http.put(`/tutorials/${id}`, data);
  // }
  delete(id) {
    return http.delete(`/tutorials/${id}`)
    .then((res)=>{
      this.subjectDelete.next(res['status'])
    })
    .catch((error)=>{
      console.log(error)
    });
  }
  // deleteAll() {
  //   return http.delete(`/tutorials`);
  // }
  // findByTitle(title) {
  //   return http.get(`/tutorials?title=${title}`);
  // }
}