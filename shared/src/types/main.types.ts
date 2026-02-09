export type ResponseData<D = any, R = any> = {
  data?: D | D[];
  message?: string;
  reference?: R | R[];
};

export type FunctionResponse<D = any, E = any, R = any> =
  | {
      status: true;
      message?: string;
      data?: D | D[];
      error?: E | E[];
      reference?: R | R[];
    }
  | {
      status: false;
      message?: string;
      data?: never;
      error?: E | E[];
      reference?: R | R[];
    };
