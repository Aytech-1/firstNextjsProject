export interface People {
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumber: number;
  email: string;
  homeAddress: string;
  nin: number;
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
}