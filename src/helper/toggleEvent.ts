import { Injectable } from '@angular/core';
import Menu from 'src/type/menu';
@Injectable({
  providedIn: 'root',
})
export class ToggleEvent {
  private toggleInsertFormStatus: boolean = false;
  private insertFormSubCriber: Array<any> = [];

  private toggleUpdateFormStatus: boolean = false;
  private updateFormSubCriber: Array<any> = [];

  private toggleDeleteModalStatus: boolean = false;
  private deleteModalSubCriber: Array<any> = [];

  onToggleInsertForm(subcriber: any) {
    this.insertFormSubCriber.push(subcriber);
  }

  toggleInsertForm(type?: 'after' | 'to' | 'none', menu?: Menu) {
    this.toggleInsertFormStatus = !this.toggleInsertFormStatus;
    this.insertFormSubCriber.map((sub) =>
      sub(
        this.toggleInsertFormStatus,
        type ? type : undefined,
        menu ? menu : undefined
      )
    );
  }

  onToggleUpdateForm(subcriber: any) {
    this.updateFormSubCriber.push(subcriber);
  }

  toggleUpdateForm(menu?: Menu) {
    this.toggleUpdateFormStatus = !this.toggleUpdateFormStatus;
    this.updateFormSubCriber.map((sub) =>
      sub(this.toggleUpdateFormStatus, menu)
    );
  }

  onToggleDeleteModal(subcriber: any) {
    this.deleteModalSubCriber.push(subcriber);
  }

  toggleDeleteModal(menu?: Menu) {
    this.toggleDeleteModalStatus = !this.toggleDeleteModalStatus;
    this.deleteModalSubCriber.map((sub) =>
      sub(this.toggleDeleteModalStatus, menu)
    );
  }
}
