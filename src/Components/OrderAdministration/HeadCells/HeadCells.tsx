import { FC } from 'react';

export const HeadCells: FC = () => {

  const cells = [
    { label: 'стадия', name: 'condition' },
    { label: 'дата создания', name: 'date' },
    { label: 'клиент', name: 'user' },
    { label: 'сумма', name: 'sum' },]
    .map(elem => {
      return <th key={elem.name}>
        {elem.label}

      </th>
    });

  return <tr>{cells}</tr>
}
