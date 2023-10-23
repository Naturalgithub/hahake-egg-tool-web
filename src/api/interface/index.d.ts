export namespace User{
  export interface ResUserList {
      id: string;
      username: string;
      gender: number;
      user: {
        detail: {
          age: number;
        };
      };
      idCard: string;
      email: string;
      address: string;
      createTime: string;
      status: number;
      avatar: string;
      photo: any[];
    }
}


