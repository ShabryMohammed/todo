import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateGiven, setDateGiven] = useState(null);
  const [deadline, setDeadline] = useState(null);
  const [assignedTo, setAssignedTo] = useState("");
  const [priorityHigh, setPriorityHigh] = useState(false);
  const [category, setCategory] = useState("");
  const [isBold, setIsBold] = useState(false);
const [isItalic, setIsItalic] = useState(false);
const [isUnderline, setIsUnderline] = useState(false);
const [isStrikethrough, setIsStrikethrough] = useState(false);
const [isUppercase, setIsUppercase] = useState(false);

  const navigate = useNavigate();

  const handleCreateTask = async () => {
    if (!title.trim()) {
      toast.error("Title is required.");
      return;
    }
    if (!description.trim()) {
      toast.error("Description is required.");
      return;
    }
    if (!dateGiven) {
      toast.error("Date Given is required.");
      return;
    }
    if (!deadline) {
      toast.error("Deadline is required.");
      return;
    }
    if (!assignedTo.trim()) {
      toast.error("Assigned to is required.");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(assignedTo)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!category) {  
      toast.error("Category is required.");
      return;
    }
    try {
        const newTask = {
            title,
            description,
            dateGiven,
            deadline,
            assignedTo,
            priority: priorityHigh,
            category,
        };
        

        // Log the task object before sending the request
        console.log("Task object being sent:", newTask);

        toast.success('Task created successfully!');

        const response = await axios.post("http://localhost:8080/api/tasks", newTask);

        console.log("Task created successfully:", response.data);
        // Reset form fields
        setTitle("");
        setDescription("");
        setDateGiven(null);
        setDeadline(null);
        setAssignedTo("");
        setPriorityHigh(false);
        setCategory("")

        navigate("/home");


    } catch (error) {
        console.error("There was an error creating the task!", error);
        toast.error('There was an error creating the task.');
    }
};

const handleBold = () => {
  setIsBold(!isBold);
};

const handleItalic = () => {
  setIsItalic(!isItalic);
};

const handleUnderline = () => {
  setIsUnderline(!isUnderline);
};

const handleStrikethrough = () => {
  setIsStrikethrough(!isStrikethrough);
};

const handleTextTransform = () => {
  setIsUppercase(!isUppercase);
};

