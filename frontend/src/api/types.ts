import { AxiosError } from "axios";

export type PayloadProps = {
  login: string;
  password: string;
  cpf: string;
};

type Benefits = {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  _source: {
    benefits: string;
  };
};

export type FindBenefitsResponseProps = {
  status: number;
  message: string;
  cache: string;
  benefits: Array<Benefits>;
};

export type FindBenefitByIdResponseProps = {
  status: number;
  message: string;
  cache: string;
  benefit: Array<Benefits>;
};

export type SubmitBenefitResponseProps = {
  status: number;
  message: string;
};

export type CustomResponseError = AxiosError & {
  response: {
    data: {
      status: number;
      message: string;
    };
  };
};
