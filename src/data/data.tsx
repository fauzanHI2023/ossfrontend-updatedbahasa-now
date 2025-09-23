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

interface initiativeChildren {
  id: number;
  tab: string;
  icon: string;
  title: string;
  description: string;
  pemegangempat: string;
  pemeganglima: string;
  details?: {
    deskripsi: string;
    totalpemeganghak: string;
    harga: string;
  }[];
}

export const initiativeChildren = [
  {
    id: 1,
    tab: 'penguatankomunitas',
    icon: '/icon_katalog/Outline@16x.png',
    title: 'HOME Children Center',
    description:
      'Bentuk program Pusat Pengembangan Anak yaitu dengan mendirikan HOME Children Center sebagai pusat perlindungan dan pemenuhan hak anak di wilayah-wilayah rawan dan terpencil sebagai pemenuhan hak dan perlindungan anak.',
    pemegangempat: '1.783',
    pemeganglima: '3.000',
    details: [
      {
        deskripsi: 'Home Learning Center (12 Bulan)',
        totalpemeganghak: '50-100 ',
        harga: '300.000.000 '
      }
    ]
  },
  {
    id: 2,
    tab: 'penguatankomunitas',
    icon: '/icon_katalog/Asset 16@16x.png',
    title: 'Pendidikan Pra Sekolah',
    description:
      'Program Pendidikan Pra Sekolah untuk anak-anak, khususnya para refugees yang tinggal di Indonesia. ',
    pemegangempat: '714',
    pemeganglima: '2.500',
    details: [
      {
        deskripsi: 'Pendidikan pra Sekolah ',
        totalpemeganghak: '100',
        harga: '60.000.000'
      }
    ]
  },
  {
    id: 3,
    tab: 'penguatansekolah',
    icon: '/icon_katalog/Asset 17@16x.png',
    title: 'Penguatan Kapasitas Sekolah',
    description:
      'merupakan program yang diberikan kepada sekolah untuk meningkatkan kualitas pendidikan di sekolah. Bentuk penguatan yang diberikan antara lain sarana perpustakaan sekolah, laboratorium komputer, pelatihan guru, dan bentuk penguatan sistem lainnya',
    pemegangempat: '1.334',
    pemeganglima: '3.000',
    details: [
      {
        deskripsi: 'Komputer (per 10 unit) ',
        totalpemeganghak: '30',
        harga: '65.000.000 '
      },
      {
        deskripsi: 'Laptop (per 10 unit)',
        totalpemeganghak: '30',
        harga: '85.000.000'
      },
      {
        deskripsi: 'Perpustakaan',
        totalpemeganghak: '300',
        harga: '70.000.000'
      },
      {
        deskripsi: 'Buku',
        totalpemeganghak: '300',
        harga: '50.000.000'
      },
      {
        deskripsi: 'Alat Peraga Pendidikan',
        totalpemeganghak: '100',
        harga: '50.000.000'
      },
      {
        deskripsi: 'Pelatihan Guru',
        totalpemeganghak: '15',
        harga: '30.000.000 '
      }
    ]
  },
  {
    id: 4,
    tab: 'penguatankeluarga',
    icon: '',
    title: 'Orang Tua Asuh',
    description:
      'Program pemberian beasiswa pendidikan dalam bentuk bantuan dana pendidikan serta pembinaan bagi anak-anak yatim dan duafa digulirkan dengan skema bantuan Orang Tua Asuh (OTA) dari mitra donatur untuk anak-anak Pemegang Hak Program. Dalam implementasi program tersebut, Human Initiative berkolaborasi dengan mitra/komunitas lokal. ',
    pemegangempat: '8.283',
    pemeganglima: '8.300'
  },
  {
    id: 5,
    tab: 'penguatankeluarga',
    icon: '/icon_katalog/Asset 18@16x.png',
    title: 'Kesehatan Mental',
    description:
      'Program Dukungan Psikososial bisa mencakup layanan konseling atau terapi untuk siswa yang membutuhkan. Program ini bertujuan untuk memberikan dukungan yang diperlukan kepada siswa untuk mengatasi masalah kesehatan mental serta menciptakan lingkungan sekolah dan keluarga yang mendukung kesehatan mental siswa.',
    pemegangempat: '338',
    pemeganglima: '3.000',
    details: [
      {
        deskripsi: 'Dukungan Psikososial',
        totalpemeganghak: '200',
        harga: '40.000.000'
      },
      {
        deskripsi: 'Sekolah Tanpa Kekerasan',
        totalpemeganghak: '100',
        harga: '100.000.000'
      },
      {
        deskripsi: 'Edukasi Parenting',
        totalpemeganghak: '100',
        harga: '50.000.000'
      }
    ]
  }
];

