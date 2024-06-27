import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  //private htmlElement?: ElementRef<HTMLElement>;
  private _color : string = 'red';
  private _errors?: ValidationErrors | null;

  @Input()
  public set color( value: string ) {
    this._color = value;
    this.setStyle();
  }

  @Input()
  public set errors( value : ValidationErrors | null | undefined ) {
    this._errors = value;
    this.setErrorMessage();
  }

  constructor(private htmlElement: ElementRef<HTMLElement>) {
    // console.log(this.el);

  }
  ngOnInit(): void {
    this.setStyle();
  }

  setStyle(): void {
    this.htmlElement.nativeElement.style.color = this._color;
  }

  setErrorMessage(): void {

    if ( !this._errors ) {
      this.htmlElement.nativeElement.innerText = 'No hay errores';
      return;
    }

    const errors = Object.keys(this._errors);

    if( errors.includes('required') ) {
      this.htmlElement.nativeElement.innerText = 'Este campo es requerido';
      return;
    }
    if( errors.includes('minlength') ) {
      const minLength = this._errors['minlength']['requiredLength'];
      this.htmlElement.nativeElement.innerText = `Este campo debe tener al menos ${minLength} caracteres`;
      return;
    }
    if( errors.includes('email') ) {
      this.htmlElement.nativeElement.innerText = 'Este campo debe ser un correo';
      return;
    }

  }

}
