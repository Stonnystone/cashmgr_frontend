import React from 'react';
import {config} from '../utils/constants';
import MonoConnect from '@mono.co/connect.js';

export function MonoLoginButton() {
  const monoConnect = React.useMemo(() => {
    const monoInstance = new MonoConnect({
      onClose: () => console.log('Widget closed'),
      onLoad: () => console.log('Widget loaded successfully'),
      onSuccess: ({ code }) => console.log(`Linked successfully: ${code}`),
      key: `${config.PUBLIC_KEY}`,
    })

    monoInstance.setup()
    
    return monoInstance;
  }, [])

  return (
    <div>
      <button  className="btn btn-primary mr-3" onClick={() => monoConnect.open()}>
        Link To Mono
      </button>
    </div>
  )
}

export function MonoPaymentButton() {
  const monoConnect = React.useMemo(() => {
    const monoInstance = new MonoConnect({
      key: `${config.PUBLIC_KEY}`,
      scope: "payments",
      data: {
        type: "one-time-debit", // one-time-debit || recurring-debit
        amount: 150000, // amount in kobo
        description: "Payment for light bill",
      },
      onSuccess: (chargeObject) => console.log(`charged successfully`, chargeObject),
    })

    monoInstance.setup()
    
    return monoInstance;
  }, [])

  return (
    <div>
      <button  className="btn btn-danger mr-3" onClick={() => monoConnect.open()}>
        Pay with Mono
      </button>
    </div>
  )
}

export function MonoReathorizeButton() {

  const monoConnect = React.useMemo(() => {
    const monoInstance = new MonoConnect({
      key: `${config.PUBLIC_KEY}`,
      onSuccess: ({ code }) => console.log(`Linked successfully: ${code}`),
    })
    
    return monoInstance;
  }, [])

  function reauthoriseAccount() {
    const reauth_token = "code_xyzUi8olavk";
    monoConnect.reauthorise(reauth_token);
    monoConnect.open();
  }

  return (
    <div>
      <button className="btn btn-secondary mr-3" onClick={() => reauthoriseAccount() }>
        Reauthorise user account
      </button>
    </div>
  )
}