interface initiativeEmpowerment {
  id: number;
  tab: string;
  icon: string;
  title: string;
  description: string;
  pemegangempat: string;
  pemeganglima: string;
  details?: {
    deskripsi: string;
    totalpemeganghak: string;
    harga: string;
  }[];
}

export const initiativeEmpowerment = [
  {
    id: 1,
    tab: 'peningkatanpendapatan',
    icon: '/icon_katalog/Asset 14@16x.png',
    title: 'Pelatihan Keterampilan',
    description:
      'Program Pelatihan Keterampilan yang menitikberatkan pada pengkapasitasan masyarakat dalam rangka meningkatkan keterampilan usaha serta kemampuan kerja yang sesuai dengan lapangan pekerjaan yang dibutuhkan. ',
    pemegangempat: '450',
    pemeganglima: '610'
  },
  {
    id: 2,
    tab: 'peningkatanpendapatan',
    icon: '/icon_katalog/Asset 22@16x.png',
    title: 'Dukungan Sarana & Modal Usaha',
    description:
      'Program Sarana dan Modal Usaha dengan bantuan pembinaan yang bertujuan untuk meningkatkan pengetahuan dan keterampilan UMKM.',
    pemegangempat: '2.600',
    pemeganglima: '7.300',
    details: [
      {
        deskripsi: 'Bantuan Dana Usaha',
        totalpemeganghak: '1',
        harga: '4.000.000'
      },
      {
        deskripsi: 'Bnantuan Gerobak',
        totalpemeganghak: '1',
        harga: '8.000.000'
      },
      {
        deskripsi: 'Bantuan Perahu',
        totalpemeganghak: '1',
        harga: '10.000.000'
      },
      {
        deskripsi: 'Bantuan Mesin Jahit',
        totalpemeganghak: '1',
        harga: '5.000.000'
      },
      {
        deskripsi: 'Bantuan Bibit Ikan',
        totalpemeganghak: '1',
        harga: '4.000.000'
      },
      {
        deskripsi: 'Bantuan Ternak',
        totalpemeganghak: '1',
        harga: '7.000.000'
      },
      {
        deskripsi: 'Bantuan Sarana Pertanian',
        totalpemeganghak: '1',
        harga: '10.000.000'
      }
    ]
  },
  {
    id: 3,
    tab: 'peningkatanpendapatan',
    icon: '/icon_katalog/Asset 15@16x.png',
    title: 'Pemberdayaan Ekonomi Keluarga',
    description:
      'Program pemberdayaan ekonomi keluarga yang bertujuan untuk meningkatkan pendapatan suatu keluarga dengan memberikan kesempatan bagi keluarga yang memiliki unit usaha',
    pemegangempat: '865',
    pemeganglima: '1.050',
    details: [
      {
        deskripsi: 'Kelompok Usaha Mandiri Masyarakat (KUMM)',
        totalpemeganghak: '30',
        harga: '225.000.000'
      },
      {
        deskripsi: 'Pusat Inkubasi Kemandirian (PIK)',
        totalpemeganghak: '30',
        harga: '255.000.000'
      }
    ]
  },
  {
    id: 4,
    tab: 'peningkatanpendapatan',
    icon: '/icon_katalog/Asset 13@16x.png',
    title: 'Pemberdayaan Ekonomi Komunoitas',
    description:
      'Program pemberdayaan masyarakat yang bertujuan untuk meningkatkan pendapatan masyarakat dalam suatu wilayah dengan membangun ekosistem yang kondusif bagi pengembangan ekonomi masyarakat',
    pemegangempat: '550',
    pemeganglima: '1.200',
    details: [
      {
        deskripsi: 'Bangun Industri Desa (BID)',
        totalpemeganghak: '30',
        harga: '300.000.000'
      },
      {
        deskripsi: 'Kelompok Usaha Bersama (KUBE)',
        totalpemeganghak: '30',
        harga: '225.000.000'
      }
    ]
  },
  {
    id: 5,
    tab: 'pemenuhangizidanketahananpangan',
    icon: '/icon_katalog/Asset 21@16x.png',
    title: 'Pemenuhan Gizi dan Ketahanan Pangan',
    description:
      'Program bantuan peningkatan derajat kesehatan terhadap isu-isu kesehatan di lingkungan masyarakat.',
    pemegangempat: '1.066',
    pemeganglima: '1.000',
    details: [
      {
        deskripsi: 'Gizi Ibu Hamil dan Balita',
        totalpemeganghak: '20',
        harga: '200.000.000'
      },
      {
        deskripsi: 'Kebun Gizi',
        totalpemeganghak: '30',
        harga: '120.000.000'
      },
      {
        deskripsi: 'Bidan Inspiratif',
        totalpemeganghak: '20',
        harga: '180.000.000'
      }
    ]
  },
  {
    id: 6,
    tab: 'perbaikanaksesairbersihsaniatasi',
    icon: '/icon_katalog/Asset 20@16x.png',
    title: 'Perbaikan Akses Air Bersih dan Sanitasi',
    description:
      'Program pemberdayaan masyarakat sebagai upaya peningkatan perilaku hidup sehat dan pengelolaan sampah rumah tangga berbasis komunitas.',
    pemegangempat: '561',
    pemeganglima: '3.500',
    details: [
      {
        deskripsi: 'Sarana Air Bersih',
        totalpemeganghak: '60',
        harga: '380.000.000'
      },
      {
        deskripsi: 'Bank Sampah',
        totalpemeganghak: '25',
        harga: '150.000.000'
      },
      {
        deskripsi: 'Arisan Jamban',
        totalpemeganghak: '30',
        harga: '120.000.000'
      }
    ]
  }
];

