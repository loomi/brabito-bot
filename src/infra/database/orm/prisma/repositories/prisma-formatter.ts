export class PrismaFormatter {
  static formatFilter(filterObject: any): Object {
    const filterEntries = Object.entries(filterObject);

    const listParamsToConvertKey = new Map([]);

    const filterWithoutUndefined = filterEntries.filter(
      ([key, value]) => value !== undefined
    );

    const filterEntriesTransformed = filterWithoutUndefined.map(
      ([key, value]) => {
        if (key.includes('Id') && typeof value === 'string') {
          return [key, value];
        }

        if (typeof value === 'string' && key !== 'id') {
          return [key, { contains: value, mode: 'insensitive' }];
        }

        if (typeof value === 'string' && key !== 'id') {
          return [key, { contains: value, mode: 'insensitive' }];
        }

        if (value instanceof Array) {
          return [listParamsToConvertKey.get(key), { id: { in: value } }];
        }

        if (key === 'createdAt' || key === 'updatedAt' || key === 'date') {
          // @ts-ignore
          const { initialDate, finalDate } = value;

          if (initialDate === undefined && finalDate === undefined) {
            return [null, null];
          }

          if (finalDate === undefined) {
            return [key, { gte: new Date(initialDate) }];
          }

          if (initialDate === undefined) {
            return [key, { lte: new Date(finalDate) }];
          }

          return [
            key,
            { gte: new Date(initialDate), lte: new Date(finalDate) },
          ];
        }

        return [key, value];
      }
    );

    const filterEntriesTransformedWithouNulls = filterEntriesTransformed.filter(
      ([key, value]) => value !== undefined || value !== null
    );

    const filterObjectFormated = Object.fromEntries(
      filterEntriesTransformedWithouNulls
    );

    return filterObjectFormated;
  }

  static formatFindOptions(findOptions: {
    take: number | undefined;
    skip: number | undefined;
    orderBy:
      | {
          property: string;
          mode: 'asc' | 'desc';
        }
      | undefined;
  }) {
    const { take, skip, orderBy } = findOptions;

    const findOptionsObject = {
      ...(take !== undefined ? { take } : {}),
      ...(skip !== undefined ? { skip } : {}),
      orderBy:
        orderBy?.property !== undefined && orderBy?.mode !== undefined
          ? { [orderBy.property]: orderBy.mode }
          : { createdAt: 'desc' as 'desc' },
    };

    return findOptionsObject;
  }
}
