import {FaUserAlt, FaDonate} from 'react-icons/fa';
import {TbReportMoney} from 'react-icons/tb';
import {FiDownloadCloud} from 'react-icons/fi';
import {RiCustomerService2Line} from 'react-icons/ri';
import {MdFlood, MdHistory} from 'react-icons/md';
import {FaChildren} from 'react-icons/fa6';
import {SiPowers} from 'react-icons/si';
import {GiDrawbridge} from 'react-icons/gi';
import {RxDashboard} from 'react-icons/rx';
import {BsBasket2Fill} from 'react-icons/bs';
import type {ReactElement} from 'react';
import {GiCow} from 'react-icons/gi';
import {Banknote, FileChartLine, HandHelping, ListChecks} from 'lucide-react';
import {GiTakeMyMoney} from 'react-icons/gi';
import Image from 'next/image';

export const menuItems = [
  // {
  //     id: 1,
  //     label: 'Take Action',
  //     url: '/takeaction',
  //     subMenu: [
  //         { id: 21, label: 'Donate', url: '/takeaction/donate' },
  //         { id: 23, label: 'Program Sponsor', url: '/takeaction/collaborationimpact' },
  //     ],
  // },
  {
    id: 2,
    label: 'WhoweAreMenu.whoWeAre',
    url: '/whoweare',
    subMenu: [
      {id: 26, label: 'WhoweAreMenu.visionAndMission', url: '/whoweare'},
      {id: 27, label: 'WhoweAreMenu.meetOurManagement', url: '/whoweare'},
      {id: 28, label: 'WhoweAreMenu.ourStory', url: '/whoweare'},
      {id: 29, label: 'WhoweAreMenu.ourAward', url: '/whoweare'},
      {id: 30, label: 'WhoweAreMenu.ourLegality', url: '/whoweare'},
      {id: 31, label: 'WhoweAreMenu.seeOurImpact', url: '/whoweare'},
      {id: 32, label: 'WhoweAreMenu.branch', url: '/whoweare'},
      {id: 33, label: 'WhoweAreMenu.contactUs', url: '/whoweare'}
    ]
  },
  {
    id: 3,
    label: 'Whatwedo.whatweDo',
    url: '/whatwedo',
    subMenu: [
      {
        id: 34,
        label: 'Whatwedo.initiativeforDisaster',
        url: '/whatwedo/initiativefordisaster'
      },
      {
        id: 35,
        label: 'Whatwedo.initiativeforEmpowerment',
        url: '/whatwedo/initiativeforempowerment'
      },
      {
        id: 36,
        label: 'Whatwedo.initiativeforChildreb',
        url: '/whatwedo/initiativeforchildren'
      },
      {
        id: 37,
        label: 'Whatwedo.infrastructureProgram',
        url: '/whatwedo/infrastrukturprogram'
      },
      {
        id: 38,
        label: 'Whatwedo.humaninitiativeInstitute',
        url: 'https://hiinstitute.or.id/'
      }
    ]
  },
  {
    id: 4,
    label: 'JoinOurMovement.joinourMovement',
    url: '/joinourmovement',
    subMenu: [
      {id: 21, label: 'JoinOurMovement.Donate', url: '/takeaction/donate'},
      {
        id: 23,
        label: 'JoinOurMovement.Project',
        url: '/takeaction/collaborationimpact'
      },
      // {
      //   id: 39,
      //   label: "Be Program Implementor",
      //   url: "/joinourmovement/beprogramimplementor",
      // },
      // { id: 40, label: "Be Volunteer", url: "/joinourmovement/bevolunteer" },
      {
        id: 41,
        label: 'Be Humanitarian Worker',
        url: '/joinourmovement/behumanitarianworker'
      },
      {
        id: 42,
        label: 'JoinOurMovement.beRightholders',
        url: '/joinourmovement/rightholders'
      }
    ]
  },
  {
    id: 5,
    label: 'Publication.publication',
    url: '/publication',
    subMenu: [
      {
        id: 34,
        label: 'Publication.publicReport',
        url: '/publication/publicreport'
      },
      {
        id: 35,
        label: 'Publication.situationReport',
        url: '/publication/situationreport'
      },
      {
        id: 36,
        label: 'Publication.mediaRelease',
        url: '/publication/mediarelease'
      },
      {
        id: 37,
        label: 'Publication.newsStories',
        url: '/publication/news&stories'
      },
      {id: 38, label: 'Publication.event', url: '/publication/event'},
      {id: 39, label: 'Publication.library', url: '/publication/library'},
      {id: 40, label: 'Publication.petition', url: '/publication/petition'},
      {id: 41, label: 'Publication.gallery', url: '/publication/gallery'},
      {id: 42, label: 'Publication.document', url: '/publication/document'}
    ]
  }
];

