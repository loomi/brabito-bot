// @ts-nocheck

const booleanConverter = (value: string) => {
  if (value === 'true') return true;
  if (value === 'false') return false;

  return value;
};

const arrayConverter = (value: string) => {
  if (typeof value === 'string' && value !== '') return [...value.split(',')];
  return value;
};

const numberConverter = (value: string) => parseInt(value);

const rangeDateConverter = (value: string) => {
  const rangeDateArray = arrayConverter(value);

  const [initialDate, finalDate] = rangeDateArray;

  const rangeDateObject = { initialDate: initialDate, finalDate: finalDate };

  return rangeDateObject;
};

const orderByConverter = (value: string) => {
  const orderByArray = arrayConverter(value);

  const [property, mode] = orderByArray;

  const orderByObject = { property, mode };

  return orderByObject;
};

const propertysInQueryToConvert = {
  isAdmin: booleanConverter,
  enabled: booleanConverter,
  take: numberConverter,
  skip: numberConverter,
  createdAt: rangeDateConverter,
  updatedAt: rangeDateConverter,
  orderBy: orderByConverter,
};

export const convertProperties = (obj: any): any =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (propertysInQueryToConvert[key])
        return [key, propertysInQueryToConvert[key](value)];
      return [key, value];
    })
  );
