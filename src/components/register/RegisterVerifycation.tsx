"use client"
import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import PopupNotif from '../ui/utility/PopupNotif';
import { useRouter } from 'next/navigation';
import { verifyAccount, resendCode } from '@/lib/auth-register';

interface FormDataResendCode {
    email: string;
  }

const RegisterVerification = () => {
    const router = useRouter();
    const [notifMessage, setNotifMessage] = useState('');
    const [formData, setFormData] = useState({
        activkey: "",
    });
    const [formFilled, setFormFilled] = useState(false);
    const [email, setEmail] = useState('');
    const [canResend, setCanResend] = useState(true);

    useEffect(() => {
        // Retrieve email from localStorage
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        const allFilled = Object.values(formData).every(val => val.trim() !== '');
        setFormFilled(allFilled);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          await verifyAccount(formData)
          setNotifMessage("Verifikasi Akun Berhasil");
          localStorage.removeItem('email');
          localStorage.removeItem('registrationData');
          localStorage.removeItem('registrationType');
          router.push('/login');
        } catch (data: any) {
            setNotifMessage("Kode Verifikasi Tidak Benar");
        }
    };

    const handleResendCode = async () => {
        if (email) {
            try {
                // Membuat objek FormDataResendCode dengan email yang diambil dari localStorage
                const emailData: FormDataResendCode = { email };
                await resendCode(emailData);
        
                setNotifMessage('Kode verifikasi telah dikirim ulang.');
                setCanResend(false);
                setTimeout(() => setCanResend(true), 60000); // 60 detik
            } catch (error) {
                console.error('Failed to resend verification code', error);
                setNotifMessage('Gagal mengirim ulang kode verifikasi.');
            }
        } else {
            setNotifMessage('Email tidak ditemukan.');
        }
      };
    

  return (
    <main className="flex min-h-screen flex-col items-center p-32 bg-gray-50">
        <div className="relative flex flex-col w-2/5 bg-white outline-none focus:outline-none">
            <div className="flex flex-col items-start justify-between p-5">
              <h3 className="w-full text-gray-600 text-center text-xl font-semibold">
                Verifikasi Akun
              </h3>
              <h6 className="w-full text-gray-500 text-center text-base font-normal">
                Masukkan kode verifikasi yang telah dikirim melalui email {email}
              </h6> 
            </div>
            <div className="p-6 flex-auto">
                <form
                    id="login-form"
                    className="space-y-6"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col mb-4 gap-y-3">
                        <div className="flex flex-col">
                            <input
                            type="text"
                            name="activkey"
                            value={formData.activkey}
                            onChange={handleChange}
                            placeholder="Verification Code"
                            className={`h-11 px-4 rounded-lg border border-zinc-200 focus:border-sky-600 focus:outline-none transition duration-300 ease-in-out`}
                            />
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        className={`h-11 px-4 w-full rounded-xl ${formFilled ? 'bg-sky-600 text-white' : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'}`}
                        disabled={!formFilled}
                    >
                        Verify Account
                    </button>
                </form>
            </div>
        </div>
        <PopupNotif
            message={notifMessage}
            duration={3000}
            onClose={() => setNotifMessage('')}
        />
        <div className="flex flex-row items-center justify-between p-5">
            <h6>
                Belum menerima kode? 
            </h6>
            <button
            className={`ml-2 ${canResend ? 'text-sky-500' : 'text-gray-400 cursor-not-allowed'}`}
            onClick={handleResendCode}
            disabled={!canResend}
          >
            Kirim Kode Ulang
          </button>
        </div>
    </main>
  )
}

export default RegisterVerification