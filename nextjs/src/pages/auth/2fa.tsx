import { EmptyLayout } from 'src/layouts';
import { NextPageWithLayout } from 'types';
import { useSession } from 'src/contexts';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useDigitInput from 'react-digit-input';
import _ from 'lodash';
import { useMutation } from '@apollo/client';

const TwoFactorAuthentication: NextPageWithLayout = () => {

  const router = useRouter();
  const { signIn, profile, twoFactorAuth } = useSession();

  const [invalid, setInvalid] = useState(false);
  const [token, setToken] = useState('');
  const digits = useDigitInput({
    acceptedCharacters: /^[0-9]$/,
    length: 6,
    value: token,
    onChange: setToken,
  });

  const onSubmit = async () => {
    try {

      setInvalid(false);

      const { data: { twofa_authenticate } } = await twoFactorAuth.authenticate({ variables: { token } });
      setInvalid(!twofa_authenticate);

      if (twofa_authenticate) {
        await router.push('/');
        console.log('Redirecting to /')
      }

    } catch (ex) {
      setInvalid(true);
    }
  };

  return (
    <div className='min-h-screen h-full flex flex-col justify-center items-center'>

      <div className='flex flex-col space-y-24'>

        <div className='flex flex-col items-center space-y-1'>
          <h1 className='font-semibold text-2xl'>
            Welcome to <span className='text-accent'>ft_transcendence</span>
          </h1>
          <p>Please authenticate with your OTP</p>
        </div>

        <div className='flex flex-col space-y-5'>

          {invalid && (
            <p className='w-full text-center text-red-500 font-medium'>Invalid token!</p>
          )}

          <div className='flex justify-center items-center space-x-2'>
            {_.range(0, 6).map((_, index) => {
              return (
                <div key={index}>
                  <input inputMode='decimal' {...digits[index]}
                         className='w-12 h-12 border-2 rounded bg-transparent
                outline-none text-center font-semibold text-xl
                border-primary-400 text-primary-400 focus:border-accent
                focus:text-white transition appearance-none'
                  />
                  {index === token.length - 1 ? null : (
                    <span className='w-2 py-0.5 bg-gray-400' />
                  )}
                </div>
              );
            })}
          </div>

          <button onClick={onSubmit} className='p-2 rounded-lg bg-accent font-medium border border-primary-400'>
            Verify token
          </button>

        </div>

      </div>

    </div>
  );
};

TwoFactorAuthentication.getLayout = EmptyLayout;
export default TwoFactorAuthentication;