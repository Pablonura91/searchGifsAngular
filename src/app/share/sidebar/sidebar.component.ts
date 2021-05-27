import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor(private gifsServices: GifsService) {  }

  get historial() {
    return this.gifsServices.getHistorial;
  }

  buscar(item: string) {
    this.gifsServices.buscarGifs(item);
  }
}
