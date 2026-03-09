export interface Employee{
  venderCost: string;

  
  today: string; 
  username:string;  
  employeeCode:string; 
  purposePlace:string;  
  companyPlant :string; 
  costCenter: string; 

  
}

export interface Claims {
  type: 'International' | 'Domestic' | '' | string;
  createdDate?: Date | null;
  purposePlace?: string;
  totalAmount?: number | null;
  status: 'In progress' | 'Approved' | 'Rejected' | string;
  expense?: string;
}