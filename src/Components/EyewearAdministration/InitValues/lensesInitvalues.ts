import { CurrentLensType, IImageUrl } from './../../../types/types';

export const initValues = (editMode:boolean, currentProduct:CurrentLensType, images:IImageUrl) => {
    if (currentProduct.item) {
        return {
            category: currentProduct.item.category,
            brand: currentProduct.item.brand,
            manufacturer: currentProduct.item.manufacturer,
            manufacturerCountry: currentProduct.item.manufacturerCountry,
            code: currentProduct.item.code,
            description: currentProduct.item.description,
            price: currentProduct.item.price,
            prescription: currentProduct.item.prescription,
            BC: currentProduct.item.BC,
            CYL: currentProduct.item.CYL,
            AX: currentProduct.item.AX,
            changePeriod: currentProduct.item.changePeriod,
            color: currentProduct.item.color,
            UVFilter: currentProduct.item.UVFilter,
            design: currentProduct.item.design,
            moisture: currentProduct.item.moisture,
            amountInPack: currentProduct.item.amountInPack,
            oxygen: currentProduct.item.oxygen,
            material: currentProduct.item.material,
            imageUrl: images,
        }
    } else {
        return {
            category: 'Lenses',
            brand: 'Acuvue',
            manufacturer: 'Johnson & Johnson',
            manufacturerCountry: 'Польша',
            code: 1254054,
            description: 'Acuvue Oasys for Astigmatism имеют в комплекте 6 линз, срок плановой замены составляет две недели. Данные изделия помогают решить такую проблему со зрением, как астигматизм.',
            price: 1990,
            prescription: [-9.0, -8.5, -8.0, -7.5, -7.0, -6.5, -6.0, -5.75, -5.5, -5.25, -5.0, -4.75, -4.5, -4.25, -4.0, -3.75, -3.5, -3.25, -3.0, -2.75, -2.5, -2.25, -2.0, -1.75, -1.5, -1.25, -1.0, -1.25, -1.0, -0.75, -0.5, -0.25, +0.25, +0.5, +0.75, +1.0, +1.25, +1.5, +1.75, +2.0, +2.25, +2.5, +2.75, +3.0, +3.25, +3.5, +3.75, +4.0, +4.25, +4.5, +4.75, +5.0, +5.25, +5.5, +5.75, ],
            BC: [8.6, 8.8],
            CYL: [-2.75, -2.5, -2.25, -2.0, -1.75, -1.5, -1.25, -1.0, -1.25, -1.0, -0.75],
            //AX: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, ],
            AX: [170, 80, 90, 100, 170, 180, ],
            changePeriod: 'месяц',
            color: 'прозрачные',
            UVFilter: true,
            design: 'сферические',
            moisture: 38,
            amountInPack: 0,
            oxygen: 135,
            material: 'cиликон-гидрогелевые',
            imageUrl: images,
        }
    }
}

