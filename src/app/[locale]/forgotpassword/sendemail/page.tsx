"use client"
import { useState } from 'react';
import VerificationCodeForm from "@/components/account/VerificationCodeForm";
import ResetPasswordForm from "@/components/account/ResetPasswordForm";

const SendEmail: React.FC = () => {
  const [email, setEmail] = useState('');
  const [showSendEmailForm, setShowSendEmailForm] = useState(true);
  const [showVerificationCodeForm, setShowVerificationCodeForm] = useState(false);
  const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');

  const isEmailValid = email.trim() !== '';

  const requestVerificationCode = async () => {
    if (!isEmailValid) return;
    try {
      const response = await fetch('https://adminx.human-initiative.org/login-api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.success) {
        setVerificationCode(data.verificationCode);
        setShowSendEmailForm(false); // Sembunyikan form kirim email jika berhasil
        setShowVerificationCodeForm(true); // Tampilkan form verifikasi kode jika berhasil
        setMessage(data.message);
      } else {
        setMessage(`${data.message}`);
      }
    } catch (error: any) {
      setMessage(`${error.message}`);
    }
  };

  const handleVerificationCodeSuccess = () => {
    setShowVerificationCodeForm(false);
    setShowResetPasswordForm(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex flex-col w-full items-center">
      {showSendEmailForm && (
            <>
              <div className="flex flex-col border rounded-xl border-stone 300 shadow-md p-6 mt-8 w-1/3">
                <h3 className="text-2xl font-bold text-zinc-700">Reset Password</h3>
                <p className="text-base text-zinc-400 py-3 pb-8">Enter the registered email. A verification code will be sent to the email you entered</p>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 px-4 rounded-lg border border-zinc-200 focus:border-sky-600 focus:outline-none transition duration-300 ease-in-out"
                    placeholder="Enter your email"
                  />
                  <button
                    onClick={requestVerificationCode}
                    className={`h-11 mt-4 px-6 rounded-lg transition duration-300 ease-in-out ${
                      isEmailValid ? 'bg-sky-600 text-white' : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                    }`}
                    disabled={!isEmailValid} // Menggunakan properti disabled untuk menonaktifkan tombol ketika email belum valid
                  >
                    Send Code With Email
                  </button>
                  <p>{message}</p>
              </div>
            </>
          )}
        {showVerificationCodeForm && <VerificationCodeForm email={email} onSuccess={handleVerificationCodeSuccess} onRequestVerificationCode={requestVerificationCode} />}

        {showResetPasswordForm && <ResetPasswordForm email={email} verificationCode={verificationCode} />}
      </div>
    </main>
  );
};

export default SendEmail;
