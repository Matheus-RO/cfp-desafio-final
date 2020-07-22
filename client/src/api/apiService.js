import http from '../http-service';

let allPeriods = [];

const CURRENT_YEAR = new Date().getFullYear();
const GLOBAL_MONTHS_YEARS = {
  months: [
    { value: 1, name: 'Jan' },
    { value: 2, name: 'Fev' },
    { value: 3, name: 'Mar' },
    { value: 4, name: 'Abr' },
    { value: 5, name: 'Mai' },
    { value: 6, name: 'Jun' },
    { value: 7, name: 'Jul' },
    { value: 8, name: 'Ago' },
    { value: 9, name: 'Set' },
    { value: 10, name: 'Out' },
    { value: 11, name: 'Nov' },
    { value: 12, name: 'Dez' },
  ],
  years: [CURRENT_YEAR - 1, CURRENT_YEAR, CURRENT_YEAR + 1],
};

const generatePeriods = () => {
  allPeriods = [];

  GLOBAL_MONTHS_YEARS.years.forEach((year) => {
    GLOBAL_MONTHS_YEARS.months.forEach(({ value, name }) => {
      const id = `${year}-${value.toString().padStart(2, '0')}`;
      allPeriods.push({ id, name: `${name}/${year}` });
    });
  });
};

const getById = async (id) => {
  return http.get(`/transaction/${id}`);
};

const create = async (dataToPost) => {
  const { data } = await http.post('/transaction', dataToPost);

  const postedTransaction = formatTransactionsResponse(data);
  return postedTransaction;
};

const update = async (id, data) => {
  await http.put(`/transaction/${id}`, data);

  const updatedTransaction = formatTransactionsResponse(data);
  return updatedTransaction;
};

const remove = async (id) => {
  await http.delete(`/transaction/${id}`);
  return;
};

const findByPeriod = async (period) => {
  const { data } = await http.get(`/transaction?period=${period.id}`);

  const formattedTransactionData = data.map((transaction) =>
    formatTransactionsResponse(transaction)
  );

  return formattedTransactionData.sort((a, b) =>
    a.yearMonthDay.localeCompare(b.yearMonthDay)
  );
};

const getAllPeriods = async () => {
  if (allPeriods.length === 0) {
    generatePeriods();
  }
  return allPeriods;
};

const formatTransactionsResponse = (transaction) => {
  const { _id: id, category, description, month, ...otherFields } = transaction;
  const monthDescription = GLOBAL_MONTHS_YEARS.months.find(
    (item) => item.value === month
  ).name;

  return {
    id,
    category,
    description,
    month,
    descriptionLowerCase: description.toLowerCase(),
    categoryLowerCase: category.toLowerCase(),
    monthDescription,
    ...otherFields,
  };
};

export default {
  getById,
  create,
  update,
  remove,
  findByPeriod,
  getAllPeriods,
};
