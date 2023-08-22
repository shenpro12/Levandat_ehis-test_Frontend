import { Component, Input, OnInit } from '@angular/core';
import {
  faAngleDown,
  faAngleUp,
  faEdit,
  faTrashAlt,
  faArrowTurnDown,
  faPlusSquare,
} from '@fortawesome/free-solid-svg-icons';
import { ActionEvent } from 'src/helper/actionEvent';
import { ToggleEvent } from 'src/helper/toggleEvent';
import Menu from 'src/type/menu';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
})
export class MenuItemComponent implements OnInit {
  @Input() menu: Menu | undefined;
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faArrowTurnDown = faArrowTurnDown;
  faPlusSquare = faPlusSquare;
  toggleChildren: boolean = false;

  constructor(
    private toggleEvent: ToggleEvent,
    private actionEvent: ActionEvent
  ) {}

  ngOnInit(): void {
    this.menu?.childrens?.sort((a, b) => a.lft - b.lft);
    this.actionEvent.onCreateMenu((newMenu: Menu) => {
      //update self lft and rgt
      if (!newMenu.parentID && this.menu) {
        if (this.menu.lft >= newMenu.lft) {
          this.menu.lft += 2;
        }
        if (this.menu.rgt >= newMenu.rgt) {
          this.menu.rgt += 2;
        }
      } else if (newMenu.parentID && this.menu) {
        if (this.menu.lft >= newMenu.lft) {
          this.menu.lft += 2;
        }
        if (this.menu.rgt >= newMenu.rgt || this.menu.rgt + 1 == newMenu.rgt) {
          this.menu.rgt += 2;
        }
      }
      //check children and update child list
      if (this.menu && this.menu.id == newMenu.parentID) {
        if (this.menu.childrens) {
          this.menu.childrens.push(newMenu);
        } else {
          this.menu.childrens = [newMenu];
        }
      }
    });
    //
    this.actionEvent.onUpdateMenu((menu: Menu) => {
      if (this.menu?.id == menu.id) {
        this.menu.content = menu.content;
      }
    });
    //
    this.actionEvent.onDeleteMenu((delMenu: Menu) => {
      let width = delMenu.rgt - delMenu.lft + 1;
      if (this.menu) {
        if (this.menu.lft >= delMenu.lft) {
          this.menu.lft -= width;
        }
        if (this.menu.rgt >= delMenu.rgt) {
          this.menu.rgt -= width;
        }
        if (this.menu.id == delMenu.parentID && this.menu.childrens) {
          this.menu.childrens = this.menu.childrens.filter(
            (i) => i.id != delMenu.id
          );
          if (!this.menu.childrens.length) {
            this.menu.childrens = null;
          }
        }
      }
    });
  }

  toggleChildrenHandle(): void {
    this.toggleChildren = !this.toggleChildren;
  }

  insertMenuHandle(type: 'after' | 'to' | 'none'): void {
    this.toggleEvent.toggleInsertForm(type, this.menu);
  }

  updateMenuHandle(): void {
    this.toggleEvent.toggleUpdateForm(this.menu);
  }

  deleteMenuHandle(): void {
    this.toggleEvent.toggleDeleteModal(this.menu);
  }
}
