import { CommissionType } from "@prisma/client"; 

export interface CreateCommissionRuleBody {
  salonId: string;
  professionalId?: string | null;
  serviceId?: string | null;
  productCategory?: string | null;
  type: CommissionType; 
  value: number;
}
type TWorkingHours = { [key: number]: { from: number; to: number } };
type TVisibleHours = { from: number; to: number };
export interface CreateSalonBody {
    ownerId: string;
    name: string;
    address: string;
    city?: string;
    cep: string;
    workingHours:TWorkingHours;
    visibleHours:TVisibleHours;
    countryCode:string
  } 
  
export interface CreateProfessionalBody {
    name: string;
    category: string;
    cpf?: string;
    phone?: string;
    email?: string;
    commissionRate: number
}
  
export interface CreateServiceBody {
    name: string;
    description?: string;
    price: number;
    duration: number;
}
  
export interface CreateAppointmentBody {
    professionalId: string;
    customerId: string;
    serviceId: string;
    startTime: {
      hour: number;
      minute: number;
    };
    endTime: {
      hour: number;
      minute: number;
    };
    startDate: string;
    endDate: string;
    status: 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'RESCHEDULED' | 'SCHEDULED';
    notes?: string;
}