import Container from '../../Container/Container';
import TimerForsales from './TimerForsales';

const Benner_3 = () => {
  return (
    <>
      <section className="mb-[80px]">
        <Container>
          <div className="bg-[#000000] flex items-center gap-[30px]">
            <div className="ml-[56px] pt-[70px]">
              <p className="text-[16px] font-Poppipns_FONT font-semibold text-[#00FF66] leading-[20px]  mb-[36px]">
                <a href="#">Categories</a>
              </p>

              <h2 className="text-[48px] font-Poppipns_FONT font-semibold leading-[60px] text-[#FAFAFA] w-[443px] mb-[30px]">
                Enhance Your Music Experience
              </h2>
              <div className="mb-[40px] ">
                <TimerForsales deadline="2025-03-28T12:00:00" />
              </div>
              <button className="text-[16px] font-Poppipns_FONT font-medium text-[#FAFAFA] leading-6 bg-[#00FF66] py-[16px] px-[48px] rounded mb-[70px]">
                Buy Now!
              </button>
            </div>
            <div className="overflow-hidden ">
              <div className="flex items-center justify-center  bg-[radial-gradient(circle,_rgba(50,50,50,1)_0%,_rgba(0,0,0,1)_100%)]">
                <img src="/Frame 694.png" alt="Frame" />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Benner_3;
