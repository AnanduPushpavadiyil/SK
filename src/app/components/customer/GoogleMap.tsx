import { motion } from 'framer-motion'; // Import framer-motion

const GoogleMap: React.FC = () => {
  return (
    <motion.div
      className='mt-8 md:mt-0 md:w-1/2 h-64 md:h-auto'
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.6 }}
    >
      <iframe
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31441.0459672035!2d76.72984242941719!3d9.923067509652421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07c15d2a6ffc27%3A0xdc1d585c19f87499!2sKunnam%20-%20West%20Kodikulam%20Rd%2C%20Kerala!5e0!3m2!1sen!2sin!4v1761769985104!5m2!1sen!2sin'
        width='100%'
        height='100%'
        style={{ border: '0' }}
        allowFullScreen={true}
        loading='lazy'
        className='rounded-lg shadow-lg'
      ></iframe>
    </motion.div>
  );
};

export default GoogleMap;
