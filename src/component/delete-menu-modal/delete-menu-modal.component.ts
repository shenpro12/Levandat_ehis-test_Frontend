import { Component, OnInit } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { ActionEvent } from 'src/helper/actionEvent';
import { ToggleEvent } from 'src/helper/toggleEvent';
import { MenuService } from 'src/service/menu.service';
import Menu from 'src/type/menu';

@Component({
  selector: 'app-delete-menu-modal',
  templateUrl: './delete-menu-modal.component.html',
  styleUrls: ['./delete-menu-modal.component.css'],
})
export class DeleteMenuModalComponent implements OnInit {
  toggleStatus: boolean = false;
  menu: Menu | undefined;
  faClose = faClose;

  constructor(
    private toggleEvent: ToggleEvent,
    private menuService: MenuService,
    private actionEvent: ActionEvent
  ) {}

  ngOnInit(): void {
    this.toggleEvent.onToggleDeleteModal((status: boolean, menu: Menu) => {
      this.toggleStatus = status;
      this.menu = menu;
    });
  }

  closeDeleteMenuModalHandle() {
    this.toggleEvent.toggleDeleteModal();
  }

  deleteMenuHanle() {
    this.menuService.deleteMenu(this.menu?.id).subscribe((res) => {
      this.actionEvent.deleteMenu(res.data.menu);
      this.closeDeleteMenuModalHandle();
    });
  }
}
