'use client';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaDownload, FaHeart, FaShareAlt } from 'react-icons/fa';

import { products } from '@/app/components/customer/common/dummyData';

const PhotographyGallery = () => {
  const generatePins = (start: number) =>
    products.map((product, i) => ({
      id: start + i,
      image: product.image,
      title: `Pin #${start + i + 1}`,
      width: product.width,
      height: product.height,
    }));

  const [pins, setPins] = useState(generatePins(0));
  const [hasMore, setHasMore] = useState(true);
  const [selectedPin, setSelectedPin] = useState<null | {
    id: number;
    image: string;
    title: string;
  }>(null);
  const [liked, setLiked] = useState<number[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [zoomEnabled, setZoomEnabled] = useState(false);
  const controls = useAnimation();

  const fetchMorePins = () => {
    if (pins.length >= 50) return setHasMore(false);
    setPins([...pins, ...generatePins(pins.length)]);
  };

  const handleScroll = () => {
    if (!hasMore) return;
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.body.scrollHeight;
    if (scrollTop + windowHeight >= fullHeight * 0.8) {
      fetchMorePins();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pins, hasMore]);

  const handleDownload = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'pin.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = (url: string) => {
    navigator.clipboard.writeText(url);
    setToast('Link copied!');
    setTimeout(() => setToast(null), 2000);
  };

  const toggleLike = (id: number) => {
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    if (selectedPin) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedPin]);

  return (
    <div className='bg-gradient-to-b dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 min-h-screen relative'>
      {/* Masonry Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6'>
        {pins.map((pin) => (
          <motion.div
            key={pin.id}
            className='bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer relative hover:shadow-2xl hover:-translate-y-1 transition-transform duration-300'
            onClick={() => setSelectedPin(pin)}
            whileHover={{ scale: 1.03 }}
          >
            <Image
              src={pin.image}
              alt={pin.title}
              width={pin.width}
              height={pin.height}
              className='w-full aspect-[4/6] object-cover'
            />
            <div className='p-3'>
              <p className='text-gray-700 dark:text-gray-200 font-medium'>
                {pin.title}
              </p>
            </div>

            {/* Heart button */}
            <motion.button
              className='absolute top-3 right-3 text-gray-400 dark:text-gray-200'
              whileTap={{ scale: 1.5 }}
              onClick={(e) => {
                e.stopPropagation();
                toggleLike(pin.id);
              }}
            >
              <motion.div
                animate={{
                  scale: liked.includes(pin.id) ? [1, 1.4, 1] : 1,
                  color: liked.includes(pin.id) ? '#e0245e' : '#9ca3af',
                }}
              >
                <FaHeart />
              </motion.div>
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Loader */}
      {hasMore && (
        <h4 className='text-center my-4 text-gray-700 dark:text-gray-200'>
          Loading more pins...
        </h4>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedPin && (
          <motion.div
            key='modal'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4'
            onClick={() => setSelectedPin(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className='bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full relative p-4 flex flex-col items-center'
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                src={selectedPin.image}
                alt={selectedPin.title}
                className='rounded-xl mb-4 cursor'
                drag={zoomEnabled}
                dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
                style={{ scale: zoomEnabled ? 2 : 1 }}
                animate={controls}
              />

              <h2 className='text-lg font-bold text-gray-800 dark:text-gray-200 mb-4'>
                {selectedPin.title}
              </h2>

              <div className='flex justify-around w-full text-gray-800 dark:text-gray-200 mb-2'>
                <motion.button
                  className='flex items-center gap-2 hover:text-red-500'
                  onClick={() => toggleLike(selectedPin.id)}
                  whileTap={{ scale: 1.3 }}
                >
                  <FaHeart
                    color={
                      liked.includes(selectedPin.id) ? '#e0245e' : undefined
                    }
                  />{' '}
                  Like
                </motion.button>

                <button
                  className='flex items-center gap-2 hover:text-green-500'
                  onClick={() => handleDownload(selectedPin.image)}
                >
                  <FaDownload /> Download
                </button>

                <button
                  className='flex items-center gap-2 hover:text-blue-500'
                  onClick={() => handleShare(selectedPin.image)}
                >
                  <FaShareAlt /> Share
                </button>
              </div>

              <button
                className='absolute top-3 right-3 text-gray-500 hover:text-gray-900 dark:hover:text-white text-xl'
                onClick={() => {
                  setSelectedPin(null);
                  setZoomEnabled(false);
                }}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className='fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-5 py-2 rounded-xl shadow-lg z-50'
        >
          {toast}
        </motion.div>
      )}
    </div>
  );
};

export default PhotographyGallery;
