import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
  JsonpClientBackend,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _apiKey: string = 'sFunm2rdSEnLN4IySd8hyAjAbC3Rq7MG';
  private _apiUrl: string = 'http://api.giphy.com/v1/gifs';
  // private _apiUrl: string = `https://api.giphy.com/v1/gifs/search?api_key=sFunm2rdSEnLN4IySd8hyAjAbC3Rq7MG&q=${query}&limit=10`;
  private _historial: string[] = [];
  public resultados: Gif[] = [];

  get getHistorial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('results')!) || [];
  }

  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http
      .get<SearchGifsResponse>(`${this._apiUrl}/search`, { params })
      .subscribe((resp) => {
        this.resultados = resp.data;
        localStorage.setItem('results', JSON.stringify(this.resultados));
      });
  }
}
