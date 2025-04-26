import { useEffect, useState } from 'react';

const TimerForsales = ({ deadline }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(deadline) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [deadline]);

  return (
    <div>
      <div className="flex items-center gap-[24px]">
        <div className="text-[16px] font-Poppipns_FONT font-semibold flex-col flex justify-center items-center text-black bg-white w-[62px] h-[62px] rounded-full leading-5 ">
          <span> {timeLeft.days}</span>
          <span className='text-[11px] font-Poppipns_FONT font-normal text-[#000000] leading-[18px] '>Days</span>
        </div>
        <div className="text-[16px] font-Poppipns_FONT font-semibold flex-col flex justify-center items-center text-black bg-white w-[62px] h-[62px] rounded-full leading-5 ">
          <span>{timeLeft.hours}</span>
          <span className='text-[11px] font-Poppipns_FONT font-normal text-[#000000] leading-[18px] '>Hours</span>
        </div>
        <div className="text-[16px] font-Poppipns_FONT font-semibold flex-col flex justify-center items-center text-black bg-white w-[62px] h-[62px] rounded-full leading-5 ">
          <span> {timeLeft.minutes}</span>
          <span className='text-[11px] font-Poppipns_FONT font-normal text-[#000000] leading-[18px] '>Minutes</span>
        </div>
        <div className="text-[16px] font-Poppipns_FONT font-semibold  flex-col flex justify-center items-center  text-black bg-white w-[62px] h-[62px] rounded-full leading-5 ">
          <span>{timeLeft.seconds}</span>
          <span className='text-[11px] font-Poppipns_FONT font-normal text-[#000000] leading-[18px] '>Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default TimerForsales;
