import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  email: string;
  onSuccess: () => void;
  onRequestVerificationCode: (email: string) => void; // Tambahkan prop untuk permintaan pengiriman ulang kode
}

const VerificationCodeForm: React.FC<Props> = ({ email, onSuccess, onRequestVerificationCode }) => {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [resendTimer, setResendTimer] = useState(60); // 60 detik = 1 menit

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
        onSuccess();
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
    // Kirim ulang permintaan kode verifikasi dengan email yang disimpan
    onRequestVerificationCode(email);
    setResendTimer(60); // Reset timer ke 60 detik
  };

  return (
    <div className="flex flex-col border rounded-xl border-stone 100 shadow-md p-6 mt-8 w-2/5">
      <h3 className="text-2xl font-bold text-center text-zinc-600">Enter the Verification Code</h3>
      {showTooltip && (
          <div className={`fixed top-96 flex transform -translate-y-full bg-sky-600 text-white py-2 px-4 rounded-md transition-all duration-300 ease-in-out`}>
            {message}
          </div>
        )}
      <p className="text-base text-zinc-400 text-center py-3">A verification code has been sent via e-mail to {email}</p>
      <div className="flex flex-col items-center">
        <input
          type="text"
          value={verificationCode}
          onChange={handleChange}
          maxLength={6}
          className="text-4xl text-zinc-600 text-center font-bold w-80 tracking-[1rem] h-11 px-4 roundered border-b border-sky-600 focus:border-sky-600 focus:outline-none transition duration-300 ease-in-out"
        />
      </div>
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