interface initiativeDisaster {
  id: number;
  tab: string;
  icon: string;
  title: string;
  description: string;
  pemegangempat: string;
  pemeganglima: string;
  details?: {
    deskripsi: string;
    totalpemeganghak: string;
    harga: string;
  }[];
}

export const initiativeDisaster = [
  {
    id: 1,
    tab: 'tanggapdarurat',
    icon: '/icon_katalog/Asset 7@16x.png',
    title: 'Emergency Response',
    description:
      'Sejumlah program yang bertujuan meningkatnya kualitas hidup masyarakat terdampak bencana minimal ke posisi awal sebelum bencana terjadi.',
    pemegangempat: '217.200',
    pemeganglima: '',
    details: [
      {
        deskripsi: 'SAR Rescue',
        totalpemeganghak: '200 KK',
        harga: '80.000.000'
      },
      {
        deskripsi: 'Food Packs',
        totalpemeganghak: '100 KK',
        harga: '30.000.000'
      },
      {
        deskripsi: 'Shelter Kits',
        totalpemeganghak: '100 KK',
        harga: '75.000.000'
      },
      {
        deskripsi: 'Hygiene kits',
        totalpemeganghak: '100 KK',
        harga: '27.500.000'
      },
      {
        deskripsi: 'Toilet Darurat',
        totalpemeganghak: '50 KK',
        harga: '20.000.000'
      },
      {
        deskripsi: 'Hunian Darurat',
        totalpemeganghak: '1 KK',
        harga: '8.000.000'
      },
      {
        deskripsi: 'Dignity Kits',
        totalpemeganghak: '100 KK',
        harga: '25.000.000'
      }
    ]
  },
  {
    id: 2,
    tab: 'penguranganresikobencana',
    icon: '',
    title: 'Kampung Tangguh',
    description:
      'merupakan desa yang memiliki kemampuan untuk mengenali ancaman di wilayahnya dan mampu mengorganisir sumber daya masyarakat untuk mengurangi kerentanan dan sekaligus meningkatkan kapasitas demi mengurangi risiko bencana. '
  },
  {
    id: 3,
    tab: 'penguranganresikobencana',
    icon: '',
    title: 'Mitigasi Perubahan Iklim',
    description:
      'Program Mitigasi Perubahan Iklim adalah serangkaian kegiatan untuk mengurangi dampak perubahan iklim dengan menurunkan emisi gas rumah kaca atau meningkatkan penyimpanan karbon.'
  }
];

