'use client';
import EditAccount from '@/components/account/EditAccount';
import EditProfil from '@/components/account/EditProfil';
import DashboardLayout from '@/components/ui/dashboard/DashboardLayout';
import {useSession} from 'next-auth/react';
import {Fragment, useState} from 'react';
import ChangePassword from '@/components/account/ChangePassword'; // Import komponen ChangePassword

type FieldValue = string | number | null | any[];

interface Field {
  label: string;
  value: FieldValue;
}

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

const Page = () => {
  const session: any = useSession();
  const [isEditAkun, setisEditAkun] = useState(false);
  const [isEditProfil, setisEditProfil] = useState(false);
  const [isChangePassword, setisChangePassword] = useState(false); // State untuk menentukan apakah komponen ChangePassword ditampilkan atau tidak
  const user: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
    register_date?: string | null | undefined;
    full_name?: string | null | undefined;
    phpDonorData?: any[];
    userType?: string | null | undefined;
    location?: {
      Provinsi?: {location_name: string} | null | undefined;
      'Kota/Kabupaten'?: {location_name: string} | null | undefined;
      Kecamatan?: {location_name: string} | null | undefined;
      Kelurahan?: {location_name: string} | null | undefined;
    };
    phones?: any[];
    contactInformation?: any[];
  } = session?.data?.user || {};

  const donorData = user.phpDonorData || [];

  const phoneData = user.phones || [];

  const contactData = user.contactInformation || [];

  const objectArray = Object.entries(user);
  const filteredFields = ['user_name', 'full_name', 'email', 'register_date'];

  const fields: {[key: string]: string} = {
    user_name: 'User Name',
    full_name: 'Nama Lengkap',
    email: 'Email',
    register_date: 'Register Date'
  };

  const fieldArray: Field[] = objectArray
    .filter(([key, _]) => filteredFields.includes(key))
    .map(([key, value]) => {
      if (key === 'location') {
        return {
          label: fields[key],
          value: getLocationString(value)
        };
      }
      return {
        label: fields[key],
        value: value as FieldValue
      };
    });

  const getLocationString = (location: any): string => {
    if (!location) return '';
    const {
      Provinsi,
      'Kota/Kabupaten': KotaKabupaten,
      Kecamatan,
      Kelurahan
    } = location;
    return `${Provinsi?.location_name || ''}, ${KotaKabupaten?.location_name || ''}, ${Kecamatan?.location_name || ''}, ${Kelurahan?.location_name || ''}`;
  };

  return (
    <DashboardLayout>
      <main className="flex h-full flex-col px-16 py-12 pb-0">
        {isEditAkun ? (
          <EditAccount setisEditAkun={setisEditAkun} />
        ) : isEditProfil ? (
          <EditProfil
            setisEditProfil={setisEditProfil}
            userType={user.userType || ''}
          />
        ) : (
          <Fragment>
            {!isChangePassword && (
              <div className="box mb-4 p-6 flex flex-col gap-y-5 rounded-3xl dark:bg-slate-900 bg-white">
                <div className="flex flex-row justify-between text-sm">
                  <h5 className="text-xl font-bold text-slate-900 dark:text-white">
                    Data Akun
                  </h5>
                  <div className="flex flex-row gap-x-3">
                    {/* Toggle ChangePassword component */}
                    <button
                      className="cursor-pointer text-sky-500"
                      onClick={() => {
                        setisChangePassword(true);
                      }}
                    >
                      Edit Kata Sandi
                    </button>
                    <button
                      className="cursor-pointer text-sky-500"
                      onClick={() => {
                        setisEditAkun(true);
                      }}
                    >
                      Edit Akun
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-y-4 text-sm">
                  {fieldArray.map((field, idx) => (
                    <div key={idx} className="flex flex-row">
                      <span className="mr-2 w-40 font-base dark:text-white dark:text-white text-zinc-800">
                        {field.label}
                      </span>
                      {field.label === 'Register Date' &&
                      typeof field.value === 'string' ? (
                        <span className="dark:text-white text-gray-800">
                          {formatDate(field.value)}
                        </span>
                      ) : (
                        <span className="dark:text-white text-gray-700">
                          {String(field.value)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Tampilkan ChangePassword jika isChangePassword true */}
            {isChangePassword && (
              <ChangePassword setisChangePassword={setisChangePassword} />
            )}
            {Object.keys(donorData).length > 0 && !isChangePassword && (
              <div className="box p-6 flex flex-col gap-y-5 rounded-3xl dark:bg-slate-900 bg-white">
                <div className="flex flex-row justify-between">
                  <h5 className="text-xl font-bold text-slate-900 dark:text-white">
                    Data Profil
                  </h5>
                  <div
                    className="cursor-pointer text-sky-500"
                    onClick={() => {
                      setisEditProfil(true);
                    }}
                  >
                    Edit Data
                  </div>
                </div>
                <div className="flex flex-col gap-y-4 text-sm">
                  {Array.isArray(donorData) &&
                    donorData.map((data: any, index: number) => (
                      <div key={index} className="flex flex-col gap-y-4">
                        {user.userType === 'personal' && (
                          <>
                            <div className="flex flex-col gap-y-4">
                              <div className="flex flex-row">
                                <span className="mr-2 w-40 font-base dark:text-white text-zinc-800">
                                  Jenis Kelamin
                                </span>
                                <span className="dark:text-white text-gray-700">
                                  {data?.sex === 1 ? 'Pria' : 'Wanita'}
                                </span>
                              </div>
                              <div className="flex flex-row">
                                <span className="mr-2 w-40 font-base dark:text-white text-zinc-800">
                                  Tempat Lahir
                                </span>
                                <span className="dark:text-white text-gray-700">
                                  {data?.birth_place}
                                </span>
                              </div>
                              <div className="flex flex-row">
                                <span className="mr-2 w-40 font-base dark:text-white text-zinc-800">
                                  Tanggal Lahir
                                </span>
                                <span className="dark:text-white text-gray-700">
                                  {formatDate(data?.birth_date)}
                                </span>
                              </div>
                              <div className="flex flex-row">
                                <span className="mr-2 w-40 font-base dark:text-white text-zinc-800">
                                  Golongan Darah
                                </span>
                                <span className="dark:text-white text-gray-700">
                                  {data?.blood_type}
                                </span>
                              </div>
                              <div className="flex flex-row">
                                <span className="mr-2 w-40 font-base dark:text-white text-zinc-800">
                                  Agama
                                </span>
                                <span className="dark:text-white text-gray-700">
                                  {data?.religion}
                                </span>
                              </div>
                              <div className="flex flex-row">
                                <span className="mr-2 w-40 font-base dark:text-white text-zinc-800">
                                  Kewarganegaraan
                                </span>
                                <span className="dark:text-white text-gray-700">
                                  {data?.country_id === 100
                                    ? 'Indonesia'
                                    : data?.country_id}
                                </span>
                              </div>
                              <div className="flex flex-row">
                                <span className="mr-2 w-40 font-base dark:text-white text-zinc-800">
                                  Alamat
                                </span>
                                <span className="dark:text-white text-gray-700">
                                  {data?.address}
                                </span>
                              </div>
                            </div>
                          </>
                        )}
                        {user.userType === 'company' && (
                          <>
                            <div className="flex flex-col gap-y-4">
                              <div className="flex flex-row">
                                <span className="mr-2 w-40 font-base dark:text-white text-zinc-800">
                                  Alamat
                                </span>
                                <span>{data?.address}</span>
                              </div>
                              <div className="flex flex-row">
                                <span className="mr-2 w-40 font-base dark:text-white text-zinc-800">
                                  Nama PIC
                                </span>
                                <span>{data?.name_pic}</span>
                              </div>
                              <div className="flex flex-row">
                                <span className="mr-2 w-40 font-base dark:text-white text-zinc-800">
                                  Kontak PIC
                                </span>
                                <span>{data?.contact_pic}</span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  {user.location && (
                    <div className="flex flex-col gap-y-4">
                      {Object.entries(user.location).map(
                        ([key, value], index) => (
                          <div key={index} className="flex flex-row">
                            <span className="mr-2 w-40 font-base dark:text-white text-zinc-800">
                              {key}
                            </span>
                            <span>{value?.location_name}</span>
                          </div>
                        )
                      )}
                    </div>
                  )}
                  {Array.isArray(phoneData) &&
                    phoneData.map((data: any, index: number) => (
                      <div key={index} className="flex flex-col gap-y-4">
                        <div className="flex flex-row">
                          <span className="mr-2 w-40 font-base dark:text-white text-zinc-800">
                            No. HP
                          </span>
                          <span>{data?.phone_no}</span>
                        </div>
                      </div>
                    ))}
                  {Array.isArray(contactData) &&
                    contactData.map((data: any, index: number) => (
                      <div key={index} className="flex flex-col gap-y-4">
                        <h5 className="text-base font-bold text-zinc-900">
                          Media Sosial
                        </h5>
                        <div className="flex flex-row">
                          <span className="mr-2 w-40 font-base dark:text-white text-zinc-800">
                            Instagram
                          </span>
                          <span>{data?.instagram}</span>
                        </div>
                        <div className="flex flex-row">
                          <span className="mr-2 w-40 font-base dark:text-white text-zinc-800">
                            Linkedin
                          </span>
                          <span>{data?.linkedin}</span>
                        </div>
                        <div className="flex flex-row">
                          <span className="mr-2 w-40 font-base dark:text-white text-zinc-800">
                            Youtube
                          </span>
                          <span>{data?.youtube}</span>
                        </div>
                        <div className="flex flex-row">
                          <span className="mr-2 w-40 font-base dark:text-white text-zinc-800">
                            Facebook
                          </span>
                          <span>{data?.facebook}</span>
                        </div>
                        <div className="flex flex-row">
                          <span className="mr-2 w-40 font-base dark:text-white text-zinc-800">
                            Website
                          </span>
                          <span>{data?.website}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </Fragment>
        )}
      </main>
    </DashboardLayout>
  );
};

export default Page;