interface SubMenu {
  label: string;
  url: string;
}

interface menuDashboard {
  label: string;
  url: string;
  icon: string;
  subMenu?: SubMenu[];
}

export const menuDashboard = [
  {
    label: 'HomeMenuDashboard.dashboard',
    url: '/dashboard',
    icon: <RxDashboard />
  },
  {
    label: 'MyAccountMenuDashboard.myaccount',
    url: '/dashboard/myaccount',
    icon: <FaUserAlt />
  },
  {
    label: 'DonationMenuDashboard.donation',
    url: '/dashboard/donasi',
    icon: <TbReportMoney />,
    subMenu: [
      {
        label: 'Qurban history',
        url: '/dashboard/donasi/qurbanhistory'
      },
      {
        label: 'Donation history',
        url: '/dashboard/riwayatdonasi'
      }
    ]
  },
  {
    label: 'ProjectMenuDashboard.project',
    url: '/dashboard/csrservices',
    icon: <RiCustomerService2Line />,
    subMenu: [
      {
        label: 'Sponsor Program',
        url: '/dashboard/csrservices/beliprogram'
      }
      // { label: "Join Proposal", url: "/dashboard/csrservices/ajukankonsep" },
    ]
  },
  {
    label: 'RightholdersMenuDashboard.rightholders',
    url: '/dashboard/cphp',
    icon: <FiDownloadCloud />,
    subMenu: [
      {
        label: 'Program List',
        url: '/dashboard/cphp/cphplist'
      },
      {
        label: 'Application List',
        url: '/dashboard/cphp/historycphp'
      }
    ]
  }
  // { label: "Volunteer", url: "/dashboard/volunteer", icon: <FaPeopleGroup /> },
  // { label: "Career", url: "/dashboard/karir", icon: <RiHomeOfficeFill /> },
  // { label: "Libraries", url: "/dashboard/library", icon: <IoLibrary /> },
  // {
  //   label: "Implementator Program",
  //   url: "/dashboard/implementorprogram",
  //   icon: <RiMiniProgramFill />,
  // },
];

type ProgramNamespace =
  | 'cardInitiativeforDisaster'
  | 'cardInitiativeforChildren'
  | 'cardInitiativeforEmpowerment'
  | 'cardInitiativeforInfrastructure';

export interface programCard {
  icon: ReactElement;
  namespace: ProgramNamespace;
  url: string;
}

export const programCard: programCard[] = [
  {
    icon: <MdFlood className="w-6 h-6" />,
    namespace: 'cardInitiativeforDisaster',
    url: '/whatwedo/initiativefordisaster'
  },
  {
    icon: <FaChildren className="w-6 h-6" />,
    namespace: 'cardInitiativeforChildren',
    url: '/whatwedo/initiativeforchildren'
  },
  {
    icon: <SiPowers className="w-6 h-6" />,
    namespace: 'cardInitiativeforEmpowerment',
    url: '/whatwedo/initiativeforempowerment'
  },
  {
    icon: <GiDrawbridge className="w-6 h-6" />,
    namespace: 'cardInitiativeforInfrastructure',
    url: '/whatwedo/infrastructureprogram'
  }
];

interface summaryDashboard {
  icon: string;
  label: string;
  angka: string;
}

