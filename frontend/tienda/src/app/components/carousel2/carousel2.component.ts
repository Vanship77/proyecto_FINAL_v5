import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel2',
  templateUrl: './carousel2.component.html',
  styleUrls: ['./carousel2.component.css']
})
export class Carousel2Component {
  categorias = ['Tokines', 'Talleres', 'Ferias', 'Conciertos', 'Cine', 'Todos'];

  // Opcional: imágenes asociadas a cada categoría (puedes ajustar URLs)
  imagenes = [
    'https://picsum.photos/id/1015/300/400',
    'https://picsum.photos/id/1016/300/400',
    'https://picsum.photos/id/1018/300/400',
    'https://picsum.photos/id/1020/300/400',
    'https://picsum.photos/id/1024/300/400',
    'https://picsum.photos/id/1027/300/400'
  ];
}
