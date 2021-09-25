import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  moviesDB: any[] = [];
  section = 1;
  movieId: string = "";
  title: string = "";
  year: number = 0;
  aYear1: number = 0;
  aYear2: number = 0;
  actors: Object[] = [];
  actorsDB1: any[] = [];
  actorl: string = '';
  x: any;
  i: any;
  j: any;
  aTitle: string = "";

  constructor(private dbService: DatabaseService) { }

  ngOnInit() {
    this.onGetMovies();
  }

  // Get all movies
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any) => {
      this.moviesDB = data;
    });
  }

  // Create a new movie, POST request
  onSaveMovie() {
    let obj = { title: this.title, year: this.year};
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    })
  }

  // Add actor to movie
  onAddActorToMovie() {
    let actorObj = { id: this.x._id };
    let movieObj = { id: this.i._id };
    this.dbService.addActorToMovie(actorObj, this.i._id).subscribe(result => {
      this.dbService.addMovieToActor(movieObj, this.x._id).subscribe(result => {
        this.onGetMovies();
      });
      this.onGetMovies();
    })
  }

  onActiveActors(){
    this.dbService.getActors().subscribe((data: any)=>{
      this.actorsDB1 = data;
      this.onGetMovies();
    })
  }

  onDeleteMovie(title: string) {
    this.dbService.deleteMovie(title).subscribe(result => {
      this.onGetMovies();
    })
  }

  // Delete Movies by Year
  onDeleteMoviesByYear(aYear1: number, aYear2: number) {
    this.dbService.deleteMoviesByYear(aYear1, aYear2).subscribe(result => {
      this.onGetMovies();
    });
  }

  changeSection(sectionId: number) {
    this.section = sectionId;
    this.resetValues();
    this.onActiveActors();
  }

  resetValues() {
    this.movieId = "";
    this.title = "";
    this.year = 0;
    this.actors = [];
  }
}
