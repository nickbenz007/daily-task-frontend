import React from 'react';
import {Box, Text} from '@/utils/theme';
import {useNavigation} from '@react-navigation/native';
import {AuthScreenType} from '@/navigation/type.tsx';
import {Image} from 'react-native';
import SafeAreaWrapper from '@/components/helper/SafeAreaWrapper.tsx';
import {LinearGradient} from 'react-native-linear-gradient';
import PressableView from '@/components/helper/PressableView.tsx';

const LOGO =
  'https://img.freepik.com/free-vector/woman-using-her-phone-instead-working_23-2148493162.jpg?t=st=1712680165~exp=1712683765~hmac=44590af880d39dbb48e904ffda4f0d24fd406576613c1b8cbd815553f209f471&w=1380';

function WelcomeScreen() {
  const navigation = useNavigation<AuthScreenType<'Welcome'>>();
  const navigateToSignUpScreen = () => {
    navigation.navigate('SignUp');
  };
  return (
    <SafeAreaWrapper>
      <LinearGradient
        colors={[
          '#ffffff',
          '#fef8ff',
          '#ecf3ff',
          '#ecf3ff',
          '#ecf3ff',
          '#fef9ff',
          '#ffffff',
        ]}
        style={{flex: 1}}>
        <Box flex={1} justifyContent={'center'} alignItems={'center'}>
          <Box alignItems={'center'} mb={'3.5'}>
            <Image
              source={{
                uri: LOGO,
                width: 150,
                height: 150,
              }}
              resizeMode={'cover'}
              borderRadius={10}
            />
          </Box>
          <Box justifyContent={'center'} alignItems={'center'} mb={'10'}>
            <Text variant={'text3Xl'} color={'black'} fontWeight={'bold'}>
              Daily Task
            </Text>
            <Text
              variant={'textXl'}
              textAlign={'center'}
              color={'gray500'}
              mb={'5'}>
              Get more productive
            </Text>
          </Box>
          <PressableView
            label={"Let's Get Started"}
            onPress={navigateToSignUpScreen}
          />
          <Text
            fontWeight={'500'}
            variant={'textSm'}
            textAlign={'center'}
            color={'gray500'}
            my={'5'}>
            5000+ users around the world got registered
          </Text>
        </Box>
      </LinearGradient>
    </SafeAreaWrapper>
  );
}

export default WelcomeScreen;
