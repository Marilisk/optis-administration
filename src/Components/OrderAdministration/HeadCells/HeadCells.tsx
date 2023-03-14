import c from './../Orders.module.scss';
import { useEffect, FC } from 'react';
interface IHeadCellsProps {
    
}

export const HeadCells: FC<IHeadCellsProps> = ({  }: IHeadCellsProps) => {
    

    
    const cells = [
        { label: 'стадия', name: 'condition' },
        { label: 'дата создания', name: 'date' },
        { label: 'клиент', name: 'user' },
        { label: 'сумма', name: 'sum' },
        /* { label: 'Insurance hedge', name: 'hedge' }, */]
        .map(elem => {
          return <th key={elem.name}>
           {elem.label}
            
          </th>
        });
    

    return <tr>{cells}</tr>



}
