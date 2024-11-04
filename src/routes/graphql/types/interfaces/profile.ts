interface IProfileDto {
    isMale: boolean;
    yearOfBirth: number;
    memberTypeId: string;
  }
  
  export interface ICreateProfile {
    dto: IProfileDto & { userId: string };
  }
  
  export interface IChangeProfile {
    id: string;
    dto: IProfileDto;
  }
  