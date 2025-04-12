'use client';

import React from 'react';
import StoryCard from './story-card';

const StoriesReel: React.FC = () => {
  // Data dummy untuk stories - Gunakan background.jpg untuk semua
  const storiesData = [
    // "Buat Cerita" tetap pakai logo sebagai background placeholder
    { id: 'create', name: 'Imphen', bgImage: '/logo-v1.png', isCreateStory: true },
    // Cerita lain pakai background.jpg
    { id: 1, name: 'Imphen Dev', avatar: '/logo-v1.png', bgImage: '/background.jpg' },
    { id: 2, name: 'Imphen News', avatar: '/logo-v1.png', bgImage: '/background.jpg' },
    { id: 3, name: 'Imphen Community', avatar: '/logo-v1.png', bgImage: '/background.jpg' },
    { id: 4, name: 'Imphen Tips', avatar: '/logo-v1.png', bgImage: '/background.jpg' },
    { id: 5, name: 'Imphen Promo', avatar: '/logo-v1.png', bgImage: '/background.jpg' },
    // Tambahkan data story lain jika perlu
  ];

  return (
    <div className="w-full mb-4 overflow-hidden">
      {/* Scrollable container */}
      <div className="flex space-x-2 pb-2 overflow-x-auto scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent scrollbar-thumb-rounded">
        {storiesData.map((story) => (
          <StoryCard
            key={story.id}
            name={story.name}
            avatar={story.avatar}
            bgImage={story.bgImage}
            isCreateStory={story.isCreateStory}
          />
        ))}
      </div>
    </div>
  );
};

export default StoriesReel; 