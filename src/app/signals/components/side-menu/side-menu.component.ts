import { Component, signal } from '@angular/core';

interface MenuItem {
  name: string;
  route: string;
}


@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  public menuItems = signal<MenuItem[]>([
    { name: 'Counter', route: 'counter' },
    { name: 'User Info', route: 'user-info' },
    { name: 'Properties', route: 'properties' }
  ]);

  // public menuItems: MenuItem[] = [
  //   { name: 'Counter', route: 'counter' },
  //   { name: 'User Info', route: 'user-info' },
  //   { name: 'Properties', route: 'properties' }
  // ];
}
