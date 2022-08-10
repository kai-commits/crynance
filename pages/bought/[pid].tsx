import { NextPage } from 'next';
import { useRouter } from 'next/router';

const Bought: NextPage = () => {
  const router = useRouter();
  const { pid } = router.query;

  return <p>pid: {pid}</p>;
};

export default Bought;
