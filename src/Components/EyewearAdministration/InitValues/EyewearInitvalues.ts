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
            inStockQuantity: currentProduct.item.inStockQuantity,
        }
    } else {
        return {
            category: 'eyewear',
            name: '',
            code: 125954,
            description: 'new',
            price: 0,
            gender: /* [] */ 'Мужские',
            features: [],
            options: [],
            viewsCount: 0,
            buyCount: 0,
            shape: [],
            color: [ ],
            pupillaryDistance: '58-72',
            frameWidth: 138,
            lensWidth: 50,
            bridge: 19,
            templeLength: 143,
            lensHeight: 39,
            weight: 8,
            material: [],
            prescriptionMin: '-20.00',
            prescriptionMax: '12.00',
            imageUrl: null, 
            inStockQuantity: 1,
        }
    }
}

