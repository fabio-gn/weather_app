import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-horizontal-carousel',
  templateUrl: './horizontal-carousel.component.html',
  styleUrls: ['./horizontal-carousel.component.scss']
})
export class HorizontalCarouselComponent implements AfterViewInit{

  @ViewChild('scrollContainer')
    sliderContainer!: ElementRef
    scrollNeeded:boolean = false
    x = 0

    ngAfterViewInit(){
      this.checkScrollNeeded();
    }

    checkScrollNeeded(){
      const container = this.sliderContainer.nativeElement;
      if(container.scrollWidth > container.clientWidth){ //se la scrollwidth è maggiore della larghezza del container la variabile di istanza scrollNeeded è vera
        this.scrollNeeded = true;
      } else {
        this.scrollNeeded = false;
      }

    }

    scrollLeft(){

      this.sliderContainer.nativeElement.scrollBy({left: -200, behavior: "smooth"});
      // this.x = this.sliderContainer.nativeElement.scrollLeft;

      // this.sliderContainer.nativeElement.scrollLeft = this.x - 800;
    }
    scrollRight(){
      this.sliderContainer.nativeElement.scrollBy({left: 200, behavior: "smooth"});
    }
}
