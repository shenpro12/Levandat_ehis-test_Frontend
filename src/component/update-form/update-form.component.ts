import { Component, OnInit } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { ActionEvent } from 'src/helper/actionEvent';
import { ToggleEvent } from 'src/helper/toggleEvent';
import { MenuService } from 'src/service/menu.service';
import Menu from 'src/type/menu';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css'],
})
export class UpdateFormComponent implements OnInit {
  toggleStatus: boolean = false;
  menu: Menu | undefined;
  menuContentInput: string = '';
  faClose = faClose;

  constructor(
    private toggleEvent: ToggleEvent,
    private actionEvent: ActionEvent,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.toggleEvent.onToggleUpdateForm((status: boolean, menu: Menu) => {
      this.toggleStatus = status;
      this.menu = menu;
      if (menu) {
        this.menuContentInput = menu.content;
      } else {
        this.menuContentInput = '';
      }
    });
  }

  closeUpdateFormHandle() {
    this.toggleEvent.toggleUpdateForm();
  }

  updateMenuHanle() {
    this.menuService
      .updateMenu(this.menu?.id, this.menuContentInput)
      .subscribe((res) => {
        this.actionEvent.updateMenu(res.data.menu);
        this.closeUpdateFormHandle();
      });
  }
}
