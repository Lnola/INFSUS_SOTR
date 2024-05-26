import Company from "company/entities/company.entity";

export class CompanyLocationDto {
  street: string;
  zip: string;
  city: string;
  country: string;
  name: string;
  company: Company;
}
