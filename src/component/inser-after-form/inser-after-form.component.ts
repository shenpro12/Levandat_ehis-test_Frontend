import { Component, OnInit } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { ActionEvent } from 'src/helper/actionEvent';
import { ToggleEvent } from 'src/helper/toggleEvent';
import { MenuService } from 'src/service/menu.service';
import Menu from 'src/type/menu';

@Component({
  selector: 'app-inser-after-form',
  templateUrl: './inser-after-form.component.html',
  styleUrls: ['./inser-after-form.component.css'],
})
export class InserAfterFormComponent implements OnInit {
  toggleStatus: boolean = false;
  menu: Menu | undefined;
  inserType: 'to' | 'after' | 'none' = 'none';
  menuContentInput: string = '';
  faClose = faClose;

  constructor(
    private toggleEvent: ToggleEvent,
    private actionEvent: ActionEvent,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.toggleEvent.onToggleInsertForm(
      (status: boolean, type: 'to' | 'after' | 'none', menu: Menu) => {
        this.toggleStatus = status;
        this.menu = menu;
        this.inserType = type;
        if (!status) {
          this.menuContentInput = '';
        }
      }
    );
  }

  closeInserFormHandle() {
    this.toggleEvent.toggleInsertForm();
  }

  createMenuHanle() {
    this.menuService
      .createMenu(this.inserType, this.menu, this.menuContentInput)
      .subscribe((res) => {
        this.closeInserFormHandle();
        this.actionEvent.createMenu(res.data.menu);
      });
  }
}
