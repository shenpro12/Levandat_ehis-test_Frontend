export default interface Menu {
  id: number;
  content: string;
  lft: number;
  rgt: number;
  childrens: Array<Menu> | null;
  parentID: number | null;
  parent: Menu | null;
}
