import React, { useState } from 'react';
import { Button, IconButton } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const Pagination = () => {
  const [active, setActive] = useState(1);

  const getItemProps = index => ({
    variant: active === index ? 'filled' : 'text',
    color: 'gray',
    onClick: () => setActive(index),
    className: 'rounded-full',
  });

  const next = () => {
    if (active < 5) setActive(active + 1);
  };

  const prev = () => {
    if (active > 1) setActive(active - 1);
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map(num => (
          <IconButton key={num} {...getItemProps(num)}>
            {num}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={next}
        disabled={active === 5}
      >
        Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
