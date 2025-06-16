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
} from '@/components/ui/tabs-fe';
import {
  BookCheck,
  ListChecks,
  OctagonAlert,
  ClipboardPlus,
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
import {fetchListProject} from '@/lib/project/auth-list-program';
import {fetchListAppointmentbyUser} from '@/lib/project/auth-list-appointment-by-user';
import {postAppointment} from '@/lib/project/auth-post-appoinment';
import HashLoader from 'react-spinners/HashLoader';
import Link from 'next/link';
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
  progran_name: string;
}

const Page: React.FC = () => {
  const [errors, setError] = useState('');
  let [color, setColor] = useState('#209ce2');
  const {data: session, status, update}: any = useSession();
  const [userId, setUserId] = useState<string | null>(null);

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
  } = useQuery<ListAppointment[]>({
    queryKey: ['appointments', session?.user?.phpDonorData?.[0]?.guid],
    queryFn: () =>
      fetchListAppointmentbyUser(session!.user.phpDonorData[0].guid),
    enabled: !!session?.user?.phpDonorData?.[0]?.guid
  });

  const csrStatus = session?.user?.csr_status;

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

      const data = await response.json();
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
      setError('An error occurred while updating data');
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

  const handleSubmitAppointment = (programId: string) => {
    if (!userId) {
      alert('User ID tidak ditemukan. Harap refresh atau login ulang.');
      return;
    }

    const dateInput = document.getElementById('date') as HTMLInputElement;
    const enddateInput = document.getElementById(
      'end_date'
    ) as HTMLInputElement;
    const placeInput = document.getElementById('place') as HTMLInputElement;
    const notesInput = document.getElementById('notes') as HTMLTextAreaElement;

    if (!dateInput.value || !placeInput.value) {
      alert('Silakan isi tanggal dan tempat terlebih dahulu.');
      return;
    }

    const selectedDateTime = dateInput.value.replace('T', ' ') + ':00';
    const selectedEndDateTime = enddateInput.value.replace('T', ' ') + ':00';

    const appointmentData = {
      user_id: userId, // Pakai nilai terbaru dari state
      proposal_id: programId,
      date: selectedDateTime,
      end_date: selectedEndDateTime,
      tempat: placeInput.value,
      notes: notesInput.value,
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };

    mutation.mutate(appointmentData);
  };

  return (
    <DashboardLayout>
      <main className="flex min-h-screen flex-col px-16 py-12">
        <div className="box flex flex-col gap-y-5 rounded-3xl dark:bg-slate-900 bg-white">
          {csrStatus === 0 || csrStatus === null ? (
            <div className="status-denied">
              <button onClick={handleActivateCSR}>
                Apakah anda ingin mengaktifkan fitur CSR?
              </button>
              {error && <p className="text-red-500">{errors}</p>}
            </div>
          ) : (
            <div className="status-open">
              <Tabs defaultValue="program" className="w-full">
                <TabsList className="w-full flex flex-row justify-start p-10">
                  <TabsTrigger value="program" className="w-1/3">
                    <BookCheck className="mr-2 h-4 w-4" /> Program
                  </TabsTrigger>
                  <TabsTrigger value="appointment" className="w-1/3">
                    <ListChecks className="mr-2 h-4 w-4" /> Appointment
                  </TabsTrigger>
                  <TabsTrigger value="riwayatprogram" className="w-1/3">
                    <ListChecks className="mr-2 h-4 w-4" /> Programs Followed
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="program"
                  className="bg-[#f5f7fe] dark:bg-slate-800"
                >
                  <div className="flex flex-col gap-y-6 py-4 px-12 pb-12">
                    <h6 className="text-slate-500 text-sm font-semibold">
                      Program
                    </h6>
                    <Accordion
                      type="single"
                      className="flex flex-col gap-y-6"
                      collapsible
                    >
                      {isLoading ? (
                        <HashLoader
                          color={color}
                          loading={isLoading}
                          cssOverride={override}
                          size={50}
                        />
                      ) : error || proposalprograms.length === 0 ? (
                        <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                          No data available
                        </p>
                      ) : (
                        proposalprograms.map((programs, index) => (
                          <AccordionItem value={programs.id} key={index}>
                            <AccordionTrigger className="flex flex-row justify-between items-starts rounded-xl bg-white dark:bg-slate-700 p-6">
                              <div className="flex flex-row gap-x-4">
                                <span className="bg-sky-100 p-3 rounded-3xl">
                                  <Proportions className="text-sky-500" />
                                </span>
                                <div className="flex flex-col justify-start items-start gap-x-1">
                                  <h5>{programs.title}</h5>
                                  <p className="text-slate-400 text-sm">
                                    {programs.program_name}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <h5 className="text-slate-700 dark:text-white text-sm">
                                  {programs.project_goal}
                                </h5>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col items-center rounded-b-xl bg-white dark:bg-slate-700 p-6 border-t border-slate-200">
                              <div className="flex flex-row justify-between items-center w-full mb-8">
                                <h5 className="text-slate-500 dark:text-sky-600 text-normal font-semibold">
                                  Detail Program
                                </h5>
                                <button className="text-slate-500 dark:text-sky-600">
                                  {programs.title}
                                </button>
                              </div>
                              <div className="flex flex-wrap w-full">
                                <div className="w-full flex flex-row gap-x-4 items-center pb-4">
                                  <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 w-[150px]">
                                    Program Name
                                  </label>
                                  <h6 className="text-slate-800 dark:text-white">
                                    {programs.program_name}
                                  </h6>
                                </div>
                                <div className="w-full flex flex-row gap-x-4 items-center pb-4">
                                  <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 w-[150px]">
                                    Project Description
                                  </label>
                                  <h6 className="text-slate-800 dark:text-white">
                                    {programs.project_description}
                                  </h6>
                                </div>
                                <div className="w-full flex flex-row gap-x-4 items-center pb-4">
                                  <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 w-[150px]">
                                    Project Goals
                                  </label>
                                  <h6 className="text-slate-800 dark:text-white">
                                    {programs.project_goal}
                                  </h6>
                                </div>
                                <div className="w-full flex flex-row gap-x-4 items-center pb-4">
                                  <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 w-[150px]">
                                    Project Scope
                                  </label>
                                  <h6 className="text-slate-800 dark:text-white">
                                    {programs.project_scope}
                                  </h6>
                                </div>
                                <div className="w-full flex flex-row gap-x-4 items-center pb-4">
                                  <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 w-[150px]">
                                    Amount
                                  </label>
                                  <h6 className="text-sky-500 cursor-pointer">
                                    {formatPrice(programs.amount)}
                                  </h6>
                                </div>
                                <div className="w-full flex flex-row gap-x-4 items-center pb-4">
                                  <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 w-[150px]">
                                    Quantity
                                  </label>
                                  <h6 className="text-sky-500 cursor-pointer">
                                    {programs.quantity}
                                  </h6>
                                </div>
                              </div>
                              <div className="w-full flex justify-start items-center mt-4">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button className="bg-sky-500 text-white dark:bg-sky-800 transition ease-in duration-300 hover:bg-sky-600">
                                      Book an Appointment
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[825px]">
                                    <DialogHeader>
                                      <DialogTitle>
                                        Make an Appointment -{' '}
                                        {programs.program_name} {programs.id}
                                      </DialogTitle>
                                      <DialogDescription>
                                        To join the program please make an
                                        appointment first
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="flex flex-col justify-center items-center gap-4">
                                        <input
                                          id="date"
                                          type="datetime-local"
                                          className="w-full border border-solid autofill:!bg-slate-950 border-[#919EAB52] px-2 pb-2 pt-4 rounded-lg placeholder:text-[#919EAB] dark:!bg-slate-950 bg-white dark:text-white text-slate-950 focus:border-sky-600 focus:outline-none transition duration-300 ease-in-out"
                                          placeholder="Select Appointment Date"
                                        />
                                      </div>
                                      <div className="flex flex-col justify-center items-center gap-4">
                                        <input
                                          id="end_date"
                                          type="datetime-local"
                                          className="w-full border border-solid autofill:!bg-slate-950 border-[#919EAB52] px-2 pb-2 pt-4 rounded-lg placeholder:text-[#919EAB] dark:!bg-slate-950 bg-white dark:text-white text-slate-950 focus:border-sky-600 focus:outline-none transition duration-300 ease-in-out"
                                          placeholder="Select Appointment Date"
                                        />
                                      </div>
                                      <div className="flex flex-col justify-center items-center gap-4">
                                        <input
                                          id="place"
                                          type="text"
                                          className="w-full border border-solid autofill:!bg-slate-950 border-[#919EAB52] px-2 pb-2 pt-4 rounded-lg placeholder:text-[#919EAB] dark:!bg-slate-950 bg-white dark:text-white text-slate-950 focus:border-sky-600 focus:outline-none transition duration-300 ease-in-out"
                                          placeholder="Set an Appointment Place"
                                        />
                                      </div>
                                      <div className="flex flex-col justify-center items-center gap-4">
                                        <textarea
                                          id="notes"
                                          className="w-full border border-solid autofill:!bg-slate-950 border-[#919EAB52] px-2 pb-2 pt-4 rounded-lg placeholder:text-[#919EAB] dark:!bg-slate-950 bg-white dark:text-white text-slate-950 focus:border-sky-600 focus:outline-none transition duration-300 ease-in-out"
                                          placeholder="Add a Notes"
                                        />
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <DialogClose>
                                        <Button
                                          type="submit"
                                          onClick={() =>
                                            handleSubmitAppointment(programs.id)
                                          }
                                        >
                                          Submit Appointment
                                        </Button>
                                      </DialogClose>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))
                      )}
                    </Accordion>
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
                              <h5 className="text-slate-700 dark:text-white font-semibold mb-1">
                                {appointment.program_name}
                              </h5>
                              <h5 className="text-slate-700 dark:text-white font-semibold mb-1">
                                {appointment.date}
                              </h5>
                              <p className="text-slate-500 dark:text-slate-300 text-sm">
                                {appointment.status.status}
                              </p>
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col items-center rounded-b-xl bg-white dark:bg-slate-700 p-6 border-t border-slate-200">
                              <h5 className="text-slate-700 dark:text-white font-semibold mb-1">
                                Date: {appointment.date}
                              </h5>
                              <p className="text-slate-500 dark:text-slate-300 text-sm">
                                Place: {appointment.tempat}
                              </p>
                              <p className="text-slate-500 dark:text-slate-300 text-sm">
                                Notes: {appointment.notes}
                              </p>
                              <p className="text-slate-400 dark:text-slate-400 text-xs mt-2">
                                Created At: {appointment.created_at}
                              </p>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    )}
                  </TabsContent>
                </TabsContent>
                <TabsContent
                  value="riwayatprogram"
                  className="bg-[#f5f7fe] dark:bg-slate-800"
                >
                  <div className="flex flex-col gap-y-6 py-4 px-12 pb-12">
                    <h6 className="text-slate-500 text-sm font-semibold">
                      Program yang diikuti
                    </h6>
                    <div className="flex flex-col gap-y-6 ">
                      <Accordion
                        type="single"
                        className="flex flex-col gap-y-6"
                        collapsible
                      >
                        <AccordionItem value="item-1">
                          <AccordionTrigger className="flex flex-row justify-between items-center rounded-xl bg-white dark:bg-slate-700 p-6">
                            <div className="flex flex-row gap-x-4">
                              <span className="bg-amber-100 p-3 rounded-3xl">
                                <OctagonAlert className="text-amber-500" />
                              </span>
                              <div className="flex flex-col gap-x-1">
                                <h5>Program 1</h5>
                                <p className="text-slate-400 text-sm">
                                  18 Juli, 2018
                                </p>
                              </div>
                            </div>
                            <div>
                              <h5 className="text-slate-700 dark:text-white text-sm">
                                Selesai
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
                                  Program 1
                                </h6>
                              </div>
                              <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                <label className="text-slate-600 dark:text-white w-[150px]">
                                  Tanggal Bertemu
                                </label>
                                <h6 className="text-slate-800 dark:text-white">
                                  18 Juli 2018
                                </h6>
                              </div>
                              <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                <label className="text-slate-600 dark:text-white w-[150px]">
                                  Jenis Program
                                </label>
                                <h6 className="text-slate-800 dark:text-white">
                                  Children
                                </h6>
                              </div>
                              <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                <label className="text-slate-600 dark:text-white w-[150px]">
                                  Status
                                </label>
                                <h6 className="text-slate-800 dark:text-white">
                                  Selesai
                                </h6>
                              </div>
                              <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                <label className="text-slate-600 dark:text-white w-[150px]">
                                  File Proposal
                                </label>
                                <h6 className="text-sky-500 cursor-pointer">
                                  Proposal.pdf
                                </h6>
                              </div>
                              <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                <label className="text-slate-600 dark:text-white w-[150px]">
                                  Laporan
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
                        <AccordionItem value="item-2">
                          <AccordionTrigger className="flex flex-row justify-between items-center rounded-xl bg-white dark:bg-slate-700 p-6">
                            <div className="flex flex-row gap-x-4">
                              <span className="bg-cyan-100 p-3 rounded-3xl">
                                <ClipboardPlus className="text-cyan-500" />
                              </span>
                              <div className="flex flex-col gap-x-1">
                                <h5>Program 2</h5>
                                <p className="text-slate-400 text-sm">
                                  18 Juli, 2018
                                </p>
                              </div>
                            </div>
                            <div>
                              <h5 className="text-slate-700 dark:text-white text-sm">
                                Belum Dihubungi
                              </h5>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="flex flex-col items-center rounded-b-xl bg-white dark:bg-slate-700 p-6 border-t border-slate-200">
                            <div className="flex flex-row justify-between items-center w-full mb-8">
                              <h5 className="text-slate-500 text-normal font-semibold">
                                Detail Program
                              </h5>
                              <button className="text-sky-500">
                                Ubah Jadwal
                              </button>
                            </div>
                            <div className="flex flex-wrap w-full">
                              <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                <label className="text-slate-600 dark:text-white w-[150px]">
                                  Nama Program
                                </label>
                                <h6 className="text-slate-800 dark:text-white">
                                  Program 2
                                </h6>
                              </div>
                              <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                <label className="text-slate-600 dark:text-white w-[150px]">
                                  Tanggal Bertemu
                                </label>
                                <h6 className="text-slate-800 dark:text-white">
                                  18 Juli 2018
                                </h6>
                              </div>
                              <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                <label className="text-slate-600 dark:text-white w-[150px]">
                                  Jenis Program
                                </label>
                                <h6 className="text-slate-800 dark:text-white">
                                  Infrastruktur
                                </h6>
                              </div>
                              <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                <label className="text-slate-600 dark:text-white w-[150px]">
                                  Status
                                </label>
                                <h6 className="text-slate-800 dark:text-white">
                                  Belum Dihubungi
                                </h6>
                              </div>
                              <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                <label className="text-slate-600 dark:text-white w-[150px]">
                                  File Proposal
                                </label>
                                <h6 className="text-sky-500 cursor-pointer">
                                  Proposal.pdf
                                </h6>
                              </div>
                              <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                <label className="text-slate-600 dark:text-white w-[150px]">
                                  Laporan
                                </label>
                                <h6 className="text-slate-800">Belum Ada</h6>
                              </div>
                            </div>
                            <div className="w-full flex justify-start items-center mt-4">
                              <p className="text-slate-400 dark:text-white text-xs italic">
                                *Donor melakukan review terhadap Proposal yang
                                diajukan oleh Human Initiative
                              </p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                          <AccordionTrigger className="flex flex-row justify-between items-center rounded-xl bg-white dark:bg-slate-700 p-6">
                            <div className="flex flex-row gap-x-4">
                              <span className="bg-green-100 p-3 rounded-3xl">
                                <BookCheck className="text-green-500" />
                              </span>
                              <div className="flex flex-col gap-x-1">
                                <h5>Program 3</h5>
                                <p className="text-slate-400 text-sm">
                                  18 Juli, 2018
                                </p>
                              </div>
                            </div>
                            <div>
                              <h5 className="text-slate-700 dark:text-white text-sm">
                                Program Berlangsung
                              </h5>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="flex flex-col items-center rounded-b-xl bg-white dark:bg-slate-700 p-6 border-t border-slate-200">
                            <div className="flex flex-row justify-between items-center w-full mb-8">
                              <h5 className="text-slate-500 text-normal font-semibold">
                                Detail Program
                              </h5>
                              <button className="text-sky-500">
                                Ubah Jadwal
                              </button>
                            </div>
                            <div className="flex flex-wrap w-full">
                              <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                <label className="text-slate-600 dark:text-white w-[150px]">
                                  Nama Program
                                </label>
                                <h6 className="text-slate-800 dark:text-white">
                                  Program 3
                                </h6>
                              </div>
                              <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                <label className="text-slate-600 dark:text-white w-[150px]">
                                  Tanggal Bertemu
                                </label>
                                <h6 className="text-slate-800 dark:text-white">
                                  18 Juli 2018
                                </h6>
                              </div>
                              <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                <label className="text-slate-600 dark:text-white w-[150px]">
                                  Jenis Program
                                </label>
                                <h6 className="text-slate-800 dark:text-white">
                                  Disaster
                                </h6>
                              </div>
                              <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                <label className="text-slate-600 dark:text-white w-[150px]">
                                  Status
                                </label>
                                <h6 className="text-slate-800 dark:text-white">
                                  Program Berlangsung
                                </h6>
                              </div>
                              <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                <label className="text-slate-600 dark:text-white w-[150px]">
                                  File Proposal
                                </label>
                                <h6 className="text-sky-500 cursor-pointer">
                                  Proposal.pdf
                                </h6>
                              </div>
                              <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                <label className="text-slate-600 dark:text-white w-[150px]">
                                  Laporan
                                </label>
                                <h6 className="text-slate-800 dark:text-white">
                                  Tunggu sampai program selesai
                                </h6>
                              </div>
                            </div>
                            <div className="w-full flex justify-start items-center mt-4">
                              <p className="text-slate-400 dark:text-white text-xs italic">
                                *Human Initiative membuat pengajuan Proposal
                                Program
                              </p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
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
