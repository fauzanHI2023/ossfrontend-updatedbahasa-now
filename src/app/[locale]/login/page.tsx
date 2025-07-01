'use client';
import React, {useState, useEffect} from 'react';
import {SessionProvider, signIn, useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation'; // Update import
import Link from 'next/link';
import {FcGoogle} from 'react-icons/fc';
import {TfiMicrosoftAlt} from 'react-icons/tfi';
import {PiEye, PiEyeClosed} from 'react-icons/pi';
import {FaApple} from 'react-icons/fa';
import Swal from 'sweetalert2';
import {Button} from '@/components/ui/button';

const LoginPage = () => {
  const router = useRouter();
  const callbackUrl = '/dashboard';
  const {data: session} = useSession();
  const [showPwlogin, setShowPwLogin] = useState(false);
  const [formData, setFormData] = useState({username: '', password: ''});
  const [formFilled, setFormFilled] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const {username, password} = formData;

    try {
      const res = await signIn('credentials', {
        redirect: false,
        usernameOrEmail: username,
        password: password
      });
      if (!res?.error) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          iconColor: '#75C8FB',
          title: 'Successfull Login',
          showConfirmButton: false,
          timer: 2500
        });
        router.push(callbackUrl);
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Invalid Login',
          text: 'Check Username/Email or Password',
          showConfirmButton: false,
          timer: 2500
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginGoogle = async () => {
    try {
      await signIn('google', {callbackUrl});
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginOffice = async () => {
    try {
      await signIn('azure-ad', {callbackUrl});
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {id, value} = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value
    }));
  };

  useEffect(() => {
    // Cek apakah form telah diisi
    if (formData.username.trim() && formData.password.trim()) {
      setFormFilled(true);
    } else {
      setFormFilled(false);
    }
  }, [formData]);

  const togglePasswordVisibility = () => {
    setShowPwLogin(!showPwlogin);
  };

  return (
    <main className="bg-gray-50">
      <div className="dark:bg-slate-900 bg-slate-100 justify-center items-center flex min-h-[800px] flex-col items-center">
        {/* <Link
          href="/"
          className="bg-logo-blue w-32 h-12 bg-no-repeat bg-contain flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        ></Link> */}
        <div className="relative my-6 mx-auto w-1/3">
          <div className="border-0 rounded-3xl relative flex flex-col w-full bg-background outline-none focus:outline-none">
            <div className="flex flex-col items-start justify-between p-5 pt-10">
              <h3 className="w-full text-center text-3xl font-semibold text-gray-900">
                Login
              </h3>
            </div>
            <div className="p-6 flex-auto">
              <form
                id="login-form"
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                <input
                  id="username"
                  className="w-full border border-solid autofill:!bg-slate-950 border-[#919EAB52] px-2 pb-2 pt-4 rounded-lg placeholder:text-[#919EAB] dark:!bg-slate-950 bg-white dark:text-white text-slate-950 focus:border-sky-600 focus:outline-none transition duration-300 ease-in-out"
                  placeholder="Username or Email"
                  value={formData.username}
                  onChange={handleChange}
                />
                <div className="relative">
                  <input
                    id="password"
                    className="w-full border border-solid border-[#919EAB52] px-2 pb-2 pt-4 rounded-lg placeholder:text-[#919EAB] dark:bg-slate-950 bg-white dark:text-white text-slate-950 focus:border-sky-600 focus:outline-none transition duration-300 ease-in-out"
                    placeholder="Password"
                    type={showPwlogin ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={togglePasswordVisibility}
                  >
                    {showPwlogin ? <PiEye /> : <PiEyeClosed />}
                  </button>
                </div>
              </form>
              <div className="flex-col items-center justify-center space-y-4 mt-6">
                <Link
                  href="/forgotpassword/sendemail"
                  className="w-full text-sm mb-2"
                >
                  Forgot Password?
                </Link>
                <Button
                  form="login-form"
                  className={`text-center w-full transition duration-300 ease-in ${
                    formFilled
                      ? 'dark:bg-white bg-sky-700 dark:text-slate-950 text-white'
                      : 'cursor-not-allowed dark:bg-slate-500 bg-sky-950 dark:text-slate-200 text-blue-200'
                  } border-0 py-3 px-4 rounded text-base ${
                    formFilled ? '' : 'pointer-events-none'
                  }`}
                  type="submit"
                  disabled={!formFilled}
                  variant="outline"
                  size="icon"
                >
                  Login
                </Button>
                <div className="flex flex-row gap-x-1 text-center my-4">
                  <p className="text-sm text-gray-700">
                    Don&apos;t have an account yet ?
                  </p>
                  <Link href="/register" className="text-sm text-sky-500">
                    Register
                  </Link>
                </div>
                <Button
                  className="w-full border-gray-100 rounded px-4 py-3 flex flex-row items-center justify-center"
                  onClick={handleLoginGoogle}
                  variant="outline"
                  size="icon"
                >
                  <span className="pr-2 text-xl">
                    <FcGoogle />
                  </span>
                  Sign in with Google
                </Button>
                <Button
                  className="w-full border-gray-100 rounded px-4 py-3 flex flex-row items-center justify-center"
                  onClick={handleLoginOffice}
                  variant="outline"
                  size="icon"
                >
                  <span className="pr-2 text-xl">
                    <TfiMicrosoftAlt />
                  </span>
                  Sign in with Office
                </Button>
                <Button
                  className="w-full border-gray-100 rounded px-4 py-3 flex flex-row items-center justify-center"
                  variant="outline"
                  size="icon"
                >
                  <span className="pr-2">
                    <FaApple className="w-6 h-6" />
                  </span>
                  Sign in with Apple ID
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
