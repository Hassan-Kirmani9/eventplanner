import { useEffect, useRef, useState } from 'react'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
import { ChevronDown, PlusCircle, X } from 'lucide-react'

import CreateForm from '../Profile'
import EventTable from '../EventTable'
import { useNavigate } from 'react-router-dom'
const CreateEventForm = () => {
    const [eventName, setEventName] = useState('')
    const [eventUsers, setEventUsers] = useState<string[]>([])
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
      const [includeForm, setIncludeForm] = useState(false)

    const dropdownRef = useRef<HTMLDivElement>(null)
    const eventName1 = "Sample Event";
const eventUsers1 = ["User1", "User2", "User3"];
    const userOptions = [
        { value: 'HR Head', label: 'HR' },
        { value: 'Finance', label: 'Finance' },
        { value: 'COO', label: 'COO' },
        { value: 'CEO', label: 'CEO' },
    ]


    const navigate = useNavigate()
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log({ eventName, eventUsers })
        setFormSubmitted(true)  // Mark form as submitted
    }
    
    const toggleOption = (value: string) => {
        setEventUsers(prev => 
          prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        )
    }
    
    const handleSelectAll = () => {
        setEventUsers(eventUsers.length === userOptions.length ? [] : userOptions.map(option => option.value))
    }
    
    const removeUser = (value: string) => {
        setEventUsers(prev => prev.filter(item => item !== value))
    }
    
    const filteredOptions = userOptions.filter(option => 
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    )
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false)
          }
        }
    
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])
    const handleCreateEvent = () => {
        navigate('/events'); // Redirect to /calendar on button click
      };
    return (
        <>
            <Breadcrumb pageName="Create Event" />
            
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b flex justify-between items-center border-stroke py-4 px-6.5 dark:border-strokedark">
  <h3 className="font-medium text-black dark:text-white">
    Event Details
  </h3>

  <button
    onClick={handleCreateEvent}
    className="w-[4rem] rounded bg-red-600 py-2 px-0 font-medium text-sm text-gray"
  >
    Back
  </button>
</div>

                        <form onSubmit={handleSubmit}>
                            <div className="p-6.5">
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Event Id
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter event Id"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                       
                                        
                                    />
                                </div>
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Event Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter event name"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        value={eventName}
                                        onChange={(e) => setEventName(e.target.value)}
                                    />
                                </div>
                                
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Event Users
                                    </label>
                                    <div className="relative" ref={dropdownRef}>
                                        <div
                                            className="flex flex-wrap gap-2 min-h-[44px] p-2 rounded border-[1.5px] border-stroke bg-transparent cursor-pointer"
                                            onClick={() => setIsOpen(!isOpen)}
                                        >
                                            {eventUsers.map(user => (
                                                <span key={user} className="bg-gray-200 text-gray-700 px-2 py-1 rounded flex items-center">
                                                    {userOptions.find(option => option.value === user)?.label}
                                                    <X size={14} className="ml-1 cursor-pointer" onClick={(e) => { e.stopPropagation(); removeUser(user); }} />
                                                </span>
                                            ))}
                                            {eventUsers.length === 0 && <span className="text-gray-500">Select users</span>}
                                            <ChevronDown size={20} className="ml-auto" />
                                        </div>
                                        {isOpen && (
                                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
                                                <div className="p-2 max-h-60 overflow-y-auto">
                                                    <div className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={handleSelectAll}>
                                                        Select All
                                                    </div>
                                                    {userOptions.map(option => (
                                                        <div key={option.value} className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center" onClick={() => toggleOption(option.value)}>
                                                            <input
                                                                type="checkbox"
                                                                checked={eventUsers.includes(option.value)}
                                                                onChange={() => {}}
                                                                className="mr-2"
                                                            />
                                                            {option.label}
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="p-2 border-t">
                                                    <button
                                                        className="w-[6rem] bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition-colors"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        OK
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div>
    </div>
        <br />
        <div className='flex'>
                                
                                <button className="flex w-[15rem] mx-auto justify-center rounded bg-primary p-3 font-medium text-gray">
                                    Create Event
                                </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Show EventTable after form submission */}
                    {/* {formSubmitted && <EventTable eventName={eventName} eventUsers={eventUsers} />} */}
                </div>
            </div>

            </>
    )
}

export default CreateEventForm
