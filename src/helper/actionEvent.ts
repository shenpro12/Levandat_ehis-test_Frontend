import { Injectable } from '@angular/core';
import Menu from 'src/type/menu';
@Injectable({
  providedIn: 'root',
})
export class ActionEvent {
  private createMenuSubcriber: Array<any> = [];
  private updateMenuSubcriber: Array<any> = [];
  private deleteMenuSubcriber: Array<any> = [];

  public onCreateMenu(callback: any) {
    this.createMenuSubcriber.push(callback);
  }

  public createMenu(menu: Menu) {
    this.createMenuSubcriber.map((subCriber) => subCriber(menu));
  }

  public onUpdateMenu(callback: any) {
    this.updateMenuSubcriber.push(callback);
  }

  public updateMenu(menu: Menu) {
    this.updateMenuSubcriber.map((subCriber) => subCriber(menu));
  }

  public onDeleteMenu(callback: any) {
    this.deleteMenuSubcriber.push(callback);
  }

  public deleteMenu(menu: Menu) {
    this.deleteMenuSubcriber.map((subCriber) => subCriber(menu));
  }
}
