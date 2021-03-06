import { yupResolver } from '@hookform/resolvers/yup';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { FieldError, FormProvider, useForm } from 'react-hook-form';
import {
  GestureResponderEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import GoogleIcon from '../../../assests/icons/GoogleIcon';
import { LoadingModal, TextInputController } from '../../../components';
import { RootStackParams } from '../../../constants/stackParams';
import { loginSchema } from '../../../constants/yupGlobal';
import { LoginPayload } from '../../../models';
import { ApplicationState, logging, loginWithgoogle } from '../../../store';
import { globalStyles } from '../../../styles/global';

type Props = NativeStackScreenProps<RootStackParams, 'Login'>;

const Login: React.FC<Props> = ({ navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  const dispatch = useDispatch();
  const formHanlers = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });
  const { error, loading } = useSelector((state: ApplicationState) => state.auth);

  const handleLoginClick = (data: LoginPayload) => {
    dispatch(logging(data));
  };

  const onGoogleButtonPress = (e: GestureResponderEvent) => {
    e.preventDefault();
    dispatch(loginWithgoogle());
  };

  return (
    <SafeAreaView style={[globalStyles.container, globalStyles.center]}>
      {loading && <LoadingModal size="large" text="Plz Wait..." />}
      <Text style={[globalStyles.titleText, styles.title]}>Sign in</Text>
      <FormProvider {...formHanlers}>
        <TextInputController
          specialProps={(error: FieldError | undefined) => ({
            autoCapitalize: 'none',
            style: error
              ? [globalStyles.input, globalStyles.inputError]
              : globalStyles.input,
          })}
          name="email"
          placeholder="E-mail"
        />

        <TextInputController
          specialProps={(error: FieldError | undefined) => ({
            autoCapitalize: 'none',
            style: error
              ? [globalStyles.input, globalStyles.inputError]
              : globalStyles.input,
            secureTextEntry: true,
          })}
          name="password"
          placeholder="Password"
        />

        <Text
          onPress={formHanlers.handleSubmit(handleLoginClick)}
          style={[globalStyles.btn, globalStyles.btnPrimary, styles.btnSubmit]}>
          Submit
        </Text>
        {error && <Text style={globalStyles.textError}>{error}</Text>}
      </FormProvider>

      <View style={styles.flexHorizontal}>
        <Text
          onPress={() => navigation.replace('Register')}
          style={globalStyles.textLink}>
          Don&apos;t have account?
        </Text>

        <Text
          onPress={() => navigation.replace('ForgotPassword')}
          style={globalStyles.textLink}>
          Forgot password?
        </Text>
      </View>

      <Text
        onPress={onGoogleButtonPress}
        style={[globalStyles.btn, styles.btnGoogle, globalStyles.center]}>
        <View>
          <GoogleIcon size={20} />
        </View>
        <View>
          <Text>Google Sign In</Text>
        </View>
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    marginBottom: 12,
    textTransform: 'uppercase',
    color: 'steelblue',
  },
  flexHorizontal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  btnSubmit: { marginVertical: 16, width: '50%', textAlign: 'center' },
  btnGoogle: {
    marginTop: 16,
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { Login };