export const summaryDashboard = [
  {
    icon: (
      <Image
        src="/social-care.png"
        alt="Pengajuan Bantuan"
        width={120}
        height={120}
        className="w-[110px] h-[110px] z-[10]"
      />
    ),
    label: 'Pengajuan Bantuan',
    angka: '100'
  },
  {
    icon: (
      <Image
        src="/transaction-history.png"
        alt="Transaksi Human Initiative"
        width={120}
        height={120}
        className="w-[110px] h-[110px] z-[10]"
      />
    ),
    label: 'Transaksi',
    angka: '100'
  },
  {
    icon: (
      <Image
        src="/donate.png"
        alt="Donasi Human Initiative"
        width={120}
        height={120}
        className="w-[110px] h-[110px] z-[10]"
      />
    ),
    label: 'Donasi',
    angka: 'Rp 8.000.000'
  },
  {
    icon: (
      <Image
        src="/head.png"
        alt="Qurban Human Initiative"
        width={120}
        height={120}
        className="w-[110px] h-[110px] z-[10]"
      />
    ),
    label: 'Qurban',
    angka: 'Rp 6.200.000'
  }
  // {
  //   icon: <FaPeopleCarryBox className="w-full text-sky-300 dark:text-sky-400" size={60} />,
  //   label: "CSR, GMO, Vendor",
  //   angka: "100",
  // },
  // {
  //   icon: <MdModelTraining className="w-full text-sky-300 dark:text-sky-400" size={60} />,
  //   label: "HII Pelatihan",
  //   angka: "100",
  // },
  // {
  //   icon: <RxActivityLog className="w-full text-sky-300 dark:text-sky-400" size={60} />,
  //   label: "Kerelawanan",
  //   angka: "100",
  // },
  // {
  //   icon: <FaSwatchbook className="w-full text-sky-300" size={60} />,
  //   label: "Buku",
  //   angka: "100",
  // },
  // {
  //   icon: <MdWorkHistory className="w-full text-sky-300 dark:text-sky-400" size={60} />,
  //   label: "Pengajuan Bantuan",
  //   angka: "100",
  // },
];

interface impactUpdated {
  year: string;
  donation: string;
  rightsholder: string;
  program: string;
  relawan: string;
}

export const impactUpdated = [
  {
    year: '2025',
    donation: '82428493758',
    rightsholders: '152840',
    program: '81',
    relawan: ''
  },
  {
    year: '2024',
    donation: '199672087311',
    rightsholders: '772202',
    program: '339',
    relawan: ''
  },
  {
    year: '2023',
    donation: '201926913228',
    rightsholders: '737768',
    program: '359',
    relawan: '4823'
  },
  {
    year: '2022',
    donation: '220579353208',
    rightsholders: '687867',
    program: '380',
    relawan: ''
  },
  {
    year: '2021',
    donation: '205353211053',
    rightsholders: '553289',
    program: '176',
    relawan: ''
  },
  {
    year: '2020',
    donation: '187710589479',
    rightsholders: '464031',
    program: '146',
    relawan: ''
  }
];

interface joinProject {
  image: string;
  nama: string;
  tipe: string;
  deskripsi: string;
  donasi: number;
  goals: number;
  dukungan: string;
}

export const joinProject = [
  {
    image: '/donate1.jpeg',
    nama: 'Berbagi Al-Quran Layak Sebarkan Hingga ke Pelosok Indonesia',
    tipe: 'Children',
    deskrispi:
      'Kebutuhan masjid yang layak dan nyaman untuk beribadah masih sangat tinggi, apa lagi bagi warga yang tinggal di desa pelosok. Biasanya bangunan masjid yang mereka miliki sangat sederhana, jauh dari kata layak digunakan.',
    donasi: '500000',
    goals: '15.000.000',
    dukungan: '48'
  },
  {
    image: '/donate2.jpeg',
    nama: 'Donasi Peduli Yatim & Duafa',
    tipe: 'Empowerment',
    deskrispi:
      'Kebutuhan masjid yang layak dan nyaman untuk beribadah masih sangat tinggi, apa lagi bagi warga yang tinggal di desa pelosok. Biasanya bangunan masjid yang mereka miliki sangat sederhana, jauh dari kata layak digunakan.',
    donasi: '500000',
    goals: '15.000.000',
    dukungan: '48'
  },
  {
    image: '/donate3.jpeg',
    nama: 'Bantu Renovasi Sekolah untuk Wilayah Terpencil Indonesia',
    tipe: 'Disaster',
    deskrispi:
      'Kebutuhan masjid yang layak dan nyaman untuk beribadah masih sangat tinggi, apa lagi bagi warga yang tinggal di desa pelosok. Biasanya bangunan masjid yang mereka miliki sangat sederhana, jauh dari kata layak digunakan.',
    donasi: '500000',
    goals: '15.000.000',
    dukungan: '48'
  },
  {
    image: '/donate4.jpeg',
    nama: 'Bangun Jembatan Desa untuk Wilayah Pelosok Negeri',
    tipe: 'Infrastruktur',
    deskrispi:
      'Kebutuhan masjid yang layak dan nyaman untuk beribadah masih sangat tinggi, apa lagi bagi warga yang tinggal di desa pelosok. Biasanya bangunan masjid yang mereka miliki sangat sederhana, jauh dari kata layak digunakan.',
    donasi: '500000',
    goals: '15.000.000',
    dukungan: '48'
  }
];

