import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[lpCourseCardHighlight]'
})
export class CourseCardHighlightDirective implements OnInit {
  @Input() creationDate: string | number;
  private dayInMs = 1000 * 60 * 60 * 24;
  private highlights = {
    recent: 'rgba(39, 137, 61, 0.5)',
    upcoming: 'rgba(50, 118, 212, 0.5)'
  };

  constructor(private element: ElementRef) {
  }

  ngOnInit(): void {
    const daysSinceCreated = (Date.now() - new Date(this.creationDate).getTime()) / this.dayInMs;

    if (daysSinceCreated < 0) {
      this.element.nativeElement.style.borderLeft = `4px solid ${ this.highlights.upcoming }`;
    } else if (daysSinceCreated < 14) {
      this.element.nativeElement.style.borderLeft = `4px solid ${ this.highlights.recent }`;
    }
  }

}
