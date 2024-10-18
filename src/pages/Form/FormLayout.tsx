import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { PlusCircle, Trash2, GripVertical, ChevronDown, Copy } from 'lucide-react'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'

const questionTypes = [
  { value: 'short', label: 'Short answer' },
  { value: 'paragraph', label: 'Paragraph' },
  { value: 'multiple', label: 'Multiple choice' },
  { value: 'checkbox', label: 'Checkboxes' },
  { value: 'dropdown', label: 'Dropdown' },
]

interface Question {
  id: string
  type: string
  title: string
  options?: string[]
  required: boolean
}

const CreateForm: React.FC = () => {
  const [formTitle, setFormTitle] = useState('Untitled form')
  const [formDescription, setFormDescription] = useState('')
  const [questions, setQuestions] = useState<Question[]>([
    { id: '1', type: 'short', title: 'Untitled Question', required: false },
  ])

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type: 'short',
      title: 'Untitled Question',
      required: false,
    }
    setQuestions([...questions, newQuestion])
  }

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map(q => (q.id === id ? { ...q, ...updates } : q)))
  }

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id))
  }

  const duplicateQuestion = (id: string) => {
    const questionToDuplicate = questions.find(q => q.id === id)
    if (questionToDuplicate) {
      const newQuestion = { ...questionToDuplicate, id: Date.now().toString() }
      setQuestions([...questions, newQuestion])
    }
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(questions)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setQuestions(items)
  }

  const QuestionComponent: React.FC<{ question: Question; index: number }> = ({ question, index }) => {
    return (
      <Draggable draggableId={question.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className="bg-white dark:bg-boxdark rounded-sm border border-stroke dark:border-strokedark shadow-default dark:bg-boxdark mb-4 p-4"
          >
            <div className="flex items-center mb-2">
              <div {...provided.dragHandleProps} className="mr-2 cursor-move text-bodydark2">
                <GripVertical size={20} />
              </div>
              <input
                type="text"
                value={question.title}
                onChange={(e) => updateQuestion(question.id, { title: e.target.value })}
                className="flex-grow text-lg font-medium bg-transparent border-b border-stroke dark:border-strokedark focus:border-primary outline-none dark:text-white"
                placeholder="Question"
              />
              <select
                value={question.type}
                onChange={(e) => updateQuestion(question.id, { type: e.target.value })}
                className="ml-2 p-2 border rounded border-stroke bg-transparent dark:border-strokedark dark:bg-form-input focus:border-primary dark:focus:border-primary"
              >
                {questionTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            {(question.type === 'multiple' || question.type === 'checkbox' || question.type === 'dropdown') && (
              <div className="ml-6 mt-2">
                {question.options?.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center mb-2">
                    <input
                      type={question.type === 'multiple' ? 'radio' : 'checkbox'}
                      disabled
                      className="mr-2"
                    />
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...(question.options || [])]
                        newOptions[optionIndex] = e.target.value
                        updateQuestion(question.id, { options: newOptions })
                      }}
                      className="flex-grow bg-transparent border-b border-stroke dark:border-strokedark focus:border-primary outline-none dark:text-white"
                      placeholder={`Option ${optionIndex + 1}`}
                    />
                    <button
                      onClick={() => {
                        const newOptions = question.options?.filter((_, i) => i !== optionIndex)
                        updateQuestion(question.id, { options: newOptions })
                      }}
                      className="ml-2 text-danger"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newOptions = [...(question.options || []), '']
                    updateQuestion(question.id, { options: newOptions })
                  }}
                  className="text-primary font-medium"
                >
                  Add option
                </button>
              </div>
            )}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={question.required}
                  onChange={(e) => updateQuestion(question.id, { required: e.target.checked })}
                  className="mr-2"
                />
                <span className="text-sm dark:text-white">Required</span>
              </div>
              <div>
                <button onClick={() => duplicateQuestion(question.id)} className="mr-2 text-bodydark2">
                  <Copy size={20} />
                </button>
                <button onClick={() => deleteQuestion(question.id)} className="text-danger">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    )
  }

  return (
    <>


      <div className="rounded-sm border mt-5 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      
        <div className="p-6.5">
          <div className="mb-4.5">
            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="w-full text-3xl font-bold bg-transparent border-b border-stroke dark:border-strokedark focus:border-primary outline-none dark:text-white mb-2"
              placeholder="Form Title"
            />
            <input
              type="text"
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              className="w-full text-bodydark2 bg-transparent border-b border-stroke dark:border-strokedark focus:border-primary outline-none"
              placeholder="Form description"
            />
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="questions">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {questions.map((question, index) => (
                    <QuestionComponent key={question.id} question={question} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <button
            onClick={addQuestion}
            className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
          >
            <PlusCircle size={24} />
            Add question
          </button>

          <button
            onClick={() => console.log({ formTitle, formDescription, questions })}
            className="flex w-[6rem] mx-auto justify-center rounded bg-blue-300 p-2 font-medium text-gray mt-6"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  )
}

export default CreateForm