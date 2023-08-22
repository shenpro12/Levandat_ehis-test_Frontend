import { Component, OnInit } from '@angular/core';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { ActionEvent } from 'src/helper/actionEvent';
import { ToggleEvent } from 'src/helper/toggleEvent';
import { MenuService } from 'src/service/menu.service';
import Menu from 'src/type/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'frontend';
  menuList: Array<Menu> = [];
  faPlusSquare = faPlusSquare;
  constructor(
    private menuService: MenuService,
    private toggleEvent: ToggleEvent,
    private actionEvent: ActionEvent
  ) {}

  ngOnInit(): void {
    this.menuService
      .getMenuList()
      .subscribe(
        (res) =>
          (this.menuList = [...res.data.menuList].sort((a, b) => a.lft - b.lft))
      );
    this.actionEvent.onCreateMenu((menu: Menu) => {
      if (menu.parentID == null) {
        let index = this.menuList.findIndex((i) => i.rgt == menu.lft - 1);
        this.menuList.splice(index + 1, 0, menu);
      }
    });
    this.actionEvent.onDeleteMenu((delMenu: Menu) => {
      if (delMenu.parentID == null) {
        this.menuList = this.menuList.filter((i) => i.id != delMenu.id);
      }
    });
  }

  insertMenuHandle(type: 'after' | 'to' | 'none'): void {
    this.toggleEvent.toggleInsertForm(type);
  }
}
