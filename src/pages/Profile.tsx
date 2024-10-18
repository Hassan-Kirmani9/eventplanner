import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { PlusCircle, Trash2, ChevronDown, ChevronUp, Minus } from 'lucide-react';

interface FormField {
  type: string;
  label?: string; 
  placeholder?: string;
  value: string | null;
  editable: number[];
  hide: number[];
  options?: string[];
  feedback?: string; 
  status?: 'Approved' | 'Rejected';
  status_options?: string[];
}

const CreateForm: React.FC = () => {
  const [formTitle, setFormTitle] = useState('Form Heading');
  const [formDescription, setFormDescription] = useState('Form Description');
  const [formFields, setFormFields] = useState<FormField[]>([
    { type: 'text', label: 'Text Question', placeholder: 'Enter your answer', value: null, editable: [3], hide: [2] },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const addFormField = (type: string) => {
    const newField: FormField = {
      type,
      value: null,
      editable: [3],
      hide: [2],
    };

    const staticLabels = {
      text: 'Add Heading',
      number: 'Enter Number',
      textarea: 'Add Description',
      dropdown: 'Dropdown',
      radio: 'Radio Buttons',
      checkbox: 'Checkbox',
      date: 'Pick a Date',
      linebreak: undefined,
    };

    const staticPlaceholders = {
      text: 'Enter your answer',
      number: 'Enter a number',
      textarea: 'Enter your text',
      dropdown: undefined,
      radio: undefined,
      checkbox: undefined,
      date: 'Select a date',
      linebreak: undefined,
    };

    if (type === 'dropdown' || type === 'radio') {
      newField.options = ['Option 1', 'Option 2', 'Option 3'];
    }

    newField.label = staticLabels[type];
    newField.placeholder = staticPlaceholders[type];

    setFormFields([...formFields, newField]);
  };

  const updateFormField = (index: number, field: Partial<FormField>) => {
    const updatedFields = [...formFields];
    updatedFields[index] = { ...updatedFields[index], ...field };
    setFormFields(updatedFields);
  };

  const removeFormField = (index: number) => {
    const updatedFields = formFields.filter((_, i) => i !== index);
    setFormFields(updatedFields);
  };

  const moveFormField = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index > 0) || (direction === 'down' && index < formFields.length - 1)) {
      const updatedFields = [...formFields];
      const temp = updatedFields[index];
      updatedFields[index] = updatedFields[index + (direction === 'up' ? -1 : 1)];
      updatedFields[index + (direction === 'up' ? -1 : 1)] = temp;
      setFormFields(updatedFields);
    }
  };

  const handleLabelFocus = (index: number) => {
    updateFormField(index, { label: '' });
  };

  const renderFormField = (field: FormField, index: number) => {
    const commonProps = {
      className: 'w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary',
      placeholder: field.placeholder,
      value: field.value || '',
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => updateFormField(index, { value: e.target.value }),
    };

    switch (field.type) {
      case 'text':
      case 'number':
        return <input type={field.type} {...commonProps} />;

      case 'textarea':
        return <textarea {...commonProps} rows={3} />;

      case 'dropdown':
        return (
          <select {...commonProps}>
            {field.options?.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option, i) => (
              <div key={i} className="flex items-center">
                <input type="radio" id={`${field.label}-${i}`} name={field.label} className="mr-2" />
                <label htmlFor={`${field.label}-${i}`}>{option}</label>
              </div>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="flex items-center">
            <input type="checkbox" id={field.label} className="mr-2" />
            <label htmlFor={field.label}>{field.label}</label>
          </div>
        );

      case 'linebreak':
        return (
          <div className="flex items-center space-x-2">
            <Minus className="text-gray-400" />
            <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
            <Minus className="text-gray-400" />
          </div>
        );

      case 'date':
        return (
          <div className="relative">
            <input
              type="date"
              {...commonProps}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"></div>
          </div>
        );

      default:
        return null;
    }
  };

  const handlePreview = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1 mt-10">
        <div className="flex flex-col gap-9">
     

          {/* Form Title and Description */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <input
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="w-full bg-transparent text-black dark:text-white text-2xl font-bold outline-none"
              />
            </div>
            <div className="p-6.5">
              <textarea
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                className="w-full bg-transparent text-black dark:text-white outline-none"
                rows={2}
              />
            </div>
          </div>

          {/* Form Fields */}
          {formFields.map((field, index) => (
            <div key={index} className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-between items-center">
                {field.type !== 'linebreak' && (
                  <input
                    type="text"
                    value={field.label}
                    onFocus={() => handleLabelFocus(index)}
                    onChange={(e) => updateFormField(index, { label: e.target.value })}
                    className="bg-transparent text-black dark:text-white font-medium outline-none"
                  />
                )}
                <div className="flex space-x-2">
                  <button onClick={() => moveFormField(index, 'up')} className="text-gray-500 hover:text-gray-700">
                    <ChevronUp size={20} />
                  </button>
                  <button onClick={() => moveFormField(index, 'down')} className="text-gray-500 hover:text-gray-700">
                    <ChevronDown size={20} />
                  </button>
                  <button onClick={() => removeFormField(index)} className="text-gray-500 hover:text-gray-700">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <div className="p-6.5">{renderFormField(field, index)}</div>
            </div>
          ))}

          {/* Add Field Buttons */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="p-6.5">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => addFormField('text')}
                  className="inline-flex items-center justify-center rounded-md border border-primary py-2 px-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-107"
                >
                  <PlusCircle size={20} className="mr-2" />
                  Add Heading
                </button>
                <button
                  onClick={() => addFormField('linebreak')}
                  className="inline-flex items-center justify-center rounded-md border border-primary py-2 px-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  <PlusCircle size={20} className="mr-2" />
                  Add Line Break
                </button>
                <button
                  onClick={() => addFormField('number')}
                  className="inline-flex items-center justify-center rounded-md border border-primary py-2 px-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  <PlusCircle size={20} className="mr-2" />
                  Add Number
                </button>
                <button
                  onClick={() => addFormField('textarea')}
                  className="inline-flex items-center justify-center rounded-md border border-primary py-2 px-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  <PlusCircle size={20} className="mr-2" />
                  Add Description
                </button>
                <button
                  onClick={() => addFormField('dropdown')}
                  className="inline-flex items-center justify-center rounded-md border border-primary py-2 px-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  <PlusCircle size={20} className="mr-2" />
                  Add Dropdown
                </button>
                <button
                  onClick={() => addFormField('radio')}
                  className="inline-flex items-center justify-center rounded-md border border-primary py-2 px-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  <PlusCircle size={20} className="mr-2" />
                  Add Radio
                </button>
                <button
                  onClick={() => addFormField('checkbox')}
                  className="inline-flex items-center justify-center rounded-md border border-primary py-2 px-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  <PlusCircle size={20} className="mr-2" />
                  Add Checkbox
                </button>
                <button
                  onClick={() => addFormField('date')}
                  className="inline-flex items-center justify-center rounded-md border border-primary py-2 px-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  <PlusCircle size={20} className="mr-2" />
                  Add Date
                </button>
              </div>
            </div>
          </div>
        </div>
             {/* Preview Button */}
             <button
            onClick={handlePreview}
            className="mb-4 rounded-md border border-primary py-2 px-4 w-[15rem] mx-auto hover:bg-primary hover:text-white text-center font-medium text-primary hover:bg-opacity-90"
          >
            Preview
          </button>
      </div>

      {/* Modal for Preview */}
     {/* Modal for Preview */}
{isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded shadow-lg w-1/2">
      <h2 className="text-xl font-bold mb-4">Form Preview</h2>
      <h3 className="text-lg font-semibold">{formTitle}</h3>
      <p className="mb-4">{formDescription}</p>
      {formFields.map((field, index) => (
        <div key={index} className="mb-4">
          <label className="block font-medium">{field.label}</label>
          {field.type === 'text' || field.type === 'number' ? (
            <input type={field.type} value={field.value || ''} readOnly className="border border-gray-300 p-2 w-full" />
          ) : field.type === 'textarea' ? (
            <textarea value={field.value || ''} readOnly className="border border-gray-300 p-2 w-full" rows={3} />
          ) : field.type === 'dropdown' ? (
            <select value={field.value || ''} readOnly className="border border-gray-300 p-2 w-full">
              {field.options?.map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : field.type === 'radio' ? (
            <div className="space-y-2">
              {field.options?.map((option, i) => (
                <div key={i} className="flex items-center">
                  <input type="radio" id={`${field.label}-${i}`} name={field.label} value={option} disabled />
                  <label htmlFor={`${field.label}-${i}`} className="ml-2">{option}</label>
                </div>
              ))}
            </div>
          ) : field.type === 'checkbox' ? (
            <div className="flex items-center">
              <input type="checkbox" id={field.label} disabled />
              <label htmlFor={field.label} className="ml-2">{field.label}</label>
            </div>
          ) : field.type === 'linebreak' ? (
            <hr className="my-4 border-t border-gray-300 mt-[1.5rem] mb-[1rem]" />
          ) : null}
        </div>
      ))}
      <button onClick={closeModal} className="mt-4 rounded border border-primary py-2 px-4 text-primary">
        Close
      </button>
    </div>
  </div>
)}

    </>
  );
};

export default CreateForm;
