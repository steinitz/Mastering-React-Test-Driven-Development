import { name, phone, lorem } from 'faker';

Array.prototype.unique = function() {
  return this.filter(function(value, index, self) {
    // returns true for the first occurance of a non-unique value,
    // but false for later occurances - and so eliminiating them
    return self.indexOf(value) === index;
  });
};

Array.prototype.pickRandom = function() {
  // works because Math.floor returns an integer LT or EQ to it's argument
  return this[Math.floor(Math.random() * this.length)];
};

const today = new Date();
const at = hours => today.setHours(hours, 0);

const stylists = [0, 1, 2, 3, 4, 5, 6]
  .map(() => name.firstName())
  .unique();

const services = [
  'Cut',
  'Blow-dry',
  'Cut & color',
  'Beard trim',
  'Cut & beard trim',
  'Extensions'
];

const generateFakeCustomer = () => ({
  firstName: name.firstName(),
  lastName: name.lastName(),
  phoneNumber: phone.phoneNumberFormat(1)
});

const generateFakeAppointment = () => ({
  customer: generateFakeCustomer(),
  stylist: stylists.pickRandom(),
  service: services.pickRandom(),
  notes: lorem.paragraph()
});

export const sampleAppointments = [
  { startsAt: at(9), ...generateFakeAppointment() },
  { startsAt: at(10), ...generateFakeAppointment() },
  { startsAt: at(11), ...generateFakeAppointment() },
  { startsAt: at(12), ...generateFakeAppointment() },
  { startsAt: at(13), ...generateFakeAppointment() },
  { startsAt: at(14), ...generateFakeAppointment() },
  { startsAt: at(15), ...generateFakeAppointment() },
  { startsAt: at(16), ...generateFakeAppointment() },
  { startsAt: at(17), ...generateFakeAppointment() }
];

const pickMany = (items, number) =>
  Array(number)
    // have to fill the array with something for the map to work
    // note fill() which fills it with undefined should also work
    .fill(1)
    .map(() => items.pickRandom());

const millisecondsForDayAndHalfHour = (
  day, // current day in series from start time: 0, 1, 2...6
  halfHour // current half hour: 0, 1, 2, 19
) => {
  const oneMinute = 60 * 1000;
  const result = oneMinute * (day * 24 * 60 + halfHour * 30);
  return result;
}

const buildTimeSlots = () => {
  const today = new Date();
  const startTime = today.setHours(9, 0, 0, 0);

  const times = [...Array(7).keys()].map(day => {
    return [...Array(20).keys()].map(halfHour => {
       return {
        startsAt: startTime + millisecondsForDayAndHalfHour(day, halfHour),
      };
    });
  });
  const result = [].concat(...times);
  console.log('buildTimeSlots - timeSlots', result);
  return result;
};

const availableTimeSlots = () => {
  const result = pickMany(
    buildTimeSlots(),
    50
  );
  return result;
};

export const sampleAvailableTimeSlots = availableTimeSlots();
