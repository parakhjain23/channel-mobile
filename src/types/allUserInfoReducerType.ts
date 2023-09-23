export interface $AllUserInfoReducerType{
    allUsers: UserDetailsType[]
    userIdAndDataMapping:{[key:string]:UserDetailsType}
    isLoading: boolean
    // isSignedIn: boolean
    // accessToken: string
    // siginInMethod: string
}

export interface UserDetailsType {
    avatarKey: string;
    createdAt: string;
    displayName: string;
    email: string;
    emailVerified: boolean;
    firstName: string;
    hasJoined: any 
    id: string;
    isVerified: boolean;
    lastName: string;
    mobileNumber: string;
    mobileNumberVerified: boolean;
    notificationkey: {
      chat: string;
      inbox: string;
    };
    recoveryMail: string;
    updatedAt: string;
    userSettings: {
      chat: any 
    };
    username: string;
  }
  
  
  
  
  
  