interface collectionPublic {
  image: string;
  name: string;
  deskripsi: string;
  price: string;
  bintang: string;
  views: string;
  diskon: string;
  type: string;
}

export const collectionPublic = [
  {
    image: '/cover-arab-2022 (2).png',
    name: '2022 (Arab)',
    deskripsi: '2022 (Arab)',
    price: '0',
    bintang: '5',
    view: '297',
    diskon: '0',
    type: 'annual'
  },
  {
    image: '/3315-WhatsApp Image 2024-03-18 at 13.01.07.jpeg',
    name: 'HI 2022 - Audited',
    deskripsi: 'HI 2022 - Audited',
    price: '0',
    bintang: '5',
    view: '297',
    diskon: '35.000',
    type: 'financial'
  },
  {
    image: '/cover-arab-2022 (1).png',
    name: '2022 (English)',
    deskripsi: '2022 (English)',
    price: '0',
    bintang: '5',
    view: '297',
    diskon: '35.000',
    type: 'annual'
  },
  {
    image: '/3315-WhatsApp Image 2024-03-18 at 13.01.07.jpeg',
    name: 'HI 2021 - Audited',
    deskripsi: 'HI 2021 - Audited',
    price: '0',
    bintang: '5',
    view: '90',
    diskon: '0',
    type: 'financial'
  },
  {
    image: '/cover-arab-2022 (1).png',
    name: '2022 (Indonesia)',
    deskripsi: '2022 (Indonesia)',
    price: '0',
    bintang: '5',
    view: '71',
    diskon: '0',
    type: 'annual'
  },
  {
    image: '/3327-COVER.png',
    name: 'HI 2020 - Audited',
    deskripsi: 'HI 2020 - Audited',
    price: '0',
    bintang: '5',
    view: '71',
    diskon: '0',
    type: 'financial'
  },
  {
    image: '/cover-arab-2022 (1).jpg',
    name: '2021 (English)',
    deskripsi: '2021 (English)',
    price: '0',
    bintang: '5',
    view: '71',
    diskon: '0',
    type: 'annual'
  },
  {
    image: '/cover-arab-2022 (3).png',
    name: 'Humanitarian Report 2019',
    deskripsi: 'Humanitarian Report 2019',
    price: '0',
    bintang: '5',
    view: '71',
    diskon: '0',
    type: 'learning'
  }
];

interface publicDonate {
  image: string;
  name: string;
  price: string;
  urldonate: string;
}

export const publicDonate = [
  {
    image: '/donate1.jpeg',
    name: 'Berbagi Al-Quran Layak Sebarkan Hingga ke Pelosok Indonesia',
    price: '323.942.800',
    urldonate: 'donate'
  },
  {
    image: '/donate2.jpeg',
    name: 'Donasi Peduli Yatim & Duafa',
    price: '254.746.463',
    urldonate: 'donate'
  },
  {
    image: '/donate3.jpeg',
    name: 'Bantu Renovasi Sekolah untuk Wilayah Terpencil Indonesia',
    price: '19.853.371',
    urldonate: 'donate'
  },
  {
    image: '/donate4.jpeg',
    name: 'Bangun Jembatan Desa untuk Wilayah Pelosok Negeri',
    price: '245.004.691',
    urldonate: 'donate'
  }
];

interface rightHolders {
  name: string;
  url: string;
  description: string;
  tanggal: string;
}

export const rightHolders = [
  {
    name: 'Form Pendaftaran Bantuan Sarana Usaha - Semarang',
    url: '/joinourmovement/rightholders',
    description:
      'Bantuan sarana usaha oleh Human Initiative adalah program yang bertujuan untuk meningkatkan perekonomian masyarakat melalui dukungan terhadap usaha kecil dan menengah (UKM).'
  },
  {
    name: 'Form Pendaftaran Masjid',
    url: '/joinourmovement/rightholders',
    description: ''
  },
  {
    name: 'Form Pendaftaran Kelas',
    url: '/joinourmevement/rightholders',
    description: ''
  },
  {
    name: 'Form Pengajuan Program Bangun Industri Desa',
    url: '/rightholders',
    description:
      'Program Bangun Industri Desa (BID) Human Initiative bertujuan untuk meningkatkan kesejahteraan masyarakat desa melalui pengembangan dan pemberdayaan potensi ekonomi lokal.'
  }
];

