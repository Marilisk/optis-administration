import { CurrentProductType, IImageUrl } from './../../../types/types';

interface IinitValues {
    currentProduct: CurrentProductType
    images:IImageUrl
}

export const initValues = ({ currentProduct, images}:IinitValues) => {
    if (currentProduct.item) {
        return {
            category: currentProduct.item.category,
            name: currentProduct.item.name,
            code: currentProduct.item.code,
            description: currentProduct.item.description,
            price: currentProduct.item.price,
            gender: currentProduct.item.gender[0],
            features: currentProduct.item.features,
            options: currentProduct.item.options,
            viewsCount: currentProduct.item.viewsCount,
            buyCount: currentProduct.item.buyCount,
            shape: currentProduct.item.shape,
            color: currentProduct.item.color,
            pupillaryDistance: currentProduct.item.pupillaryDistance,
            frameWidth: currentProduct.item.frameWidth,
            lensWidth: currentProduct.item.lensWidth,
            bridge: currentProduct.item.bridge,
            templeLength: currentProduct.item.templeLength,
            lensHeight: currentProduct.item.lensHeight,
            weight: currentProduct.item.weight,
            material: currentProduct.item.material,
            prescriptionMin: currentProduct.item.prescriptionMin,
            prescriptionMax: currentProduct.item.prescriptionMax,
            imageUrl: images,
        }
    } else {
        return {
            category: 'eyewear',
            name: 'Siresto',
            code: 125954,
            description: 'новинка',
            price: 0,
            gender: /* [] */ 'Мужские',
            features: ['детские', 'строгие', 'офисные', 'new Look', 'для чтения', 'безоправные', 'полностью оправленные','подростковые',
                        'праздничные',
                        'легкие',
                        'для овального лица',
                        'для круглого лица',
                        'для квадратного лица',
                        'для прямоугольного лица',
                        'для лица в форме алмаза',
                        'для лица в форме сердца',
                        'для вытянутого лица',
                        'для треугольного лица',
                       /*  'для лица в форме перевернутого треугольника', */
                    ],
            options: [],
            viewsCount: 0,
            buyCount: 0,
            shape: ['круглые', 'прямоугольные', 'квадратные', 'авиаторы', 'cat eye'],
            color: ['чёрный', 'серебро','белый', 'розовый', 'золото' ],
            pupillaryDistance: '58-72',
            frameWidth: 138,
            lensWidth: 50,
            bridge: 19,
            templeLength: 143,
            lensHeight: 39,
            weight: 8,
            material: ['пластик', 'сталь', 'титан'],
            prescriptionMin: '-20.00',
            prescriptionMax: '12.00',
            imageUrl: null,  // or images?
        }
    }
}

