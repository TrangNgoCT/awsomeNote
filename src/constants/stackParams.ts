import { NavigatorScreenParams } from '@react-navigation/native';

export type GroupListStackParams = {
  GroupList: undefined;
  GroupDetail: {
    name: string;
  };
};

export type HomeStackParams = GroupListStackParams & {
  AddGroup: undefined;
  Profile: undefined;
  GroupListStack: NavigatorScreenParams<GroupListStackParams> | undefined;
};

export type RootStackParams = {
  Loading: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Home: undefined;
};
