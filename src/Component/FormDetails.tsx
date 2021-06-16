export interface FormDetails {
  name: string;
  age: number;
  userCatergory: Array<"High" | "Medium" | "Low">;
  commentUserCatergory: string;
  dependents: number;
  acceptTerms: boolean;
}


export interface FormComponentProps {
  title?: string;
}