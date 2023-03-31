export const determinateDate = (createdAt: Date) => {
    const date = new Date(createdAt)

    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    }
    const timeformat = new Intl.DateTimeFormat('ru-RU', options)
    const dateAndTime = timeformat.format(date)

    return dateAndTime
}


export const determinateCondition = (ordercondition: string) => {
    let condition = '';
    switch (ordercondition) {
        case 'created':
            condition = 'создан';
            break;
        case 'confirmed':
            condition = 'клиент ждёт звонка';
            break;
        case 'assemblied':
            condition = 'на сборке';
            break;
        case 'manufacturing':
            condition = 'у мастера';
            break;
        case 'send to manufactory':
            condition = 'отправлен мастеру';
            break;
        case 'processed manufactory':
            condition = 'в работе у мастера';
            break;
        case 'ready for courier':
            condition = 'готов для курьера';
            break;
        case 'in delivery':
            condition = 'у курьера';
            break;
        case 'deleted':
            condition = 'отменён';
            break;
        case 'delivered':
            condition = 'доставлен клиенту';
            break;
    }
    return condition
}