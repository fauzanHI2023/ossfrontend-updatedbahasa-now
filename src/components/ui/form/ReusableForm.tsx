// components/ReusableForm.tsx
import React from 'react';

type FieldType = {
  label: string;
  type: 'text' | 'email' | 'textarea' | 'select';  // Pastikan tipe 'type' hanya tipe yang diizinkan
  name: string;
  value: string;
  options?: { label: string; value: string }[];  // Opsional, hanya untuk 'select'
};

interface ReusableFormProps {
  formData: FieldType[];
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

// Komponen InputField
const InputField: React.FC<FieldType & { onChange: ReusableFormProps['onChange'] }> = ({
  label,
  type,
  name,
  value,
  onChange,
}) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
);

// Komponen TextAreaField
const TextAreaField: React.FC<FieldType & { onChange: ReusableFormProps['onChange'] }> = ({
  label,
  name,
  value,
  onChange,
}) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
);

// Komponen SelectField
const SelectField: React.FC<FieldType & { onChange: ReusableFormProps['onChange'] }> = ({
  label,
  name,
  value,
  onChange,
  options = [],
}) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

// Komponen ReusableForm
const ReusableForm: React.FC<ReusableFormProps> = ({ formData, onSubmit, onChange }) => {
  return (
    <form onSubmit={onSubmit} className="w-full max-w-lg mx-auto">
      {formData.map((field, index) => {
        switch (field.type) {
          case 'textarea':
            return (
              <TextAreaField
                key={index}
                type={field.type}
                label={field.label}
                name={field.name}
                value={field.value}
                onChange={onChange}
              />
            );
          case 'select':
            return (
              <SelectField
                key={index}
                type={field.type}
                label={field.label}
                name={field.name}
                value={field.value}
                onChange={onChange}
                options={field.options}
              />
            );
          default:
            return (
              <InputField
                key={index}
                type={field.type}
                label={field.label}
                name={field.name}
                value={field.value}
                onChange={onChange}
              />
            );
        }
      })}
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ReusableForm;
