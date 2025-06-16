import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

interface Props {
  email: string;
  onSuccess: () => void;
  onRequestVerificationCode: (email: string) => void;
}

const VerificationCodeForm: React.FC<Props> = ({ email, onSuccess, onRequestVerificationCode }) => {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');
  const [resendTimer, setResendTimer] = useState(60);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 6) {
      setVerificationCode(inputValue);
      if (inputValue.length === 6) {
        verifyCodeAndShowResetPasswordForm();
      }
    }
  };

  const verifyCodeAndShowResetPasswordForm = async () => {
    try {
      const response = await fetch('https://adminx.human-initiative.org/login-api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, activkey: verificationCode }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage(data.message);
        onSuccess(); // Panggil prop onSuccess saat verifikasi berhasil
      } else {
        setMessage(`${data.message}`);
      }
    } catch (error: any) {
      setMessage(`${error.message}`);
    }
  };

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => {
        setResendTimer(prevTimer => prevTimer - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [resendTimer]);

  const handleResendCode = () => {
    onRequestVerificationCode(email);
    setResendTimer(60);
  };

  return (
    <div className="flex flex-col border rounded-xl border-stone 100 shadow-md p-6 mt-8 w-2/5">
      <h2 className="text-2xl font-bold text-center text-zinc-600">Verifikasi Kode</h2>
      <p className="text-base text-zinc-400 text-center py-3">A verification code has been sent via e-mail to {email}</p>
      <div className="flex flex-col items-center mb-6">
        <input
          type="text"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          maxLength={6}
          className="text-4xl text-zinc-600 text-center font-bold w-80 tracking-[1rem] h-11 px-4 roundered border-b border-sky-600 focus:border-sky-600 focus:outline-none transition duration-300 ease-in-out"
        />
      </div>
      <button onClick={verifyCodeAndShowResetPasswordForm} className="h-11 px-4 w-full rounded-xl bg-sky-600 text-white">Verify and Proceed</button>
      <p>{message}</p>
      <div className="flex flex-col items-center mt-4 text-center">
        {resendTimer === 0 ? (
          <div>
            <span className="text-base text-zinc-400">Did not receive the code?</span>
            <button onClick={handleResendCode} className="text-sky-600">
              &nbsp;Resend code
            </button>
          </div>
        ) : (
          <p className="text-center text-zinc-500">Please wait {resendTimer} seconds to resend</p>
        )}
      </div>
    </div>
  );
};

export default VerificationCodeForm;
