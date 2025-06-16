import { useState, useEffect } from 'react';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from '@headlessui/react';
import { IoMdCheckmark } from "react-icons/io";
import { IoChevronDown } from "react-icons/io5";
import { useSession } from 'next-auth/react';

type Location = {
  id: number;
  location_name: string;
};

type Props = {
  onLastSelectedChange: (lastSelectedId: number) => void;
};

const LocationAutocomplete: React.FC<Props> = ({ onLastSelectedChange }) => {
  const { data: session }: any = useSession();
  const userLocation = session?.user?.location;
  const [query, setQuery] = useState('');
  const [provinces, setProvinces] = useState<Location[]>([]);
  const [cities, setCities] = useState<Location[]>([]);
  const [subdistricts, setSubdistricts] = useState<Location[]>([]);
  const [wards, setWards] = useState<Location[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<Location | null>(null);
  const [selectedCity, setSelectedCity] = useState<Location | null>(null);
  const [selectedSubdistrict, setSelectedSubdistrict] = useState<Location | null>(null);
  const [selectedWard, setSelectedWard] = useState<Location | null>(null);

  useEffect(() => {
    // Fetch initial data based on userLocation from session
    if (userLocation) {
      setSelectedProvince(userLocation.Provinsi || null);
      setSelectedCity(userLocation['Kota/Kabupaten'] || null);
      setSelectedSubdistrict(userLocation.Kecamatan || null);
      setSelectedWard(userLocation.Kelurahan || null);

      if (userLocation.Provinsi) {
        fetchCities('', userLocation.Provinsi.parent_id);
      }
      if (userLocation['Kota/Kabupaten']) {
        fetchCities('', userLocation['Kota/Kabupaten'].parent_id);
      }
      if (userLocation.Kecamatan) {
        fetchSubdistricts('', userLocation.Kecamatan.parent_id);
      }
      if (userLocation.Kelurahan) {
        fetchWards('', userLocation.Kelurahan.parent_id);
      }
    }
  }, [userLocation]);

  useEffect(() => {
    fetchProvinces(query);
  }, [query]);

  const fetchProvinces = async (searchQuery: string) => {
    const response = await fetch(`https://adminx.human-initiative.org/location-complete/get-location-search?location_name=${searchQuery}`);
    const data = await response.json();
    setProvinces(Array.isArray(data) ? data : []);
  };

  const fetchCities = async (searchQuery: string, provinceId: number) => {
    if (!provinceId) return;
    const response = await fetch(`https://adminx.human-initiative.org/location-complete/get-location-kota?parent_id=${provinceId}&location_name=${searchQuery}`);
    const data = await response.json();
    setCities(Array.isArray(data) ? data : []);
  };

  const fetchSubdistricts = async (searchQuery: string, cityId: number) => {
    if (!cityId) return;
    const response = await fetch(`https://adminx.human-initiative.org/location-complete/get-location-kec?parent_id=${cityId}&location_name=${searchQuery}`);
    const data = await response.json();
    setSubdistricts(Array.isArray(data) ? data : []);
  };

  const fetchWards = async (searchQuery: string, subdistrictId: number) => {
    if (!subdistrictId) return;
    const response = await fetch(`https://adminx.human-initiative.org/location-complete/get-location-kel?parent_id=${subdistrictId}&location_name=${searchQuery}`);
    const data = await response.json();
    setWards(Array.isArray(data) ? data : []);
  };

  const handleProvinceChange = async (province: Location | null) => {
    setSelectedProvince(province);
    setSelectedCity(null);
    setSelectedSubdistrict(null);
    setSelectedWard(null);
    setQuery('');
    if (province) {
      await fetchCities('', province.id);
    }
  };
  
  const handleCityChange = async (city: Location | null) => {
    setSelectedCity(city);
    setSelectedSubdistrict(null);
    setSelectedWard(null);
    setQuery('');
    if (city) {
      await fetchSubdistricts('', city.id);
    }
  };
  
  const handleSubdistrictChange = async (subdistrict: Location | null) => {
    setSelectedSubdistrict(subdistrict);
    setSelectedWard(null);
    setQuery('');
    if (subdistrict) {
      await fetchWards('', subdistrict.id);
      onLastSelectedChange(subdistrict.id);
    }
  };
  
  const handleWardChange = (ward: Location | null) => {
    setSelectedWard(ward);
    if (ward) {
      onLastSelectedChange(ward.id);
    }
  };


  return (
    <div className="space-y-4">
      <Combobox value={selectedProvince} onChange={handleProvinceChange}>
        <div className="relative">
          <ComboboxInput
            className="text-gray-700 dark:text-gray-300 border rounded px-4 py-2 w-full bg-background text-background border border-gray-300 dark:border-slate-600 focus:outline-none focus:border-sky-600 dark:focus:border-sky-500"
            placeholder="Cari Provinsi..."
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(province: Location) => province?.location_name || ''}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <IoChevronDown className="size-4 fill-white/60 group-data-[hover]:fill-white" />
          </ComboboxButton>
        </div>
        <Transition
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <ComboboxOptions className="absolute z-10 mt-1 w-[60%] dark-bg-slate-900 bg-white border rounded max-h-60 overflow-auto">
            {provinces.map((province) => (
              <ComboboxOption key={province.id} value={province}>
                {({ active, selected }) => (
                  <div className={`cursor-pointer select-none relative py-2 pl-4 pr-4 ${active ? 'bg-blue-600 text-white' : 'text-gray-900'}`}>
                    <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                      {province.location_name}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                        <IoMdCheckmark className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </div>
                )}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </Transition>
      </Combobox>

      {selectedProvince && (
        <div>
          <label htmlFor="text" className="block dark:text-slate-200 text-gray-700 font-bold mb-2">Kota/Kabupaten</label>
          <Combobox value={selectedCity} onChange={handleCityChange}>
            <div className="relative">
              <ComboboxInput
                className="border rounded px-4 py-2 w-full"
                placeholder="Cari Kota/Kabupaten..."
                onChange={(event) => fetchCities(event.target.value, selectedProvince?.id)}
                displayValue={(city: Location) => city?.location_name || ''}
              />
              <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                <IoChevronDown className="size-4 fill-white/60 group-data-[hover]:fill-white" />
              </ComboboxButton>
            </div>
            <Transition
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery('')}
            >
              <ComboboxOptions className="absolute z-10 mt-1 w-[60%] dark-bg-slate-900 bg-white border rounded max-h-60 overflow-auto">
                {cities.map((city) => (
                  <ComboboxOption key={city.id} value={city}>
                    {({ active, selected }) => (
                      <div className={`cursor-pointer select-none relative py-2 pl-4 pr-4 ${active ? 'bg-blue-600 text-white' : 'text-gray-900'}`}>
                        <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                          {city.location_name}
                        </span>
                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                            <IoMdCheckmark className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </div>
                    )}
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            </Transition>
          </Combobox>
        </div>
      )}

      {selectedCity && (
        <div>
          <label htmlFor="text" className="block dark:text-slate-200 text-gray-700 font-bold mb-2">Kecamatan</label>
          <Combobox value={selectedSubdistrict} onChange={handleSubdistrictChange}>
            <div className="relative">
              <ComboboxInput
                className="border rounded px-4 py-2 w-full"
                placeholder="Cari Kecamatan..."
                onChange={(event) => fetchSubdistricts(event.target.value, selectedCity?.id)}
                displayValue={(subdistrict: Location) => subdistrict?.location_name || ''}
              />
              <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                <IoChevronDown className="size-4 fill-white/60 group-data-[hover]:fill-white" />
              </ComboboxButton>
            </div>
            <Transition
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery('')}
            >
              <ComboboxOptions className="absolute z-10 mt-1 w-[60%] dark-bg-slate-900 bg-white border rounded max-h-60 overflow-auto">
                {subdistricts.map((subdistrict) => (
                  <ComboboxOption key={subdistrict.id} value={subdistrict}>
                    {({ active, selected }) => (
                      <div className={`cursor-pointer select-none relative py-2 pl-4 pr-4 ${active ? 'bg-blue-600 text-white' : 'text-gray-900'}`}>
                        <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                          {subdistrict.location_name}
                        </span>
                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                            <IoMdCheckmark className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </div>
                    )}
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            </Transition>
          </Combobox>
        </div>
      )}

      {selectedSubdistrict && (
        <div>
          <label htmlFor="text" className="block dark:text-slate-200 text-gray-700 font-bold mb-2">Kelurahan</label>
          <Combobox value={selectedWard} onChange={handleWardChange}>
            <div className="relative">
              <ComboboxInput
                className="border rounded px-4 py-2 w-full"
                placeholder="Cari Kelurahan..."
                onChange={(event) => fetchWards(event.target.value, selectedSubdistrict?.id)}
                displayValue={(ward: Location) => ward?.location_name || ''}
              />
              <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                <IoChevronDown className="size-4 fill-white/60 group-data-[hover]:fill-white" />
              </ComboboxButton>
            </div>
            <Transition
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery('')}
            >
              <ComboboxOptions className="absolute z-10 mt-1 w-[60%] dark-bg-slate-900 bg-white border rounded max-h-60 overflow-auto">
                {wards.map((ward) => (
                  <ComboboxOption key={ward.id} value={ward}>
                    {({ active, selected }) => (
                      <div className={`cursor-pointer select-none relative py-2 pl-4 pr-4 ${active ? 'bg-blue-600 text-white' : 'text-gray-900'}`}>
                        <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                          {ward.location_name}
                        </span>
                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                            <IoMdCheckmark className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </div>
                    )}
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            </Transition>
          </Combobox>
        </div>
      )}
    </div>
  );
};

export default LocationAutocomplete;
