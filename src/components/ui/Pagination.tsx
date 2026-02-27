import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

interface Props {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

export const Pagination = ({ current, total, onChange }: Props) => {
  if (total <= 1) return null;

  const next = () => {
    if (current === total) return;
    onChange(current + 1);
  };

  const prev = () => {
    if (current === 1) return;
    onChange(current - 1);
  };

  return (
    <div className="flex items-center justify-center pagination-div">
      <IconButton
        size="sm"
        variant="outlined"
        onClick={prev}
        disabled={current === 1}
        className="border-2 border-blue-500 hover:bg-blue-50"
      >
        <ArrowLeftIcon strokeWidth={3} className="h-4 w-4" />
      </IconButton>

      <Typography color="gray" className="font-normal text-sm">
        Page <strong className="text-gray-900">{current}</strong> of{" "}
        <strong className="text-gray-900">{total}</strong>
      </Typography>

      <IconButton
        size="sm"
        variant="outlined"
        onClick={next}
        disabled={current === total}
        className="border-2 border-blue-500 hover:bg-blue-50"
      >
        <ArrowRightIcon strokeWidth={3} className="h-4 w-4" />
      </IconButton>
    </div>
  );
};
