export interface Moduletype {
  label: string;
  category: string;
  updateUser: string;
  meta: object;
}
export interface moduleField {
  fieldName: string; //表格名称
  label: string; //表格标题
  selfType: string; //表格类型
  isPrimary: boolean; //表格是否主键
  isUnique: boolean; //表格是否唯一
}