interface initiativeInfrastruktur {
  id: number;
  tab: string;
  icon: string;
  title: string;
  description: string;
  pemegangempat: string;
  pemeganglima: string;
  details?: {
    deskripsi: string;
    ukuranluas: string;
    ukurankedalaman: string;
    jumlahtoilet: string;
    totalpemeganghak: string;
    harga: string;
  }[];
}

export const initiativeInfrastruktur = [
  {
    id: 1,
    tab: 'saranaumum',
    icon: '/icon_katalog/Asset 8@16x.png',
    title: 'Pembangunan & Renovasi Masjid',
    description: '',
    pemegangempat: '173',
    pemeganglima: '195',
    details: [{}]
  },
  {
    id: 2,
    tab: 'saranaumum',
    icon: '/icon_katalog/Asset 6@16x.png',
    title: 'Pembangunan Sarana Pendidikan',
    description: '',
    pemegangempat: '31',
    pemeganglima: '70',
    details: [
      {
        deskripsi: 'Ruang Kelas',
        ukuranluas: '5 x 6',
        jumlahtoilet: '0',
        totalpemeganghak: '30',
        harga: '92.500.000'
      }
    ]
  },
  {
    id: 3,
    tab: 'saranaumum',
    icon: '/icon_katalog/Asset 12@16x.png',
    title: 'Pembangunan Sarana Air Bersih',
    description:
      'Pembangunan sumur yang bertujuan untuk menyediakan sarana air bersih sehingga mampu meningkatkan kesejahteraan dan membentuk lingkungan masyarakat yang sehat.',
    pemegangempat: '488',
    pemeganglima: '935',
    details: [
      {
        deskripsi: 'Sumur Ukuran Standar',
        ukurankedalaman: '12',
        harga: '16.500.000'
      },
      {
        deskripsi: 'Sumur Ukuran Menengah',
        ukurankedalaman: '20 - 30',
        harga: '25.320.000'
      },
      {
        deskripsi: 'Sumur Ukuran Dalam',
        ukurankedalaman: '50',
        harga: '65.000.000'
      }
    ]
  },
  {
    id: 4,
    tab: 'saranaumum',
    icon: '/icon_katalog/Asset 11@16x.png',
    title: 'Penyedia Sarana Kesehatan',
    description:
      'Kegiatan penyediaan sarana maupun prasarana yang bertujuan mendukung program kesehatan masyarakat sehingga mampu meningkatkan kesejahteraan dan membentuk lingkungan masyarakat yang sehat.',
    pemegangempat: '8',
    pemeganglima: '17',
    details: [
      {
        deskripsi: 'Pembangunan Klinik (12x6 meter)',
        totalpemeganghak: '100',
        harga: '300.000.000'
      },
      {
        deskripsi: 'Ambulans (operasional)',
        totalpemeganghak: '100',
        harga: '120.000.000'
      }
    ]
  },
  {
    id: 5,
    tab: 'saranaumum',
    icon: '/icon_katalog/Asset 5@16x.png',
    title: 'Pembangunan Sarana Umum',
    description:
      'Kegiatan pembangunan ataupun perbaikan fasilitas umum yang bertujuan untuk meningkatkan kualitas hidup masyarakat dan mendukung pembangunan berkelanjutan.',
    pemegangempat: '5',
    pemeganglima: '10',
    details: [
      {
        deskripsi: 'Jembatan',
        totalpemeganghak: '100',
        harga: '500.000.000'
      }
    ]
  },
  {
    id: 6,
    tab: 'saranaumum',
    icon: '/icon_katalog/Asset 9@16x.png',
    title: 'Peralatan Sarana Umum',
    description:
      'Kegiatan distribusi peralatan ibadah yang bertujuan untuk mendukung kegiatan ibadah bagi masyarakat duafa dan mendukung pembangunan berkelanjutan.',
    pemegangempat: '761',
    pemeganglima: '1.000',
    details: [
      {
        deskripsi: 'Peralatan Ibadah',
        totalpemeganghak: '100',
        harga: '40.000.000'
      },
      {
        deskripsi: 'Sound System (1 paket per masjid)',
        totalpemeganghak: '50',
        harga: '10.000.000'
      },
      {
        deskripsi: 'Kipas Angin Tornado (2 unit per masjid)',
        totalpemeganghak: '50',
        harga: '2.000.000'
      },
      {
        deskripsi: 'Dispenser (1 unit per masjid)',
        totalpemeganghak: '50',
        harga: '2.300.000'
      },
      {
        deskripsi: 'Alquran',
        totalpemeganghak: '100',
        harga: '15.000.000'
      },
      {
        deskripsi: 'Solar Panel',
        totalpemeganghak: '50',
        harga: 'Menyesuaikan'
      }
    ]
  },
  {
    id: 7,
    tab: 'saranaperorangan',
    icon: '/icon_katalog/Asset 10@16x.png',
    title: 'Pembangunan Hunian',
    description:
      'Kegiatan pembangunan ataupun perbaikan tempat tinggal yang bertujuan memenuhi kebutuhan dasar manusia akan tempat tinggal yang guna meningkatkan kualitas hidup.',
    pemegangempat: '',
    pemeganglima: '',
    details: [
      {
        deskripsi: 'Huntara',
        totalpemeganghak: '1',
        harga: '20.000.000'
      },
      {
        deskripsi: 'Huntap (5x6 m )',
        totalpemeganghak: '1',
        harga: '125.000.000'
      },
      {
        deskripsi: 'Renovasi Rumah',
        totalpemeganghak: '1',
        harga: 'Menyesuaikan'
      }
    ]
  }
];

