'use client';
import React, {useState, useEffect, CSSProperties} from 'react';
import DashboardLayout from '@/components/ui/dashboard/DashboardLayout';
import {useSession} from 'next-auth/react';
import {useQuery, useMutation} from '@tanstack/react-query';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs-program';
import {
  BookCheck,
  ListChecks,
  OctagonAlert,
  ClipboardPlus,
  ClipboardCheck,
  ClipboardList,
  ClipboardPaste,
  BadgeInfo,
  BookmarkX,
  FileBarChart,
  Proportions
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {fetchListProject} from '@/lib/project/auth-list-program';
import {fetchListAppointmentbyUser} from '@/lib/project/auth-list-appointment-by-user';
import {postAppointment} from '@/lib/project/auth-post-appoinment';
import HashLoader from 'react-spinners/HashLoader';
import Link from 'next/link';
import Image from 'next/image';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import Swal from 'sweetalert2';
import {CalendarPicker} from '@/components/ui/utility/calendar/Calendar';
import {fetchProgramFollowedByGuid} from '@/lib/project/auth-list-program-followed';
import clsx from 'clsx';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red'
};

interface ProjectList {
  id: string;
  title: string;
  program_name: string;
  project_description: string;
  project_goal: string;
  project_scope: string;
  currency: string;
  amount: number;
  quantity: number;
}

interface ListAppointment {
  id: number;
  proposal_id: number;
  date: string;
  tempat: string;
  notes: string;
  created_at: string;
  user_id: string;
  end_date: string;
  status_id: number;
  status: string;
  program_name: string;
}

interface ProgramFollowed {
  project_no: string;
  project_name: string;
  program_name: string;
  status: string;
  execution_date_start: string;
  execution_date_finish: string;
}

