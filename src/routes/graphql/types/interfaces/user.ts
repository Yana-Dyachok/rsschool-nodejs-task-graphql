interface UserDto {
    name: string;
    balance: number;
  }
  
  export interface ICreateUser {
    dto: UserDto;
  }
  
  export interface IChangeUser {
    id: string;
    dto: UserDto;
  }
  