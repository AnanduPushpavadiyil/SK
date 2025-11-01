// src/app/public/login/page.tsx

'use client'; // Ensure this is at the top for client-side rendering

// import { useState } from 'react';

import Wrapper from '@/app/components/customer/common/wrapper';
import PhotographyCollection from '@/app/components/customer/PhotographyCollection';

const GalleryPage: React.FC = () => {
  return (
    <Wrapper path='/gallery'>
      <PhotographyCollection />
    </Wrapper>
  );
};

export default GalleryPage;