const Page: React.FC = () => {
  const [errors, setError] = useState('');
  const [color, _setColor] = useState('#209ce2');
  const {data: session, status, update}: any = useSession();
  const [userId, setUserId] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [place, setPlace] = useState('');
  const [notes, setNotes] = useState('');

  const stepsUI = ['Review', 'On Progress', 'Finish', 'Complete'];

  const mapStatusToStep = (status: string): string => {
    const reviewStatuses = ['Draft', 'New', 'Need Revision', 'Verified'];
    if (reviewStatuses.includes(status)) return 'Review';
    if (status === 'Running') return 'On Progress';
    if (status === 'Finishing') return 'Finish';
    if (status === 'Closed') return 'Complete';
    return 'Unknown';
  };

  const getStepIndex = (step: string) => {
    return stepsUI.findIndex((s) => s === step);
  };

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.phpDonorData?.length > 0) {
      setUserId(session.user.phpDonorData[0].guid);
      console.log('User ID diperbarui:', session.user.phpDonorData[0].guid);
    }
  }, [status, session]);

  const {
    data: appointments = [],
    isLoading: loadingAppointments,
    error: errorAppointments
  } = useQuery<ListAppointment[], Error>({
    queryKey: ['appointments', session?.user?.phpDonorData?.[0]?.guid],
    queryFn: () =>
      fetchListAppointmentbyUser(session!.user.phpDonorData[0].guid),
    enabled: !!session?.user?.phpDonorData?.[0]?.guid
  });

  const {
    data: programfolloweds = [],
    isLoading: loadingProgramFollowed,
    error: errorProgramFollowed
  } = useQuery<ProgramFollowed[], Error>({
    queryKey: ['programfolloweds', session?.user?.phpDonorData?.[0]?.guid],
    queryFn: () =>
      fetchProgramFollowedByGuid(session!.user.phpDonorData[0].guid),
    enabled: !!session?.user?.phpDonorData?.[0]?.guid
  });

  const csrStatus = session?.user?.phpDonorData?.[0]?.csr_status;

  const handleActivateCSR = async () => {
    setError(''); // Clear previous errors

    try {
      // Update backend
      const response = await fetch(
        `https://adminx.human-initiative.org/account-api/update/${session?.user?.phpDonorData[0].id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            csr_status: 1
          })
        }
      );

      const _data = await response.json();
      // console.log("Response status:", response.status);
      // console.log("Response data:", data);

      if (!response.ok) {
        setError('Failed to update user data');
        return;
      }

      // Update session
      await update({
        csr_status: 1
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unknown error occurred';
      setError(`An error occurred while updating data: ${message}`);
    }
  };

  const {
    data: proposalprograms = [],
    isLoading,
    error
  } = useQuery<ProjectList[]>({
    queryKey: ['proposalprograms'],
    queryFn: fetchListProject
  });

  const formatPrice = (amount: number) => {
    return `Rp ${Number(amount)
      .toFixed(0)
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  };

  const mutation = useMutation({
    mutationFn: postAppointment,
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: 'Add Appointment Successfuly!',
        timer: 2000,
        showConfirmButton: false
      });
    },
    onError: (error) => {
      console.error('Error creating appointment:', error);
      alert('Gagal membuat appointment');
    }
  });

  const handleSubmitAppointment = ({
    programId,
    selectedDate,
    startTime,
    endTime,
    place,
    notes
  }: {
    programId: string;
    selectedDate: Date;
    startTime: string;
    endTime: string;
    place: string;
    notes: string;
  }) => {
    if (!userId) {
      alert('User ID tidak ditemukan. Harap refresh atau login ulang.');
      return;
    }

    if (!selectedDate || !startTime || !endTime || !place) {
      alert('Silakan lengkapi tanggal, jam, dan tempat terlebih dahulu.');
      return;
    }

    const dateStr = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD
    const selectedDateTime = `${dateStr} ${startTime}:00`;
    const selectedEndDateTime = `${dateStr} ${endTime}:00`;

    const appointmentData = {
      user_id: userId,
      proposal_id: programId,
      date: selectedDateTime,
      end_date: selectedEndDateTime,
      tempat: place,
      notes,
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };

    mutation.mutate(appointmentData, {
      onSuccess: () => {
        // Reset state dan step kembali ke awal
        setStep(1);
        setSelectedDate(null);
        setStartTime('');
        setEndTime('');
        setPlace('');
        setNotes('');
      },
      onError: () => {
        alert('Gagal menyimpan janji temu, silakan coba lagi.');
      }
    });
  };

  // mapping status ke label dan warna badge
  const statusBadges: Record<string, {label: string}> = {
    New: {
      label: 'Project sudah dikirim dan perlu verifikasi oleh admin'
    },
    Draft: {
      label: 'Project baru dibuat dan perlu melengkapi data projectnya'
    },
    Verified: {
      label: 'Project telah diverifikasi oleh tim kami dan siap untuk running'
    },
    'Need Revision': {
      label: 'Project Perlu Revisi'
    },
    Running: {
      label: 'Project Sudah Berjalan'
    },
    Finishing: {
      label:
        'Project sudah diupload laporan akhir dan memastikan semua administrasi telah selesai'
    },
    Closed: {label: 'Project telah selesai'}
  };

  return (
    <DashboardLayout>
      <main className="flex h-full flex-col px-16 py-12 pb-0">
        <div className="box flex flex-col gap-y-5 rounded-3xl dark:bg-slate-900 bg-white">
          {csrStatus === 0 || csrStatus === null ? (
            <div className="status-denied h-full p-6 flex justify-center items-center">
              <div className="w-full rounded-3xl flex flex-row justify-center items-center bg-gradient-to-r to-sky-400 from-blue-400 px-8 py-12">
                <div className="flex flex-col gap-y-5 w-2/3">
                  <h3 className="text-white font-bold text-2xl">
                    Mari wujudkan perubahan bersama.
                  </h3>
                  <p className="text-white font-medium text-base">
                    Aktifkan CSR dan jadilah bagian dari solusi sosial melalui
                    program kolaboratif antara lembaga Anda dan platform kami.
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="w-2/3 text-white backdrop-opacity-10 backdrop-invert bg-slate-900/30 drop-shadow-xl rounded-xl text-sm font-normal py-2 px-3 ">
                        Apakah anda ingin mengaktifkan fitur CSR?
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>CSR Activation</DialogTitle>
                      </DialogHeader>
                      <h4 className="text-slate-600 py-2 px-3">
                        Anda ingin mengaktifkan fitur CSR?
                      </h4>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" onClick={handleActivateCSR}>
                          Yes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="w-1/3">
                  <Image
                    src="/corporate-social-responsibility (1).png"
                    width={280}
                    height={270}
                    alt="CSR Human Initiative"
                  />
                </div>
              </div>
              {error && <p className="text-red-500">{errors}</p>}
            </div>
          ) : (
            <div className="status-open">
              <Tabs defaultValue="appointment" className="w-full">
                <TabsList className="w-full flex flex-wrap p-4 pb-8">
                  <TabsTrigger value="appointment" className="w-1/3">
                    <ListChecks className="mr-2 h-4 w-4" /> Appointment
                  </TabsTrigger>
                  <TabsTrigger value="programhistory" className="w-1/3">
                    <BookCheck className="mr-2 h-4 w-4" /> Program Yang Diikuti
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="programhistory"
                  className="bg-[#f5f7fe] dark:bg-slate-800 rounded-bl-3xl rounded-br-3xl"
                >
                  <div className="flex flex-col gap-y-6 py-4 px-12 pb-12">
                    <h6 className="text-slate-500 text-sm font-semibold">
                      Program Yang Anda Ikuti
                    </h6>
                    {loadingProgramFollowed ? (
                      <HashLoader
                        color={color}
                        loading={loadingProgramFollowed}
                        cssOverride={override}
                        size={50}
                      />
                    ) : errorProgramFollowed ? (
                      <p className="text-lg font-semibold text-red-600">
                        Failed to load appointments
                      </p>
                    ) : programfolloweds.length === 0 ? (
                      <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                        No appointments found
                      </p>
                    ) : (
                      <Accordion
                        type="single"
                        className="flex flex-col gap-4"
                        collapsible
                      >
                        {programfolloweds.map(
                          (programfollowed: any, index: any) => (
                            <AccordionItem
                              value={programfollowed.project_no}
                              key={index}
                            >
                              <AccordionTrigger className="flex flex-row justify-between items-starts rounded-xl bg-white dark:bg-slate-700 p-6">
                                <div className="flex flex-row gap-x-4">
                                  {programfollowed.status === 'Verified' && (
                                    <span className="bg-blue-100 p-3 rounded-3xl">
                                      <ClipboardList className="text-blue-500" />
                                    </span>
                                  )}
                                  {programfollowed.status === 'Finishing' && (
                                    <span className="bg-green-100 p-3 rounded-3xl">
                                      <ClipboardCheck className="text-green-500" />
                                    </span>
                                  )}
                                  {programfollowed.status === 'Closed' && (
                                    <span className="bg-green-100 p-3 rounded-3xl">
                                      <ClipboardCheck className="text-green-500" />
                                    </span>
                                  )}
                                  {programfollowed.status ===
                                    'Need Revision' && (
                                    <span className="bg-blue-100 p-3 rounded-3xl">
                                      <ClipboardList className="text-blue-500" />
                                    </span>
                                  )}
                                  {programfollowed.status === 'Running' && (
                                    <span className="bg-teal-100 p-3 rounded-3xl">
                                      <ClipboardPaste className="text-teal-500" />
                                    </span>
                                  )}
                                  {programfollowed.status === 'New' && (
                                    <span className="bg-blue-100 p-3 rounded-3xl">
                                      <ClipboardList className="text-blue-500" />
                                    </span>
                                  )}
                                  {programfollowed.status === 'Draft' && (
                                    <span className="bg-blue-100 p-3 rounded-3xl">
                                      <ClipboardList className="text-blue-500" />
                                    </span>
                                  )}
                                  <div className="flex flex-col justify-center items-start gap-x-1">
                                    <h5 className="text-gray-600 text-sm">
                                      {programfollowed.project_name}
                                    </h5>
                                    <p className="text-slate-400 text-xs">
                                      {programfollowed.program_name}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-slate-700 dark:text-white text-sm">
                                    {programfollowed.status}
                                  </h5>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="flex flex-col items-center rounded-b-xl bg-white dark:bg-slate-700 p-6 border-t border-slate-200">
                                <div className="flex flex-row justify-between items-center w-full mb-8">
                                  <h5 className="text-slate-500 dark:text-sky-600 text-normal font-semibold">
                                    Detail Program
                                  </h5>
                                  {programfollowed.status === 'Finishing' && (
                                    <button className="text-blue-500 font-semibold">
                                      Download Report
                                    </button>
                                  )}
                                  {[
                                    'Verified',
                                    'New',
                                    'Draft',
                                    'Running',
                                    'Need Revision'
                                  ].includes(programfollowed.status) && (
                                    <button className="text-slate-600 font-semibold">
                                      Not Available
                                    </button>
                                  )}
                                </div>
                                <div className="flex flex-wrap w-full">
                                  <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                    <label className="text-slate-600 dark:text-white w-[150px]">
                                      Nama Program
                                    </label>
                                    <h6 className="text-slate-800 dark:text-white">
                                      {programfollowed.program_name}
                                    </h6>
                                  </div>
                                  <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                    <label className="text-slate-600 dark:text-white w-[150px]">
                                      Nama Project
                                    </label>
                                    <h6 className="text-slate-800 dark:text-white">
                                      {programfollowed.project_name}
                                    </h6>
                                  </div>
                                  <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                    <label className="text-slate-600 dark:text-white w-[150px]">
                                      Mulai Dieksekusi
                                    </label>
                                    <h6 className="text-sky-500">
                                      {programfollowed.execution_date_start}
                                    </h6>
                                  </div>
                                  <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                    <label className="text-slate-600 dark:text-white w-[150px]">
                                      Target Rencana Selesai
                                    </label>
                                    <h6 className="text-sky-500">
                                      {programfollowed.execution_date_finish}
                                    </h6>
                                  </div>
                                  <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                    <label className="text-slate-600 dark:text-white w-[150px]">
                                      Status
                                    </label>
                                    <h6 className="text-slate-800 dark:text-white">
                                      {programfollowed.status}
                                    </h6>
                                  </div>
                                  <div className="w-full flex flex-col justify-center items-start gap-y-2">
                                    <div className="flex flex-col justify-center items-start gap-y-2">
                                      <div className="flex items-center gap-1">
                                        {stepsUI.map((step, idx) => {
                                          const currentStep = mapStatusToStep(
                                            programfollowed.status
                                          );
                                          const currentIdx =
                                            getStepIndex(currentStep);
                                          const isActive = idx === currentIdx;
                                          const isCompleted = idx < currentIdx;

                                          return (
                                            <div
                                              key={step}
                                              className="flex items-center"
                                            >
                                              <div
                                                className={clsx(
                                                  'text-xs font-semibold px-2 py-1 rounded-full',
                                                  isActive
                                                    ? 'bg-blue-600 text-white'
                                                    : isCompleted
                                                      ? 'bg-blue-200 text-blue-600'
                                                      : 'bg-slate-200 text-slate-500'
                                                )}
                                              >
                                                {step}
                                              </div>
                                              {idx < stepsUI.length - 1 && (
                                                <span className="mx-1 text-slate-400">
                                                  →
                                                </span>
                                              )}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="w-full flex flex-row justify-start items-center gap-x-4 py-4">
                                  <label className="text-slate-600 dark:text-white w-[150px]">
                                    Report
                                  </label>
                                  {(programfollowed.status === 'Finishing' ||
                                    programfollowed.status === 'Closed') && (
                                    <p className="text-slate-800 dark:text-white flex flex-row justify-center items-center gap-x-2">
                                      Available To Download
                                      <Popover>
                                        <PopoverTrigger asChild>
                                          <BadgeInfo className="text-sm w-4 h-4 text-slate-400" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-54">
                                          <p className="text-xs text-slate-500">
                                            Download bisa dilakukan diatas kanan
                                          </p>
                                        </PopoverContent>
                                      </Popover>
                                    </p>
                                  )}
                                  {[
                                    'Verified',
                                    'New',
                                    'Draft',
                                    'Running',
                                    'Need Revision'
                                  ].includes(programfollowed.status) && (
                                    <p className="text-slate-400 dark:text-white">
                                      Not Available
                                    </p>
                                  )}
                                </div>
                                <div className="w-full flex justify-start items-center mt-4">
                                  {statusBadges[programfollowed.status] && (
                                    <p
                                      className={`text-xs font-medium px-2 py-1 rounded-full text-gray-400 italic`}
                                    >
                                      *
                                      {
                                        statusBadges[programfollowed.status]
                                          .label
                                      }
                                    </p>
                                  )}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          )
                        )}
                      </Accordion>
                    )}
                  </div>
                </TabsContent>
                <TabsContent
                  value="appointment"
                  className="bg-[#f5f7fe] dark:bg-slate-800"
                >
                  <TabsContent
                    value="appointment"
                    className="bg-[#f5f7fe] dark:bg-slate-800 p-6"
                  >
                    <h6 className="text-slate-500 text-sm font-semibold mb-4">
                      Appointments
                    </h6>
                    {loadingAppointments ? (
                      <HashLoader
                        color={color}
                        loading={loadingAppointments}
                        cssOverride={override}
                        size={50}
                      />
                    ) : errorAppointments ? (
                      <p className="text-lg font-semibold text-red-600">
                        Failed to load appointments
                      </p>
                    ) : appointments.length === 0 ? (
                      <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                        No appointments found
                      </p>
                    ) : (
                      <Accordion
                        type="single"
                        className="flex flex-col gap-4"
                        collapsible
                      >
                        {appointments.map((appointment: any, index: any) => (
                          <AccordionItem value={appointment.id} key={index}>
                            <AccordionTrigger className="flex flex-row justify-between items-starts rounded-xl bg-white dark:bg-slate-700 p-6">
                              <div className="flex flex-row gap-x-4">
                                {appointment.status.id === 12 && (
                                  <span className="bg-green-100 p-3 rounded-3xl">
                                    <ClipboardCheck className="text-green-500" />
                                  </span>
                                )}
                                {appointment.status.id === 13 && (
                                  <span className="bg-cyan-100 p-3 rounded-3xl">
                                    <ClipboardPlus className="text-cyan-500" />
                                  </span>
                                )}
                                <div className="flex flex-col justify-center items-start gap-x-1">
                                  <h5 className="text-gray-600 text-sm">
                                    {appointment.program_name}
                                  </h5>
                                  <p className="text-slate-400 text-xs">
                                    {appointment.date}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <h5 className="text-slate-700 dark:text-white text-sm">
                                  {appointment.status.status}
                                </h5>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col items-center rounded-b-xl bg-white dark:bg-slate-700 p-6 border-t border-slate-200">
                              <div className="flex flex-row justify-between items-center w-full mb-8">
                                <h5 className="text-slate-500 dark:text-sky-600 text-normal font-semibold">
                                  Detail Program
                                </h5>
                                <button className="text-slate-500">
                                  Selesai
                                </button>
                              </div>
                              <div className="flex flex-wrap w-full">
                                <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                  <label className="text-slate-600 dark:text-white w-[150px]">
                                    Nama Program
                                  </label>
                                  <h6 className="text-slate-800 dark:text-white">
                                    {appointment.program_name}
                                  </h6>
                                </div>
                                <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                  <label className="text-slate-600 dark:text-white w-[150px]">
                                    Tanggal Bertemu
                                  </label>
                                  <h6 className="text-slate-800 dark:text-white">
                                    {appointment.date}
                                  </h6>
                                </div>
                                <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                  <label className="text-slate-600 dark:text-white w-[150px]">
                                    Jenis Program
                                  </label>
                                  <h6 className="text-slate-800 dark:text-white">
                                    Empowerment
                                  </h6>
                                </div>
                                <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                  <label className="text-slate-600 dark:text-white w-[150px]">
                                    Status
                                  </label>
                                  <h6 className="text-slate-800 dark:text-white">
                                    {appointment.status.status}
                                  </h6>
                                </div>
                                <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                  <label className="text-slate-600 dark:text-white w-[150px]">
                                    Notes
                                  </label>
                                  <h6 className="text-sky-500 cursor-pointer">
                                    {appointment.notes}
                                  </h6>
                                </div>
                                <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                  <label className="text-slate-600 dark:text-white w-[150px]">
                                    File Proposal
                                  </label>
                                  <h6 className="text-sky-500 cursor-pointer">
                                    Laporan.pdf
                                  </h6>
                                </div>
                              </div>
                              <div className="w-full flex justify-start items-center mt-4">
                                <p className="text-slate-400 dark:text-white text-xs italic">
                                  *Pengajuan tersimpan di database Human
                                  Initiative
                                </p>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    )}
                  </TabsContent>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Page;
