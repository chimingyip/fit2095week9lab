import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {

  constructor(private http: HttpClient) { }

  getMovies() {
    return this.http.get("/movies");
  }

  getMovie(id: string) {
    let url = "/movies/" + id;
    return this.http.get(url);
  }

  deleteMovie(title: string) {
    let url = "/movies/" + title;
    return this.http.delete(url, httpOptions);
  }

  deleteMoviesByYear(aYear1: number, aYear2: number){
    let url = '/movies/' + aYear1 + '/' + aYear2;
    return this.http.delete(url, httpOptions);
  }

  // deleteMovieByTitle(title: string) {
  //   let url = '/movies/' + title;
  //   return this.http.delete(url, httpOptions)
  // }

  addActorToMovie(data: any, id: string){
    let url = '/movies/' + id + '/actors';
    return this.http.post(url, data, httpOptions)
  }

  addMovieToActor(data: any, id: string){
    let url = '/actors/' + id + '/movies'
    return this.http.post(url, data, httpOptions)
  }

  getActors() {
    return this.http.get("/actors");
  }

  getActor(id: string) {
    let url = "/actors/" + id;
    return this.http.get(url);
  }

  createActor(data: any) {
    return this.http.post("/actors", data, httpOptions);
  }

  createMovie(data: any) {
    return this.http.post("/movies", data, httpOptions);
  }

  updateActor(id: string, data: any) {
    let url = "/actors/" + id;
    return this.http.put(url, data, httpOptions);
  }

  deleteActor(id: string) {
    let url = "/actors/" + id;
    return this.http.delete(url, httpOptions);
  }
}
