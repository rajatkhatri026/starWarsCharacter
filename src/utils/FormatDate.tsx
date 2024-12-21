import React from 'react';
import { format } from 'date-fns';

interface FormatDateProps {
  date: string | Date;
  formatString?: string; // Optional format string
}

export const FormatDate: React.FC<FormatDateProps> = ({ date, formatString = 'dd-MM-yyyy' }) => {
  // Convert the input date into a Date object (if it's a string)
  const parsedDate = typeof date === 'string' ? new Date(date) : date;

  // Use date-fns format function to format the date
  const formattedDate = format(parsedDate, formatString);

  return <span>{formattedDate}</span>;
};