interface programCSR {
  image: string;
  name: string;
  price: string;
  urldonate: string;
}

export const programCSR = [
  {
    image: '/donate1.jpeg',
    name: 'Berbagi Al-Quran Layak Sebarkan Hingga ke Pelosok Indonesia',
    price: '323.942.800',
    urldonate: 'donate'
  },
  {
    image: '/donate2.jpeg',
    name: 'Donasi Peduli Yatim & Duafa',
    price: '254.746.463',
    urldonate: 'donate'
  },
  {
    image: '/donate3.jpeg',
    name: 'Bantu Renovasi Sekolah untuk Wilayah Terpencil Indonesia',
    price: '19.853.371',
    urldonate: 'donate'
  },
  {
    image: '/donate4.jpeg',
    name: 'Bangun Jembatan Desa untuk Wilayah Pelosok Negeri',
    price: '245.004.691',
    urldonate: 'donate'
  }
];

interface newsHome {
  image: string;
  name: string;
  price: string;
  urlnews: string;
}

export const newsHome = [
  {
    image: '/imagejoin1.png',
    tanggal: '6 Januari 2024',
    name: 'Berbagi Al-Quran Layak Sebarkan Hingga ke Pelosok Indonesia',
    deskripsi: 'Berbagi al-quran ke pelosok indonesia',
    urlnews: '/newsandstories'
  },
  {
    image: '/imagejoin2.png',
    tanggal: '4 Februari 2024',
    name: 'Donasi Peduli Yatim & Duafa',
    deskripsi: 'Donasi kepada yatim dan dhuafa',
    urlnews: '/newsandstories'
  },
  {
    image: '/imagejoin3.png',
    tanggal: '11 Februari 2024',
    name: 'Bantu Renovasi Sekolah untuk Wilayah Terpencil Indonesia',
    deskripsi:
      'Bantuan renovasi sekolah untuk wilayah wilayah terpencil di indonesia ',
    urlnews: '/newsandstories'
  },
  {
    image: '/imagejoin4.png',
    tanggal: '21 April 2024',
    name: 'Bangun Jembatan Desa untuk Wilayah Pelosok Negeri',
    deskripsi: 'Bangun Jembatan desa',
    urlnews: '/newsandstories'
  }
];

interface projectNewCSR {
  description: string;
  title: string;
  src: string;
  ctaText: string;
  ctaLink: string;
  content: string;
}

