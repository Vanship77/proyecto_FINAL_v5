export interface Provider {
  _id?: string;
  companyName: string;
  contactPerson: {
    firstName: string;
    lastName?: string;
  };
  email: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  serviceType: 'catering' | 'audiovisual' | 'locación' | 'entretenimiento' | 'decoración' | 'otros';
  description?: string;
  website?: string;
  rating?: number;
  isActive?: boolean;
  logoUrl?: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProviderForm {
  companyName: string;
  contactPerson: {
    firstName: string;
    lastName?: string;
  };
  email: string;
  phone?: string;
  serviceType: 'catering' | 'audiovisual' | 'locación' | 'entretenimiento' | 'decoración' | 'otros';
  isActive: boolean;
  userId: string;
}