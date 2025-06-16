// ResetPasswordForm.tsx
import { useState } from 'react';
import { PiEye, PiEyeClosed } from "react-icons/pi";
import { useRouter } from 'next/navigation';

interface Props {
  email: string;
  verificationCode: string;
}

const ResetPasswordForm: React.FC<Props> = ({ email, verificationCode }) => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const resetPassword = async () => {
    if (password !== confirmPassword) {
      setMessage('Password and confirm password do not match');
      return;
    }

    try {
      const response = await fetch('https://adminx.human-initiative.org/login-api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, activkey: verificationCode, passwd: password }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage(data.message);
        router.push('/login');
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className="flex flex-col border rounded-xl border-stone 100 shadow-md p-6 mt-8 w-1/3">
      <h2 className="text-2xl font-bold text-center text-zinc-600 mb-8">New Password</h2>
      <p></p>
      <div className="relative mb-4">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new password"
          className="w-full h-11 px-4 rounded-lg border border-zinc-200 focus:border-sky-600 focus:outline-none transition duration-300 ease-in-out"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <PiEye/> : <PiEyeClosed/>}
        </button>
      </div>
      <div className="relative mb-8">
        <input
          type={showPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
          className="w-full h-11 px-4 rounded-lg border border-zinc-200 focus:border-sky-600 focus:outline-none transition duration-300 ease-in-out"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <PiEye/> : <PiEyeClosed/>}
        </button>
      </div>
      <button onClick={resetPassword} className="h-11 px-4 w-full rounded-xl bg-sky-600 text-white">Reset Password</button>
      <p>{message}</p>
    </div>
  );
};

export default ResetPasswordForm;
