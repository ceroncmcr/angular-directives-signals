import { Component, OnDestroy, OnInit, computed, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-properties-page',
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css'
})
export class PropertiesPageComponent implements OnInit, OnDestroy {

  public counter = signal(10);

  public user = signal<User>({
    email: 'janet.weaver@reqres.in',
    id:2,
		first_name: 'Janet',
		last_name: 'Weaver',
		avatar: 'https://reqres.in/img/faces/2-image.jpg'
  });

  public fullName = computed(() => {
    return `${ this.user().first_name } ${ this.user().last_name }`;
  });

  public userChangedEffect = effect( () => {
    // console.log( 'userChangedEffect' );

    console.log( `${ this.user().first_name } - ${ this.counter() }` );

  });

  ngOnInit(): void {
    setInterval( () => {
      this.counter.update( c => c + 1 );

      // if( this.counter() === 15)
      //   this.userChangedEffect.destroy();
    }, 1000)
  }
  ngOnDestroy(): void {
    this.userChangedEffect.destroy();
  }

  increaseBy( value: number ) {
    this.counter.update( c => c + value );
  }

  onFieldUpdated( field: keyof User, value: string ) {

    // this.user.set({
    //   ...this.user(),
    //   [field]: value
    // });

    // this.user.update( current => ({
    //   ...current,
    //   [field]: value
    // }))

    this.user.update( current => {
      switch( field) {
        case 'email':
          current.email = value;
          break;
        case 'first_name':
          current.first_name = value;
          break;
        case 'last_name':
          current.last_name = value;
          break;
      }

      return current;
    });

  }
}
