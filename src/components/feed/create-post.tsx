import React, { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import {
  FaVideo,
  FaImages,
  FaLaughBeam
} from 'react-icons/fa';

interface CreatePostProps {
  onAddPost: (text: string) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onAddPost }) => {
  const profileImageUrl = "/logo-v1.png";
  const [postText, setPostText] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPostText(event.target.value);
  };

  const handleSubmit = () => {
    if (postText.trim()) {
      onAddPost(postText.trim());
      setPostText('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="card bg-base-100 shadow-md p-4">
      <div className="flex items-start space-x-3 mb-3">
        <div className="avatar flex-shrink-0 mt-1">
          <div className="w-10 rounded-full">
            <Image src={profileImageUrl} alt="User Avatar" width={40} height={40} />
          </div>
        </div>
        <input
          type="text"
          placeholder={`Apa yang Anda pikirkan, Imphen?`}
          className="input input-bordered rounded-lg flex-1 bg-base-200 hover:bg-base-300 focus:bg-base-100 focus:outline-none focus:ring-1 focus:ring-primary placeholder-base-content/60 text-base-content h-12"
          value={postText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="divider my-0"></div>
      <div className="flex justify-between items-center pt-2 gap-1">
        <div className="flex flex-1 justify-around">
          <button className="btn btn-ghost btn-sm flex-1 text-base-content/80 hover:text-base-content h-auto min-h-[2.5rem]">
            <div className="flex flex-col items-center sm:flex-row">
              <FaVideo className="text-red-500 mb-0.5 sm:mb-0 sm:mr-1" size={20}/>
              <span className="text-xs whitespace-normal leading-tight text-center sm:text-left">Video siaran langsung</span>
            </div>
          </button>
          <button className="btn btn-ghost btn-sm flex-1 text-base-content/80 hover:text-base-content h-auto min-h-[2.5rem]">
            <div className="flex flex-col items-center sm:flex-row">
              <FaImages className="text-green-500 mb-0.5 sm:mb-0 sm:mr-1" size={20}/>
              <span className="text-xs whitespace-normal leading-tight text-center sm:text-left">Foto/video</span>
            </div>
          </button>
          <button className="btn btn-ghost btn-sm flex-1 text-base-content/80 hover:text-base-content h-auto min-h-[2.5rem]">
            <div className="flex flex-col items-center sm:flex-row">
              <FaLaughBeam className="text-yellow-500 mb-0.5 sm:mb-0 sm:mr-1" size={20}/>
              <span className="text-xs whitespace-normal leading-tight text-center sm:text-left">Perasaan/aktivitas</span>
            </div>
          </button>
        </div>
        <button
          className="btn btn-primary btn-sm ml-2"
          onClick={handleSubmit}
          disabled={!postText.trim()}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost; 