const getTextStyle = () => ({
  fontWeight: isBold ? 'bold' : 'normal',
  fontStyle: isItalic ? 'italic' : 'normal',
  textDecoration: `${isUnderline ? 'underline' : 'none'} ${isStrikethrough ? 'line-through' : ''}`.trim(),
  textTransform: isUppercase ? 'uppercase' : 'none',
});
const categoryOptions = ["BC", "FC", "DB"]; 




  return (
    <div className="flex items-center justify-center min-h-screen bg-[#12172E] px-[16px]">
      <div className="w-[537px] h-[811px] px-[16px] py-[24px] bg-white rounded-lg shadow-lg font-inter">
        <div className="flex mb-[24px]">
          <img
            src="/Back.png"
            alt="Back"
            className="w-6 h-6 cursor-pointer mr-[8px]"
            onClick={() => window.history.back()}
          />
          <h2 className="text-xl font-semibold">Create a Task</h2>
        </div>

        <div className="relative mb-[24px]">
          <label
            htmlFor="title"
            className="block text-[15px] font-semibold text-[#191D23] absolute left-0 top-0 mb-[4px]"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-[505px] h-[40px] border border-gray-300 rounded-tl-[4px] px-[16px] py-2 mb-[4px] mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength="30"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <p className="absolute right-0 text-xs text-gray-400 mt-1 text-right">
            {title.length}/30
          </p>
        </div>

        <div className="flex border-b border-gray-200 mb-[24px]">
          <button className="w-1/2 py-2 text-[16px] font-semibold text-[#191D23] border-b-2 focus:outline-none"
            style={{ borderBottomColor: '#047857'  }}>
            Task
          </button>
          <button className="w-1/2 py-2 text-[16px] text-center focus:outline-none"
            style={{ color: '#64748B' }}>
            Issue
          </button>
        </div>

        <div className="relative mb-[24px]">
          <label
            htmlFor="description"
            className="block text-[15px] font-semibold text-[#191D23] absolute left-0 top-0 mb-[4px]"
          >
            Description
          </label>
          <textarea
            id="description"
            style={getTextStyle()}
            className="w-[505px] h-[115px] px-[16px] py-[12px] mt-6 border border-gray-300 rounded-tl-[4px] border-opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Details about event"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="relative mb-[24px]">
          <label
            htmlFor="dateGiven"
            className="flex items-center justify-between text-[15px] font-semibold text-[#191D23] mb-[8px]"
          >
            Date Given
            <div className="flex space-x-3 ml-4">
              <button className="text-gray-400 text-xm font-bold " onClick={handleBold}>B</button>
              <button className="text-gray-400 text-xm italic" onClick={handleItalic}>I</button>
              <button className="text-gray-400 text-xm underline" onClick={handleUnderline}>U</button>
              <button className="text-gray-400 text-xm line-through" onClick={handleStrikethrough} aria-label="Strikethrough">S</button>
              <button className="text-gray-400 text-xm" aria-label="Text Transform"  onClick={handleTextTransform}>TT</button>
            </div>
          </label>
          <div className="relative">
            <DatePicker
              selected={dateGiven}
              onChange={(date) => setDateGiven(date)}
              dateFormat="yyyy/MM/dd"
              className="w-[505px] h-[40px] border border-gray-300 rounded-tl-[4px] pl-[16px] py-2 mb-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholderText="Select a date"
            />
            <img
              src="clock icon.png"
              alt="Clear Date"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setDateGiven(null)}
            />
          </div>
        </div>

        <div className="relative mb-[24px]">
          <label
            htmlFor="deadline"
            className="flex items-center justify-between text-[15px] font-semibold text-[#191D23] mb-[8px]"
          >
            Deadline
          </label>
          <div className="relative">
            <DatePicker
              selected={deadline}
              onChange={(date) => setDeadline(date)}
              dateFormat="yyyy/MM/dd"
              className="w-[505px] h-[40px] border border-gray-300 rounded-tl-[4px] pl-[16px] py-2 mb-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholderText="Select a date"
            />
            <img
              src="clock icon.png"
              alt="Clear Date"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setDeadline(null)}
            />
          </div>
        </div>

        <div className="relative mb-[24px]">
          <label
            htmlFor="assignedTo"
            className="block text-[15px] font-semibold text-[#191D23] absolute left-0 top-0 mb-[4px]"
          >
            Assigned to
          </label>
          <input
            type="email"
            id="assignedTo"
            placeholder="Enter assignee Email"
            className="w-[505px] border border-gray-300 rounded-tl-[4px] px-[16px] py-2 mb-[4px] mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          />

          <img
            src="icon.png"
            alt="Clear Date"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer mt-2"
            onClick={() => setAssignedTo('')}
          />
        </div>

        <div className="flex items-center mb-[24px]">
          <input
            type="checkbox"
            className="form-checkbox text-green-500 w-[16px] h-[16px]"
            checked={priorityHigh}
            onChange={(e) => setPriorityHigh(e.target.checked)}
          />
          <label className="ml-2 text-[16px]  text-gray-600" style={{ fontFamily: 'Inter', color: '#191D23' ,fontSize: '16px', fontWeight: '400', lineHeight: '19.36px', textAlign: 'left' }}>
            Priority High
          </label>

          <div className="ml-auto">
            <label htmlFor="category" className="text-[16px] text-gray-600  mr-2" style={{ fontFamily: 'Inter', color: '#191D23' ,fontSize: '16px', fontWeight: '400', lineHeight: '19.36px' }}>
              Category
            </label>
            <select
              id="category"
              className="border border-gray-300 rounded-[4px] px-2 py-1 text-xs"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" >category</option>
              {categoryOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
  <button 
    className="bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none w-[102px] h-[44px] rounded-[4px] px-[12px] py-[6px]"
  >
    Cancel
  </button>
  <button
    onClick={handleCreateTask}
    className="bg-blue-500 text-white hover:bg-blue-600 focus:outline-none w-[387px] h-[44px] rounded-[4px] px-[8px] py-[6px] ml-[4px] flex items-center justify-center"
  >
  <img 
      src="left icon.png" 
      alt="Create Task Icon" 
       
    />
    <span className="ml-[4px]">Create Task</span>
    
  </button>
</div>

      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateTask;
