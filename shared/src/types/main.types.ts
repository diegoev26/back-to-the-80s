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
