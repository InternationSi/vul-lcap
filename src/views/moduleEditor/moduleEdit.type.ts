export interface ModuleType {
  module_key: string;
  category: string;
  module_name: string;
  namespace_id: string;
}
export interface ModuleField {
  field_key: string; //表格名称
  field_name: string; //表格标题
  field_type: string; //表格类型
  is_primary: boolean; //表格是否主键
  is_unique: boolean; //表格是否唯一
  is_required: boolean; //是否必输
  module_id: string; //模型id
}
