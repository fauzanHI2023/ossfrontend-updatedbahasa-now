'use client';
import {useState, ChangeEvent, FormEvent} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import {
  registerPersonal,
  registerCompany,
  checkUsernameEmail
} from '@/lib/auth-register';
import {MdOutlinePersonalInjury} from 'react-icons/md';
import {GrOrganization} from 'react-icons/gr';
import {PiEye, PiEyeClosed} from 'react-icons/pi';
import {IoArrowBack} from 'react-icons/io5';
import {ChevronRight} from 'lucide-react';
import Swal from 'sweetalert2';
import PhoneInput from 'react-phone-number-input';
import {useTranslations} from 'next-intl';

const RegisterPage = () => {
  const router = useRouter();
  const [registrationType, setRegistrationType] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    passwd: '',
    full_name: '',
    phone_no: '',
    legality_no: '',
    donor_type_id: ''
  });

  const [formFilled, setFormFilled] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [phoneExists, setPhoneExists] = useState(false);
  const t = useTranslations();

  const handleRegistrationType = (type: string) => {
    setRegistrationType(type);
    setFormData({
      user_name: '',
      email: '',
      passwd: '',
      full_name: '',
      phone_no: '',
      legality_no: '',
      donor_type_id: ''
    });
    setFormFilled(false);
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    const updatedFormData = {...formData, [name]: value};

    setFormData(updatedFormData);

    // Check if required fields are filled
    if (registrationType === 'personal') {
      setFormFilled(
        updatedFormData.user_name.trim() !== '' &&
          updatedFormData.email.trim() !== '' &&
          updatedFormData.passwd.trim() !== '' &&
          updatedFormData.full_name.trim() !== '' &&
          updatedFormData.phone_no.trim() !== ''
      );
    } else if (registrationType === 'company') {
      setFormFilled(
        updatedFormData.user_name.trim() !== '' &&
          updatedFormData.email.trim() !== '' &&
          updatedFormData.passwd.trim() !== '' &&
          updatedFormData.full_name.trim() !== '' &&
          updatedFormData.legality_no.trim() !== '' &&
          updatedFormData.donor_type_id.trim() !== ''
      );
    }

    // Check for duplicate username/email/phone
    if (name === 'user_name' || name === 'email' || name === 'phone_no') {
      try {
        const {usernameExists, emailExists, phoneExists} =
          await checkUsernameEmail(
            name === 'user_name' ? value : formData.user_name,
            name === 'email' ? value : formData.email,
            name === 'phone_no' ? value : formData.phone_no
          );
        setUsernameExists(usernameExists);
        setEmailExists(emailExists);
        setPhoneExists(phoneExists);
      } catch (error) {
        console.error('Failed to check username/email/phone', error);
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (registrationType === 'personal') {
        await registerPersonal(formData);
      } else if (registrationType === 'company') {
        await registerCompany(formData);
      }
      Swal.fire({
        position: 'center',
        icon: 'success',
        iconColor: '#75C8FB',
        title: 'Register Successful',
        showConfirmButton: false,
        timer: 2500
      });
      // Store email in localStorage
      localStorage.setItem('email', formData.email);
      localStorage.setItem('registrationData', JSON.stringify(formData));
      localStorage.setItem('registrationType', registrationType);
      router.push('/register/verifycode');
    } catch (error: any) {
      console.error('Registration failed', error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Registration Unsuccessful',
        text: error.message || 'Registration failed due to a server error.',
        showConfirmButton: false,
        timer: 2500
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleBackClick = () => {
    setRegistrationType('');
  };

  return (
    <main className="flex h-full flex-col bg-slate-100 dark:bg-slate-800 justify-center items-center">
      {/* <Link
        href="/"
        className="bg-logo-blue w-32 h-12 bg-no-repeat bg-contain flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
      ></Link> */}
      <div className="sm:w-[400px] md:w-2/5 flex flex-row dark:bg-slate-900 dark:bg-slate-900 bg-white border-0 rounded-3xl sm:p-20 md:p-10 h-auto my-28">
        {!registrationType && (
          <div className="w-full flex flex-col mt-3 gap-y-3 justify-around items-center md:my-16 sm:my-8 p-4">
            <div className="flex flex-col justify-center items-start gap-y-3 w-full">
              <h5 className="text-lg font-semibold text-gray-700 pb-4">
                {t('RegisterPage.titleUtama')}
              </h5>
              <button
                onClick={() => handleRegistrationType('personal')}
                className={`w-full text-sm leading-4 mb-5 dark:text-slate-500 transitions duration-200 ease-in hover:border-gray-300 dark:hover:border-sky-300 flex flex-row justify-between items-center gap-x-3 border dark:border-slate-500 rounded-xl py-3 px-2 ${
                  registrationType === 'personal'
                    ? 'border-blue-700 text-blue-700'
                    : 'border-gray-100 text-gray-500'
                }`}
              >
                <div className="flex flex-row gap-x-5">
                  <MdOutlinePersonalInjury className="w-4 h-4 text-sky-500" />{' '}
                  {t('RegisterPage.buttonRegisterPersonal')}
                </div>
                <ChevronRight />
              </button>
              <button
                onClick={() => handleRegistrationType('company')}
                className={`w-full text-sm leading-4 transitions duration-200 ease-in hover:bg-sky-600 dark:hover:border-sky-300 flex flex-row items-center justify-between gap-x-3 border dark:border-slate-500 rounded-xl py-3 px-2 text- ${
                  registrationType === 'company'
                    ? 'border-blue-700 text-blue-700'
                    : 'bg-sky-700 text-gray-50'
                }`}
              >
                <div className="flex flex-row gap-x-5">
                  <GrOrganization className="w-4 h-4 text-gray-100" />{' '}
                  {t('RegisterPage.buttonRegisterCompanyorCommunity')}
                </div>
                <ChevronRight />
              </button>
              <div className="flex flex-row gap-x-2 text-center my-4">
                <p className="text-gray-700 dark:text-slate-300 text-sm">
                  Do you already have a Human Initiative account ?
                </p>
                <Link href="/login" className="text-sky-500 text-sm font-bold">
                  Login
                </Link>
              </div>
            </div>
          </div>
        )}

        {registrationType && (
          <div className="w-full">
            <button
              onClick={handleBackClick}
              className="flex flex-row items-center mb-4 text-blue-500"
            >
              <IoArrowBack /> Back
            </button>
            <form onSubmit={handleSubmit}>
              {registrationType === 'personal' && (
                <div className="form-animate flex flex-col mb-4 gap-y-8 mt-8 w-full">
                  <h3 className="text-2xl dark:text-white text-slate-700 font-semibold text-center pb-8">
                    {t('RegisterPage.titlePersonal')}
                  </h3>
                  <div className="flex flex-col relative">
                    <label className="absolute top-[-10px] left-[12px] z-[4] h-4 py-0 px-1 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-white">
                      {t('RegisterPage.formFieldUsername')}
                    </label>
                    <input
                      type="text"
                      name="user_name"
                      value={formData.user_name}
                      onChange={handleChange}
                      placeholder={t('RegisterPage.formPlaceUsername')}
                      className={`relative h-11 px-4 rounded-lg bg-white dark:bg-slate-950 border dark:border-slate-600 ${
                        usernameExists ? 'border-red-500' : 'border-zinc-200'
                      } dark:focus:border-sky-700 focus:border-sky-600 focus:outline-none dark:placeholder:text-slate-700 transition duration-300 ease-in-out text-sm`}
                    />
                    {usernameExists && (
                      <p className="text-red-500">Username already exists</p>
                    )}
                  </div>
                  <div className="flex flex-col relative">
                    <label className="absolute top-[-10px] left-[12px] z-[4] h-4 py-0 px-1 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-white">
                      {t('RegisterPage.formFieldFullname')}
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder={t('RegisterPage.formPlaceFullname')}
                      className="relative text-sm h-11 px-4 bg-white dark:bg-slate-950 rounded-lg border dark:border-slate-600 dark:placeholder:text-slate-700 border-zinc-200 dark:focus:border-sky-700 focus:border-sky-600 focus:outline-none transition duration-300 ease-in-out"
                    />
                  </div>
                  <div className="flex flex-col relative">
                    <label className="absolute top-[-10px] left-[12px] z-[4] h-4 py-0 px-1 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-white">
                      {t('RegisterPage.formFieldEmail')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('RegisterPage.formPlaceEmail')}
                      className={`relative text-sm h-11 px-4 bg-white dark:bg-slate-950 rounded-lg border dark:border-slate-600 ${
                        emailExists ? 'border-red-500' : 'border-zinc-200'
                      } dark:focus:border-sky-700 focus:border-sky-600 focus:outline-none dark:placeholder:text-slate-700 transition duration-300 ease-in-out`}
                    />
                    {emailExists && (
                      <p className="text-red-500">Email already exists</p>
                    )}
                  </div>
                  <div className="flex flex-col relative">
                    <label className="absolute top-[-10px] left-[12px] z-[4] h-4 py-0 px-1 bg-white dark:bg-slate-950 text-xs text-slate-800 dark:text-white">
                      {t('RegisterPage.formFieldPhone')}
                    </label>
                    <input
                      type="text"
                      name="phone_no"
                      value={formData.phone_no}
                      onChange={handleChange}
                      placeholder={t('RegisterPage.formPlacePhone')}
                      className={`relative text-sm h-11 px-4 bg-white dark:bg-slate-950 rounded-lg border dark:border-slate-600 ${
                        phoneExists ? 'border-red-500' : 'border-zinc-200'
                      } dark:focus:border-sky-700 focus:border-sky-600 focus:outline-none dark:placeholder:text-slate-700 transition duration-300 ease-in-out`}
                    />
                    {phoneExists && (
                      <p className="text-red-500">
                        Phone Number already exists
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col relative">
                    <label className="absolute top-[-10px] left-[12px] z-[4] h-4 py-0 px-1 bg-white dark:bg-slate-950 text-xs text-slate-800 dark:text-white">
                      {t('RegisterPage.formFieldPassword')}
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="passwd"
                        value={formData.passwd}
                        onChange={handleChange}
                        placeholder={t('RegisterPage.formPlacePassword')}
                        className="relative text-sm w-full bg-white dark:bg-slate-950 h-11 px-4 rounded-lg border dark:border-slate-600 border-zinc-200 dark:focus:border-sky-700 focus:border-sky-600 focus:outline-none dark:placeholder:text-slate-700 transition duration-300 ease-in-out"
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                        title="Password must contain at least one lowercase letter, one uppercase letter, one number, and minimum 8 characters"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <PiEye /> : <PiEyeClosed />}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {registrationType === 'company' && (
                <div className="form-animate flex flex-col mb-4 gap-y-8 py-6 mt-8 w-full dark:bg-slate-900">
                  <h3 className="text-2xl dark:text-white text-sky-900 font-semibold text-center pb-8">
                    {t('RegisterPage.titleCompanyorCommunity')}
                  </h3>
                  <div className="flex flex-row gap-x-4">
                    <label
                      className={`w-1/2 flex items-center transition ease-in duration-200 rounded-xl px-4 py-2 border border-slate-200 hover:border hover:border-sky-800 ${
                        formData.donor_type_id === '2'
                          ? 'bg-sky-600 text-white'
                          : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="donor_type_id"
                        value="2"
                        checked={formData.donor_type_id === '2'}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            donor_type_id: e.target.value
                          })
                        }
                        className="mr-2"
                      />
                      Community
                    </label>
                    <label
                      className={`w-1/2 flex items-center transition ease-in duration-200 rounded-xl px-4 py-2 border border-slate-200 hover:border hover:border-sky-800 ${
                        formData.donor_type_id === '3'
                          ? 'bg-sky-600 text-white'
                          : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="donor_type_id"
                        value="3"
                        checked={formData.donor_type_id === '3'}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            donor_type_id: e.target.value
                          })
                        }
                        className="mr-2"
                      />
                      Company
                    </label>
                  </div>
                  <div className="flex flex-col relative">
                    <label className="absolute top-[-10px] left-[12px] z-[4] h-4 py-0 px-1 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-white">
                      {t('RegisterPage.formFieldUsername')}
                    </label>
                    <input
                      type="text"
                      name="user_name"
                      value={formData.user_name}
                      onChange={handleChange}
                      placeholder={t('RegisterPage.formPlaceUsername')}
                      className={`relative h-11 px-4 rounded-lg bg-white dark:bg-slate-950 border dark:border-slate-600 ${
                        usernameExists ? 'border-red-500' : 'border-zinc-200'
                      } dark:focus:border-sky-700 focus:border-sky-600 focus:outline-none dark:placeholder:text-slate-700 transition duration-300 ease-in-out text-sm`}
                    />
                    {usernameExists && (
                      <p className="text-red-500">Username already exists</p>
                    )}
                  </div>
                  <div className="flex flex-col relative">
                    <label className="absolute top-[-10px] left-[12px] z-[4] h-4 py-0 px-1 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-white">
                      {t('RegisterPage.formFieldCompanyorCommunity')}
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder={t(
                        'RegisterPage.formPlaceCompanyorCommunity'
                      )}
                      className="relative text-sm h-11 px-4 bg-white dark:bg-slate-950 rounded-lg border dark:border-slate-600 dark:placeholder:text-slate-700 border-zinc-200 dark:focus:border-sky-700 focus:border-sky-600 focus:outline-none transition duration-300 ease-in-out"
                    />
                  </div>
                  <div className="flex flex-col relative">
                    <label className="absolute top-[-10px] left-[12px] z-[4] h-4 py-0 px-1 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-white">
                      {t('RegisterPage.formFieldLegality')}
                    </label>
                    <input
                      type="text"
                      name="legality_no"
                      value={formData.legality_no}
                      onChange={handleChange}
                      placeholder={t('RegisterPage.formPlaceLegality')}
                      className="relative text-sm h-11 px-4 bg-white dark:bg-slate-950 rounded-lg border dark:border-slate-600 dark:placeholder:text-slate-700 border-zinc-200 dark:focus:border-sky-700 focus:border-sky-600 focus:outline-none transition duration-300 ease-in-out"
                    />
                  </div>
                  <div className="flex flex-col relative">
                    <label className="absolute top-[-10px] left-[12px] z-[4] h-4 py-0 px-1 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-white">
                      {t('RegisterPage.formFieldEmail')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('RegisterPage.formPlaceEmail')}
                      className={`relative text-sm h-11 px-4 bg-white dark:bg-slate-950 rounded-lg border dark:border-slate-600 ${
                        emailExists ? 'border-red-500' : 'border-zinc-200'
                      } dark:focus:border-sky-700 focus:border-sky-600 focus:outline-none dark:placeholder:text-slate-700 transition duration-300 ease-in-out`}
                    />
                    {emailExists && (
                      <p className="text-red-500">Email already exists</p>
                    )}
                  </div>
                  <div className="flex flex-col relative">
                    <label className="absolute top-[-10px] left-[12px] z-[4] h-4 py-0 px-1 bg-white dark:bg-slate-950 text-xs text-slate-800 dark:text-white">
                      {t('RegisterPage.formFieldPassword')}
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="passwd"
                        value={formData.passwd}
                        onChange={handleChange}
                        placeholder={t('RegisterPage.formPlacePassword')}
                        className="relative text-sm w-full bg-white dark:bg-slate-950 h-11 px-4 rounded-lg border dark:border-slate-600 border-zinc-200 dark:focus:border-sky-700 focus:border-sky-600 focus:outline-none dark:placeholder:text-slate-700 transition duration-300 ease-in-out"
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                        title="Password must contain at least one lowercase letter, one uppercase letter, one number, and minimum 8 characters"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <PiEye /> : <PiEyeClosed />}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className={`h-11 px-4 w-full rounded-xl ${
                  formFilled
                    ? 'bg-sky-600 dark:bg-sky-800 text-white dark:hover:bg-white dark:hover:text-slate-900'
                    : 'bg-zinc-200 dark:bg-slate-800 text-zinc-400 cursor-not-allowed'
                }`}
                disabled={!formFilled}
              >
                Register
              </button>
              <div className="flex flex-row gap-x-2 text-center my-4">
                <p className="text-gray-700 dark:text-slate-300 text-sm">
                  Do you already have a Human Initiative account ?
                </p>
                <Link href="/login" className="text-sky-500 text-sm font-bold">
                  Login
                </Link>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
};

export default RegisterPage;
