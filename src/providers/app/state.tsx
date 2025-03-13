'use client';

import LoadingScreen from '@/components/common/loading/loading-screen';
import axios from '@/lib/api';
import { useGlobalStatePersist } from '@/lib/store/persist';
import { IVerify } from '@/lib/store/types/persist.types';
import { shortAddr } from '@/lib/utils';
import { State, useHookstate } from '@hookstate/core';
import { createContext, useContext, useEffect } from 'react';
import { toast } from 'sonner';
import { useAccount, useAccountEffect, useDisconnect, useSignMessage } from 'wagmi';

interface IStateContext {
  loading: State<boolean>;
  loadingMessage: State<string>;
  address: `0x${string}` | null;
  grecaptcha: (_address: `0x${string}`) => void;
  Disconnect: () => void;
  isConnected: () => boolean;
}

export const StateContext = createContext<IStateContext>({} as IStateContext);
export const useStateContext = () => useContext(StateContext);

export function StateProvider({ children }) {
  const gStateP = useGlobalStatePersist();
  const { signMessage } = useSignMessage();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();

  const loading = useHookstate(false);
  const loadingMessage = useHookstate('Loading');

  const isConnected = () => gStateP.verify.value && gStateP.verify.user.blockchain_address.value === address;

  // Account Listener
  useEffect(() => {
    if (!gStateP.verify.value) return;
    if (gStateP.verify.user.blockchain_address.value === address) return;
    grecaptcha(address);
  }, [address]);

  const Disconnect = () => {
    disconnect();
    onDisconnect();
  };

  // Events -----------------------------------------

  useAccountEffect({
    onConnect(data) {
      console.log('TEST: ', data);
      if (data.isReconnected) {
        onConnected();
        return;
      }
      grecaptcha(data.address);
    },
    onDisconnect() {
      onDisconnect();
    },
  });

  const onConnected = () => {};

  const onDisconnect = () => {
    localStorage.removeItem('token');
    gStateP.verify.set(null);
  };

  // Captcha -----------------------------------------

  const grecaptcha = async (_address: `0x${string}`) => {
    if (window.grecaptcha) {
      try {
        window.grecaptcha.ready((_) => executeGrecapcha('rxc_login', _address));
      } catch (error) {
        console.error('grecaptcha: ', error);
      }
    }
  };

  const executeGrecapcha = async (action, _address: `0x${string}`) => {
    try {
      // execute grecapcha
      const _gToken = await window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action });
      loadingMessage.set('Requesting to sign message');
      loading.set(true);

      // request metamask for signing
      const _metamaskReq = await axios
        .post('/metamask/request', {
          address: _address,
          'g-recaptcha-response': _gToken,
        })
        .then((res) => res.data);

      // sign message
      signMessage(
        {
          message: _metamaskReq.data,
          account: _address,
        },
        {
          async onSuccess(data) {
            try {
              // verify signed token
              const verify: IVerify = await axios
                .post('/metamask/verify', {
                  address: _address,
                  signature: data,
                })
                .then((res) => res.data);

              let split = verify.message.split(' ');
              const __address = split[split.length - 1];
              toast.success('Login Successful!', {
                description: verify.message.replace(__address, shortAddr(__address)),
              });

              // save token and user
              localStorage.setItem('token', verify.token);
              gStateP.verify.set(verify);

              onConnected();
            } catch (error) {
              console.error('Verify Sign: ', error);
              disconnect();
            } finally {
              loading.set(false);
            }
          },
          async onError(error) {
            console.error('Sign Error: ', error);
            toast.error('Sign Error');
            disconnect();
            loading.set(false);
          },
        },
      );
    } catch (error) {
      console.warn('executeGrecapcha: ', error);
      toast.error('Sign Error');
      disconnect();
      loading.set(false);
    }
  };

  return (
    <StateContext.Provider value={{ loading, loadingMessage, address, grecaptcha, Disconnect, isConnected }}>
      {children}
      {loading.value && <LoadingScreen className="font-inter text-white" message={loadingMessage.value} />}
    </StateContext.Provider>
  );
}
