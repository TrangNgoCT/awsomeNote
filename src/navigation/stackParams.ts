import { NavigatorScreenParams } from '@react-navigation/native';

export type ListStackParams = {
  List: undefined;
  Detail: {
    name: string;
  };
};

export type RootStackParams = ListStackParams & {
  Home: undefined;
  Profile: undefined;
  ListStack: NavigatorScreenParams<ListStackParams> | undefined;
};
