import { useEffect, useState } from 'react';
import { router } from '@/router';

type Props = {
  error: string;
};

const Error = ({ error }: Props) => {
  const [timer, setTimer] = useState(3);
  const [intervalValue, setInvervalValue] = useState<number>();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);
    setInvervalValue(interval);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      clearInterval(intervalValue);
      router.navigate('/');
    }
  }, [intervalValue, timer]);
  return (
    <div>
      <h3>Error: {error}</h3>
      <p>Redirecting to / in {timer}</p>
    </div>
  );
};

export default Error;