export const projectNewCSR = [
  {
    description: 'Berbagi Al-Quran',
    title: 'Berbagi Al-Quran Layak Sebarkan Hingga ke Pelosok Indonesia',
    src: '/donate1.jpeg',
    ctaText: 'Lihat',
    ctaLink: '/collaborationimpact',
    content: () => {
      return (
        <p>
          Hadiahkan Al-Quran untuk para Tahfidz di Pelosok Sebagai negara dengan
          mayoritas muslim pertama di dunia, kebutuhan Alquran layak menjadi
          sangat penting. Karena kita tahu bahwa Alquran merupakan pedoman hidup
          bagi seorang muslim. Akan tetapi banyak warga di daerah pelosok
          Indonesia belum terfasilitasi Alquran layak. Salah satu faktornya
          adalah keterbatasan ekonomi yang dihadapi warga di daerah pelosok
          sehingga mereka sering kali harus memprioritaskan kebutuhan pokoknya
          lebih dulu, dan terpaksa menahannya untuk membeli Alquran.
        </p>
      );
    }
  },
  {
    description: 'Donasi Peduli',
    title: 'Donasi Peduli Yatim & Duafa',
    src: '/donate2.jpeg',
    ctaText: 'Lihat',
    ctaLink: '/collaborationimpact',
    content: () => {
      return (
        <p>
          Donasi Peduli Yatim dan Duafa Anak-anak yatim dan duafa di Indonesia
          yang hidup dalam keterbatasan sosial ekonomi masih sangat membutuhkan
          bantuan kita. Bukan hanya bantuan tunai, tetapi mereka membutuhkan
          bantuan penghidupan dan pendidikan yang layak Bagaimana pun mereka
          berhak mendapatkan hak-haknya sebagai seorang anak. Meskipun orang
          tuanya mempunyai keterbatas dan tidak dapat memberikan hak sepenuhnya.
          Maka kita yang memiliki keluasan finansial berkewajiban membantu
          mereka.
        </p>
      );
    }
  },

  {
    description: 'Bantu Renovasi Sekolah',
    title: 'Bantu Renovasi Sekolah untuk Wilayah Terpencil Indonesia',
    src: '/donate3.jpeg',
    ctaText: 'Lihat',
    ctaLink: '/collaborationimpact',
    content: () => {
      return (
        <p>
          Wujudkan Sekolah Layak di Desa Pelosok Indonesia Bersekolah di tempat
          yang layak adalah impian semua siswa, termasuk mereka yang tinggal di
          wilayah Pelosok Indonesia. Karena ketersediaan sekolah layak dan
          fasilitas yang lengkap dapat membantu meningkatkan kualitas
          Pendidikan. Namun sayangnya, masih banyak siswa di pelosok Indonesia
          yang harus menimba ilmu di tempat yang hanya terbangun dari papan
          kayu, serta fasilitas belajarnya sudah rapuh dan lapuk. Seperti salah
          satu kisah sekolah di wilayah Takengon, Kabupaten Aceh Tengah yang
          hanya terbangun dari papan kayu dan bangunannya hanya setengah badan.
          Sekolah ini memiliki enam kelas dan satu ruang guru yang beratap seng.
          Sehingga ketika siang hari para siswa kepanasan, dan bila hujan mereka
          juga kebahasan.
        </p>
      );
    }
  },
  {
    description: 'Bangun Jembatan',
    title: 'Bangun Jembatan Desa untuk Wilayah Pelosok Negeri',
    src: '/donate4.jpeg',
    ctaText: 'Lihat',
    ctaLink: '/collaborationimpact',
    content: () => {
      return (
        <p>
          Bangun Jembatan Desa untuk Wilayah Pelosok Negeri Hujan deras yang
          melanda Desa Lengkong, Kabupaten Sukabumi, Indonesia menyebabkan
          sungai meluap dan arusnya deras sehingga mengakibatkan jembatan putus.
          Jembatan ini merupakan akses utama masyarakat untuk melakukan
          aktivitas sosial ekonomi. Jembatan yang putus tersebut memiliki
          panjang 80 meter, dan merupakan satu-satunya akses yang menghubungkan
          empat desa, yaitu Desa Bantarsari, Desa Bantarpanjang, Desa Sirnasari,
          dan Desa Lengkong. Meskipun jembatan putus, warga terpaksa tetap
          melewati jembatan ini meskipun sangat berbahaya bagi nyawa mereka.
        </p>
      );
    }
  }
];

interface career {
  title: string;
  negara: string;
  kota: string;
  tipe: string;
  jobdescription: string;
  requirements: string;
}

export const career = [
  {
    title: 'Institutional & Program Officer',
    negara: 'Indonesia',
    kota: 'Daerah Istimewa Yogyakarta',
    tipe: 'Kontrak',
    jobdescription:
      'Menjalankan aktivitas partnership sesuai arahan organisasi,Melaksanakan sosialisasi brand Human Initiative,Mencapai target penghimpunan institusional yang ditetapkan,Melakukan profiling pada perusahaan,Melakukan evaluasi dan maintenance kepada donator institusional,Melakukan mapping dan kunjungan,Menyampaikan laporan implementasi program ke Donor,Aktif dalam berkomunikasi dengan donor,Melakukan ekspansi donor dan terdapat retensi donasi dari donor,Terlibat dalam event CSR,Menginput donasi dan membuat IPP di system',
    requirements:
      'Pendidikan minimal S1 semua jurusan,Memiliki pengalaman minimal 1 tahun sebagai marketer di dunia NGO,Memiliki kemampuan menggunakan Ms. Office dan presentasi yang baik.,Memiliki pengetahuan teknik marketing yang baik.,Memahami isu dunia kemanusian dan terampil dalam membuat proposal program.,Mampu mengendarai motor lebih disukai,Memiliki semangat untuk memberdayakan, berkolaborasi dan amanah.'
  }
];

// data/data.tsx

// Tempat untuk menyimpan data
export const savedData: {[key: string]: string}[] = [];

// Fungsi untuk menyimpan data baru
export const saveFormData = (newData: {[key: string]: string}) => {
  savedData.push(newData);
  console.log('Data saved successfully:', savedData);
};
