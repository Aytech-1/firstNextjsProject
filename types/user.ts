export interface People {
  firstName: string;
  middleName: string;
  lastName: string;
  mobileNumber: string;
  emailAddress: string;
  dateOfBirth: string;
  homeAddress: string;
  nin: number;
  lastLoginAt: string;
  createdAt: string;
  state: {
    stateId: number;
    stateName: string;
  };
  lga: {
    lgaId: number;
    lgaName: string;
  };
  gender: {
    genderId: number;
    genderName: string;
  };
  title: {
    titleId: number;
    titleName: string;
  };
  status: {
    statusId: number;
    statusName: string;
  };
}

export type WeatherData = {
  hourly: {
    time: string[];
    temperature_2m: number[];
  };
};

export interface User extends People {
  userId: string;
}

export interface Staff extends People {
  staffId: string;
  role: {
    roleId: number;
    roleName: string;
  };
}