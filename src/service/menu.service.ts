import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Menu from 'src/type/menu';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private http: HttpClient) {}

  getMenuList(): Observable<any> {
    return this.http.get<any>('https://localhost:7040/api/v1/Menu');
  }

  createMenu(
    type: 'to' | 'after' | 'none',
    menu: Menu | undefined,
    menuContent: string
  ): Observable<any> {
    let data;
    if (type === 'after') {
      data = { content: menuContent, subRight: menu?.rgt };
    }
    if (type === 'to') {
      data = { content: menuContent, parent_ID: menu?.id };
    }
    if (type === 'none') {
      data = { content: menuContent };
    }
    return this.http.post<any>('https://localhost:7040/api/v1/Menu', data);
  }

  updateMenu(id: number | undefined, content: string): Observable<any> {
    return this.http.patch<any>('https://localhost:7040/api/v1/Menu', {
      id,
      content,
    });
  }

  deleteMenu(id: number | undefined): Observable<any> {
    return this.http.delete<any>('https://localhost:7040/api/v1/Menu', {
      body: { id },
    });
  }
}