interface collaborateSponsor {
  id: number;
  img: string;
  title: string;
}

export const collaborateSponsor = [
  {
    id: 1,
    img: '/logo_mitra_perusahaan/mitra_perusahaan.jpg',
    title: 'PLN'
  },
  {
    id: 2,
    img: '/logo_mitra_perusahaan/mitra_perusahaan (1).png',
    title: 'BWS'
  },
  {
    id: 3,
    img: '/logo_mitra_perusahaan/mitra_perusahaan (2).png',
    title: 'Shopee'
  },
  {
    id: 4,
    img: '/logo_mitra_perusahaan/mitra_perusahaan (3).png',
    title: 'Level Infinite'
  },
  {
    id: 5,
    img: '/logo_mitra_perusahaan/mitra_perusahaan (4).jpg',
    title: 'Human Appeal'
  },
  {
    id: 6,
    img: '/logo_mitra_perusahaan/mitra_perusahaan (5).png',
    title: 'Guardian'
  },
  {
    id: 7,
    img: '/logo_mitra_perusahaan/mitra_perusahaan (6).png',
    title: 'Helping Hand'
  },
  {
    id: 8,
    img: '/logo_mitra_perusahaan/mitra_perusahaan (7).jpg',
    title: 'International Charity'
  },
  {
    id: 9,
    img: '/logo_mitra_perusahaan/mitra_perusahaan (8).png',
    title: 'IOM'
  },
  {
    id: 10,
    img: '/logo_mitra_perusahaan/mitra_perusahaan (9).jpg',
    title: 'Riot Games'
  },
  {
    id: 11,
    img: '/logo_mitra_perusahaan/mitra_perusahaan (10).png',
    title: 'CRS'
  },
  {
    id: 12,
    img: '/logo_mitra_perusahaan/mitra_perusahaan (11).png',
    title: 'SKKMIGAS'
  },
  {
    id: 13,
    img: '/logo_mitra_perusahaan/mitra_perusahaan (12).jpg',
    title: 'Tokopedia'
  },
  {
    id: 14,
    img: '/logo_mitra_perusahaan/mitra_perusahaan (13).jpg',
    title: 'KTB'
  },
  {
    id: 15,
    img: '/logo_mitra_perusahaan/mitra_perusahaan (14).png',
    title: 'Nama Foundation'
  },
  {
    id: 16,
    img: '/logo_mitra_perusahaan/mitra_perusahaan (15).png',
    title: 'Namaa Charity'
  },
  {
    id: 17,
    img: '/logo_mitra_perusahaan/mitra_perusahaan (16).jpg',
    title: 'Paragon Corp'
  },
  {
    id: 18,
    img: '/logo_mitra_perusahaan/mitra_perusahaan (17).svg',
    title: 'Pertamina'
  },
  {
    id: 19,
    img: '/logo_mitra_perusahaan/mitra_perusahaan (18).jpg',
    title: 'Bank Indonesia'
  },
  {
    id: 20,
    img: '/logo_mitra_perusahaan/mitra_perusahaan (19).jpg',
    title: 'Unicef'
  }
];

