import axios from "axios";
import { PayloadProps } from "./types";

const TIMEOUT = 3500;

export const instance = axios.create({
  baseURL: "http://localhost:3000",
});

export async function findBenefits(): Promise<any> {
  const response = await instance.get("/api/v1/benefits", { timeout: TIMEOUT });
  return response.data;
}

export async function submitBenefit(payload: PayloadProps): Promise<any> {
  const response = await instance.post("/api/v1/submit", payload, {
    timeout: TIMEOUT,
  });
  return response.data;
}

export async function findBenefit(elasticId: string): Promise<any> {
  const response = await instance.get(`/api/v1/benefit/${elasticId}`);
  return response.data;
}
