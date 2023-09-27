export interface $OrgsReducerType {
  isLoading: boolean,
  currentOrgId: string | null
  orgs: orgDetailType[],
  orgIdAndDataMapping: { [key: string]: any },
  orgsWithNewMessages: any,
  unreadCountForDrawerIcon: number,
  noOrgsFound: boolean,
}

export interface orgDetailType {
  authKey: string;
  couponId: string | null;
  createdAt: string;
  createdBy: string;
  customFields: any | null;
  disabled: boolean;
  dmActivated: boolean;
  domain: string;
  expiryDate: string;
  guestSettings: any | null;
  iconKey: string | null;
  id: string;
  invitationKey: string | null;
  isBeta: boolean | null;
  membersAllowed: string[] | null;
  name: string;
  orgDetails: any;
  org_user: {
    createdAt: string;
    customFieldValues: any[] | null;
    disconnectedAt: string | null;
    id: string;
    invitedBy: string | null;
    isEnabled: boolean;
    jobRole: string | null;
    orgId: string;
    productsJoined: any[];
    role: number;
    status: string;
    updatedAt: string;
    userId: string;
    userStatus: string | null;
  };
  productsActivated: {
    channel: string | boolean;
    inbox?: string | boolean;
  };
  public: boolean;
  updatedAt: string;
  updatedBy: string | null;
  webhooks: any;
  whitelistedDomains: string[];
}

interface userDetailsType {
  avatar: string | null;
  avatarKey: string | null;
  createdAt: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  firstName: string;
  hasJoined: any
  id: string;
  isVerified: boolean;
  lastName: string;
  mobileNumber: string | null;
  mobileNumberVerified: boolean;
  org_user: {
    createdAt: string;
    customFieldValues: any[] | null; // Define a specific type if needed
    disconnectedAt: string;
    id: string;
    invitedBy: string | null;
    isEnabled: boolean;
    jobRole: string | null;
    orgId: string;
    productsJoined: any[]; // Define a specific type if needed
    role: number;
    status: string;
    updatedAt: string;
    userId: string;
    userStatus: any; // Define a specific type if needed
  };
  recoveryMail: string;
  txtRecords: any[] | null;
  updatedAt: string;
  username: string;
}
