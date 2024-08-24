interface IFormData {
  [key: string]: string | number | null;
}

interface IProcess {
  data: IFormData;
  processInstanceId: string;
  processCode: string;
}

// 定义 FormType 接口
interface IForm {
  formData: IFormData;
  formInstId: string;
}

export type FormType = "form" | "process";

export type IParams = {
  formUuid: string | null;
  currentPage?: number | null;
  pageSize?: number;
  searchFieldJson?: string | null;
};

// Conditional Types
type FormProps<T extends FormType> = T extends "form" ? IForm : IProcess;

type IResponse<T extends FormType> = {
  totalCount: number;
  data: Array<
    {
      gmtCreate: number;
      gmtModified: number;
      formUuid: string;
      originator?: {
        name: {
          zh_CN: string;
        };
        userId: string;
      };
    } & FormProps<T>
  >;
  currentPage: number;
  pageSize: number;
};

/** 数据源的状态 */
export declare enum RuntimeDataSourceStatus {
  /** 初始状态，尚未加载 */
  Initial = "init",
  /** 正在加载 */
  Loading = "loading",
  /** 已加载(无错误) */
  Loaded = "loaded",
  /** 加载出错了 */
  Error = "error",
}

export interface IDataSource<T extends FormType> {
  load: (params: IParams) => Promise<IResponse<T>>;
  readonly data?: IResponse<T>;
}

export interface IPublicTypeJSONObject {
  [key: string]: IPublicTypeJSONValue;
}
/**
 * JSON 基本类型
 */
export type IPublicTypeJSONValue =
  | boolean
  | string
  | number
  | null
  | undefined
  | IPublicTypeJSONArray
  | IPublicTypeJSONObject;

export type IPublicTypeJSONArray = IPublicTypeJSONValue[];

export interface JSExpression {
  type: string;
  value: string;
}

export interface DataSourceItem {
  id: string;
  isInit?: boolean | JSExpression;
  type?: string;
  options?: {
    uri: string | JSExpression;
    params?: IPublicTypeJSONObject | JSExpression;
    method?: string | JSExpression;
    shouldFetch?: string;
    willFetch?: string;
    fit?: string;
    didFetch?: string;
  };
  dataHandler?: JSExpression;
}