interface heroBanner {
  id: number;
  desc: string;
  img: string;
  link: string;
  namelink: string;
}

export const heroBanner = [
  {
    id: 1,
    desc: 'HeroBannerHome.SlideOne.desc',
    img: 'bg-herosatu',
    link: '#section-fundraisinghome',
    namelink: 'Fundraising Now'
  },
  {
    id: 2,
    desc: 'HeroBannerHome.SlideTwo.desc',
    img: 'bg-herodua',
    link: '#section-valuestreamhome',
    namelink: 'Value Stream'
  },
  {
    id: 3,
    desc: 'HeroBannerHome.SlideThree.desc',
    img: 'bg-herotiga',
    link: '#section-newshome',
    namelink: 'Read Story'
  },
  {
    id: 4,
    desc: 'HeroBannerHome.SlideFour.desc',
    img: 'bg-heroempat',
    link: '#section-publicationhome',
    namelink: 'Publication'
  }
];

interface layananKami {
  icon: string;
  label: string;
  desc: string;
}

export const layananKami = [
  {
    icon: '',
    label: 'Community Services',
    desc: 'Implementasi Program CSR berupa aktifitas charity pada lokasi yang ditunjuk oleh korporasi/institusi'
  },
  {
    icon: '',
    label: 'CSI',
    desc: 'Menilai sejauh mana kepuasan masyarakat atau tingkat kepuasan terhadap program sosial yang diinisiasi korporasi/institusi, baik secara kualitatif maupun kuantitatif.'
  },
  {
    icon: '',
    label: 'Creating Shared Value',
    desc: 'Tingkatkan nilai-nilai kompetitif korporasi/intitusi dan secara bersamaan memajukan kondisi sosial dan ekonomi'
  },
  {
    icon: '',
    label: 'Social Mapping',
    desc: 'Identifikasi program sosial apa yang benar-benar dibutuhkan oleh masyarakat dan sesuai dengan visi korporasi/institusi'
  },
  {
    icon: '',
    label: 'SROI (Social Return On Investment)',
    desc: 'Membantu korporasi/institusi memahami dan mengelola nilai sosial, lingkungan, dan ekonomi yang dihasilkan'
  },
  {
    icon: '',
    label: 'Proper',
    desc: 'Parameter penilaian dari korporasi/institusi terkait dengan aktivitasnya dalam mengelola sektor lingkungan hidup.'
  }
];

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
        label: 'Status Program',
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
  icon: string;
  namespace: ProgramNamespace;
  url: string;
}

export const programCard: programCard[] = [
  {
    icon: '/flooded-house.png',
    namespace: 'cardInitiativeforDisaster',
    url: '/whatwedo/initiativefordisaster'
  },
  {
    icon: '/playtime.png',
    namespace: 'cardInitiativeforChildren',
    url: '/whatwedo/initiativeforchildren'
  },
  {
    icon: '/gardening.png',
    namespace: 'cardInitiativeforEmpowerment',
    url: '/whatwedo/initiativeforempowerment'
  },
  {
    icon: '/bridge.png',
    namespace: 'cardInitiativeforInfrastructure',
    url: '/whatwedo/infrastructureprogram'
  }
];

interface summaryDashboard {
  icon: string;
  label: string;
  angka: string;
  url: string;
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
    angka: '100',
    url: '/dashboard/cphp/historycphp'
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
    angka: '100',
    url: '/dashboard/riwayatdonasi'
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
    angka: 'Rp 8.000.000',
    url: '/dashboard/riwayatdonasi'
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
    angka: 'Rp 6.200.000',
    url: '/dashboard/donasi/qurbanhistory'
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
