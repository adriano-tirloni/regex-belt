/** Valid 12-hour HH:MM:SS times without meridiem */
export const validTime12hhmmss = {
  /** Noon */
  noon: '12:00:00',
  /** Morning with leading zero */
  morningLeadingZero: '01:30:45',
  /** Afternoon without leading zero */
  afternoonNoLeadingZero: '3:15:30',
  /** End of range */
  endOfRange: '11:59:59',
};

/** Invalid 12-hour HH:MM:SS times without meridiem */
export const invalidTime12hhmmss = {
  /** Hour 0 is not valid in 12h format */
  hourZero: '00:00:00',
  /** Hour 13 is out of range */
  hour13: '13:00:00',
  /** Has meridiem */
  hasMeridiem: '12:00:00 PM',
  /** 24-hour format */
  twentyFourHour: '23:59:59',
  /** Missing seconds */
  missingSeconds: '12:00',
};

/** Valid 12-hour HH:MM:SS AM/PM times */
export const validTime12hhmmssAMPM = {
  /** Noon */
  noon: '12:00:00 PM',
  /** Midnight */
  midnight: '12:00:00 AM',
  /** Morning with leading zero */
  morningLeadingZero: '01:30:45 AM',
  /** Afternoon without leading zero */
  afternoonNoLeadingZero: '3:15:30 PM',
  /** No space before meridiem */
  noSpace: '12:00:00PM',
  /** Lowercase meridiem */
  lowercaseMeridiem: '11:59:59 am',
};

/** Invalid 12-hour HH:MM:SS AM/PM times */
export const invalidTime12hhmmssAMPM = {
  /** Hour 0 is not valid in 12h format */
  hourZero: '00:00:00 AM',
  /** Hour 13 is out of range */
  hour13: '13:00:00 PM',
  /** Missing meridiem */
  noMeridiem: '12:00:00',
  /** 24-hour format */
  twentyFourHour: '23:59:59',
  /** Missing seconds */
  missingSeconds: '12:00 PM',
};

/** Valid 12-hour HH:MM times without meridiem */
export const validTime12hhmm = {
  /** Noon */
  noon: '12:00',
  /** Morning */
  morning: '09:30',
  /** Without leading zero */
  noLeadingZero: '3:15',
  /** End of range */
  endOfRange: '11:59',
};

/** Invalid 12-hour HH:MM times without meridiem */
export const invalidTime12hhmm = {
  /** Hour 0 */
  hourZero: '00:00',
  /** Hour 13 */
  hour13: '13:00',
  /** Has meridiem */
  hasMeridiem: '12:00 PM',
  /** Has seconds */
  hasSeconds: '12:00:00',
};

/** Valid 12-hour HH:MM AM/PM times */
export const validTime12hhmmAMPM = {
  /** Noon */
  noon: '12:00 PM',
  /** Morning */
  morning: '09:30 AM',
  /** Without leading zero */
  noLeadingZero: '3:15 PM',
  /** No space */
  noSpace: '12:00PM',
  /** Lowercase */
  lowercase: '11:59 am',
};

/** Invalid 12-hour HH:MM AM/PM times */
export const invalidTime12hhmmAMPM = {
  /** Hour 0 */
  hourZero: '00:00 AM',
  /** Hour 13 */
  hour13: '13:00 PM',
  /** Missing meridiem */
  noMeridiem: '12:00',
  /** Has seconds */
  hasSeconds: '12:00:00 PM',
};

/** Valid 12-hour HH values without meridiem */
export const validTime12hh = {
  /** Noon */
  noon: '12',
  /** Morning */
  morning: '9',
  /** With leading zero */
  leadingZero: '01',
  /** End of range */
  endOfRange: '11',
};

/** Invalid 12-hour HH values without meridiem */
export const invalidTime12hh = {
  /** Hour 0 */
  hourZero: '0',
  /** Hour 13 */
  hour13: '13',
  /** Has meridiem */
  hasMeridiem: '12 PM',
  /** Has minutes */
  hasMinutes: '12:00',
};

/** Valid 12-hour HH AM/PM values */
export const validTime12hhAMPM = {
  /** Noon */
  noon: '12 PM',
  /** Morning */
  morning: '9 AM',
  /** With leading zero */
  leadingZero: '01 AM',
  /** No space */
  noSpace: '12PM',
  /** Lowercase */
  lowercase: '11 am',
};

/** Invalid 12-hour HH AM/PM values */
export const invalidTime12hhAMPM = {
  /** Hour 0 */
  hourZero: '0 AM',
  /** Hour 13 */
  hour13: '13 PM',
  /** Missing meridiem */
  noMeridiem: '12',
  /** Has minutes */
  hasMinutes: '12:00 PM',
};
