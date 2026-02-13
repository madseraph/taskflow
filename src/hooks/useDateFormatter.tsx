import { useMemo } from 'react';

const useDateFormatter = (locale: string = 'ru-RU') => {
  const formatShortDate = useMemo(() => {
    return (dateString: string): string => {
      const date = new Date(dateString);

      if (isNaN(date.getTime())) {
        return 'Н/Д';
      }

      const formatter = new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      const formatted = formatter.format(date);
      return formatted;
    };
  }, [locale]);

  const formatOnlyTime = useMemo(() => {
    return (dateString: string): string => {
      const date = new Date(dateString);

      if (isNaN(date.getDate())) {
        return 'Н/Д';
      }

      const formatter = new Intl.DateTimeFormat(locale, {
        hour: 'numeric',
        minute: 'numeric',
      });

      const formatted = formatter.format(date);
      return formatted;
    };
  }, [locale]);

  const formatFullDate = useMemo(() => {
    return (dateString: string): string => {
      const date = new Date(dateString);

      if (isNaN(date.getDate())) {
        return 'Н/Д';
      }

      const formatter = new Intl.DateTimeFormat(locale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      });

      const formatted = formatter.format(date);
      return formatted.charAt(0).toUpperCase() + formatted.slice(1);
    };
  }, [locale]);

  return { formatShortDate, formatFullDate, formatOnlyTime };
};

export default useDateFormatter;
