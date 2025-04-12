'use client';

import React, { useState, useRef, ChangeEvent, KeyboardEvent, TouchEvent, MouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaEllipsisH, FaGlobeAmericas, FaThumbsUp, FaCommentAlt, FaShareSquare
} from 'react-icons/fa';
import { motion } from 'framer-motion';

interface PostCardProps {
  authorName: string;
  authorAvatar: string;
  postTime: string;
  postContent: string;
  postImage?: string;
  likeCount: number;
  commentCount: number;
  shareCount: number;
}

// Tambah interface untuk struktur Komentar
interface Comment {
  id: string; // Untuk key unik
  name: string;
  avatar: string;
  text: string;
}

const PostCard: React.FC<PostCardProps> = ({
  authorName,
  authorAvatar,
  postTime,
  postContent,
  postImage,
  likeCount: initialLikeCount,
  commentCount,
  shareCount,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 350;
  const needsTruncation = postContent.length > maxLength;

  const displayedContent = needsTruncation && !isExpanded
    ? `${postContent.substring(0, maxLength)}...`
    : postContent;

  // Scroll ke atas post saat expand/collapse (opsional tapi UX bagus)
  const cardRef = useRef<HTMLDivElement>(null);
  const handleToggleExpand = () => {
    const shouldCollapse = isExpanded;
    setIsExpanded(!isExpanded);
    // Jika menutup (collapse), scroll ke atas post
    if (shouldCollapse && cardRef.current) {
      // Tambahkan sedikit timeout agar scroll terjadi setelah state update
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 50);
    }
  }

  const [showReactions, setShowReactions] = useState(false);
  const reactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnterLike = () => {
    if (pressTimerRef.current) return;
    if (reactionTimeoutRef.current) clearTimeout(reactionTimeoutRef.current);
    setShowReactions(true);
  };

  const handleMouseLeaveLikeArea = () => {
    reactionTimeoutRef.current = setTimeout(() => {
      setShowReactions(false);
    }, 300);
  };

  const handlePressStart = (event: TouchEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>) => {
    if ('touches' in event) {
        event.preventDefault();
    }
    if (pressTimerRef.current) clearTimeout(pressTimerRef.current);
    pressTimerRef.current = setTimeout(() => {
      setShowReactions(true);
      pressTimerRef.current = null;
    }, 500);
  };

  const handlePressEnd = () => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
    if (!showReactions && reactionTimeoutRef.current) {
      clearTimeout(reactionTimeoutRef.current);
    }
  };

  // State lokal untuk reaksi & jumlah suka
  const [currentUserReaction, setCurrentUserReaction] = useState<string | null>(null);
  const [currentLikeCount, setCurrentLikeCount] = useState<number>(initialLikeCount);

  // Handler klik reaksi
  const handleReactionClick = (reaction: string) => {
    // Cek apakah user belum bereaksi sebelumnya
    if (currentUserReaction === null) {
      setCurrentLikeCount(currentLikeCount + 1); // Tambah 1 jika ini reaksi pertama
    }
    setCurrentUserReaction(reaction); // Set/ubah reaksi

    // Tutup panel & reset timer
    setShowReactions(false);
    if (reactionTimeoutRef.current) clearTimeout(reactionTimeoutRef.current);
    if (pressTimerRef.current) clearTimeout(pressTimerRef.current);
    pressTimerRef.current = null;
    reactionTimeoutRef.current = null;
    console.log(`Reaction selected: ${reaction}, New Like Count: ${currentUserReaction === null ? currentLikeCount + 1 : currentLikeCount}`);
  };

  // Daftar Reaksi
  const reactions = ['👍', '❤️', '😂', '😮', '😢', '😠'];

  // State untuk komentar (gunakan interface Comment)
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');

  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  // Handler untuk submit komentar (Enter)
  const handleCommentSubmit = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && newComment.trim() !== '') {
      event.preventDefault();
      const newCommentObject: Comment = {
        id: Date.now().toString() + Math.random().toString(), // ID unik sederhana
        name: "Imphen", // Nama selalu Imphen
        avatar: "/logo-v1.png", // Avatar selalu logo Imphen
        text: newComment.trim(),
      };
      setComments([...comments, newCommentObject]); // Tambahkan objek komentar baru
      setNewComment('');
    }
  };

  // Fungsi untuk mendapatkan teks tombol berdasarkan reaksi
  const getReactionText = (reaction: string | null): string => {
    if (!reaction) return 'Suka';
    switch (reaction) {
      case '👍':
      case '❤️':
        return 'Suka';
      case '😂':
        return 'Haha';
      case '😮':
        return 'Wow';
      case '😢':
        return 'Sedih';
      case '😠':
        return 'Marah';
      default:
        return 'Suka'; // Default jika reaksi tidak dikenali
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="card bg-base-100 shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <div className="card-body p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Link href="/profile" className="avatar">
              <div className="w-10 rounded-full">
                <Image src={authorAvatar} alt={`${authorName} avatar`} width={40} height={40} />
              </div>
            </Link>
            <div>
              <Link href="/profile" className="font-semibold text-sm hover:underline text-base-content">
                {authorName}
              </Link>
              <div className="text-xs text-base-content/70 flex items-center space-x-1">
                <span>{postTime}</span>
                <span>·</span>
                <FaGlobeAmericas size={12} />
              </div>
            </div>
          </div>
          <button className="btn btn-ghost btn-circle btn-sm text-base-content/70 hover:text-base-content">
            <FaEllipsisH size={16}/>
          </button>
        </div>

        <div className="text-sm mb-3 whitespace-pre-line text-base-content">
          {displayedContent}
          {needsTruncation && !isExpanded && (
            <button
              onClick={handleToggleExpand}
              className="text-blue-500 hover:underline ml-1 font-medium text-xs"
            >
              Lihat selengkapnya
            </button>
          )}
          {needsTruncation && isExpanded && (
            <button
              onClick={handleToggleExpand}
              className="text-blue-500 hover:underline ml-1 font-medium text-xs block mt-1"
            >
              Lihat lebih sedikit
            </button>
          )}
        </div>

        {postImage && (
          <figure className="mb-3 -mx-4 -mt-1">
            <Image src={postImage} alt="Post image" width={600} height={400} className="w-full h-auto object-cover" />
          </figure>
        )}

        <div className="flex justify-between items-center text-xs text-base-content/70 mb-0.5">
          <div className="flex items-center space-x-1">
             {currentUserReaction ? (
               <span className="text-lg mr-0.5">{currentUserReaction}</span>
             ) : (
               <div className="bg-primary text-primary-content rounded-full p-0.5">
                 <FaThumbsUp size={10}/>
               </div>
             )}
            <span>{currentLikeCount}</span>
          </div>
          <div className="space-x-2">
            <span>{commentCount} komentar</span>
            <span>{shareCount} dibagikan</span>
          </div>
        </div>

        <div className="divider my-0"></div>

        <div className="flex justify-around pt-0">
          <div
            className="relative flex-1 select-none"
            onMouseEnter={handleMouseEnterLike}
            onMouseLeave={handleMouseLeaveLikeArea}
            onTouchStart={handlePressStart}
            onTouchEnd={handlePressEnd}
            onTouchCancel={handlePressEnd}
            onMouseDown={handlePressStart}
            onMouseUp={handlePressEnd}
          >
            {showReactions && (
              <motion.div
                className="absolute bottom-full left-1/2 mb-1 flex -translate-x-1/2 transform gap-1 rounded-full bg-base-100 p-1 shadow-md dark:bg-base-300 z-10"
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                onMouseEnter={handleMouseEnterLike}
              >
                {reactions.map((reaction) => (
                  <button
                    key={reaction}
                    onClick={() => handleReactionClick(reaction)}
                    className="transform transition-transform hover:scale-125 focus:outline-none"
                    aria-label={`React with ${reaction}`}
                  >
                    <span className="text-2xl">{reaction}</span>
                  </button>
                ))}
              </motion.div>
            )}

            <button className="btn btn-ghost btn-sm flex w-full items-center justify-center text-sm text-base-content/80 hover:text-base-content">
              {currentUserReaction ? (
                <span className="text-2xl mr-1">{currentUserReaction}</span>
              ) : (
                <FaThumbsUp size={18} className="mr-1"/>
              )}
              <span className={currentUserReaction ? 'font-bold' : ''}>{getReactionText(currentUserReaction)}</span>
            </button>
          </div>
          <button className="btn btn-ghost btn-sm flex-1 text-sm text-base-content/80 hover:text-base-content">
            <FaCommentAlt size={18} className="mr-1"/> Komentar
          </button>
          <button className="btn btn-ghost btn-sm flex-1 text-sm text-base-content/80 hover:text-base-content">
            <FaShareSquare size={18} className="mr-1"/> Bagikan
          </button>
        </div>

        {/* Bagian Komentar */}
        <div className="mt-2 pt-2 border-t border-base-300">
           {/* Daftar Komentar */}
           {comments.length > 0 && (
            <ul className="space-y-2 text-sm mb-2"> {/* Naikkan ukuran font sedikit */}
              {comments.map((comment) => (
                <li key={comment.id} className="flex items-start space-x-2">
                  {/* Avatar Komentar */}
                  <div className="avatar flex-shrink-0 mt-0.5">
                    <div className="w-7 rounded-full">
                      <Image src={comment.avatar} alt={`${comment.name} avatar`} width={28} height={28} />
                    </div>
                  </div>
                  {/* Bubble Komentar */}
                  <div className="bg-base-200 p-2 rounded-lg flex-1">
                    {/* Nama Komentar */}
                    <p className="font-semibold text-xs text-base-content mb-0.5">{comment.name}</p>
                    {/* Teks Komentar */}
                    <p className="text-sm text-base-content whitespace-pre-line">{comment.text}</p>
                  </div>
                </li>
              ))}
            </ul>
           )}

           {/* Input Komentar */}
           <div className="flex items-center space-x-2 mt-2"> {/* Tambah margin top */}
            <div className="avatar flex-shrink-0">
                <div className="w-7 rounded-full">
                  {/* Gunakan logo Imphen untuk avatar input */}
                  <Image src="/logo-v1.png" alt="Your avatar" width={28} height={28} />
                </div>
            </div>
            <input
              type="text"
              placeholder="Tulis komentar..."
              className="input input-bordered input-sm rounded-full flex-1 bg-base-200 focus:bg-base-100 text-base-content placeholder-base-content/60"
              value={newComment}
              onChange={handleCommentChange}
              onKeyDown={handleCommentSubmit}
            />
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;