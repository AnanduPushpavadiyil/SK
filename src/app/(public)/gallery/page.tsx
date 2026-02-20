import Wrapper from '@/app/components/customer/common/wrapper';
import PhotographyCollection from '@/app/components/customer/PhotographyCollection';
import { getLandingImages } from '@/lib/getLandingImages';

const GalleryPage = async () => {
  const products = getLandingImages();
  return (
    <Wrapper path='/gallery'>
      <PhotographyCollection products={products} />
    </Wrapper>
  );
};

export default GalleryPage;
