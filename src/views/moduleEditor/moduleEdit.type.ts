export interface Moduletype {
  module_key: string;
  category: string;
  module_name: string;
  namespace_id: string;
}
export interface moduleField {
  fieldName: string; //表格名称
  label: string; //表格标题
  selfType: string; //表格类型
  isPrimary: boolean; //表格是否主键
  isUnique: boolean; //表格是否唯一
  moduleName: string;
}
//更新数据
export interface updateModule {
  label: string;
  fieldName: string;
  selfType: string;
  isPrimary: boolean;
  isUnique: boolean;
  moduleName: string;
}
