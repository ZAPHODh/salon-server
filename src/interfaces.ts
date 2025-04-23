export interface CreateSalonBody {
    ownerId: string;
    name: string;
    address: string;
    city?: string;
    cep: string;
  }
  
export interface CreateProfessionalBody {
    name: string;
    category: string;
    cpf?: string;
    phone?: string;
    email?: string;
    salonId: string;
}
  
export interface CreateServiceBody {
    name: string;
    description?: string;
    price: number;
    duration: number;
    salonId: string;
    professionalId?: string;
}
  
export interface CreateAppointmentBody {
    salonId: string;
    professionalId: string;
    customerId: string;
    serviceId: string;
    date: Date;
    status: 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'RESCHEDULED' | 'SCHEDULED';
    notes?: string;
}