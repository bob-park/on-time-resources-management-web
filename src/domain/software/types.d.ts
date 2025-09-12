type SoftwarePlatform = 'MAC' | 'WINDOWS' | 'LINUX' | 'ANDROID' | 'IOS' | 'WEB' | 'ETC';
type SoftwareStatus = 'USED' | 'WAITING' | 'EXPIRED';

interface Software {
  id: string;
  teamId?: string;
  platform: SoftwarePlatform;
  name: string;
  description: string;
  manufacturer?: string;
  status: SoftwareStatus;
  purchaseDate: Date;
  licenseKey?: string;
  licenseStartDate?: Date;
  licenseEndDate?: Date;
  createdDate: Date;
  createdBy: string;
  lastModifiedDate?: Date;
  lastModifiedBy?: string;
}

type SoftwareSearchRequest = {
  teamId?: string;
  name?: string;
  status?: SoftwareStatus | '';
};

interface SoftwareRegisterRequest {
  teamId?: string;
  platform: SoftwarePlatform;
  name: string;
  description: string;
  manufacturer?: string;
  version?: string;
  purchaseDate: Date;
  licenseKey?: string;
  licenseStartDate?: Date;
  licenseEndDate?: Date;
}
